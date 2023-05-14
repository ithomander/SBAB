const express = require('express');
const axios = require('axios');
const keys = require('./config/keys');

const app = express(); 

app.get("/api", async (req, res) => {
    try {
        const [busLines, stopNames] = await Promise.all([getBusLines(), getStopNames()]);
        updateBusStopWithNames(busLines, stopNames);
        res.send(busLines);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.response.data.message);
    }
});

async function getBusLines() {
    const response = await axios({
        method: 'get',
        url: `https://api.sl.se/api2/LineData.json?model=jour&key=${keys.trafikLabKey}&DefaultTransportModeCode=BUS`,
        headers: {'Accept-Encoding': 'gzip, deflate'}
    })

    const result = response.data.ResponseData.Result
        
    // Create an array with objects of bus line and its stop numbers
    const stopsPerLine = result.reduce((acc, stop) => {
        if (acc.some(element => element.line === stop.LineNumber)) {
            const lineIndex = acc.findIndex(element => element.line === stop.LineNumber)
            acc[lineIndex].busStops.push(stop.JourneyPatternPointNumber)
        } else {
            acc.push({line: stop.LineNumber, busStops: [stop.JourneyPatternPointNumber]})
        }
        return acc;
    }, []);

    // Select top ten bus lines
    const topBusLines = stopsPerLine
        .sort((a, b) => b.busStops.length - a.busStops.length)
        .slice(0,10);
        
    return topBusLines
    
}

async function getStopNames() {
    const response = await axios({
        method: 'get',
        url: `https://api.sl.se/api2/LineData.json?model=stop&key=${keys.trafikLabKey}`,
        headers: {'Accept-Encoding': 'gzip, deflate'}
    })

    const result = response.data.ResponseData.Result
    
    // Create a dictionary with bus stop number and name
    const stopNames = Object.fromEntries(result.map(stop => [stop.StopPointNumber, stop.StopPointName]))
    
    return stopNames

}

function updateBusStopWithNames(busLines, stopNames) {
    busLines.forEach(busLine => {
        busLine.busStops.forEach((stop, i) => {
            busLine.busStops[i] = stopNames[stop]
        })
    })
}

app.listen(5000, () => {console.log("Server started on port 5000")});




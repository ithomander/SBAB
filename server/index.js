const express = require('express');
const axios = require('axios');
const keys = require('./config/keys');

const app = express(); 

app.get('/api', (req, res) => {

    /* ----- Get bus lines and stop numbers per line  -----*/
    const busStopsPerLine = axios({
        method: 'get',
        url: `https://api.sl.se/api2/LineData.json?model=jour&key=${keys.trafikLabKey}&DefaultTransportModeCode=BUS`,
        headers: {'Accept-Encoding': 'gzip, deflate'}
    })
    .then(response => {
        const result = response.data.ResponseData.Result
        
        // Create an array with objects of Bus line its stopnumbers
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
        const topBusLines = stopsPerLine.sort((a, b) => b.busStops.length - a.busStops.length).slice(0,10);
        
        return topBusLines
    })

    /* ----- Get names of bus stops  -----*/
    const BusStopNames = axios({
        method: 'get',
        url: `https://api.sl.se/api2/LineData.json?model=stop&key=${keys.trafikLabKey}`,
        headers: {'Accept-Encoding': 'gzip, deflate'}
    }).then(response => {
        const result = response.data.ResponseData.Result
        
        // Create a dictionary with bus stop number and name
        const stopDictionary = Object.fromEntries(result.map(stop => [stop.StopPointNumber, stop.StopPointName]))
        
        return stopDictionary
    })

    /* ----- Update bus lines with bus stop names  -----*/
    Promise.all([busStopsPerLine, BusStopNames]).then(([busLines, stopNames]) => {
        busLines.forEach(busLine => {
            busLine.busStops.forEach((stop, i) => busLine.busStops[i] = {stopNumber: stop, stopName: stopNames[stop]})
        })
        console.log(busLines)
        res.send(busLines)
    })
});

app.listen(5000, () => {console.log("Server started on port 5000")});

/*
const BusLines = [
  {
    line: '1',
    busStops: ['1','2','3','4','1','2','3','4','1','2','3','4','1','2','3','4','1','2','3','4','1','2','3','4' ]
  }, 
  {
    line: '2',
    busStops: ['5','6','7','5','6','7','5','6','7','5','6','7','5','6','7','5','6','7','5','6','7','5','6','7']
  }
];
*/
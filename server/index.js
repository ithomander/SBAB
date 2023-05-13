const express = require('express');
const axios = require('axios');
const keys = require('./config/keys');

// Creating a new express app for config
const app = express(); 

app.get('/api', (req, res) => {

    // Get bus lines and stop numbers per line
    axios({
        method: 'get',
        url: `https://api.sl.se/api2/LineData.json?model=jour&key=${keys.trafikLabKey}&DefaultTransportModeCode=BUS`,
        headers: {'Accept-Encoding': 'gzip, deflate'}
    })
    .then(response => {
        const result = response.data.ResponseData.Result
        // console.log(result);
        
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
        // console.log(stopsPerLine);

        // Select top ten bus lines
        const topBusLines = stopsPerLine.sort((a, b) => b.busStops.length - a.busStops.length).slice(0,10);
        // console.log(topBusLines);
    
        // Send response to frontend
        res.json(topBusLines)


        // Add Try catch?
    })

    // Get names of bus stops
    axios({
        method: 'get',
        url: `https://api.sl.se/api2/LineData.json?model=stop&key=${keys.trafikLabKey}`,
        headers: {'Accept-Encoding': 'gzip, deflate'}
    }).then(response => {
        const result = response.data.ResponseData.Result
        const stopDictionary = Object.fromEntries(result.map(stop => [stop.StopPointNumber, stop.StopPointName]))
        console.log(stopDictionary)

        res.json("Hello")
    })
});

/*
Sen skapa objekt med bara busslinje och alla dess stopp. Sen sortera på topp och ta dem?

Alternativ 1

1. Identifiera top 10
Iterera genom listan med resultat
Skapa en lista med objekt som har busslinje och antal stopp genom:
- Om ett objekt i resultatet har ett nytt LineNumber, lägg till det som ett objekt och lägg till antal stopp som 1
- Om ett objekt i resultatet har ett existerande Linenumber, addera 1 till antal stopp

Sotera listan på de objekten som har högst antal
Slica listan på top 10

2. Skapa en lista som innehåller objekt med busslinjen och tillhörande stopp
Iterera genom listan med top 10, för varje objekts busslinje:
Iterera över resultatet --> det innebär att jag itererar över resultatet 10 ggr. kan inte vara bra
Plocka ut Stoppet och lägg till i listan över stop i tillhörande objekt

Oödigt skapa nya listor?

Alternativ 2

1. Skapa en lista med objekt som har busslinje och stop 
Iterera genom resultatet
- Om ett objekt i resultatet har ett nytt LineNumber, lägg till det som ett objekt och lägg till stoppet i listan
- Om ett objekt i resultatet har ett existerande Linenumber, lägg till i listan för stopp

2. Välj stop 10
Sortera listan på de objekt som har längst lista med stopp
Slica listan på top 10

*/

/*
            if (!acc[stop.LineNumber]){
                acc.push({line: stop.LineNumber, busStops: [stop.JourneyPatternPointNumber]})
            } else {
                acc[stop.LineNumber].busStops.push(stop.JourneyPatternPointNumber)
            }
            */

app.listen(5000, () => {console.log("Server started on port 5000")});
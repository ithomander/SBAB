import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import BusStops from '../BusStops/BusStops';


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


export default function BusList() {
  const [busLines, setBusLines] = useState([]);

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(json => setBusLines(json))
  }, [])

  return(
    <div className="mx-5">
      { 
        (busLines && busLines.length) ? (
          busLines.map(el => <div key={el.line}>{el.line + ' The nr of stops is ' + el.busStops.length}</div>)
          /*
          <Accordion>
            {busLines.map(busLine => {
              return (
              <Accordion.Item eventKey={busLine.line}>
                <Accordion.Header>{busLine.line}</Accordion.Header>
                <Accordion.Body>
                  <BusStops stopsList={busLine.busStops}></BusStops>
                </Accordion.Body>
              </Accordion.Item>
              )
            })}
          </Accordion>
          */
      ) : <div>Loading...</div>
      }
      <Accordion>
            {BusLines.map(busLine => {
              return (
                <div key={busLine.line}>
                  <Accordion.Item eventKey={busLine.line}>
                    <Accordion.Header>{busLine.line}</Accordion.Header>
                    <Accordion.Body>
                      <BusStops stopsList={busLine.busStops}></BusStops>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              )
            })}
          </Accordion>
    </div>
  )
}

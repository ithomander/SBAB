import React, { useEffect, useState } from 'react';

export default function BusList() {
    const [busLines, setBusLines] = useState([]);

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(json => setBusLines(json))
  }, [])

  return(
    <div>
      { 
        (busLines && busLines.length) ? (
          busLines.map(el => <div key={el.line}>{el.line + ' The nr of stops is ' + el.busStops.length}</div>)
        ) :
        <div>Loading...</div>
      }
    </div>
  )
}

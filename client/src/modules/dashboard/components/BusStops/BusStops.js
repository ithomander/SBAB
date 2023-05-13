import React from 'react';

export default function BusStops({stopsList}) {
    return (
        <div >
            {stopsList.map(stop => <div key={stop}>{stop}</div>)}
        </div>
    )
}
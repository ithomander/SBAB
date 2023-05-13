import React from 'react';

function sortToColumns(list, limit) {
    const columns = list.reduce((acc, element) => {
        if (acc.length === 0 || acc[acc.length - 1].length === limit) {
          acc.push([element]);
        } else {
          acc[acc.length - 1].push(element);
        }
        return acc;
      }, []);
    return columns
}

export default function BusStops({stopsList}) {    
    const columns = sortToColumns(stopsList, 40)

    return (
        <div className='container-fluid flex mx-0'>
            <div className='row'>
                {
                    columns.map(col =>  {
                        return (
                            <div key={col} className='col-2'>
                                {col.map(stop => <div key={stop}><small>{stop}</small></div>)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


/*
<div className='col-2'>{stopsList.slice(0,5).map(stop => <div key={stop}><small>{stop}</small></div>)}</div>
                <div className='col-2'>{stopsList.slice(5,10).map(stop => <div key={stop}>{stop}</div>)}</div>

40 stops per column
Make text in column supersmall

636 The nr of stops is 232
626 The nr of stops is 226
637 The nr of stops is 208
620 The nr of stops is 185
639 The nr of stops is 170
312 The nr of stops is 160
652 The nr of stops is 155
785 The nr of stops is 155
631 The nr of stops is 154
783 The nr of stops is 154
*/
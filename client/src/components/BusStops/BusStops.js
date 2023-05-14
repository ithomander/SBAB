import React from 'react';

export default function BusStops({stopsList}) {    
    const columns = sortToColumns(stopsList, 70)

    return (
        <div className='container-fluid flex mx-0'>
            <div className='row'>
                {
                    columns.map((col, i) =>  {
                        return (
                            <div key={i} className='col-3'>
                                {col.map((stop, i) => <div key={i}><small>{stop}</small></div>)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

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
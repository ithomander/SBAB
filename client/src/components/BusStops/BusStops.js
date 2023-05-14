import React from "react";

export default function BusStops({stopsList}) {    
    // Prepare stops to fit in 4 colums
    const rows = Math.ceil(stopsList.length/4)
    const columns = sortToColumns(stopsList, rows)

    return (
        <div className="container-fluid flex mx-0">
            <div className="row">
                {
                    columns.map((col, i) =>  {
                        return (
                            <div key={i} className="col-3">
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
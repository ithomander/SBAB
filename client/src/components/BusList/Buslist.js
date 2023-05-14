import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import BusStops from "../BusStops/BusStops";

function BusList() {
  const [busLines, setBusLines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/api")
        .then((response) => {
          setBusLines(response.data);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="mx-5 mt-5">
      {busLines && busLines.length ? (
        <Accordion>
          {busLines.map((busLine) => {
            return (
              <div key={busLine.line}>
                <Accordion.Item eventKey={busLine.line}>
                  <Accordion.Header>{`Bus line number ${busLine.line}`}</Accordion.Header>
                  <Accordion.Body>
                    <BusStops stopsList={busLine.busStops}></BusStops>
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            );
          })}
        </Accordion>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default BusList;

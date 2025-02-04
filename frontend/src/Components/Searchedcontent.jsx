import React, { useState, useEffect } from "react";
import "../styles/Searched_content.css";
import EventCard from "./Event_Card";
import { useNavigate} from "react-router-dom";
import { tickets } from "../data";

export default function Searchedcontent({search, condition, EventType = "", date, price,setSearchBoxResults,id,setId}) {
  const navigate = useNavigate();
  function handleonclick(id) {
    navigate(`/Event/${id}`);
    setId(id);
  }

  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/eventdetail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const result = await response.json();
        
        if (result.success) {
          setEvent(result.event);
        } else {
          setError(result.message || "Error fetching event");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [API_BASE_URL]);

  let arr;
  event ? (arr = event): (arr=tickets);
    // console.log(arr);
  let filteredData = arr.filter(
    (e) =>
      e.event_name.toLowerCase().includes(search.toLowerCase()) &&
      e.event_type.toLowerCase().includes(EventType)
  );

  filteredData = filteredData.sort((a, b) => {
    if (price === "asc") {
      return a.sellingPrice - b.sellingPrice;
    } else if (price === "desc") {
      return b.sellingPrice - a.sellingPrice;
    }
    return 0;
  });

  useEffect(() => {
    // console.log("filtered Data: ");
    // console.log(filteredData);
    setSearchBoxResults(filteredData);
  }, [search]);
  

  // console.log("render content ");
  
  

  return (
    <div>
      {condition ? (
        search ? (
          <>
            <p className="Result">Results</p>
            <div className="card-container">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div key={item.event_id} onClick={() => handleonclick(item.event_id)}>
                    <EventCard item={item} />
                  </div>
                ))
              ) : (
                <p>No Results Found</p>
              )}
            </div>
          </>
        ) : null
      ) : (
        <>
          <p className="Result">Results</p>
          <div className="card-container">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div key={item.event_id} onClick={() => handleonclick(item.event_id)}>
                  <EventCard item={item} />
                </div>
              ))
            ) : (
              <p>No Results Found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

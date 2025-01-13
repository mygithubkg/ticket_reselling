import React from "react";
import "../styles/Searched_content.css";
import EventCard from "./Event_Card";
import { useNavigate, Link } from "react-router-dom";
import { tickets } from "../data";

export default function Searchedcontent({search, condition, EventType = "", date, price}) {
  const navigate = useNavigate();

  function handleonclick  (id)  {
    navigate(`/Event/${id}`)
 
    
  };

  let arr = tickets

    

  var filteredData = (arr.filter((e) =>
    (e.eventName.toLowerCase().includes(search.toLowerCase()) && e.eventName.toLowerCase().includes(EventType)))
  );

  var filteredData = filteredData.sort((a, b) => {
    if (price === "asc") {
      return a.sellingPrice - b.sellingPrice;
    } else if (price === "desc") {
      return b.sellingPrice - a.sellingPrice;
    }
    return 0;
  });

  return (
    <div>
      {condition ? (
        search ? (
          <>
            <p className="Result">Results</p>
            <div className="card-container">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div onClick={() => handleonclick(item.id)}> <EventCard
                    key={item.id}
                    
                    item={item}
                  /> </div>
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
                <div onClick={() => handleonclick(item.id)}> <EventCard
                key={item.id}
                
                item={item}
              /> </div>
               
              ))
            ) : (
              <p> No Results Found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

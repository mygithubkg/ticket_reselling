import React from "react";
import "../styles/Searched_content.css";
import Event_Card from "./Event_Card";
import { useNavigate, Link } from "react-router-dom";

export default function Searched_content({search, condition }) {
  const navigate = useNavigate();

  let handleonclick = (id) => {
    navigate(`/Event/${id}`); 
    console.log({id})
  };

  const arr = [
    { id: 1, name: "Diljit", price: 10000, details: "fffhewjfkjfbeiuwfkjewfgffiu", image: "image_url" },
    { id: 2, name: "Karan", price: 10000, details: "fffhewjfkjfbeiuwfkjewfgffiu", image: "image_url" },
    { id: 3, name: "Arjit Singh", price: 10000, details: "fffhewjfkjfbeiuwfkjewfgffiu", image: "image_url" },
    // Add more items as needed
  ];

  // Filter data based on the search term
  const filteredData = arr.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {condition ? (
        search ? (
          <>
            <p className="Result">Results</p>
            <div className="card-container">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <Event_Card
                    key={item.id}
                    onClick={() => handleonclick(item.id)} 
                    item={item}
                  />
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
                <Link key={item.id} to={`/event/${item.id}`}>
                  <Event_Card item={item} /> {/* Wrap Event_Card with Link for navigation */}
                </Link>
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

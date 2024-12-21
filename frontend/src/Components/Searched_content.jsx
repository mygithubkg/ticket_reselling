import React from "react";
import "../styles/Searched_content.css";

export default function Searched_content({ search, condition }) {
  const arr = [
    {
      name: "Diljit",
      price: 10000,
      details: "fffhewjfkjfbeiuwfkjewfgffiu",
      image: "https://www.shutterstock.com/shutterstock/photos/1379832464/display_1500/stock-vector-check-back-soon-hand-lettering-inscription-common-web-phrase-calling-for-returning-to-the-page-for-1379832464.jpg",
    },
    {
      name: "Karan",
      price: 10000,
      details: "fffhewjfkjfbeiuwfkjewfgffiu",
      image: "https://www.shutterstock.com/shutterstock/photos/1379832464/display_1500/stock-vector-check-back-soon-hand-lettering-inscription-common-web-phrase-calling-for-returning-to-the-page-for-1379832464.jpg",
    },
    {
      name: "Arjit Singh",
      price: 10000,
      details: "fffhewjfkjfbeiuwfkjewfgffiu",
      image: "https://www.shutterstock.com/shutterstock/photos/1379832464/display_1500/stock-vector-check-back-soon-hand-lettering-inscription-common-web-phrase-calling-for-returning-to-the-page-for-1379832464.jpg",
    },
    {
      name: "Arjit Singh",
      price: 10000,
      details: "fffhewjfkjfbeiuwfkjewfgffiu",
      image: "https://www.shutterstock.com/shutterstock/photos/1379832464/display_1500/stock-vector-check-back-soon-hand-lettering-inscription-common-web-phrase-calling-for-returning-to-the-page-for-1379832464.jpg",
    },
    {
      name: "Arjit Singh",
      price: 10000,
      details: "fffhewjfkjfbeiuwfkjewfgffiu",
      image: "https://www.shutterstock.com/shutterstock/photos/1379832464/display_1500/stock-vector-check-back-soon-hand-lettering-inscription-common-web-phrase-calling-for-returning-to-the-page-for-1379832464.jpg",
    },
    {
      name: "Arjit Singh",
      price: 10000,
      details: "fffhewjfkjfbeiuwfkjewfgffiu",
      image: "https://www.shutterstock.com/shutterstock/photos/1379832464/display_1500/stock-vector-check-back-soon-hand-lettering-inscription-common-web-phrase-calling-for-returning-to-the-page-for-1379832464.jpg",
    },
  ];

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
                filteredData.map((item, index) => (
                  <div className="card" key={index}>
                    <img className="image" src={item.image} alt={item.name} />
                    <p className="name">{item.name}</p>
                    <p className="price">₹{item.price}</p>
                    <p className="details">{item.details}</p>
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
              filteredData.map((item, index) => (
                <div className="card" key={index}>
                  <img className="image" src={item.image} alt={item.name} />
                  <p className="name">{item.name}</p>
                  <p className="price">₹{item.price}</p>
                  <p className="details">{item.details}</p>
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

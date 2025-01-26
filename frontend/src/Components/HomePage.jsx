import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Carousel from "../Components/Carousel";
import SubHeading from "../Components/Subheading";
import EventBoxes from "../Components/EventBoxes";
import SearchBox from "./SearchBox";
import Searched_content from "./Searchedcontent";
import Features from "./Features";
import "../styles/homepage.css";
import { tickets } from "../data";
import { useParams } from "react-router-dom";

function HomePage() {
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

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
  }, [id]);
  if (loading) {
    return <p>Loading form...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>Some Error Occured.</p>;
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <Carousel />
        <div className="statement">
          <span className="word">Sell</span>&nbsp;Tickets&nbsp;
          <span className="effort">Effortlessly!</span>
        </div>
        <Features />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div className="search-box-conatiner-hp">
            <SearchBox search={search} setSearch={setSearch} />
          </div>
        </div>
        <Searched_content
          condition={true}
          search={search}
          setSearch={setSearch}
        />
      </div>


      <SubHeading info="Trending Events" />
      {event ? <EventBoxes data={event} /> : "No event available"}
      <SubHeading info="Popular Artist" />
      {event ? <EventBoxes data={event} /> : "No event available"}
    </>
  );
}

export default HomePage;

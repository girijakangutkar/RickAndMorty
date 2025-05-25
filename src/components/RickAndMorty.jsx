import React, { useEffect, useState, useRef } from "react";
import "../styles/cartoon.css";

function RickAndMorty() {
  const [cartoon, setCartoon] = useState([]);
  const currentPageRef = useRef(1);

  useEffect(() => {
    fetchCartoon();
  }, []);

  const ApiKey = import.meta.env.VITE_API_KEY;

  async function fetchCartoon() {
    try {
      const response = await fetch(`${ApiKey}${currentPageRef.current}`);
      const data = await response.json();
      setCartoon(data.results);
    } catch (err) {
      console.log(err);
    }
  }

  function next() {
    currentPageRef.current += 1;
    fetchCartoon();
  }

  function prev() {
    if (currentPageRef.current > 1) {
      currentPageRef.current -= 1;
      fetchCartoon();
    }
  }

  return (
    <div className="container">
      {cartoon.map((info) => (
        <div className="card" key={info.id}>
          <div id="ProfilePic">
            <div id="img">
              <img src={info.image} />
            </div>
          </div>
          <div id="profileInfo">
            <p>
              <b>Name: </b>
              {info.name}
            </p>
            <p>
              <b>Status: </b>
              {info.status}
            </p>
            <p>
              <b>Species: </b>
              {info.species}
            </p>
            <p>
              <b>Gender: </b>
              {info.gender}
            </p>
            <p>
              <b>Origin name:</b>
              {info.origin.name}
            </p>
            <p>
              <b>Location name:</b>
              {info.location.name}
            </p>
          </div>
        </div>
      ))}
      <div className="NavigationPanel">
        <button onClick={prev} disabled={currentPageRef.current === 1}>
          Prev
        </button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}

export default RickAndMorty;

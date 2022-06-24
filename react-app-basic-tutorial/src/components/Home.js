import React from "react";
import { Link } from "react-router-dom";

/***
 * Displays a grid of Team & Persons Link to find more details
 */
function Home() {
  return (
    <div className="Home">
      <Link to={"/teams"}>Teams</Link>

      <hr />

      <Link to={"/persons"}>Persons</Link>
    </div>
  );
}

export default Home;

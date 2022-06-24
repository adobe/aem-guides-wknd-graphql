/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPersons, getPersonByOccupation } from "../api/persistedQueries";
import Error from "./Error";
import Loading from "./Loading";
import "./Persons.scss";

function Persons({ occupation }) {
  const [response, setResponse] = useState();

  useEffect(() => {
    // set response to null while fetching the new data (prompts loading icon)
    setResponse();

    // if an occupation is set (i.e "Photographer", "Influencer"...)
    if (occupation && occupation !== "") {
      // run a filter query to get persons based on the occupation
      getPersonByOccupation(occupation).then((response) =>
        setResponse(response)
      );
    } else {
      // Otherwise get all the persons data (unfiltered)
      getAllPersons().then((response) => setResponse(response));
    }
  }, [occupation]);

  //If response is null then return a loading state...
  if (!response) return <Loading />;

  //If there is an error with the GraphQL query
  if (response && response.errors)
    return <Error errorMessage={response.errors} />;

  return (
    <div className="persons">
      <h1>Our People</h1>
      <ul className="person-items">
        {
          //Iterate over the returned data items from the query
          response.data.personList.items.map((person) => {
            return <PersonListItem key={person.fullName} {...person} />;
          })
        }
      </ul>
    </div>
  );
}

// Render individual Persons item
function PersonListItem({ fullName, occupation, _path }) {

  console.log(_path);

  //Must have fullName
  if (!fullName) {
    return null;
  }
  return (
    <div className="person-item">
      <div className="person-item-title">
        {fullName} | {occupation.toString()} |  <Link to={`/person:${fullName}`}> Details </Link>

      </div>
    </div>
  );
}

export default Persons;

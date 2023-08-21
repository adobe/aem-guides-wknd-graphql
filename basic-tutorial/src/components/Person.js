/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React from "react";
import { useParams } from "react-router-dom";
import { usePersonByName } from "../api/usePersistedQueries";
import { mapJsonRichText } from "../utils/renderRichText";
import Error from "./Error";
import Loading from "./Loading";
import "./Person.scss";

function Person() {
  // Read the person's `fullName` which is the parameter used to query for the person's details
  const { fullName } = useParams();

  // Query AEM for the Person's details, using the `fullName` as the filtering parameter
  const { person, error } = usePersonByName(fullName);

  // Handle error and loading conditions
  if (error) {
    return <Error errorMessage={error} />;
  } else if (!person) {
    return <Loading />;
  }

  // Render the person data
  return (
    <div className="person">
      <img
        className="person__image"
        src={process.env.REACT_APP_HOST_URI+person.profilePicture._path}
        alt={person.fullName}
      />
      <div className="person__occupations">
        {person.occupation.map((occupation, index) => {
          return (
            <span key={index} className="person__occupation">
              {occupation}
            </span>
          );
        })}
      </div>
      <div className="person__content">
        <h1 className="person__full-name">{person.fullName}</h1>
        <div className="person__biography">
          {/* Use this utility to transform multi-line text JSON into HTML */}
          {mapJsonRichText(person.biographyText.json)}
        </div>
      </div>
    </div>
  );
}

export default Person;

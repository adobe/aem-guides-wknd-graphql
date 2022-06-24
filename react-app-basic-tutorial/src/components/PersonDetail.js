/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPersonByName } from "../api/persistedQueries";
import { mapJsonRichText } from '../utils/renderRichText';
import Error from "./Error";
import Loading from "./Loading";
import "./Persons.scss";

function PersonDetail() {
  // params hook from React router
  const { fullName } = useParams();

  const [response, setResponse] = useState();

  useEffect(() => {
    setResponse();

    //to remove the : from URI Param
    const name = fullName.substring(1);

    getPersonByName(name).then((response) => setResponse(response));
  }, [fullName]);

  console.log(response);

  //If query response is null then return a loading icon...
  if (!response) return <Loading />;

  //If there is an error with the GraphQL query
  if (response && response.errors)
    return <Error errorMessage={response.errors} />;

  //Set Person details based on graphQL response
  const currentPerson = getPersonDetails(response);

  return (
    <div>
      <h2>Person Details</h2>
      <h3>
          {currentPerson.fullName} | {currentPerson.occupation.toString()}
      </h3>
      <div>
        <img
          className="person-item-image"
          src={currentPerson.profilePicture._path}
          alt={currentPerson.fullName}
        />
        <div>
          {mapJsonRichText(currentPerson.biographyText.json)}
        </div>

      </div>
    </div>
  );
}

function getPersonDetails(response) {
  let currentPerson = undefined;
  if (
    response &&
    response.data &&
    response.data.personList &&
    response.data.personList.items
  ) {
    if (response.data.personList.items.length === 1) {
      currentPerson = response.data.personList.items[0];
    }
  }
  console.log(`CurrentPerson${currentPerson}`);

  return currentPerson;
}

export default PersonDetail;

/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTeams } from "../api/persistedQueries";
import Error from "./Error";
import Loading from "./Loading";

function Teams() {
  const [response, setResponse] = useState();

  useEffect(() => {
    // set response to null while fetching the new data (prompts loading icon)
    setResponse();

    getAllTeams().then((response) => setResponse(response));
  }, []);

  //If query response is null then return a loading icon...
  if (!response) return <Loading />;

  //If there is an error with the GraphQL query
  if (response && response.errors)
    return <Error errorMessage={response.errors} />;

  

  return (
    <div>
      <h1>Our Teams</h1>
      {response.data.teamList.items.map((team) => {
        return <TeamListItem key={team.shortName} {...team} />;
      })}
    </div>
  );
}

// Render individual Team item
function TeamListItem({ title, shortName, description, teamMembers }) {
  console.log(title);
  console.log("TeamMembers" + teamMembers);

  //Must have title and shortName
  if (!title && !shortName && !teamMembers) {
    return null;
  }

  return (
    <div className="team-item">
      <div className="team-item-title">
        {title} | {shortName} | Member Count : {teamMembers.length}
      </div>
      <div>
        <h3>Team Members</h3>
        {teamMembers.map((teamMember) => {
            return <TeamMemberItem key={teamMember.fullName} {...teamMember} />;
        })}
      </div>
    </div>
  );
}

/*
function TeamMembersRender({teamMembers}){
    console.log('Teammembers Length:'+teamMembers.length);

    return(
        <div>
            Total Members: {teamMembers.length}
        </div>
    );
}*/

function TeamMemberItem({fullName, occupation}){

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
export default Teams;

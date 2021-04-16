/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import useGraphQL from '../api/useGraphQL';
import Error from './Error';
import Loading from './Loading';
import './Adventures.scss';


function Adventures() {
    //Use React Hooks to set the initial GraphQL query to a variable named `query`
    // If query is not defined, persistent query will be requested
    // Initially use cached / persistent query.
    const [query, setQuery] = useState('');
    const persistentQuery = 'wknd/adventures-all';
    //Use a custom React Hook to execute the GraphQL query
    const { data, errorMessage } = useGraphQL(query, persistentQuery);

    //If there is an error with the GraphQL query
    if(errorMessage) return <Error errorMessage={errorMessage} />;

    //If data is null then return a loading state...
    if(!data) return <Loading />;
    
    return (
        <div className="adventures">
          <button onClick={() => setQuery('')}>All</button>
          <button onClick={() => setQuery(filterQuery('Camping'))}>Camping</button>
          <button onClick={() => setQuery(filterQuery('Surfing'))}>Surfing</button>
          <ul className="adventure-items">
            {
                //Iterate over the returned data items from the query
                data.adventureList.items.map((adventure, index) => {
                    return (
                        <AdventureItem key={index} {...adventure} />
                    );
                })
            }
            </ul>
        </div>
    );
}

// Render individual Adventure item
function AdventureItem(props) {

  //Must have title, path, and image
  if(!props || !props._path || !props.adventureTitle || !props.adventurePrimaryImage ) {
    return null;
  }
  return (
        <li className="adventure-item">
          <Link to={`/adventure:${props._path}`}>
            <img className="adventure-item-image" src={props.adventurePrimaryImage._path} 
                 alt={props.adventureTitle}/>
          </Link>
          <div className="adventure-item-length-price">
            <div className="adventure-item-length">{props.adventureTripLength}</div>
            <div className="adventure-item-price">{props.adventurePrice}</div>
          </div>
          <div className="adventure-item-title">{props.adventureTitle}</div>
      </li>
      );
}

/**
 * Returns a query for Adventures filtered by activity
 */
function filterQuery(activity) {
  return `
    {
      adventureList (filter: {
        adventureActivity: {
          _expressions: [
            {
              value: "${activity}"
            }
          ]
        }
      }){
        items {
          _path
        adventureTitle
        adventurePrice
        adventureTripLength
        adventurePrimaryImage {
          ... on ImageRef {
            _path
            mimeType
            width
            height
          }
        }
      }
    }
  }
  `;
}


export default Adventures;

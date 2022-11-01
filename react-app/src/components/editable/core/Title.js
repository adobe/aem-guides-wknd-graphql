import React from 'react'
import {RoutedLink} from "./RoutedLink";

const TitleLink = (props) => {
  return (
    <RoutedLink className={props.baseCssClass + (props.nested ? '-' : '__') +  'link'} isRouted={props.routed} to={props.linkURL}>
      {props.text}
    </RoutedLink>
  );
};

const TitleV2Contents = (props) => {
  if( !props.linkDisabled){
    return <TitleLink {...props}/>
  }

  return <>{props.text}</>
};

export const Title = (props) => {
  if (!props.baseCssClass) {
    props.baseCssClass = 'cmp-title'
  }

  const elementType = (!!props.type) ? props.type.toString() : 'h3';
  return (
    <div className={props.baseCssClass}>
      {
        React.createElement(elementType,
          {
            className: props.baseCssClass + (props.nested ? '-' : '__') + 'text',
          },
          <TitleV2Contents {...props}/>
        )
      }

    </div>
  )
}

export const titleIsEmpty = (props) => props.text == null || props.text.trim().length === 0

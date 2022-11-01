import React from 'react'
import {RoutedLink} from "./RoutedLink";

export const imageIsEmpty = (props) => (!props.src) || props.src.trim().length === 0

const ImageInnerContents = (props) => {
  return (
    <>
      <img src={props.src}
           className={props.baseCssClass + '__image'}
           alt={props.alt}/>
      {
        !!(props.title) && <span className={props.baseCssClass + '__title'} itemProp="caption">{props.title}</span>
      }
      {
        props.displayPopupTitle && (!!props.title) && <meta itemProp="caption" content={props.title}/>
      }
    </>
  );
};

const ImageContents = (props) => {
  if( props.link && props.link.trim().length > 0){
    return (
      <RoutedLink className={props.baseCssClass + '__link'} isRouted={props.routed} to={props.link}>
        <ImageInnerContents {...props}/>
      </RoutedLink>
    )
  }
  return <ImageInnerContents {...props}/>
};

export const Image = (props) => {
  if (!props.baseCssClass) {
    props.baseCssClass = 'cmp-image'
  }

  const {isInEditor = false} = props;
  const cssClassName = (isInEditor) ? props.baseCssClass + ' cq-dd-image' : props.baseCssClass;

  return (
    <div className={cssClassName}>
      <ImageContents {...props}/>
    </div>
  )

};

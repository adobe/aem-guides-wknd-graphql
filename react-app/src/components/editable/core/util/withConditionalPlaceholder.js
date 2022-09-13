import React from 'react'
import {EditorPlaceHolder} from "./EditorPlaceholder";

export const withConditionalPlaceHolder = (Component, isEmpty, componentTitle, emptyText) => {
  return (props) => {

    const isEmptyResult = isEmpty(props);
    const {hidePlaceHolder = false, isInEditor = false} = props;

    return (
      <>
        { !isEmptyResult &&
          <Component {...props} />
        }
        {
          (isEmptyResult && isInEditor && !hidePlaceHolder) &&
          <EditorPlaceHolder
            emptyTextAppend={emptyText}
            componentTitle={componentTitle}
          />
        }
      </>
    );
  }
};

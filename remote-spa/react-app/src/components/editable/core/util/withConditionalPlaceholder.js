import React from 'react'
import {EditorPlaceHolder} from "./EditorPlaceholder";

// This HOC is provided as a starting point to render a component if content is provided, or a placeholder if no content
// is provided.
// Having a placeholder is essential in the editor, so authors can visually see the component on the page before content
// is configured.
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

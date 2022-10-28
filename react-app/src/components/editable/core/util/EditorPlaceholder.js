import React from 'react';

const DEFAULT_EMPTY_TEXT_LABEL = 'Please configure the component';

// This component can be used as a placeholder for other components when no content is configured.
// Having a placeholder is essential in the editor, so authors can visually see the component on the page before content
// is configured.
export const EditorPlaceHolder = (props) => {

  const part1 = (props.componentTitle != null && props.componentTitle.length > 0) ?  props.componentTitle +  ' - ' : '';
  const part2 = (props.emptyTextAppend != null) ?  props.emptyTextAppend : DEFAULT_EMPTY_TEXT_LABEL;
  const emptyText = part1 + part2;

  return (
    <div
      className={'cq-placeholder' + (props.classAppend != null? ' ' + props.classAppend : '')}>
      {emptyText}
    </div>
  )
};

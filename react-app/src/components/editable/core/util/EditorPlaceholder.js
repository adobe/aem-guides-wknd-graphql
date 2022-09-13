import React from 'react';

const DEFAULT_EMPTY_TEXT_LABEL = 'Please configure the component';

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

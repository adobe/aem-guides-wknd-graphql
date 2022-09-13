import React from 'react'
import {withStandardBaseCssClass} from "./util/withStandardBaseCssClass";
import {withConditionalPlaceHolder} from "./util/withConditionalPlaceholder";

const TextPlain = (props) => <div className={props.baseCssClass}><p className="cmp-text__paragraph">{props.text}</p></div>;
const TextRich = (props) => {
  const text = props.text;
  const id = (props.id) ? props.id : (props.cqPath ? props.cqPath.substr(props.cqPath.lastIndexOf('/') + 1) : "");
  return  <div className={props.baseCssClass}  id={id} data-rte-editelement dangerouslySetInnerHTML={{__html: text}}/>
};

const TextImpl = (props) => {
  if (!props.baseCssClass) {
    props.baseCssClass = 'cmp-text'
  }

  const {richText = false} = props

  return richText ? <TextRich {...props} /> : <TextPlain {...props} />
}

export function textIsEmpty(props){
  return props.text == null || props.text.length === 0;
}

export const Text = (props) => {
  const Wrapped = withConditionalPlaceHolder(withStandardBaseCssClass(TextImpl, "cmp-text"), textIsEmpty, "Text V2")
  return <Wrapped {...props}/>
};



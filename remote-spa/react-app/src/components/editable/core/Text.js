import React from 'react'

const TextPlain = (props) => <div className={props.baseCssClass}><p className="cmp-text__paragraph">{props.text}</p></div>;
const TextRich = (props) => {
const text = props.text;
const id = (props.id) ? props.id : (props.cqPath ? props.cqPath.substr(props.cqPath.lastIndexOf('/') + 1) : "");
    return <div className={props.baseCssClass} id={id} data-rte-editelement dangerouslySetInnerHTML={{ __html: text }} />
};

export const Text = (props) => {
    if (!props.baseCssClass) {
        props.baseCssClass = 'cmp-text'
    }

    const { richText = false } = props

    return richText ? <TextRich {...props} /> : <TextPlain {...props} />
    }

    export function textIsEmpty(props) {
    return props.text == null || props.text.length === 0;
}
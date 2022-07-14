/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { isValidElement, cloneElement } from "react";

/**
 * This is utility class that renders the an AEM Content Fragment's multi-line textfield's JSON rendition.
 */

/**
 * Map of JSON nodeTypes to HTML formats
 */
const defaultNodeMap = {
  header: (node, children, style) => style[node.style]?.(node, children),
  paragraph: (node, children) => <p>{children}</p>,
  "unordered-list": (node, children) => <ul>{children}</ul>,
  "ordered-list": (node, children) => <ol>{children}</ol>,
  "list-item": (node, children) => <li>{children}</li>,
  table: (node, children) => <table>{children}</table>,
  "table-body": (node, children) => <tbody>{children}</tbody>,
  "table-row": (node, children) => <tr>{children}</tr>,
  "table-data": (node, children) => <td>{children}</td>,
  link: (node) => (
    <a href={node.data.href} target={node.data.target}>
      {node.value}
    </a>
  ),
  text: (node, format) => defaultRenderText(node, format),
  reference: (node) => defaultRenderImage(node),
};

/**
 * Map of JSON format variants to HTML equivalents
 */
const defaultTextFormat = {
  bold: (value) => <b>{value}</b>,
  italic: (value) => <i>{value}</i>,
  underline: (value) => <u>{value}</u>,
};

/**
 * Map of Header styles
 */
const defaultHeaderStyle = {
  h1: (node, children) => <h1>{children}</h1>,
  h2: (node, children) => <h2>{children}</h2>,
  h3: (node, children) => <h3>{children}</h3>,
};

/**
 * Default renderer of Text nodeTypes
 * @param {*} node
 * @returns
 */
function defaultRenderText(node, format) {
  // iterate over variants array to append formatting
  if (node.format?.variants?.length > 0) {
    return node.format.variants.reduce((previousValue, currentValue) => {
      return format[currentValue]?.(previousValue) ?? null;
    }, node.value);
  }
  // if no formatting, simply return the value of the text
  return node.value;
}

/**
 * Renders an image based on a reference
 * @param {*} node
 */
function defaultRenderImage(node) {
  const mimeType = node.data?.mimetype;
  if (mimeType && mimeType.startsWith("image")) {
    return <img src={node.data.path} alt={"reference"} />;
  }
  return null;
}

/**
 * Appends a key to valid React Elements
 * (avoids having to pass an index everywhere)
 * @param {*} element
 * @param {*} key
 * @returns
 */
function addKeyToElement(element, key) {
  if (isValidElement(element) && element.key === null) {
    return cloneElement(element, { key });
  }
  return element;
}

/**
 * Iterates over an array of nodes and renders each node
 * @param {*} childNodes array of
 * @returns
 */
function renderNodeList(childNodes, options) {
  if (childNodes && options) {
    return childNodes.map((node, index) => {
      return addKeyToElement(renderNode(node, options), index);
    });
  }

  return null;
}

/**
 * Renders an individual node based on nodeType.
 * Makes a recursive call to render any children of the current node (node.content)
 * @param {*} node
 * @param {*} options
 * @returns
 */
function renderNode(node, options) {
  const { nodeMap, textFormat, headerStyle } = options;

  // null check
  if (!node || !options) {
    return null;
  }

  const children = node.content ? renderNodeList(node.content, options) : null;

  // special case for header, since it requires processing of header styles
  if (node.nodeType === "header") {
    return nodeMap[node.nodeType]?.(node, children, headerStyle);
  }

  // special case for text, since it may require formatting (i.e bold, italic, underline)
  if (node.nodeType === "text") {
    return nodeMap[node.nodeType]?.(node, textFormat);
  }

  // use a map to render the current node based on its nodeType
  // pass the children (if they exist)
  return nodeMap[node.nodeType]?.(node, children) ?? null;
}

/**
 * Expose the utility as a public function mapJsonRichText.
 * Calling functions can choose to override various mappings and/or formatting
 * by passing in an `options` object that may contain overrides for `nodeMap`, `textFormat` and `headerStyle`
 * @param {*} json - the json response of a Multi Line rich text field
 * @param {*} options {nodeMap,  - override defaultNodeMap
 *                     textFormat, - override defaultTextFormat
 *                     headerStyle, - override defaultHeaderStyle
 *                     }
 * @returns a JSX representation of the JSON object
 */
export function mapJsonRichText(json, options = {}) {
  // merge options override with default options for nodeMap, textFormat, and headerStyle
  return renderNodeList(json, {
    nodeMap: {
      ...defaultNodeMap,
      ...options.nodeMap,
    },
    textFormat: {
      ...defaultTextFormat,
      ...options.textFormat,
    },
    headerStyle: {
      ...defaultHeaderStyle,
      ...options.headerStyle,
    },
  });
}

import React, { Component } from 'react';
import { withMappable } from '@adobe/aem-react-editable-components';
import DOMPurify from 'dompurify';

/**
 * Default Edit configuration for the Text component that interact with the Core Text component and sub-types
 *
 * @type EditConfig
 */
const TextEditConfig = {
  emptyLabel: 'Text',

  isEmpty: function(props) {
    return !props || !props.text || props.text.trim().length < 1;
  },
  resourceType: "wknd-spa-react/components/text"
};

/**
 * Text React component
 */
class Text extends Component {
  get richTextContent() {
    return (
      <div
        data-rte-editelement
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(this.props.text)
        }}
      />
    );
  }

  get textContent() {
    return <div>{this.props.text}</div>;
  }

  render() {
    return this.props.richText ? this.richTextContent : this.textContent;
  }
}

export const AEMText = withMappable(Text, TextEditConfig);

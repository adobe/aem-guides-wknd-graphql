import React from 'react'
import { EditableComponent, MapTo } from '@adobe/aem-react-editable-components';
import { Text, textIsEmpty } from "./core/Text";
import { withConditionalPlaceHolder } from "./core/util/withConditionalPlaceholder";
import { withStandardBaseCssClass } from "./core/util/withStandardBaseCssClass";

const RESOURCE_TYPE = "wknd-app/components/text";

const EditConfig = {
    emptyLabel: "Text",
    isEmpty: textIsEmpty,
    resourceType: RESOURCE_TYPE
};

export const WrappedText = (props) => {
    const Wrapped = withConditionalPlaceHolder(withStandardBaseCssClass(Text, "cmp-text"), textIsEmpty, "Text V2")
    return <Wrapped {...props} />
};

const EditableText = (props) => <EditableComponent config={EditConfig} {...props}><WrappedText /></EditableComponent>

MapTo(RESOURCE_TYPE)(EditableText);

export default EditableText;
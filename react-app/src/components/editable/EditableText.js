import { EditableComponent, MapTo } from '@adobe/aem-react-editable-components';
import { Text, textIsEmpty } from "./core/Text";
import React from 'react'

const RESOURCE_TYPE = "wknd-app/components/text";

const EditConfig = {
    emptyLabel: "Text",
    isEmpty: textIsEmpty,
    resourceType: RESOURCE_TYPE
};

const EditableText = (props) => <EditableComponent config={EditConfig} {...props}><Text /></EditableComponent>

MapTo(RESOURCE_TYPE)(EditableText);

export default EditableText;

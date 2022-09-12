import { EditableComponent, MapTo } from '@adobe/aem-react-editable-components';
import { TextV2, TextV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import React from 'react'

const RESOURCE_TYPE = "wknd-app/components/text";

const EditConfig = {
    emptyLabel: "Text",
    isEmpty: TextV2IsEmptyFn,
    resourceType: RESOURCE_TYPE
};

const EditableText = (props) => <EditableComponent config={EditConfig} {...props}><TextV2 {...props} /></EditableComponent>

MapTo(RESOURCE_TYPE)(EditableText);

export default EditableText;

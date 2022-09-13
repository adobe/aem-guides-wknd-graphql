import { EditableComponent, MapTo } from '@adobe/aem-react-editable-components';
import { Image, imageIsEmpty } from "./core/Image";
import React from 'react'

import './EditableImage.scss';

const RESOURCE_TYPE = "wknd-app/components/image";

const EditConfig = {
    emptyLabel: "Image",
    isEmpty: imageIsEmpty,
    resourceType: RESOURCE_TYPE
};

const EditableImage = (props) => <EditableComponent config={EditConfig} {...props}><Image /></EditableComponent>

MapTo(RESOURCE_TYPE)(EditableImage);

export default EditableImage;

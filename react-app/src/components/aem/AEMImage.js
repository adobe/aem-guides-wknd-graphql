import { EditableComponent, MapTo } from '@adobe/aem-react-editable-components';
import { ImageV2, ImageV2IsEmptyFn } from "@adobe/aem-core-components-react-base";
import React from 'react'

import './AEMImage.scss';

const RESOURCE_TYPE = "wknd-app/components/image";

const EditConfig = {
    emptyLabel: "Image",
    isEmpty: ImageV2IsEmptyFn,
    resourceType: RESOURCE_TYPE
};

const EditableImage = (props) => <EditableComponent config={EditConfig} {...props}><ImageV2 {...props}/></EditableComponent>

MapTo(RESOURCE_TYPE)(EditableImage);

export default EditableImage;

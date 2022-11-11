// Import the withMappable API provided bu the AEM SPA Editor JS SDK
import { EditableComponent, MapTo } from '@adobe/aem-react-editable-components';
import React from 'react'

// Import the AEM React Core Components' Title component implementation and it's Empty Function
import { Title, titleIsEmpty } from "./core/Title";
import { withConditionalPlaceHolder } from "./core/util/withConditionalPlaceholder";
import { withStandardBaseCssClass } from "./core/util/withStandardBaseCssClass";

// The sling:resourceType for which this Core Component is registered with in AEM
const RESOURCE_TYPE = "wknd-app/components/title";

// Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
const EditConfig = {
    emptyLabel: "Title",        // The component placeholder in AEM SPA Editor
    isEmpty: titleIsEmpty,      // The function to determine if this component has been authored
    resourceType: RESOURCE_TYPE // The sling:resourceType this component is mapped to
};

export const WrappedTitle = (props) => {
    const Wrapped = withConditionalPlaceHolder(withStandardBaseCssClass(Title, "cmp-title"), titleIsEmpty, "TitleV2")
    return <Wrapped {...props} />
}

// EditableComponent makes the component editable by the AEM editor, either rendered statically or in a container
const EditableTitle = (props) => <EditableComponent config={EditConfig} {...props}><WrappedTitle /></EditableComponent>

// MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
MapTo(RESOURCE_TYPE)(EditableTitle);

export default EditableTitle;
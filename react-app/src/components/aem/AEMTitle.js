 // Import the withMappable API provided bu the AEM SPA Editor JS SDK
 import { withMappable, MapTo } from '@adobe/aem-react-editable-components';

 // Import the AEM React Core Components' Title component implementation and it's Empty Function 
 import { TitleV2, TitleV2IsEmptyFn } from "@adobe/aem-core-components-react-base";

 // The sling:resourceType for which this Core Component is registered with in AEM
 const RESOURCE_TYPE = "wknd-app/components/title";

 // Create an EditConfig to allow the AEM SPA Editor to properly render the component in the Editor's context
 const EditConfig = {    
     emptyLabel: "Title",  // The component placeholder in AEM SPA Editor
     isEmpty: TitleV2IsEmptyFn, // The function to determine if this component has been authored
     resourceType: RESOURCE_TYPE // The sling:resourceType this component is mapped to
 };

 // MapTo allows the AEM SPA Editor JS SDK to dynamically render components added to SPA Editor Containers
 MapTo(RESOURCE_TYPE)(TitleV2, EditConfig);

 // withMappable allows the component to be hardcoded into the SPA; <AEMTitle .../>
const AEMTitle = withMappable(TitleV2, EditConfig);

export default AEMTitle;
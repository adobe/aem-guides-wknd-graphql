import { withMappable, MapTo } from '@adobe/aem-react-editable-components';
import { TextV2, TextV2IsEmptyFn } from "@adobe/aem-core-components-react-base";

/**
 * Default Edit configuration for the Text component that interact with the Core Text component and sub-types
 *
 * @type EditConfig
 */
const TextEditConfig = {
  emptyLabel: 'Text',
  isEmpty: TextV2IsEmptyFn,
  resourceType: 'wknd-spa/components/text'
};

export const AEMText = withMappable(TextV2, TextEditConfig);

MapTo('wknd-spa/components/text')(TextV2, TextEditConfig);

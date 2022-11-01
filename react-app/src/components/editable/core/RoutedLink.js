import {Link as RouterLink} from "react-router-dom";
import React from "react";

// This component is used internally in the Image and Text components
// Core Components Dialogs use path pickers that encourage an author to select a CQ Page resource. There is no
// autocomplete to SPA routes in the pickers. Please be aware of this when using RoutedLink.
export const RoutedLink = (props) => {
  const {to, isRouted, ...otherProps} = props;

  const isRoutedChecked = typeof props.isRouted === 'boolean' ? props.isRouted : true;

  if(to === undefined || to.trim().length === 0){
    return <a href={'#'}
              {...otherProps}
    />;
  }
  const isExternal = /^https?:\/\//.test(to);

  return isExternal || !isRoutedChecked?
    (<a
      href={to}
      {...otherProps}
    />)
    :
    ( <RouterLink {...otherProps}
                  to={to}
    />)
};

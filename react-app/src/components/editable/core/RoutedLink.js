import {Link as RouterLink} from "react-router-dom";
import React from "react";

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

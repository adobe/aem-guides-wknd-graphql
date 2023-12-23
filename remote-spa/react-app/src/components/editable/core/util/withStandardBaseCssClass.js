import React from 'react'


// This HOC is provided as a starting point to add a default class to components, if the author has not selected a style
// in the editor
export const withStandardBaseCssClass = (Component, defaultBaseCssClass) => {
    return (props) => {

      const baseCssClass = props.baseCssClass;
      const toBeUsedCssClass = baseCssClass && baseCssClass.trim().length > 0 ? baseCssClass : defaultBaseCssClass;

      const mergedProps = {
        ...props,
        baseCssClass: toBeUsedCssClass
      };

      return <Component {...mergedProps} />;
    }
  };

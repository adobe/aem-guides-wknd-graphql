import React from 'react'

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

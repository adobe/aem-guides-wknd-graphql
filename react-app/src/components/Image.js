
import React from 'react';

const { REACT_APP_AEM_ENVIRONMENT } = process.env;

function Image(props) {

    let imageSource = props._path;
    if(REACT_APP_AEM_ENVIRONMENT === 'author' && props._authorUrl) {
        imageSource = props._authorUrl;
    } else if (REACT_APP_AEM_ENVIRONMENT === 'publish' && props._publishUrl) {
        imageSource = props._publishUrl;
    }

    return (<img className={props.className} src={imageSource}
    alt={props.alt} />);

}

export default Image;
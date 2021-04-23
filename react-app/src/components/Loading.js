/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {Component} from 'react';
import loadingIcon from '../images/icon-loading.svg';

const {  REACT_APP_PUBLIC_URI } = process.env;

class Loading extends Component {

    render() {
        return (<div className="loading">
              <img src={REACT_APP_PUBLIC_URI + '/' + loadingIcon} alt="Loading..." />
          </div>);
    }
}

export default Loading;
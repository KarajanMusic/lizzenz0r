import React, { Component } from 'react';

import './header.scss';

class Header extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // console.log(window.GoogleAuth.isSignedIn.get());
        console.log('MOUNTED');
        console.log(this.props);
    }

    render() {
        return (
            <div className="global-header">
                <p>lizzenz0r</p>
            </div>
        );
    }
}

export default Header;

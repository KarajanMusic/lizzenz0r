import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import Login from './Login';
import Home from './Home';

import { postUser } from '../utils/api';
// import './AuthenticationWrapper.scss';

class AuthenticationWrapper extends Component {

    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    updateSigninStatus(isSignedIn) {
        console.log('============ ', isSignedIn);
        console.log(window.GoogleAuth.currentUser.get());
        const user = window.GoogleAuth.currentUser.get();
        this.setState({ user });

        // document.location.href = '/';
        if (signedInStatus && (location.href.indexOf('login') > 0 )) {
            location.href = '/';
        }
    }

    componentDidMount() {
        // console.log(window.GoogleAuth.isSignedIn.get());
        console.log('MOUNTED AuthenticationWrapper');
        const that = this;
        window.GoogleAuth; // Google Auth object.
        function start() {
            window.gapi.client.init({
                'apiKey': 'AIzaSyAysq3hq5e6seJFkcyoun3s2-5HIRKCNgU',
                'clientId': '1038963969656-a60janj4qrlnkv9mi1l8dp6tup0fgboq.apps.googleusercontent.com',
                'scope': 'https://www.googleapis.com/auth/youtube',
                'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
            }).then(function () {
                window.GoogleAuth = window.gapi.auth2.getAuthInstance();
                // console.log(GoogleAuth);
                // console.log(GoogleAuth.isSignedIn);
                // console.log(window.GoogleAuth.isSignedIn.get());
                // console.log(window.GoogleAuth.currentUser.get());
                // console.log(GoogleAuth.getInitialScopes());

                // updateSigninStatus(GoogleAuth.isSignedIn.get());
                // GoogleAuth.signIn();

                console.log('loaded google api');
                const signedInStatus = GoogleAuth.isSignedIn.get();
                if (signedInStatus) {
                    const user = window.GoogleAuth.currentUser.get();
                    that.setState({ user });
                    postUser(user);
                    if (location.href.indexOf('login') > 0) {
                        location.href = '/';
                    }
                }

                if (!signedInStatus && (location.href.indexOf('login') < 0 )) {
                    location.href = '/login';
                }

                // Listen for sign-in state changes.
                window.GoogleAuth.isSignedIn.listen(that.updateSigninStatus.bind(that));
            }).catch(function(e) {
                console.log(e);
            });
        }
        window.gapi.load('client', start);
    }

    render() {
        // const location = document.location.href;
        const { user } = this.state;
        // window.GoogleAuth.currentU
        // console.log(location);
        //
        //
        //
        return (
            <div className="">
                {JSON.stringify(this.state.user)}

                {user ? (
                    <Switch>
                        <Route exact path="/" render={() => (<Home user={user}/>)} />
                        <Route exact path="/login" component={Login} />
                        <Route component={() => <h1>404 - Not Found</h1>} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route component={Login} />
                    </Switch>
                )}

            </div>
        );
    }
}

export default AuthenticationWrapper;
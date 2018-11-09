import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import { withRouter } from 'react-router-dom';
import Nav from './components/nav/Nav'
import 'reset-css';
import {connect} from 'react-redux';
import axios from 'axios';
import { userLogin } from './ducks/reducer';

class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        axios.get('/api/user').then(response => {
          this.props.userLogin(response.data);
        }).catch(error => {
          this.setState({ error });
        }).then(() => {
          this.setState({ loading: false });
        })
      }

    render() {
        const { loading, error } = this.state;
        const { user } = this.props;
            const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
            const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;

    return (
        <div>
            {loading
            ? <div>Loading...</div>
            : error
                ? <div>There was an error loading</div>
                : user
                ?
                  <div className="App">
                  <Nav/>
                  {routes}
                  </div>
                : <div>
                    You need to <a href={url}>login</a>
                </div>
            }
        </div>
        )
    }

}

function mapStateToProps(state) {
    const {user} = state;
    return { user };
}

export default withRouter(connect(mapStateToProps, { userLogin })(App))
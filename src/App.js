import React, { Component } from 'react';
import 'reset-css';
import './App.scss';
import routes from './routes';
import { withRouter } from 'react-router-dom';
import Nav from './components/nav/Nav'
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
            ? <div className="App">Loading...</div>
            : error
                ? <div>There was an error loading</div>
                : user
                ?
                  <div className="App" id="app">
                  <Nav/>
                  <div className="not-nav">
                    {routes}   
                  </div>
                 
                  </div>
                : <div className ="App">
                    <div className="cover">
                        <header>                    
                            <h1><span>66</span>days</h1>
                            <h2>A LIFE CHANGING APP</h2>
                        </header>

                        <a href={url}><button>LOGIN</button></a>
                        {/* <a href="#"><button>LOGIN</button></a> */}
                        <p className="quote">"Here is a u super inspirational quote"  -smart guy</p>
                    </div>
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
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { userLogin } from '../../ducks/reducer';
import './profile.scss';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            error: null,
            checked: true,
            public: null,
        };
    }

    componentDidMount() {
        console.log('this.props.user.public------------->', this.props.user.public);
        this.setState({ public: this.props.user.public })
        axios.get('/api/user').then(response => {
          this.props.userLogin(response.data);
          console.log('response.data------------->', response.data);
        }).catch(error => {
          this.setState({ error });
        }).then(() => {
          this.setState({ loading: false });
        })
      }

    makeUserPrivate = () => {
        axios.put('/api/user').then()
        this.setState({public: !this.state.public})
    }

    render() {
        const { loading, error } = this.state;
        const { user } = this.props;
        console.log('user', user);
        
            const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
            const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;

    return (
        <div className="page">
            {loading
            ? <div>Loading...</div>
            : error
                ? <div>There was an error loading</div>
                : user
                ? <div>
                    <img className="pic" src={user.picture} alt="user" />
                    <div className="info">  
                        <div>Name: {user.name}</div>
                        <div>Email: {user.email}</div>
                        <label>Public Profile:</label>
                        <input type="checkbox" checked={this.state.public} onChange={this.makeUserPrivate} />
                    </div>
                  
                    
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

export default connect(mapStateToProps, { userLogin })(Profile)
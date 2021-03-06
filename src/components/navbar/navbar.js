import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {login, logout, attemptLogin, searchRooms} from '../../redux/redux';
import { withRouter } from "react-router-dom";
import './navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "Try 'Richmond Hotels'",
    }
  }
  
  componentDidMount() {
    
  }
  
  handleChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    })
  }

  login = () => {
    this.props.attemptLogin();
  }

  logOut = () => {
    this.props.logout();
  }
  
  onKeyPress = (e) => {
    if(e.which === 13) {
      this.props.searchRooms(this.state.searchValue);
      this.props.history.push('/homes');
    }
  }

  render() {
    const {
      loggedIn,
      username,
      loggingIn
    } = this.props;

    const loggedInNav = loggedIn && (username !== '') ? (
      <ul id="navList">
        <li><p>Become a host</p></li>
        <li><p>Saved</p></li>
        <li><p>Trips</p></li>
        <li><p>Messages</p></li>
        <li><p>Help</p></li>
        <li><button onClick={this.logOut}>Log out</button></li>
      </ul>
    ) : (
      <ul id="navList">
        <li><p>English</p></li>
        <li><p>USD</p></li>
        <li><p>Become a host</p></li>
        <li><p>Help</p></li>
        <li><p>Sign up</p></li>
        <li><Link to="/login" onClick={this.login}>Log in</Link></li>
      </ul>
    )

    const displayNav = (loggingIn || this.props.location.pathname === '/login')? 'none' : 'flex';

    return (
      <>
        <div style={{display: displayNav }} className="navContainer">
          <div className="navbox">
            <Link to="/"><i className="fab fa-airbnb fa-3x"></i></Link>
              <input id="siteSearch" onChange={this.handleChange} onKeyPress={this.onKeyPress} placeholder={this.state.searchValue}/>
            {loggedInNav}
          </div>
        </div>
      </>
    )
  }
}

const actionCreators = {
  logout: logout,
  login: login,
  attemptLogin,
  searchRooms,
};

const mapStateToProps = (state) => ({
  loggingIn: state.loggingIn,
  loggedIn: state.loggedIn,
  username: state.username,
})

export default withRouter(connect(mapStateToProps, actionCreators)(Navbar));

import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import Identicon from 'identicon.js';
import { logout } from './firebase';
import { getAuth } from 'firebase/auth';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      user: null,
    };
  }

  componentDidMount() {
    const auth=getAuth();
    const user=auth.currentUser;
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ uid: user.uid, user: user });
        console.log("User signed in:", user.uid);
      } else {
        this.setState({ uid: null, user: null });
        console.log("User signed out.");
      }
    });
    
  }


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent ">
        <div className="container">
        <Link className="navbar-brand" to="/"><b>CharakNetra (CN)</b></Link>
         
          <Link className="navbar-brand" to="/fitness"><b>Your Fitness DATA</b></Link>
          <div className="ms-auto d-flex align-items-center text-light" >

            <Link to='/uploadfiles' className="btn btn-outline-light mr-2">
              <i className="bi bi-plus-circle-dotted" ></i>
            </Link>
              {this.props.account &&
            <Link to="/Profile"  >
                <img
                  className='ml-2'
                  width='30'
                  style={{ borderRadius: 20 }}
                  height='30'
                  alt="logo"
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                />
            </Link>
              }

            <button onClick={logout}>Logout</button>
          </div>
          

        </div>
      </nav>

    );
  }
}

export default Navbar;

import React, { Component } from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { setlocalKey } from './Component/Utils/localStorage';

// Custom Component
import Login from './Component/Login/login';
import HomePage from './Component/HomePage/homePage';

// Custom Style
import './App.css';

firebase.initializeApp({
  apiKey: "AIzaSyDlTGGNFedYoNn7SJqo_r0ax0FH5ItNJ1c",
  authDomain: "anatta-ecommerce.firebaseapp.com",
  databaseURL: "https://anatta-ecommerce.firebaseio.com",
  projectId: "anatta-ecommerce",
  storageBucket: "anatta-ecommerce.appspot.com",
})

class App extends Component {

  state = {
    isSignedIn: false,
    loading: false
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ loading: false })
      if (user) {
        if (user.email) {
          if (user.email.includes('@gmail.com')) {
            setlocalKey('token', user.uid);
            setlocalKey('user', user.email);
            this.setState({
              isSignedIn: !!user,
              loading: false
            })
          } else {
            (() => firebase.auth().signOut())()
              .then(window.location.reload())
              .then(window.alert(`You are trying to login using ${user.email} \n Please use Gmail to Signin !`))
          }
        }
      }
    })
  }

  render() {

    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "40%", left: "45%" }}>
          <Spinner type="grow" color="primary" />
          <h2><i>Loading ...</i></h2>
          <i className="fa fa-spinner fa-pulse fa-5x" aria-hidden="true"></i>
        </div>
      )
    }

    return (
      <div className="App">
        <Router>
          {
            this.state.isSignedIn ? (<div> <Route path="/" component={HomePage} /> </div>) :
              (
                <div className="login-box">
                  <Route path="/" component={Login} />
                  {/* <Redirect from="/" exact to="/signin" /> */}
                </div>
              )
          }
        </Router>
      </div>
    )
  }
}

export default App;

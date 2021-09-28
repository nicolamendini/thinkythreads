import React, { Component } from 'react';
import Dashboard from "./components/Dashboard";

var SCOPE = 'https://www.googleapis.com/auth/drive.file';
var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

export default class App extends Component {

  state = {
    googleAuth: '',
    currentUser: localStorage.getItem('currentUser'),
    loaded: false,
    driveFolderId:'',
    onlineState: window.navigator.onLine
  }

  componentDidMount(){
   this.initScript()
  }

  initScript = async () => {
    // Load authentication script and get Drive API ready
    var viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute(
      "content", 
      viewport.content + 
      ", height=" + window.innerHeight + 
      ', user-scalable=no'
    );
    window.addEventListener('online', () => this.setState({onlineState: true}));
    window.addEventListener('offline', () => this.setState({onlineState: false}));
    if(this.state.onlineState){
      this.loadGAPI()
    }
  }

  loadGAPI = async () => {
    var script = document.createElement('script');
    script.onload=this.handleClientLoad;
    script.src="https://apis.google.com/js/api.js";
    document.body.appendChild(script);
    console.log('loadingGAPI')
  }

  componentDidUpdate(){
    if(this.state.onlineState && !this.state.loaded){
      this.loadGAPI()
    }
  }

  // access is restricted
  initClient = async () => {
    try{
      window.gapi.client.init({
          'apiKey': "AIzaSyDmfaKWGbmsMVLYu1nu83egzWI30vgyD-0",
          'clientId': "455375017729-n44ea0ohjt7hb6jpi5ks56ej89cppv93.apps.googleusercontent.com",
          'scope': SCOPE,
          'discoveryDocs': [discoveryUrl]
        }).then(() => {
          this.setState({
            googleAuth: window.gapi.auth2.getAuthInstance(),
            loaded: true
          })
          this.state.googleAuth.isSignedIn.listen(this.updateSigninStatus);  
          this.state.googleAuth.then(this.setSigninStatus());
      });
    }catch(e){
      console.log(e);
    }

    // Add event listeners only after script is loaded
  }

  signInFunction = () => {
    this.state.googleAuth.signIn()
  }

  signOutFunction = () => {
    this.state.googleAuth.signOut()
  }

  updateSigninStatus = () => {
    this.setSigninStatus();
  }

  setSigninStatus = () => {
    var user = this.state.googleAuth.currentUser.get();
    if (!user.isSignedIn()){
      localStorage.setItem('currentUser', null);
    }
    else{
      var isAuthorized = user.hasGrantedScopes(SCOPE);
      if(isAuthorized){
        localStorage.setItem('currentUser', user.getBasicProfile().getName());
      } 
    }
    this.setState({currentUser : localStorage.getItem('currentUser')});
  }

  handleClientLoad=()=>{
    window.gapi.load('client:auth2', this.initClient);
  }

  render() {

    console.log(localStorage.getItem('currentPage'));

    console.log((localStorage.getItem('currentUser')));

    const currentUser = this.state.currentUser!==null && this.state.currentUser!=='null'
    return <Dashboard 
      signInFunction={this.signInFunction} 
      signOutFunction={this.signOutFunction} 
      GAPIloaded={this.state.loaded && this.state.onlineState} 
      currentUser={currentUser}
      />
  }
}
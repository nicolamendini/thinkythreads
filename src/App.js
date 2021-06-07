import React, { Component } from 'react';

var SCOPE = 'https://www.googleapis.com/auth/drive.file';
var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';


class App extends Component {
  state = {
    isLoggedIn: '',
    googleAuth: ''
  }
  componentDidMount(){
    var script = document.createElement('script');
    script.onload=this.handleClientLoad;
    script.src="https://apis.google.com/js/api.js";
    document.body.appendChild(script);
  }


  initClient = () => {
    try{
      window.gapi.client.init({
          'apiKey': "AIzaSyDmfaKWGbmsMVLYu1nu83egzWI30vgyD-0",
          'clientId': "455375017729-n44ea0ohjt7hb6jpi5ks56ej89cppv93.apps.googleusercontent.com",
          'scope': SCOPE,
          'discoveryDocs': [discoveryUrl]
        }).then(() => {
          this.setState({
            googleAuth: window.gapi.auth2.getAuthInstance()
          })
          this.state.googleAuth.isSignedIn.listen(this.updateSigninStatus);
         document.getElementById('signin-btn').addEventListener('click', this.signInFunction);
         document.getElementById('signout-btn').addEventListener('click', this.signOutFunction);
         document.getElementById('upload-btn').addEventListener('click', this.upload);

      });
    }catch(e){
      console.log(e);
    }
  }

  signInFunction =()=>{
    this.state.googleAuth.signIn();
    this.updateSigninStatus()
  }

  signOutFunction =()=>{
    this.state.googleAuth.signOut();
    this.updateSigninStatus()
  }

  updateSigninStatus = ()=> {
    this.setSigninStatus();
  }

  setSigninStatus= ()=>{
    var user = this.state.googleAuth.currentUser.get();
    if (user.qc == null){
      this.setState({
        isLoggedIn: false
      });
    }
    else{
      var isAuthorized = user.hasGrantedScopes(SCOPE);
      if(isAuthorized){
        this.setState({
          isLoggedIn : true
        });
        window.location.reload();
      } 
    }
    sessionStorage.setItem('userSession', this.state.isLoggedIn);
  }

  handleClientLoad = ()=>{
    window.gapi.load('client:auth2', this.initClient);
  }

  render() {
    console.log(sessionStorage.getItem('userSession'));
    return (
      <div className="App">
        <div>UserName: <strong>{ this.state.name}</strong></div>
        <button id="signin-btn">Sign In</button>
        <button id="signout-btn">Sign Out</button>
        <button id="upload-btn">Upload</button>
      </div>
    );
  }

  upload = () =>{
    const boundary='foo_bar_baz'
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    var fileName='mychat123';
    var fileData='this is a sample data';
    var contentType='text/plain'
    var metadata = {
      'name': fileName,
      'mimeType': contentType
    };

    var multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: ' + contentType + '\r\n\r\n' +
      fileData+'\r\n'+
      close_delim;

      console.log(multipartRequestBody);
      var request = window.gapi.client.request({
        'path': 'https://www.googleapis.com/upload/drive/v3/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
          'Content-Type': 'multipart/related; boundary=' + boundary + ''
        },
        'body': multipartRequestBody});
    request.execute(function(file) {
      console.log(file)
    });
  }

}

export default App;

import { Injectable } from '@angular/core';
import { Auth,signInWithPopup, GoogleAuthProvider, OAuthCredential, OAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauth_credentials;
  currentUser:any;
  constructor(public auth:Auth) { 
    this.auth.onAuthStateChanged(credential => this.currentUser = credential);
    this.oauth_credentials = localStorage.getItem('token')
  }

  login(){
    let provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider).then(result => {
      this.currentUser = result.user; 
      localStorage.setItem('token', GoogleAuthProvider.credentialFromResult(result)!.accessToken!)
      this.oauth_credentials = localStorage.getItem('token')
      console.log(this.oauth_credentials);
      window.location.reload()
    });
  }

  logout(){
    this.auth.signOut();
    localStorage.setItem('token','');
    this.oauth_credentials = '';
  }
}
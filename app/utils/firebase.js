//Firebase Config
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAkeHSd0c0u1jMuxNFdL9TWcnemof-Nuvg",
    authDomain: "indacity-cea6f.firebaseapp.com",
    databaseURL: "https://indacity-cea6f.firebaseio.com",
    projectId: "indacity-cea6f",
    storageBucket: "indacity-cea6f.appspot.com",
    messagingSenderId: "348392481472",
	persistence: true,
    enableRedirectHandling: true
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

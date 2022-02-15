import firebase from 'firebase/compat';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();

export const TEAMS_REF = '/teams/';
export const MEMBERS_REF = '/members/';
export const MEMBERSHIPS_REF = '/memberships/';
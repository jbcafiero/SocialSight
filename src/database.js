import DB_CONFIG from './config.js';
import * as firebase from 'firebase';

firebase.initializeApp(DB_CONFIG);

const database = firebase.firestore();

export default database;
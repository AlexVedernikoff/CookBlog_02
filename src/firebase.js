/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDcalcuueAsjysMwe6pkkRR84BTxDj0CC4',
    authDomain: 'cookbook-4d702.firebaseapp.com',
    projectId: 'cookbook-4d702',
    storageBucket: 'cookbook-4d702.appspot.com',
    messagingSenderId: '207669092652',
    appId: '1:207669092652:web:79e38d9a55d03a8e7ccc89',
    measurementId: 'G-61KC33Q828'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
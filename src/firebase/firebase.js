import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    onSnapshot,
    doc
} from "firebase/firestore"
import { getStorage } from "firebase/storage"



const firebaseConfig = {
    apiKey: "AIzaSyBGqANhNl0lHcoFow0X5Y6CHBfQZ9gyJYw", 
    authDomain: "base-b1494.firebaseapp.com", 
    databaseURL: "https://base-b1494-default-rtdb.firebaseio.com", 
    projectId: "base-b1494", 
    storageBucket: "base-b1494.appspot.com", 
    messagingSenderId: "1074388766466", 
    appId: "1:1074388766466:web:082d0b1b71959fc649bc1b"
};

const app = initializeApp(firebaseConfig)

const db = getFirestore()

export default db;

const colRef = collection(db, "info")


export const docRef = doc(db, "info", "sxgzdh1ag9Hu3Ulrxl6K")

onSnapshot(docRef, (doc) => {
    console.log(doc.data())
    return doc.data()
})

export const storage = getStorage(app)
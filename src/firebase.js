import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
     apiKey: "AIzaSyDkE9Qtlhc7Un-cugByhmf8nRK72TQxMYc",
     authDomain: "whatsapp-mern-clone-c16b6.firebaseapp.com",
     projectId: "whatsapp-mern-clone-c16b6",
     storageBucket: "whatsapp-mern-clone-c16b6.appspot.com",
     messagingSenderId: "991531080605",
     appId: "1:991531080605:web:fecc23be2a5287c13c2d74"
};
 const firebaseApp=initializeApp(firebaseConfig)
 const db=getFirestore(firebaseApp)
 const auth=getAuth(firebaseApp)
 const storage=getStorage(firebaseApp)

export {db,auth,storage}

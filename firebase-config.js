import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import {
	getFirestore,
	doc,
	collection,
	getDocs,
	updateDoc,
	setDoc,
	deleteDoc,
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'

const firebaseConfig = {
	apiKey: 'AIzaSyAryyv3NTpZ0NzhYVmayl5waHbMYouhRDg',
	authDomain: 'test-75334.firebaseapp.com',
	projectId: 'test-75334',
	storageBucket: 'test-75334.appspot.com',
	messagingSenderId: '722555128625',
	appId: '1:722555128625:web:2a708dd6cefa71db203e10',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db, collection, getDocs, doc, updateDoc, setDoc, deleteDoc }

import firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/firestore"





const firebaseConfig = {
  apiKey: "AIzaSyCcFizu8pNoSz6mDLhAs1PzvrAMWGQyVAk",
  authDomain: "kanban-clone-15a86.firebaseapp.com",
  projectId: "kanban-clone-15a86",
  storageBucket: "kanban-clone-15a86.appspot.com",
  messagingSenderId: "933891046563",
  appId: "1:933891046563:web:b3c963df50df4a5b1cd316"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth();

export { db, auth }

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};


const usersCollection = db.collection('tasks')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}

var messageRef = db.collection('projects').doc('tasks')
                .collection('messages').doc('message1');





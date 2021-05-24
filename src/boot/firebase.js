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

var museums = db.collectionGroup('projects').where('projCreator', '==', 'kk@live.dkk');
museums.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
});

export {
  db,
  auth,
  museums
}

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};

/* var cake = db.collectionGroup('projects').where('name', '==', "WOHOOOOOOOOO");
cake.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log( "dette er den rigtige " + doc.id, ' => ', doc.data());
    });
}); */




/* db.collection("projects").doc("trello")
    .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
    });

 */

/* var citiesRef = db.collection("projects");


citiesRef.doc("trello").set({
  name: "trello",
  projDesc: 'very nice',
  hoursAllocated: 8,
  projCreator: 'stefan'

}); */


/* var washingtonRef = db.collection("projects").doc("trello");

// Set the "capital" field of the city 'DC'
washingtonRef.update({
    tasks: {
      0: {
        status: "COMPLETED",
        todo: "ive learned me some firebase"
      },
      1: {
        status: "TESTING",
        todo: "ive learned me some firebase"
      },
      2: {
        status: "TODO",
        todo: "ive learned me some firebase"
      },
      3: {
        status: "IN_PROGRESS",
        todo: "ive learned me some verynice"
      }

    },
  })
  .then(() => {
    console.log("Document successfully updated!");
  })
  .catch((error) => {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
  });
 */



/* db.collection("projects").where("name", "==", 'facebook')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
  
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  }); */


/* var doccRef = db.collection("projects").doc("facebook");

doccRef.get().then((doc) => {
  if (doc.exists) {
    console.log("Document data:", doc.data());

  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
 */

/* const projectsCollection = firestore.collection('projects').where("name", "==", 'facebook')
const projectsQuery = projectsCollection.orderBy('createdAt', 'desc').limit(100)

export function useChat() {
  const 
} */

/* var docRef = db.collection("projects").doc("facebook");

docRef.get().then((doc) => {
  if (doc.exists) {
    console.log("Dette er dokumentet:", doc.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
 */



/* var museums = db.collectionGroup('projects').where('projCreator', '==', 'preben');
museums.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
}); */


/* var museums = db.collectionGroup('projects').where('projCreator', '==', 'kk@live.dkk');
museums.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
}); */



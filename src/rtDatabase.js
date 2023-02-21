import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { firebaseConfig, auth } from "./login-page/authen";
import { updateDataServer } from "./state";
import { emptyDOM } from "./dom/mainPageCreate";
const app = initializeApp(firebaseConfig);


export function writeUserTasks(arrTask) {
    const userID = auth.currentUser.uid;
    const db = getDatabase();
    set(ref(db, 'users/' + userID + '/tasks/'), arrTask);
}

export function writeUserGroups(group) {
    const userID = auth.currentUser.uid;
    const db = getDatabase();
    set(ref(db, 'users/' + userID + '/groups'), group);
}








export function readUserTasks(){
    const userID = auth.currentUser.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userID}/tasks`)).then((snapshot) => {
      if (snapshot.exists()) {
            updateDataServer(snapshot.val(), false);
            emptyDOM();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}
export function readUserGroups(){
    const userID = auth.currentUser.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userID}/groups`)).then((snapshot) => {
      if (snapshot.exists()) {
            updateDataServer(false, snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

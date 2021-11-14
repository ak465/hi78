import firebase  from "firebase";
import "@firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBjaYFS-VVZzmT90zQZaZQEawf3nUJIqoE",
    authDomain: "yttodoapp-53931.firebaseapp.com",
    projectId: "yttodoapp-53931",
    storageBucket: "yttodoapp-53931.appspot.com",
    messagingSenderId: "505889098434",
    appId: "1:505889098434:web:be86a973b28ca7918e095b"
      };

class Fire {
    constructor(callback){
        this.init(callback)
    }
    init(callback){
        if(!firebase.apps.length){
         firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user){
              callback(null, user)
            } else{
                firebase
                .auth()
                .signInAnonymously()
                .catch(error => {
                    callback(error)
                })
            }
        })
    }

    getLists(callback){
        let ref = this.ref.orderBy("name")

     this.unsubscribe = ref.onSnapshot(snapshot => {
         lists = [],

         snapshot.forEach(doc => {
             lists.push({id: doc.id, ...doc.data()})
         })

         callback(lists)
     })
    }

    addList(list) {
        let ref = this.ref

        ref.add(list)
    }

    updateList(list){
        let ref = this.ref

        ref.doc(list.id).update(list)
    }

    get userId(){
        return firebase.auth().currentUser.uid
    }

    get ref(){
        return firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists")
    }

    detach(){
        this.unsubscribe();
    }

}

export default Fire;
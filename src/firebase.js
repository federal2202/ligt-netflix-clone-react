import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
 `your firebase information (api_key and so on)`
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function signup(name, email, password){
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch(error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

async function login(email, password){
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

async function logout(){
    signOut(auth);
}

export { auth, db, signup, login, logout };

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzXYWBRmkqzW-uK8TAMQo2V1FuTUlx3fw",
    authDomain: "culinary-artisans.firebaseapp.com",
    projectId: "culinary-artisans",
    storageBucket: "culinary-artisans.appspot.com",
    messagingSenderId: "140374880702",
    appId: "1:140374880702:web:7bcdc903d58f478a3b09ef",
    measurementId: "G-K252MZDC3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

//Show Message Function
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Function to store session information
function storeSession(user) {
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('uid', user.uid);
    sessionStorage.setItem('loggedIn', 'true');
}

// Function to clear session information
function clearSession() {
    sessionStorage.clear();
}

//Sign Up Event
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = { email: email };
            const docRef = doc(db, "users", user.uid);
            return setDoc(docRef, userData);
        })
        .then(() => {
            showMessage('Account Created Successfully', 'signUpMessage');
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            } else {
                showMessage('Unable to create user', 'signUpMessage');
            }
        });
});

//Sign In Event
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login is successful', 'signInMessage');
            localStorage.setItem('loggedInUserId', userCredential.user.uid);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        });
});

// Google Sign-In Event
document.querySelectorAll('.google-btn').forEach(button => {
    button.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const userData = {
                    email: user.email,
                    displayName: user.displayName
                };
                const docRef = doc(db, "users", user.uid);
                return setDoc(docRef, userData);
            })
            .then(() => {
                window.location.href = 'index.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    showMessage('Account exists with different credentials', 'signInMessage');
                } else {
                    showMessage('Google Sign-In failed', 'signInMessage');
                }
            });
    });
});
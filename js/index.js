import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore();

// Elements for login/logout
const loginIcon = document.getElementById('loginIcon');
const logoutIcon = document.getElementById('logoutIcon');
const loggedUserEmail = document.getElementById('loggedUserEmail');

// Initialize session storage
function initializeSession() {
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        toggleIcons(true);
        loadUserData(loggedInUserId);
    } else {
        toggleIcons(false);
    }
}

// Function to load user data
function loadUserData(userId) {
    const docRef = doc(db, "users", userId);
    getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                loggedUserEmail.innerText = userData.email;
            } else {
                console.log("No document found matching ID");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        sessionStorage.setItem('loggedInUserId', user.uid);
        toggleIcons(true);
        loadUserData(user.uid);
    } else {
        sessionStorage.removeItem('loggedInUserId');
        toggleIcons(false);
    }
});

// Logout functionality
logoutIcon.addEventListener('click', () => {
    sessionStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'login.html'; // Redirect to login page after logout
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});

// Function to toggle between login and logout icons
function toggleIcons(isLoggedIn) {
    if (isLoggedIn) {
        loginIcon.style.display = 'none';
        logoutIcon.style.display = 'block';
    } else {
        loginIcon.style.display = 'block';
        logoutIcon.style.display = 'none';
        loggedUserEmail.innerText = ''; // Clear email display when logged out
    }
}

// Initialize session on page load
initializeSession();

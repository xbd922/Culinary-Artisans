import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const loginIcon = document.querySelector('.login-btn');
const logoutIcon = document.createElement('button');
logoutIcon.classList.add('btn', 'logout-btn');
logoutIcon.innerHTML = '<i class="fa-solid fa-sign-out-alt"></i>';
document.querySelector('.header-right').appendChild(logoutIcon);
logoutIcon.style.display = 'none';

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (user && loggedInUserId) {
        // User is signed in
        console.log(user);
        toggleIcons(true); // Show logout icon

        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserEmail').innerText = userData.email;
                } else {
                    console.log("No document found matching ID");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    } else {
        // No user is signed in
        console.log("User ID not found in local storage or no user is logged in");
        toggleIcons(false); // Show login icon
    }
});

// Logout functionality
logoutIcon.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
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
    }
}

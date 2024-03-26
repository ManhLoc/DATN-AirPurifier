// Sign In, Sign Up + FirebaseUI

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDzt_3d3fQcN8uBMFjiGSCwzsp2M7W27e4",
    authDomain: "datn-359b3.firebaseapp.com",
    // databaseURL: "https://datn-359b3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "datn-359b3",
    storageBucket: "datn-359b3.appspot.com",
    messagingSenderId: "951461446783",
    appId: "1:951461446783:web:baa9d2ef2e2854814b2b4a",
    // measurementId: "G-L3PNS75CMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

// Nhấn nút Sign with Google để gửi giá trị đi
const btnGoogle = document.getElementById("btnGoogle");
btnGoogle.addEventListener("click", function (event) {
    event.preventDefault()

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user)
            window.location.href = "../home.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
})


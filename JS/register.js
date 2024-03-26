// Sign In, Sign Up + FirebaseUI

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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
const auth = getAuth();


// Nhấn nút Sign Up để gửi giá trị đi
const submit = document.getElementById("submit");
const confirmError = document.getElementById("confirmError");
const confirmSuccess = document.getElementById("confirmSuccess");
const authForm = document.getElementById("authForm");

submit.addEventListener("click", function (event) {
    event.preventDefault()

    // Lấy giá trị từ người dùng nhập vào form đăng ký
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordTwo = document.getElementById("passwordTwo").value;
    if (password == passwordTwo) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                confirmSuccess.style.display = "block"
                authForm.style.marginTop = 0
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
    } else {
        confirmError.style.display = "block"
    }
})


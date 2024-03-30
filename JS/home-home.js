import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getDatabase, ref, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDzt_3d3fQcN8uBMFjiGSCwzsp2M7W27e4",
    authDomain: "datn-359b3.firebaseapp.com",
    databaseURL: "https://datn-359b3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "datn-359b3",
    storageBucket: "datn-359b3.appspot.com",
    messagingSenderId: "951461446783",
    appId: "1:951461446783:web:baa9d2ef2e2854814b2b4a",
    measurementId: "G-L3PNS75CMB"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

// Kiểm tra nút nhấn có được nhấn hay không 
// Nhấn thì gửi Data về Firebase
btnOff.onclick = function () {
    document.getElementById('btnOne').style.left = '0'
    set(ref(database, '/Controls/Ion'), {
        Ion: 0
    });
}

btnOn.onclick = function () {
    document.getElementById('btnOne').style.left = '42px'
    set(ref(database, '/Controls/Ion'), {
        Ion: 1
    });
}

// Kiểm tra thanh trượt có được điều chỉnh hay không  
// Trượt thì gửi Data về Firebase
var myRange = document.getElementById("myRange");
var updateRange = document.getElementById("updateRange");

myRange.oninput = function () {
    updateRange.innerHTML = this.value;
    set(ref(database, '/Controls/Speed'), {
        "Speed": Number(this.value),
    });
};

// ======================================================
var kiemtra;
const starCountRef = ref(database, '/Sensor/AQI_h');
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("aqi").innerHTML = data;
});

const starCountRef2 = ref(database, '/Sensor/PM1');
onValue(starCountRef2, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("pm1").innerHTML = data;
});

const starCountRef3 = ref(database, '/Sensor/PM25');
onValue(starCountRef3, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("pm25").innerHTML = data;
});

const starCountRef4 = ref(database, '/Sensor/PM10');
onValue(starCountRef4, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("pm10").innerHTML = data;
});

const starCountRef5 = ref(database, '/Sensor/CO2');
onValue(starCountRef5, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("co2").innerHTML = data;
});

const starCountRef6 = ref(database, '/Sensor/TVOC');
onValue(starCountRef6, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("tvoc").innerHTML = data;
});

const starCountRef7 = ref(database, '/Sensor/Temp');
onValue(starCountRef7, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("temp").innerHTML = data;
});

const starCountRef8 = ref(database, '/Sensor/Humid');
onValue(starCountRef8, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("humid").innerHTML = data;
});

// firebase.database().ref().child("/Sensor/AQI_h").on("value", (snap) => {
//     document.getElementById("aqi").innerHTML = snap.val();
//     aqiValue = snap.val();
//     console.log("Giá trị AQI:", aqiValue);
// });
// ======================================================
const dbRef = ref(getDatabase());
get(child(dbRef, "/Controls/Ion/Ion")).then((snapshot) => {
    if (snapshot.exists()) {
        if (snapshot.val() == 1) {
            document.getElementById('btnOne').style.left = '42px'
        }
        else {
            document.getElementById('btnOne').style.left = '0'
        }
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

get(child(dbRef, "/Sensor")).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
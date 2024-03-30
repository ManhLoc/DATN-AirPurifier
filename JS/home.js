// Firebase
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

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const database = firebase.database();

var aqi = document.getElementById("aqi");
var pm1 = document.getElementById("pm1");
var pm25 = document.getElementById("pm25");
var pm10 = document.getElementById("pm10");
var co2 = document.getElementById("co2");
var tvoc = document.getElementById("tvoc");
var temp = document.getElementById("temp");
var humid = document.getElementById("humid");

var dbRef1 = firebase.database().ref().child("/Sensor/AQI_h");
var dbRef2 = firebase.database().ref().child("/Sensor/PM1");
var dbRef3 = firebase.database().ref().child("/Sensor/PM25");
var dbRef4 = firebase.database().ref().child("/Sensor/PM10");
var dbRef5 = firebase.database().ref().child("/Sensor/CO2");
var dbRef6 = firebase.database().ref().child("/Sensor/TVOC");
var dbRef7 = firebase.database().ref().child("/Sensor/Temp");
var dbRef8 = firebase.database().ref().child("/Sensor/Humid");

// Biến để lưu trữ giá trị
var aqiValue, pm1Value, pm25Value, pm10Value, co2Value, tvocValue, tempValue, humidValue;

// Lấy giá trị từ Firebase để xử lý và cập nhập giá trị lên web
dbRef1.on("value", (snap) => {
    aqi.innerHTML = snap.val();
    aqiValue = snap.val();
    document.getElementById("gaugeFillAQI").style.transform = `rotate(${aqiValue * 0.36
        }deg)`;
    if (aqiValue <= 50) {
        document.getElementById("gaugeFillAQI").style.backgroundColor = "#00e400";
    } else if (aqiValue >= 51 && aqiValue <= 100) {
        document.getElementById("gaugeFillAQI").style.backgroundColor = "#FFFF00";
    } else if (aqiValue >= 101 && aqiValue <= 150) {
        document.getElementById("gaugeFillAQI").style.backgroundColor = "#FF7E00";
    } else if (aqiValue >= 151 && aqiValue <= 200) {
        document.getElementById("gaugeFillAQI").style.backgroundColor = "#FF0000";
    } else if (aqiValue >= 201 && aqiValue <= 300) {
        document.getElementById("gaugeFillAQI").style.backgroundColor = "#8F3F97";
    } else {
        document.getElementById("gaugeFillAQI").style.backgroundColor = "#7E0023";
    }
    console.log("Giá trị AQI:", aqiValue);
});

dbRef2.on("value", (snap) => {
    pm1.innerHTML = snap.val();
    pm1Value = snap.val();
    document.getElementById("gaugeFillPM1").style.transform = `rotate(${pm1Value * 0.36
        }deg)`;
    console.log("Giá trị PM1:", pm1Value);
});

dbRef3.on("value", (snap) => {
    pm25.innerHTML = snap.val();
    pm25Value = snap.val();
    document.getElementById("gaugeFillPM25").style.transform = `rotate(${pm25Value * 0.36
        }deg)`;
    console.log("Giá trị PM25:", pm25Value);
});

dbRef4.on("value", (snap) => {
    pm10.innerHTML = snap.val();
    pm10Value = snap.val();
    document.getElementById("gaugeFillPM10").style.transform = `rotate(${pm10Value * 0.36
        }deg)`;
    console.log("Giá trị PM10:", pm10Value);
});

dbRef5.on("value", (snap) => {
    co2.innerHTML = snap.val();
    co2Value = snap.val();
    document.getElementById("gaugeFillCO2").style.transform = `rotate(${co2Value * 0.36
        }deg)`;
    console.log("Giá trị CO2:", co2Value);
});

dbRef6.on("value", (snap) => {
    tvoc.innerHTML = snap.val();
    tvocValue = snap.val();
    document.getElementById("gaugeFillTVOC").style.transform = `rotate(${tvocValue * 0.36
        }deg)`;
    console.log("Giá trị TVOC:", tvocValue);
});

dbRef7.on("value", (snap) => {
    temp.innerHTML = snap.val();
    tempValue = snap.val();
    document.getElementById("gaugeFillTemp").style.transform = `rotate(${tempValue * 3.6
        }deg)`;
    console.log("Giá trị Temp:", tempValue);
});

dbRef8.on("value", (snap) => {
    humid.innerHTML = snap.val();
    humidValue = snap.val();
    document.getElementById("gaugeFillHumid").style.transform = `rotate(${humidValue * 1.8
        }deg)`;
    console.log("Giá trị Humid:", humidValue);
});

// Cập nhập giá trị button về Firebase
btnOff.onclick = function () {
    document.getElementById('btnOne').style.left = '0'
    database.ref("/Control").update({
        Ion: 0,
    });
}

btnOn.onclick = function () {
    document.getElementById('btnOne').style.left = '42px'
    database.ref("/Control").update({
        Ion: 1,
    });
}

// Cập nhập giá trị thanh trượt và chế độ update Firebase
var myRange = document.getElementById("myRange");
var updateRange = document.getElementById("updateRange");

myRange.oninput = function () {
    updateRange.innerHTML = this.value;
    database.ref("/Control").update({
        Speed: Number(this.value),
    });
};

const radioInput1 = document.getElementById("auto");
const radioInput2 = document.getElementById("normal");
const radioInput3 = document.getElementById("sleep");

radioInput1.addEventListener("change", () => {
    if (radioInput1.checked) {
        const selectedValue = radioInput1.value;
        console.log(selectedValue)
        database.ref("/Control").update({
            Mode: Number(selectedValue),
        });
    }
});

radioInput2.addEventListener("change", () => {
    if (radioInput2.checked) {
        const selectedValue = radioInput2.value;
        console.log(selectedValue)
        database.ref("/Control").update({
            Mode: Number(selectedValue),
        });
    }
});

radioInput3.addEventListener("change", () => {
    if (radioInput3.checked) {
        const selectedValue = radioInput3.value;
        console.log(selectedValue)
        database.ref("/Control").update({
            Mode: Number(selectedValue),
        });
    }
});


// Tự động update hình ảnh
database.ref("/Control/Ion").on("value", function (snapshot) {
    if (snapshot.exists()) {
        if (snapshot.val() == 1) {
            document.getElementById('btnOne').style.left = '42px'
        }
        else {
            document.getElementById('btnOne').style.left = '0'
        }
    } else console.log("No data available!");
});

database.ref("/Control/Speed").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var speed = snapshot.val();
        if (speed > 0) {
            updateRange.innerHTML = speed;
        }
        else {
            updateRange.innerHTML = speed;
        }
    } else console.log("No data available!");
});

// Lấy data lần đầu khi truy cập website
database
    .ref("/Control")
    .get()
    .then((snapshot) => {
        if (snapshot.exists()) console.log(snapshot.val());
        else console.log("No data available!");
    });

database
    .ref("/Sensor")
    .get()
    .then((snapshot) => {
        if (snapshot.exists()) console.log(snapshot.val());
        else console.log("No data available!");
    });

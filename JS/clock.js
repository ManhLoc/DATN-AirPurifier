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

// Cập nhập giá trị button về Firebase
controlOnDeviceOff.onclick = function () {
    document.getElementById('controlOnDevice').style.left = '0'
    database.ref("/ClockOn").update({
        OnOff: 0,
    });
}

controlOnDeviceOn.onclick = function () {
    document.getElementById('controlOnDevice').style.left = '42px'
    database.ref("/ClockOn").update({
        OnOff: 1,
    });
}

controlOffDeviceOff.onclick = function () {
    document.getElementById('controlOffDevice').style.left = '0'
    database.ref("/ClockOff").update({
        OnOff: 0,
    });
}

controlOffDeviceOn.onclick = function () {
    document.getElementById('controlOffDevice').style.left = '42px'
    database.ref("/ClockOff").update({
        OnOff: 1,
    });
}

// Cập nhập giá trị đồng hồ và update Firebase
function getSelectOnHour() {
    var selectOnHour = document.getElementById('onHour').value
    console.log(selectOnHour)
    database.ref("/ClockOn").update({
        Hour: Number(selectOnHour),
    });
}

function getSelectOnMinute() {
    var selectOnMinute = document.getElementById('onMinute').value
    console.log(selectOnMinute)
    database.ref("/ClockOn").update({
        Minute: Number(selectOnMinute),
    });
}

function getSelectOffHour() {
    var selectOffHour = document.getElementById('offHour').value
    console.log(selectOffHour)
    database.ref("/ClockOff").update({
        Hour: Number(selectOffHour),
    });
}

function getSelectOffMinute() {
    var selectOffMinute = document.getElementById('offMinute').value
    console.log(selectOffMinute)
    database.ref("/ClockOff").update({
        Minute: Number(selectOffMinute),
    });
}

// Cập nhập giá trị từ Firebase lên Web cho Clock
database.ref("/ClockOn/Hour").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var clockOnHour = snapshot.val();
        document.getElementById('onHour').value = clockOnHour
    } else console.log("No data available!");
});

database.ref("/ClockOn/Minute").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var clockOnMinute = snapshot.val();
        document.getElementById('onMinute').value = clockOnMinute
    } else console.log("No data available!");
});

database.ref("/ClockOff/Hour").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var clockOffHour = snapshot.val();
        document.getElementById('offHour').value = clockOffHour
    } else console.log("No data available!");
});

database.ref("/ClockOff/Minute").on("value", function (snapshot) {
    if (snapshot.exists()) {
        var clockOffMinute = snapshot.val();
        document.getElementById('offMinute').value = clockOffMinute
    } else console.log("No data available!");
});

// Tự động update hình ảnh
database.ref("/ClockOn/OnOff").on("value", function (snapshot) {
    if (snapshot.exists()) {
        if (snapshot.val() == 1) {
            document.getElementById('controlOnDevice').style.left = '42px'
        }
        else {
            document.getElementById('controlOnDevice').style.left = '0'
        }
    } else console.log("No data available!");
});

database.ref("/ClockOff/OnOff").on("value", function (snapshot) {
    if (snapshot.exists()) {
        if (snapshot.val() == 1) {
            document.getElementById('controlOffDevice').style.left = '42px'
        }
        else {
            document.getElementById('controlOffDevice').style.left = '0'
        }
    } else console.log("No data available!");
});

// Lấy data lần đầu khi truy cập website
database
    .ref("/ClockOn")
    .get()
    .then((snapshot) => {
        if (snapshot.exists()) console.log(snapshot.val());
        else console.log("No data available!");
    });

database
    .ref("/ClockOff")
    .get()
    .then((snapshot) => {
        if (snapshot.exists()) console.log(snapshot.val());
        else console.log("No data available!");
    });
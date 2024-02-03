//API DATA
let ip = "192.168.2.50"
const apiUrl = `http://${ip}:5000/api/alarm-api`;

const alarmBtn = document.getElementById("alarm_in_btn");
const keyWordField = document.getElementById("In_keyword");

//checkboxes vehicles
const rei19_1 = document.getElementById("REI191");
const rei19_2 = document.getElementById("REI192");
const rei44 = document.getElementById("REI44");
const rei46 = document.getElementById("REI46");
const rei174 = document.getElementById("REI74");

const resetCheckbox = document.getElementById("reset");

//checkboxes alarmtype, gong, gongtype
const brandalarm = document.getElementById("fire");
const thl = document.getElementById("thl");

const cityIn = document.getElementById("city");
const houseNumber = document.getElementById("houseNumber");
const streetIn = document.getElementById("street");

const soundRequired = document.getElementById("alarm_sound");


const checkboxes_veh = [rei19_1, rei19_2, rei44, rei46, rei174];
const checkboxes_alarmTypes = [brandalarm, thl];
const inputCheckboxes = [rei19_1, rei19_2, rei44, rei46, rei174, brandalarm, thl, resetCheckbox];

let alarmSuccess = false;
//Eventlistener

alarmBtn.addEventListener("click", () => {
    getJsonData();
    if (alarmSuccess) {
        alert("Alarmiert! Bitte am Monitor nach der Alarmierung zurücksetzen und dann bei Bedarf erst erneut alarmieren!");
        sendPostRequest(jsonData);
        resetFields();
    }
    alarmSuccess = false;
})

function getJsonData() {
    let alarmType = "";
    let gongType = 1;
    let vehicles = [];
    let jsonData = [];
    //Code
    if (resetCheckbox.checked) {
        jsonData = {
            title: "Reset",
            vehicles: ["Rei44"],
            category: "thl",
            sound: false,
            type: 1,
            status: true,
            street: "Teststraße 2",
            city: "Reilingen"
        }
        return;
    }
    if (keyWordField, value == "") { //Stichwortfeld ist nicht leer wenn leer => Fehler
        alert("Bitte ein Stichwort eingeben!");
        return;
    }

    if (cityIn.value == "" || streetIn.value == "") { //Wenn stadt oder straße leer ist => Fehler
        alert("Bitte Straße und Stadt ausfüllen!");
        return;
    }

    //Fahrzeuge
    let checkedVehiclesCount = 0;
    checkboxes_veh.forEach(vehicle => {
        if (vehicle.checked) checkedVehiclesCount++;
        vehicles.push(vehicle.name);
    })
    if (checkedVehiclesCount <= 0) {
        alert("Es müssen Fahrzeuge ausgewählt werden!");
        return;
    }

    //Alarmarten
    let checkedAlarmTypes = 0;
    checkboxes_alarmTypes.forEach(alarmType => {
        if (alarmType.checked) checkedAlarmTypes++;
    })
    if (checkedAlarmTypes == 0 || checkedAlarmTypes == 2) {
        alert("Bitte MAXIMAL eine Alarmart (Brand/THL) auswählen!");
        return;
    }
    if (thl.checked) {
        alarmType = "thl";
        gongType = 1;
    } else if (brandalarm.checked) {
        alarmType = "Brandalarm";
        gongType = 2;
    } else {
        return;
    }
    jsonData = {
        title: keyWordField.value,
        vehicles: vehicles,
        category: alarmType,
        sound: soundRequired.checked,
        type: gongType,
        status: false,
        street: streetIn.value + " " + houseNumber.value,
        city: cityIn.value
    }
    alarmSuccess = true;
}

function sendPostRequest(jsonData) {

    // Daten, die du senden möchtest

    // POST-Anfrage erstellen
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            // Antwort verarbeiten
            console.log(data.message);
        })
        .catch(error => {
            console.error('Fehler beim API-Aufruf:', error);
        });
}


function resetFields() {
    inputCheckboxes.forEach(checkBox => {
        if (checkBox.checked) checkBox.checked = false
    })
    keyWordField.value = "";
}
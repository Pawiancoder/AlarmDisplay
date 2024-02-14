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

//Eventlistener

alarmBtn.addEventListener("click", () => {
    getJsonData();
    //alert("Hallo");
})

function getJsonData() {
    let brandalarm = false;
    let thl = false;
    let vehicles = [];
    let jsonData = [];

    let gongPlaceHoler = 0;
    //Code
    console.log("City: " + cityIn.value + " Street: " + streetIn.value);
    if (checkedAlarmBoxes.length >= 2 || checkedAlarmBoxes.length == 0 && !resetCheckbox.checked) {

        if (keyWordField, value == "") { //Stichwortfeld ist nicht leer wenn leer => Fehler
            alert("Bitte ein Stichwort eingeben!");
            return;
        }



    }


    alert("Alarmiert! Bitte am Monitor nach der Alarmierung zurücksetzen und dann bei Bedarf erst erneut alarmieren!");
    sendPostRequest(jsonData);
    resetFields();
}

function getCheckedBoxes(type) { //types: vehicles; alarmTypes; gong
    let returnArr = [];
    if (type == "vehicles") {
        checkboxes_veh.forEach(element => {
            if (element.checked) {
                returnArr.push(element.name);
            }
        })
    } else if (type == "alarmTypes") {
        checkboxes_alarmTypes.forEach(element => {
            if (element.checked) {
                returnArr.push(element.name);
            }
        })
    } else {
        throw new Error(`Error: Type ${type} is unknown!`);
    }
    return returnArr;
}


//Send POST request to server

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
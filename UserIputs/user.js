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

//checkboxes alarmtype, gong, gongtype
const brandalarm = document.getElementById("fire");
const thl = document.getElementById("thl");

const soundRequired = document.getElementById("alarm_sound");

const gongtype_fire = document.getElementById("fire_gong");
const gongtype_thl = document.getElementById("thl_gong");

const checkboxes_veh = [rei19_1, rei19_2, rei44, rei46, rei174];
const checkboxes_alarmTypes = [brandalarm, thl];
const checkboxes_gong = [gongtype_fire, gongtype_thl];
const inputCheckboxes = [rei19_1, rei19_2, rei44, rei46, rei174, brandalarm, thl, gongtype_fire, gongtype_thl];
//TODO soundRequired implementieren!

//Eventlistener

alarmBtn.addEventListener("click", () => {
    getJsonData();
})

function getJsonData() {
    let brandalarm = false;
    let thl = false;
    let vehicles = [];
    let jsonData = [];
    let checkedAlarmBoxes = getCheckedBoxes("alarmTypes");
    let checkedVehicles = getCheckedBoxes("vehicles");
    let checkedGongTypes = getCheckedBoxes("gong");
    //Code
    if (checkedAlarmBoxes.length >= 2 || checkedAlarmBoxes.length == 0) {
        alert("Bitte maximal eine Alarmart auswählen!");
        throw new Error("Bitte nur eine Alarmart auswählen!");
    } else {
        if (checkedVehicles.length == 0) {
            alert("Es wurden keine Fahrzeuge ausgewählt!");
        } else {
            if (keyWordField.value == "") {
                alert("Es wurde kein Stichwort eingegeben!");
            } else {
                if (checkedGongTypes.length > 1) {
                    alert("Bitte maximal einen Gongtypen auswählen!");
                } else {
                    let kategorie = checkedAlarmBoxes[0].toString();
                    if (soundRequired.checked) {
                        //gong an
                        console.log("K: ", kategorie);
                        if (gongtype_fire.checked) {
                            jsonData = {
                                title: keyWordField.value,
                                vehicles: checkedVehicles,
                                category: kategorie,
                                sound: true,
                                type: 2
                            }
                        } else {
                            jsonData = {
                                title: keyWordField.value,
                                vehicles: checkedVehicles,
                                category: kategorie,
                                sound: true,
                                type: 1
                            }
                        }
                    } else {
                        //gong aus
                        if (gongtype_fire.checked) {
                            jsonData = {
                                title: keyWordField.value,
                                vehicles: checkedVehicles,
                                category: kategorie,
                                sound: false,
                                type: 2
                            }

                        } else {
                            jsonData =
                            {
                                title: keyWordField.value,
                                vehicles: checkedVehicles,
                                category: kategorie,
                                sound: false,
                                type: 1
                            }
                        }
                    }
                }
            }
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
    } else if (type == "gong") {
        checkboxes_gong.forEach(element => {
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
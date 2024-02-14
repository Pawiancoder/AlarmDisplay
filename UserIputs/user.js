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

const freitext = document.getElementById("Freitext");

//checkboxes alarmtype, gong, gongtype
const brandalarm = document.getElementById("fire");
const thl = document.getElementById("thl");

const city = document.getElementById("city");
const houseNumber = document.getElementById("houseNumber");
const street = document.getElementById("street");

const soundRequired = document.getElementById("alarm_sound");

const checkboxes_veh = [rei19_1, rei19_2, rei44, rei46, rei174];
const checkboxes_alarmTypes = [brandalarm, thl];
const inputCheckboxes = [rei19_1, rei19_2, rei44, rei46, rei174, brandalarm, thl, resetCheckbox];
const inputTextFields = [city, houseNumber, street, freitext];

//Eventlistener

alarmBtn.addEventListener("click", () => {
    getJsonData();
})

async function getJsonData() {
    let stateRes = true; //true => kein Alarm
    let brandalarm = false;
    let thl = false;
    let vehicles = [];
    let jsonData = [];
    let checkedAlarmBoxes = getCheckedBoxes("alarmTypes");
    let checkedVehicles = getCheckedBoxes("vehicles");
    let gongPlaceHoler = 0;
    //Code
    if (checkedAlarmBoxes.length >= 2 || checkedAlarmBoxes.length == 0 && !resetCheckbox.checked) {
        alert("Bitte maximal eine Alarmart auswählen!");
        throw new Error("Bitte nur eine Alarmart auswählen!");
    } else if (resetCheckbox.checked) {
        //!reset
        jsonData =
        {
            title: "RESET",
            vehicles: ["REI44"],
            category: "THL",
            sound: false,
            type: 1,
            status: true
        }
        sendPostRequest(jsonData);
        alert("Der Alarm wurde beendet und die Monitore werden zurückgesetzt!");
        resetFields();
        return;
    } else {
        if (checkedVehicles.length == 0) {
            alert("Es wurden keine Fahrzeuge ausgewählt!");
        } else {
            if (keyWordField.value == "") {
                alert("Es wurde kein Stichwort eingegeben!");
            } else {
                if (gongPlaceHoler > 1) {
                    alert("unerwarteter Fehler! Bitte den Entwickler informieren (Fehlercode: Maschin' kaputt!");
                    throw new Error("user.js (UserScript) 0 > 1 is true geworden!");
                } if (city.value == "" || street.value == "") {
                    alert("Bitte eine Straße und Stadt eingeben!");
                } else {
                    console.log("City: " + city.value + " - Street: " + street.value);
                    let kategorie = checkedAlarmBoxes[0].toString();
                    if (soundRequired.checked) {
                        //gong an
                        console.log("K: ", kategorie);
                        if (isNaN(houseNumber.value)) {
                            alert("Die Hausnummer ist eine Zahl! (Bspw. 2 statt 2a)!");
                            return;
                        }
                        let hausnummer = 0;
                        hausnummer = houseNumber.value;
                        console.log("stateRes: ", stateRes);
                        if (!stateRes) { //fale => kein Alarm
                            jsonData = {
                                title: "keyWord",
                                vehicles: "checkedVehicles",
                                category: "kategorie",
                                sound: false,
                                type: 2,
                                status: true,
                                street: "street",
                                city: "city",
                                freitext: "freitext"
                            }
                            return;
                        }
                        // \/ Wenn alarm, dann geht es hier weiter \/
                        if (brandalarm.checked) {
                            jsonData = {
                                title: keyWordField.value,
                                vehicles: checkedVehicles,
                                category: kategorie,
                                sound: true,
                                type: 2,
                                status: false,
                                street: street.value + " " + hausnummer,
                                city: city.value,
                                freitext: freitext.value,
                            }
                        } else {
                            jsonData = {
                                title: keyWordField.value,
                                vehicles: checkedVehicles,
                                category: kategorie,
                                sound: true,
                                type: 1,
                                status: false,
                                street: street.value + " " + hausnummer,
                                city: city.value,
                                freitext: freitext.value,
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
                                type: 2,
                                status: false,
                                street: street.value + " " + hausnummer,
                                city: city.value,
                            }

                        } else {
                            jsonData =
                            {
                                title: keyWordField.value,
                                vehicles: checkedVehicles,
                                category: kategorie,
                                sound: false,
                                type: 1,
                                status: false,
                                street: street.value + " " + hausnummer,
                                city: city.value,
                            }
                        }
                    }
                }
            }
        }
    }
    alert("Der Alarm wurde ausgelößt!");
    checkDisplayState(jsonData);
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

//Resetrequest
async function checkDisplayState(jsonData) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fehler beim Lesen der Daten der API: ${error.message}.`);
            }
            return response.json();
        })
        .then(data2 => {
            //console.log(data.data[0]);
            console.log("DATA: ", data2.error);
            if (data2.error != "Error_no_data") {
                console.log("DATA-ERROR: ", data2);
                alert("Auf dem Monitor ist noch ein Alarm aktiv! Bitte setze diesen zuerst zurück und versuche es dann erneut!");
                return;
            } else if (data2.error == "Error_no_data") {
                sendPostRequest(jsonData);
            }
        })
        .catch(error => {
            console.log(error);
        })
}


function resetFields() {
    inputCheckboxes.forEach(checkBox => {
        if (checkBox.checked) checkBox.checked = false
    });
    inputTextFields.forEach(textField => {
        textField.value = "";
    });
    keyWordField.value = "";
}

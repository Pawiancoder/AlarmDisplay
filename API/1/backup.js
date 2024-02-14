alarmBtn.addEventListener("click", () => {
    //!debugger;
    activeAlert = true;
    if (checkBox_Feuer.checked || checkBox_THL.checked) {
        if (checkBox_Feuer.checked && checkBox_THL.checked) {
            alert("Es darf nur EINE Einsatzart ausgewählt werden!");
            return;
        }
        if (!getCheckedVehiclesBool) { alert("Bitte Fahrzeuge auswählen!"); return; }

        if (Stichwort.value == "") { alert("Das Stichwort darf nicht leer sein!"); return; }
        let timeOutValue = alarmTimeSlider.value * 1000;
        alert(`Einsatz wurde gestartet und in ${alarmTimeSlider.value} Sekunden alarmiert!`);
        showHidePopup("none");
        setTimeout(function () {
            if (checkBox_Feuer.checked) {
                triggerAlarm(Stichwort.value, getCheckedVehicles(), "Brandalarm ", true, 2, 20000);
                alarmResetBtn.style.display = "block";
            } else if (checkBox_THL.checked) {
                triggerAlarm(Stichwort.value, getCheckedVehicles(), "THL", true, 1, 20000);
                alarmResetBtn.style.display = "block";
            }
            checkBoxArr.forEach(checkBox => {
                checkBox.checked = false;
            })
            checkBox_Feuer.checked = false;
            checkBox_THL.checked = false;
        }, timeOutValue);
    } else {
        alert("Kein Haken wurde bei der Einsatzart gesetzt!");
    }

    var displayElement = document.getElementById('display');
    alarmResetBtn.style.display = "none";
    alarmTimeout = setTimeout(function () {
        displayElement.classList.remove('blink');
        vehicleIdArr.forEach(v => {
            v.classList.remove("blink2");
        });
        setTimeout(function () {
            displayElement.innerHTML = `<h1>Kein Alarm</h1>`;
            setTimeout(function () {
                displayElement.style.color = "black";
            }, 2000);
        }, 3000);
        activeAlert = false;
        alarmResetBtn.style.display = "none";
    }, 300000);
})


alarmResetBtn.addEventListener("click", () => {
    resetAlarm();
    alert(`Der Alarm wird in ca ${5 + (alarmZeit / 1000)} Sekunden zurückgesetzt!`);
})

alarmBreakUpBtn.addEventListener("click", () => {
    showHidePopup("none");
})

function SliderEventHandler(value) { //Alarm in Sekunden (Verzögerung):
    alarmTimeSliderLabel.innerHTML = `Alarm in Sekunden (${value} sekunden)`;
}

openAlarmDialogBtn.addEventListener("click", () => {
    let success = false;
    if (login_tries < 10) {
        while (!success) {
            if (login_tries > 10) { alert("Du hast zuviele Versuche gebraucht!"); success = true; }
            let password = prompt("Bitte gib das Passwort ein!");
            if (password == "Feuerwehr2024##" && password != null) {
                if (!activeAlert) {
                    showHidePopup("block");
                } else {
                    alert("Ein Alarm ist noch am Laufen / wird alarmiert. Bitte warte und versuche es dann erneut!");
                }
                success = true;
            } else {
                alert(`Das Passwort ist leider falsch! Bitte versuche es erneut! Du hast noch ${10 - login_tries} Versuche!`);
                login_tries++;
            }
        }
    } else if (login_tries >= 10) {
        success = true;
        alert("Du hast zu oft das falsche Passwort eingegeben!");
    }
})

function getCheckedVehicles() {
    let returnArr = [];
    checkBoxArr.forEach(checkBox => {
        if (checkBox.checked) {
            returnArr.push(checkBox.name);
        }
    });
    return returnArr;
}

function getCheckedVehiclesBool() {
    let returnV = false;
    checkBoxArr.forEach(checkBox => {
        if (checkBox.checked) {
            returnV = true;
        }
    });
    return returnV;
}

function testAlarm(sound, type) {
    if (sound) {
        if (type == 1) {
            //console.log(type);
            triggerAlarm("Probealarm", ["REI19/1", "REI19/2", "REI44", "REI46", "REI74"], "TEST - THL", true, 1);
            alarmResetBtn.style.display = "block";
        } else {
            //console.log(type);
            triggerAlarm("Probealarm", ["REI19/1", "REI19/2", "REI44", "REI46", "REI74"], "TEST - Brandalarm", true, 2);
            alarmResetBtn.style.display = "block";
        }

    } else {
        triggerAlarm("Probealarm", ["REI19/1", "REI19/2", "REI44", "REI46", "REI74"], "TEST", false);
        alarmResetBtn.style.display = "block";
    }
}

function showHidePopup(state) {
    let alarm_dialog1 = Array.from(alarmDialog);

    alarm_dialog1.forEach(popupElement => {
        popupElement.style.display = state;
    });
}

showHidePopup("none"); //none / block

//!Variables

let checkBox_191 = document.getElementById("check_191");
let checkBox_192 = document.getElementById("check_192");
let checkBox_44 = document.getElementById("check_44");
let checkBox_46 = document.getElementById("check_46");
let checkBox_74 = document.getElementById("check_74");
let checkBoxArr = [checkBox_191, checkBox_192, checkBox_44, checkBox_46, checkBox_74];

let login_tries = 0;

//EINSTELLUNGSVARIABLEN

let alarmTimeSlider = document.getElementById("alarm_in_seconds");
let alarmTimeSliderLabel = document.getElementById("alarm_in_seconds_lbl");

let alarmResetBtn = document.getElementById("btn_alarm_reset");

let alarmDialog = document.getElementsByClassName("alarm_dialog");

let openAlarmDialogBtn = document.getElementById("btn_open_alarmWindow");

let alarmBreakUpBtn = document.getElementById("alarm_breakup_btn");
const alarmBtn = document.getElementById("alarm_in_btn");
alarmResetBtn.style.display = "none";

//!render
alarmTimeSlider.value = 30;
alarmTimeSliderLabel.innerHTML = `Alarm in Sekunden (${alarmTimeSlider.value} sekunden)`;
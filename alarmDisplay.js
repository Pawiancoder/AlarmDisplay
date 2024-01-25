let alarmgong = document.getElementById("alarmgong");
let gong2 = document.getElementById("gong");
var alarmTimeout;
let activeAlert = false; //TODO activeAlert in die API einbinden (Status per GET Request abfragen)
let alarmText = "";
const resetBtn = document.getElementById("btn_reset_alarm");
resetBtn.style.visibility = "hidden";

const warteSekunden = 60;
const resetTime = warteSekunden * 1000;


resetBtn.addEventListener("click", () => {
    if (activeAlert) {
        alert("Der laufende Alarm wird bald gelöscht und der Monitor geleert!");
        resetBtn.style.visibility = "hidden";
        resetAlarm();
    }
})

const alarmInput = document.getElementById("alarm_in");
let Stichwort = document.getElementById("stichwort");
let checkBox_Feuer = document.getElementById("FEU");
let checkBox_THL = document.getElementById("THL");
const rei191 = document.getElementById("REI191");
const rei192 = document.getElementById("REI192");
const rei44 = document.getElementById("REI44");
const rei46 = document.getElementById("REI46");
const rei74 = document.getElementById("REI74");
const vehicleIdArr = [rei191, rei192, rei44, rei46, rei74];
let alarmZeit = 10000; //Zeit in MS (SEKUNDE * 1000) => 60 sekunden * 1000 = 60000 ms

//Programmstart

function triggerAlarm(title, vehicles, kategorie, sound, type) {
    console.log("Cars: " + vehicles);
    if (title != "" && title != undefined && kategorie != "" && kategorie != undefined) {

        vehicles.forEach(vehicle => {
            switch (vehicle) {
                case "REI19/1":
                    rei191.classList.add("blink2");
                    break;
                case "REI19/2":
                    rei192.classList.add("blink2");
                    break;
                case "REI44":
                    rei44.classList.add("blink2");
                    break;
                case "REI46":
                    rei46.classList.add("blink2");
                    break;
                case "REI74":
                    rei74.classList.add("blink2");
                    break;
                default:
                    alert(`Kein Fahrzeug mit dem Namen ${vehicle} wurde gefunden!`);
                    break;
            }
        });

        var displayElement = document.getElementById('display');
        displayElement.innerHTML = `<h1>${kategorie} - ${title}</h1>`;
        displayElement.classList.add('blink');
        displayElement.style.color = "red";
        resetBtn.style.visibility = "visible";
        activeAlert = true;

        setTimeout(function () {
            if (sound) {
                if (type == 1) {
                    alarmgong.play();
                    setTimeout(function () {
                        feuerwehrTTS(title, vehicles, kategorie);
                    }, 7000);
                } else {
                    gong2.play();
                    setTimeout(function () {
                        feuerwehrTTS(title, vehicles, kategorie);
                    }, 18000)
                }
            }
        }, 1000);

        setTimeout(function () {
            resetAlarm();
            activeAlert = false;
        }, resetTime);
    } else {
        alert("Der Alarmtitel oder die Fahrzeugliste darf nicht leer sein!");
        throw new Error("AlarmdispError: Text / Vehiclelist is empty!");
    }
}

function resetAlarm() {
    var displayElement = document.getElementById('display');
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
        // activeAlert = false; //TODO EINBINDEN PER API CALL
    }, alarmZeit);
    setTimeout(function () {
        location.reload();
    }, alarmZeit + 7000); //Alarmzeit + 7 Sekunden (Zeit zum reseten vom Display dann reload der Seite)
}

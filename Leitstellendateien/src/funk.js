let Funkrufname_LST = "Leitstelle Rhein Neckar";
let funk = document.getElementById("funk");
let funk_ende = document.getElementById("funk_ende");
let radioBtn = document.getElementById("radio_send_btn");
let carName = document.getElementById("Radio_carname");
let message = document.getElementById("Radio_message");
let stopBtn = document.getElementById("radio_stop_btn");
let funk_end_new = document.getElementById("funk_sound");
stopBtn.style.visibility = "hidden"; //hidden / visible
let vehicles = ["Florian Reilingen 19/1", "Florian Reilingen 19/2", "Florian Reilingen 44", "Florian Reilingen 46", "Florian Reilingen 74"];
let isFunk = false;

stopBtn.addEventListener("click", () => {
    if (isFunk) {
        funk_end_new.play();
        isFunk = false;
        stopBtn.style.visibility = "hidden";
        message.value = ""; carName.value = "";
    }
});

radioBtn.addEventListener("click", () => {
    if (carName.value != "" && message.value != "" && check_name(carName.value)) {
        funk.play();
        isFunk = true;
        stopBtn.style.visibility = "visible";
        message.value = "";
    } else {
        throw new Error("Bitte BEIDE Funkfelder ausfüllen / richtige Funkrufnamen verwenden!");
    }
});

function radio_In(name, msg) {
    if (isFunk) {
        funk_ende.play();
        alert(`[${name}:] ${msg}`);
        carName.value = name;
    } else {
        return "Bitte über Status 5 anmelden!";
    }
}

function check_name(name) {
    let res = false;
    vehicles.forEach(vehicle => {
        if (vehicle == name) {
            res = true;
        }
    })
    return res;
}

function showRadio() {
    radioclass.style.display = "block";
}
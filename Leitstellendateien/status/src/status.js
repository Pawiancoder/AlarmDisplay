let vehicleNum = "";
let funkRufNummer = 0;

const output = document.getElementById("output");
const button_sound = document.getElementById("status_push_sound");
const buttons = document.querySelectorAll(".buttons");

output.innerHTML = vehicleNum;
let register = false;
let setupName = false;
let logged_in = false;
let save = "";

function registerDevice() {
    output.innerHTML = "";
    output.innerHTML += `<b>Bitte anmelden: FFF##STATUS</b>`;
    register = true;
}

function render(status) {
    if (status === "*") {
        output.innerHTML = removeLast(output.innerHTML);
    }
    console.log("1");
    if (!register || setupName) {
        console.log("2");
        if (status != "*") {
            output.innerHTML += status;
        }
        if (!register && !setupName) {
            save = output.innerHTML.split("<br>")[0];
            var newTextInput = output.innerText.split("\n");
            if (newTextInput.length == 2) {
                let status2 = newTextInput[1].split("");
                console.log("status2: " + status2);
                if (!isNaN(status2[0]) && status2[1] == "#") {
                    //console.log("Neuer Status angemeldet");
                } else if (!isNaN(status2[1]) && status2[1] != "") {
                    sendError(output, save, 2000, "Falscher Status!");
                } if (status2[1] == "#") {
                    output.innerHTML = "Florian Reilingen " + funkRufNummer + " Status: " + status2[0] + "<br>";
                    document.title = "Florian Reilingen " + funkRufNummer + " Status: " + status2[0];
                    button_sound.play();
                }
            }
        }
        if (setupName && output.innerText.length == 7) {
            console.log("3");
            console.log(`Angemeldet als ${output.innerText}`);
            let data = output.innerText.split("");
            if (data[0] == 0) { //Kein doppeltes fahrzeug : 44
                //console.log("4");
                data.shift(0); //0-5 => 6 statt 7 Ziffern
                console.log("DATA 5:" + data[5]);
                if (data[5] >= 0 && data[5] < 7) {
                    console.log("DATA4: " + data[4]);
                    if (data[4] != 0) {
                        sendError(output, save, 2000, "Die erste Ziffer ist immer null!");
                    }
                    vehicleNum = "Florian Reilingen " + data[0] + data[1] + " Status: " + data[5] + "<br>";
                    document.title = "Florian Reilingen " + data[0] + data[1] + " Status " + data[5];
                    funkRufNummer = data[0] + data[1]
                    button_sound.play();
                } else {
                    alert("FEHLER! Status nur von 0 bis 6");
                    data[5] = 6;
                    vehicleNum = "Florian Reilingen " + data[0] + data[1] + " Status: " + data[5] + "<br>";
                    document.title = "Florian Reilingen " + data[0] + data[1] + " Status " + data[5];
                }
            } else { //doppeltes Fahrzeug: 19/1
                if (data[6] >= 0 && data[6] < 7) {
                    vehicleNum = "Florian Reilingen " + data[0] + data[1] + "/" + data[2] + " Status: " + data[6] + "<br>";
                    document.title = "Florian Reilingen " + data[0] + data[1] + "/" + data[2] + " Status " + data[6];
                    funkRufNummer = data[0] + data[1] + "/" + data[2];
                    button_sound.play();
                } else {
                    alert("Status: 0 bis 6");
                    data[6] = 6;
                    vehicleNum = "Florian Reilingen " + data[0] + data[1] + "/" + data[2] + " Status: " + data[6] + "<br>";
                    document.title = "Florian Reilingen " + data[0] + data[1] + "/" + data[2] + " Status " + data[6];
                    funkRufNummer = data[0] + data[1] + "/" + data[2];
                    button_sound.play();
                }

            }
            output.innerHTML = "";
            output.innerHTML = vehicleNum;
            register = false;
            setupName = false;
            logged_in = true;
        }
        if (output.innerText === "######") {
            registerDevice();
        }
    } else if (status === "#") {
        //console.log("2");
        if (output.innerHTML.includes("<b>Bitte anmelden: FFF##STATUS</b>") || output.innerHTML === "") {
            setupName = true;
            output.innerHTML = "";
        }
        //console.log("3");
    }
    //console.log("5");
}

function removeLast(text) {
    let splitText = text.split("");
    let indexToRemove = splitText.length - 1;
    if (splitText[splitText.length - 1] === "\n") {
        splitText.splice(indexToRemove, 1);
    }
    splitText.splice(splitText.length - 1, 1);
    return splitText.join("");
}

function sendError(output, save, waitTimeMS, ErrorMsg) {
    output.innerHTML = "";
    output.innerHTML = save;
    output.innerHTML += `<b>${ErrorMsg}</b>`;
    setTimeout(function () {
        output.innerHTML = save + "<br>";
    }, waitTimeMS);
}

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        render(event.target.innerText);
    });
});
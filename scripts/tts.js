
function speak(txt) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = txt;
    msg.lang = "DE-de"
    msg.pitch = 1; //0-2
    window.speechSynthesis.speak(msg);
}

function feuerwehrTTS(title, units, type) {
    console.log("Alarmart: ", type);
    let unitArr = [];
    let alarmType = "";
    units.forEach(unit => {
        switch (unit) {
            case "REI19/1":
                unitArr.push("MTW 1");
                break;
            case "REI19/2":
                unitArr.push("MTW 2");
                break;
            case "REI46":
                unitArr.push("HLF");
                break;
            case "REI44":
                unitArr.push("LF 16");
                break;
            case "REI74":
                unitArr.push("GWL 2");
                break;
            default:
                throw new Error(`Das Fahrzeug ${unit} konnte nicht gefunden werden!`);
                break;
        }
    });
    let testAlarm = type.split(" ");
    console.log(testAlarm[0]);
    if (type == "THL") {
        alarmType = "Technische Hilfeleistung";
    } else if (type.split(" ")[0] == "Brandalarm") {
        alarmType = "Brandalarm";
    } else {
        throw new Error(`|${type.split(" ")[1]}| ist eine unbekannte Einsatzart!`);
    }
    if (title == "") throw new Error("Der Titel ist leer (tts.js)");

    speak(alarmType + ": " + checkKeyword(title) + ". Alarm für: " + unitArr);
}

function checkKeyword(txt) {
    let shortWordsArr = ["BMA", "Brandmeldeanlage ausgelößt", "RD", "Rettungsdienst", "St.", "Sankt", "VU", "Verkehrsunfall"]; // "Abkürzung", "Bedeutung"
    let returnStr = "";
    let checkArr = txt.split(" ");

    checkArr.forEach(element => {
        let found = false;

        for (let index = 0; index < shortWordsArr.length; index += 2) {
            if (element === shortWordsArr[index]) {
                returnStr += " " + shortWordsArr[index + 1];
                found = true;
                break;
            } else if (element == shortWordsArr[index] + ",") {
                returnStr += " " + shortWordsArr[index + 1] + ",";
                found = true;
                break;
            }
        }

        if (!found) {
            returnStr += " " + element;
        }
    });

    // Entferne das führende Leerzeichen
    return returnStr.trim();
}
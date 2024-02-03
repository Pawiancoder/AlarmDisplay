const ip = "raspberrypi"; //Hostname

const apiUrl = `http://${ip}:5000/api/alarm-api`;

function sendGETrequest(reset) {
    console.log("CALLED!");
    if (!activeAlert) {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fehler beim Lesen der Daten der API: ${error.message}.`);
                }
                return response.json();
            })
            .then(data => {
                //console.log(data.data[0]);
                console.log("DATA: ", data.data.data);
                if (data.error == "Error_no_data" || data.length === 0) {
                    console.log("Im moment liegt kein Einsatz vor");
                    return;
                } else {
                    console.log("Einsatz!");
                    let mainData = data.data[0];
                    console.log(data);
                    let title = mainData.title;
                    let vehicles = mainData.vehicles;
                    let category = mainData.category;
                    let sound = mainData.sound;
                    let type = mainData.type;
                    let street = mainData.street;
                    let city = mainData.city;
                    //console.log(street + " " + city);
                    //Alarmfunction
                    console.log("Straße: " + street);
                    triggerAlarm(title, vehicles, category, sound, type, street, city);
                    //!WEITERER CODE HIER
                }
            })
            .catch(error => {
                console.log(error);
            })
    } else {
        console.log("KEKLOL1");
        if (reset) {
            console.log("KEKLOL2");
            jsonData = {
                title: "RESETALARM",
                vehicles: ["REI191"],
                category: "THL",
                sound: false,
                type: 1,
                status: true,
                street: "Teststr",
                city: "Reilingen"
            }
        } else {
            jsonData = {
                title: "RESETALARM",
                vehicles: ["REI19/1"],
                category: "THL",
                sound: false,
                type: 1,
                status: false
            }
        }
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Antwort verarbeiten
                console.log("Error: " + data.error);
                console.log("ResetDATA: ", data);
                if (data.error == "Error_no_data") {
                    //console.log("Monitor wird leer gemacht");
                    resetAlarm();
                }
            })
            .catch(error => {
                console.error('Fehler beim API-Aufruf:', error);
            })
    }
}


setInterval(sendGETrequest, 10000);
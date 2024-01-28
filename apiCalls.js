const ip = "192.168.2.50";

const apiUrl = `http://${ip}:5000/api/alarm-api`;

function sendGETrequest(reset) {
    if (!activeAlert && !reset) {
        console.log("CALLED!");
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Fehler beim Lesen der Daten der API: ${error.message}.`);
                }
                return response.json();
            })
            .then(data => {
                //console.log(data.data[0]);
                // console.log("DATA: ", data);
                if (data.data == "Error_no_data" || data.length === 0) {
                    //!console.log("Im moment liegt kein Einsatz vor");
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
                    //Alarmfunction
                    triggerAlarm(title, vehicles, category, sound, type);
                    //!WEITERER CODE HIER
                }
            })
            .catch(error => {
                console.log(error);
            })
    } else if (reset) {
        jsonData = {
            title: "RESETALARM",
            vehicles: ["REI191"],
            category: "THL",
            sound: false,
            type: 1,
            status: true
        }
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
}


setInterval(sendGETrequest(false), 10000);
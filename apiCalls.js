const ip = "192.168.2.50";

const apiUrl = `http://${ip}:5000/api/alarm-api`;

function sendGETrequest() {
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
            if (data.data == "Error_no_data") {
                //!console.log("Im moment liegt kein Einsatz vor");
                return;
            } else {
                console.log("Einsatz!");
                let mainData = data.data[0];
                console.log(mainData);
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
}


setInterval(sendGETrequest, 10000);
const ip = "127.0.0.1"; //Hostname

const apiUrl = `http://${ip}:5000/api/alarm-api`;

function sendGETrequest() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fehler beim Lesen der Daten der API: ${error.message}.`);
            }
            return response.json();
        })
        .then(data => {
            //console.log(data.data[0]);
            console.log("DATA: ", data.data.title);
            if (data.error == "Error_no_data" || data.length === 0) {
                console.log("Im moment liegt kein Einsatz vor");
                return;
            } else {
                console.log("Einsatz!");
                let mainData = data.data[0];
                console.log(data);

                //!WEITERER CODE HIER
            }
        })
        .catch(error => {
            console.log(error);
        })
}
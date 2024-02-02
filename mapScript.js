//TODO: Man soll Karte nicht verschieben können (Nur Reilingen zu sehen - nicht verschiebbar)

class Alarm {
    title = this.title;
    id = this.id;
}
let alarmArr = [];
let alarmIdCounter = 0;
let map; // globale Variable für die Karte

function getAlarmID(name) {
    let OutputId;
    alarmArr.forEach(alarm => {
        if (alarm.title == name) {
            OutputId = alarm.id;
        }
    })
    return OutputId;
}

function getAlarmTitle(ID) {
    let output = "";
    alarmArr.forEach(element => {
        if (element.id == ID) output = element.title;
    })
    return output;
}

function saveAlarmToArr(alarmTitle, alarmID) {
    let alarm = new Alarm();
    alarm.title = alarmTitle;
    alarm.id = alarmID;
    alarmArr.push(alarm);
}

// Globales Objekt zur Speicherung von Alarm-Markern mit ihren IDs
var alarmMarkers = {};

// Funktion, um die Karte zu initialisieren und den Marker zu erstellen
function initializeMapWithCity(city) {
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(city))
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var latitude = parseFloat(data[0].lat);
                var longitude = parseFloat(data[0].lon);

                // Verwende die erhaltenen Koordinaten für die gewünschte Stadt
                var myLatLng = { lat: latitude, lng: longitude };

                // Erstelle die Karte und binde sie an das "map"-Element
                var mapOptions = {
                    center: myLatLng, // Mittelpunkt der Karte
                    zoom: 12, // Zoomstufe (1 = ganz nah, 20 = sehr weit entfernt)
                    dragging: false, // Karte nicht verschiebbar machen
                    touchZoom: false, // Touch-Zoom deaktivieren
                    scrollWheelZoom: false, // Mausrad-Zoom deaktivieren
                    doubleClickZoom: false, // Doppelklick-Zoom deaktivieren
                    boxZoom: false, // Rechteck-Zoom deaktivieren
                    keyboard: false, // Tastatur-Steuerung deaktivieren
                    tap: false, // Tap-Zoom deaktivieren
                    zoomControl: false // Zoom-Steuerung deaktivieren
                };

                // Erstelle die Karte und binde sie an das "map"-Element
                map = L.map('alarmMap', mapOptions); // map als globale Variable setzen

                // Füge OpenStreetMap-Kacheln zur Karte hinzu
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);
            } else {
                console.error('Keine Ergebnisse gefunden für die Stadt: ' + city);
            }
        })
        .catch(error => {
            console.error('Fehler beim Geocoding:', error);
        });
}

initializeMapWithCity('Reilingen');

function createAlarm(address, city, alarmTitle) {
    // Geocode die Adresse, um die Koordinaten zu erhalten
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address + ', ' + city))
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Extrahiere die Koordinaten aus dem ersten Ergebnis
                var latitude = parseFloat(data[0].lat);
                var longitude = parseFloat(data[0].lon);
                let alarmID = alarmIdCounter;
                alarmIdCounter++;

                // Überprüfe, ob bereits ein Marker für diese Alarm-ID vorhanden ist
                if (alarmMarkers[alarmID]) {
                    // Entferne den vorhandenen Marker
                    map.removeLayer(alarmMarkers[alarmID]);
                }

                // Platziere den Marker an den erhaltenen Koordinaten und speichere ihn
                saveAlarmToArr(alarmTitle, alarmID);
                var marker = L.marker([latitude, longitude]).addTo(map);
                //marker.bindPopup(alarmTitle + " - " + address).openPopup();
                alarmMarkers[alarmID] = marker;

                // Zentriere die Karte auf den Marker
                map.setView([latitude, longitude], 18);
            } else {
                console.error('Keine Ergebnisse gefunden für die Adresse: ' + address + ', ' + city);
            }
        })
        .catch(error => {
            console.error('Fehler beim Geocoding:', error);
        });
}


function removeAlarm(alarmName) {
    const alarmID = getAlarmID(alarmName);
    if (alarmMarkers[alarmID]) {
        map.removeLayer(alarmMarkers[alarmID]);
        let alarmTitle = getAlarmTitle(alarmID);
        delete alarmMarkers[alarmID]; // Entferne den Marker aus dem Speicherobjekt
        const alarmIndex = alarmArr.findIndex(alarm => alarm.title === alarmTitle);
        delete alarmArr[alarmIndex];
    }
}

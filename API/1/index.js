const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const apiRoot = '/api';
let newAlarm;
let activeAlarm = false; //True = Alarm; Fals = kein Alarm

class Alarm {
    title = this.title;
    vehicles = this.vehicles;
    cathegory = this.cathegory;
    sound = this.sound;
    type = this.type;
    street = this.street;
    city = this.city;
    freitext = this.freitext;
    alarmLevel = this.alarmLevel;

    checkData() {
        if (this.title != "" &&
            this.vehicles != "" && this.cathegory != "" &&
            this.sound != "" && this.type != "" && this.street != "" &&
            this.city != "" && this.freitext != "") {
            return true;
        } else {
            return false;
        }
    }
}

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.options("*", cors());

const router = express.Router();
router.get("/alarm-api", (req, res) => { //Alarm erstellen / Daten bekommen - api
    if (!activeAlarm) {
        if (newAlarm != undefined) {
            res.json({ data: newAlarm });
        } else {
            res.json({
                error: `Error_no_data`,
                data: false
            });
        }
    } else {
        res.json({ data: "active_alarm" });
    }
});

/**
 * router.get("/alarm-api/status", (req, res) => {
    res.json({ data: alarmState });
})
 */

router.post("/alarm-api", (req, res) => {
    const receivedTitle = req.body.title;
    const receivedVehicles = req.body.vehicles;
    const receivedKathegorie = req.body.category;
    const receivedSound = req.body.sound;
    const receivedType = req.body.type;
    const receivedStatus = req.body.status;
    const receivedStreet = req.body.street;
    const receivedCity = req.body.city;
    const receivedFreitext = req.body.freitext;
    const receivedAlarmLevel = req.body.alarmLevel;

    let responseTxt = "";

    if (receivedStatus === false) {
        newAlarm = new Alarm();
        newAlarm.title = receivedTitle;
        newAlarm.vehicles = receivedVehicles;
        newAlarm.cathegory = receivedKathegorie;
        newAlarm.sound = receivedSound;
        newAlarm.type = receivedType;
        newAlarm.street = receivedStreet;
        newAlarm.city = receivedCity;
        newAlarm.freitext = receivedFreitext;
        newAlarm.alarmLevel = receivedAlarmLevel;
        responseTxt = "Successfully received the data!";
        if (!newAlarm.checkData()) {
            newAlarm = undefined;
            activeAlarm = false;
            responseTxt = "An Error happend and the API has been reset!";
            throw new Error("Die Daten sind nicht vollständig!");
        }
    } else {
        newAlarm = undefined; //!
        activeAlarm = false;
        responseTxt = "The API has been reset";
    }
    //CORS-Header
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
        message: responseTxt,
        data: activeAlarm
    });
});


app.use(apiRoot, router);

app.listen(port, () => {
    console.log("Server up!");
});

//TODO HTML: Daten laden von API
const telefon = document.getElementById("telefon");
const alarmgong = document.getElementById("alarmgong");
const error = document.getElementById("error");
let queue = [];

class Alarm { //wo, wer, was, verletzte?
    constructor(Position, Callername, Story, injPersons) {
        this.Position = Position; //Wo
        this.Callername = Callername; //Name Anrufer
        this.Story = Story; //Was ist passiert
        this.injPersons = injPersons; //Verletzte

        this.PositionB = false;
        this.CallernameB = false;
        this.StoryB = false;
        this.injPersonsB = false;
    }
    sendMsg(token) { //TODO Groß / Kleinschreibung ignorieren 
        switch (token.toUpperCase()) {
            case "WO":
                return this.Position;
                break;
            case "WER":
                return this.Callername;
                break;
            case "WAS":
                return this.Story;
                break;
            case "VERLETZTE":
                return this.injPersons;
                break;
            case "HILFE":
                return "Wo, Wer, Was, Verletzte"
            default:
                throw new Error(`unexpected Token ${token}: ${token} not found`);
                break;
        }
    }
}

let object = {};

function createAlarm(obj) {
    queue.push(obj);
}

function dispatch(question, newAlarm) { //Frage, neuer alarm laden? t/f
    if (!newAlarm && object != undefined) {
        let alarm = queue[0];
        if (alarm == undefined) { alert("Im Moment gibt es keinen Alarm"); return; }
        let response = alarm.sendMsg(question);
        console.log(response);
    } else {
        if (queue[0] == undefined) {
            error.play();
            alert("Im Moment gibt es keinen Alarm!");
        }
        queue.shift();
    }

}

function alarm() {
    let elementDiv = document.querySelectorAll("unitCheckList");

}

//Debug alarms
let testalarm = new Alarm("TESTSTR.1", "Harrald", "BUMM PENG BAM DANN KAPUTT", "Niemand wurde verletzt");
let testalarm2 = new Alarm("TESTSTR.2", "Harrald2", "BUMM PENG BAM DANN KAPUTT2", "Niemand wurde verletzt2");
let testalarm3 = new Alarm("TESTSTR.3", "Harrald3", "BUMM PENG BAM DANN KAPUTT3", "Niemand wurde verletzt3");

createAlarm(testalarm); createAlarm(testalarm2); createAlarm(testalarm3);


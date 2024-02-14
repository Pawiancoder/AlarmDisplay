//!Main Script-file
const radioclass = document.querySelector(".messageField");
radioclass.style.display = "none";

class Dispatch { //Stichwort, Name, Adresse, Verletzte?, Freitext
    constructor(Keyword, Callername, Adress, Injured, InjuredNum, Text) {
        this.Keyword = Keyword;
        this.Callername = Callername;
        this.Adress = Adress;
        this.Injured = Injured; //?True/False
        this.InjuredNum = InjuredNum;
        this.Text = Text;
    }
    checkData() {
        let data = [this.Keyword, this.Callername, this.Adress, this.Injured, this.InjuredNum];
        let counts = 1;
        let errors = [];
        data.forEach(element => {
            if ((element == "" || element == undefined || element == null)) {
                switch (counts) {
                    case 1:
                        errors.push("Keyword");
                    //break;
                    case 2:
                        errors.push("Callername");
                    //break;
                    case 3:
                        errors.push("Adress");
                    //break;
                    case 4:
                        errors.push("Injured (bool)");
                    //break;
                    case 5:
                        if (element === 0) {
                            console.log("HEHE");
                            console.log(element);
                            break;
                        } else {
                            console.log("HIHI");
                            errors.push("Injured (count)");
                        }
                    //break;
                }
                throw new Error("Missing Element(s): " + errors.toString());
            }
            counts++;
            return true;
        })
    }
}

let testDispatch = new Dispatch("B0 - Kleinbrand", "Harrald", "Teststr. 1", false, "0", "Brennt Mülleimer");
//KEYWORD | CALLERNAME | ADRESS | (BOOL) | (COUNT) | ?TEXT?

let LeitstellenName = "Reilingen"
let Radio_carName = document.getElementById("Radio_carname");

function clickVehicle(ID) {
    const vehicle = document.querySelector(`.${ID}`);
    console.log(vehicle.id);
    if (vehicle.id == "status-5" || vehicle.id == "status-0") {
        let RadioName = "";
        switch (ID) {
            case "MTW1":
                RadioName = "Florian Reilingen 19/1";
                break;
            case "MTW2":
                RadioName = "Florian Reilingen 19/2";
                break;
            case "HLF":
                RadioName = "Florian Reilingen 46";
                break;
            case "LF16":
                RadioName = "Florian Reilingen 44";
                break;
            case "GWL2":
                RadioName = "Florian Reilingen 74";
                break;
            default:
                throw new Error(`Vehicle ${ID} not found!`);
        }
        Radio_carName.value = RadioName;
        isFunk = true;
        changeStatus(ID, "status-1");
    } else {
        let RadioName2 = "";
        switch (ID) {
            case "MTW1":
                RadioName2 = "Florian Reilingen 19/1";
                break;
            case "MTW2":
                RadioName2 = "Florian Reilingen 19/2";
                break;
            case "HLF":
                RadioName2 = "Florian Reilingen 46";
                break;
            case "LF16":
                RadioName2 = "Florian Reilingen 44";
                break;
            case "GWL2":
                RadioName2 = "Florian Reilingen 74";
                break;
            default:
                throw new Error(`Vehicle ${ID} not found!`);
        }
        Radio_carName.value = RadioName2;
        isFunk = true;
    }
}

let toolTipElement = document.getElementById("ToolTip");

function showToolTip() {
    toolTipElement.style.display = "block";
}

toolTipElement.addEventListener("mouseout", () => {
    toolTipElement.style.display = "none"
});

function openStatusWindow() {
    window.open("./status/status.html");
}

function mainWindowAction() {
    alert("Aktion im Hauptfenster!");
}
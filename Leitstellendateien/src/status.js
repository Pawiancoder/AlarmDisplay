const PrioSprechwunsch = document.getElementById("funk");

const changeStatus = (vehicleID, newStatus) => {
    const vehicle = document.querySelector(`.${vehicleID}`)
    if (vehicle) {
        let statusNum = parseInt(newStatus.split("status-")[1]);
        console.log(statusNum);
        if (statusNum > 6 || statusNum < 0) {
            vehicle.id = "status-6";
            vehicle.innerHTML = 6;
            throw new Error(`Wrong Status Range: ${statusNum}, Vehicle: ${vehicleID}`);
        } else {
            vehicle.id = newStatus;
            vehicle.innerHTML = statusNum;
            if (newStatus == "status-5") {
                PrioSprechwunsch.play();
            } else if (newStatus == "status-0") {
                PrioSprechwunsch.play();
            }
        }
    } else {
        throw new Error(`Vehicle ${vehicle}/${vehicleID} not found!`);
    }
}

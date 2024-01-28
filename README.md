Alarmierungsfenster: http://raspberrypi/

Alarmdisplay: dme.html aus der zip-datei in den Brower

Api anschalten:
    - Per ssh auf PI einwählen
    - cd ~/Desktop/alarm-api
    - node index.js
    antwort "Server up"


Alarme können auf beliebig vielen Monitoren angezeigt werden
Alarme können gestarten & zurückgesetzt werden 
    -> zurücksetzen: haken bei "Alarm beenden auf Monitor: (Haken setzen und alarmieren)" setzen
    -> Andere Angaben in den Feldern werden dann NICHT berücksichtigt und dei Monitore werden in den "Kein Einsatz" Zustand versetzt

Vorraussetzungen:
    - Anbindung an einen PC,
    - Selbes Netzwerk wie der PI (Server)

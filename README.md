Alarmierungsfenster: http://rasp-maksy/ oder die ip-adresse (welche sich mit der Zeit ändern kann (DHCP Server im Router), was der Hostname nicht macht)

Alarmdisplay: dme.html aus der zip-datei in den Brower

Api anschalten:
    - Per ssh auf PI einwählen
    - cd ~/Desktop/alarm-api
    - node index.js
    antwort "Server up"


Alarme können auf beliebig vielen Monitoren angezeigt werden
Alarme können gestarten & zurückgesetzt werden 
    -> zurücksetzen: haken bei "Alarm beenden auf Monitor": (Haken setzen und alarmieren)
    -> Andere Angaben in den Feldern werden dann NICHT berücksichtigt und die Monitore werden in den "Kein Einsatz" Zustand versetzt

Vorraussetzungen:
    - Anbindung an einen PC
    - Selbes Netzwerk (Lan / WLan) wie der PI (Server)

Unterstützte / getestete Browser:
- Firefox
- Chrome    

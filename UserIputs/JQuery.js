$(function () {
    var stichwoerter = ["B0 - Nachschau", "B0 - Nachschau nach Blitzeinschlag", "B0 - Kleinbrand", "B1 - Garagenbrand",
        "B1 - brennender PKW", "B1 - Brennt Gartenhaus",
        "B1 - Flächenbrand", "B2 - Zimmerbrand", "B2 - Waldbrand klein", "B3 - Gebäudebrand", "B3 - BMA", "B3 - Dachstuhlbrand", "B4 - Großflächenbrand",
        "B4 - Waldbrand groß", "TH0 Unterstützung RD", "TH0 - Türöffnung", "TH0 - Ölspur",
        "TH1 - Personensuche", "TH1 - Sturmschaden klein", "TH1 - Wasserschaden", "TH1 - Person hinter Tür", "TH2 - Verkehrsunfall",
        "TH2 - Wasserrettung", "TH2 - Unfall", "TH3 - Gebäudeeinsturz", "TH3 Sturmschaden groß",
        "TH4 - VU mit Gefahrgut", "Gefahrguteinsatz", "Alarmstufenerhöhung auf B1", "Alarmstufenerhöhung auf B2",
        "Alarmstufenerhöhung auf B3", "Alarmstufenerhöhung auf B4", "Alarmstufenerhöhung auf TH1", "Alarmstufenerhöhung auf TH2",
        "Alarmstufenerhöhung auf TH3", "Alarmstufenerhöhung auf zu TH4"]; //Stichwörtersammlung / Array
    $("#In_keyword").autocomplete({
        source: stichwoerter,
    });
});
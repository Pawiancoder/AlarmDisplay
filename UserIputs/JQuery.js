$(function () {
    var stichwoerter = ["B0 - Nachschau", "B0 - Nachschau nach Blitzeinschlag", "B0 - Kleinbrand", "B1 - Garagenbrand",
        "B1 - brennender PKW", "B1 - Brennt Gartenhaus",
        "B1 - Flächenbrand", "B2 - Zimmerbrand", "B2 - Waldbrand klein", "B3 - Gebäudebrand", "B3 - Dachstuhlbrand", "B4 - Großflächenbrand",
        "B4 - Waldbrand groß", "TH0 Unterstützung RD", "TH0 - P Tür (ohne Gefahr)", "TH0 - Ölspur",
        "TH1 - Personensuche", "TH1 - Sturmschaden klein", "TH1 - Wasserschaden", "TH1 - P Tür (Gefahr)", "TH2 - Verkehrsunfall",
        "TH2 - Wasserrettung", "TH2 - Unfall", "TH3 - Gebäudeeinsturz", "TH3 Sturmschaden groß",
        "TH4 - VU mit Gefahrgut", "Gefahrguteinsatz"]; //Stichwörtersammlung / Array
    $("#In_keyword").autocomplete({
        source: stichwoerter,
        //position: { my: "right top", at: "right bottom" },
    });
});
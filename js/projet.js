function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

var map;


function createMarqueur( tab, map){
    var tableauMarkers = [];
    var oLatLng, oMarker, data;
    var i, nb = tab.length;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.758494, lng: 4.827043},
        zoom: 13
    });

    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=368e6555bbdbd392efb7876eb0c1ea841e817a2a", function(data){
        var reponse = JSON.parse(data);
        var markersStation = reponse.map(function(item){
            var station = Object.create(Station);
            station.init(item);
            if(station.status === "CLOSED" || station.dispo === 0){
                var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
                var icons = iconBase + 'caution_maps.png';
            }
            oLatLng = new google.maps.LatLng(station.lat, station.lng); 
            oMarker = new google.maps.Marker({
                position : oLatLng,
                icon: icons,
                map : map
            }); 
            oMarker.addListener('click', function(){
                station.detailStation();
            });
            return oMarker;
        });
        var markerCluster = new MarkerClusterer(map, markersStation,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
   });
    if(sessionStorage.getItem('chronoTime') !== null){
        chrono.init();
        chrono.start();
        chrono.resume();
    }
}

$('#canva-resa').click(function (){
    if(!signaturePad.isEmpty()) {
        chrono.init();
        chrono.start();
        chrono.save();
        chrono.resume();
    }
});

$('#modif').click(function (){
    chrono.remove();
    
});

var objectSlid = Object.create(Slider);
objectSlid.init();
setInterval(function(){objectSlid.chgImg(1)}, 5000);
document.getElementById("prev").onclick = function() {objectSlid.chgImg(-1)}; 
document.getElementById("next").onclick = function() {objectSlid.chgImg(1)};
document.onkeydown = function(){objectSlid.keyImg(event)};

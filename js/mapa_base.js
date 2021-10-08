var mymap = L.map('mapid').setView([1.39322, -77.6497169], 8);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZnJhbmtsaW45MyIsImEiOiJja2FzYWp3NHYwYnF6MnRwYmNyODJ3MWFmIn0.xl8Lg71rMN8tvPlmPQNmnA'
        }).addTo(mymap);


    function style_mpios(feature) {										
        return {
        fillColor: 'white',
        weight: 2,
        opacity: 0.5,
        color: 'black',
        dashArray: '1',
        fillOpacity: 0
        }};
        
var municipios = L.geoJson(municipios,{
    style: style_mpios
}).addTo(mymap);

var geomorfo = L.tileLayer.wms('http://localhost:8080/geoserver/pod_narino/wms',{
    layers: 'geomorfologia',
    style: 'geomorfologia_estilo',
    format: 'image/png',
    attribution:'POD Nariño',
    transparent: true
}).addTo(mymap);
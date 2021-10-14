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

var mapa_base;


function cambiar_mapabase(capa){
    if (mymap.hasLayer(mapa_base)) {
        mymap.removeLayer(mapa_base);
      }
      if(capa!='ninguna'){
        mapa_base = L.tileLayer.wms('http://localhost:8080/geoserver/pod_narino/wms',{
            layers: capa,
            style: capa+'_estilo',
            format: 'image/png',
            attribution:'POD Nariño',
            transparent: true
        }).addTo(mymap);
      }
};

//control de escala
L.control.scale({imperial:false}).addTo(mymap);

//Adicionar leyenda
const leyenda = L.control.Legend({
    position: "bottomright",
    collapsed: false,
    symbolWidth: 24,
    opacity: 1,
    column: 1,
    legends: [{
        label: "Municipios",
        type: "rectangle",
        color: "black",
        fillColor:"white",
        dashArray:[2,2],
        weight: 2
    },
    {
        label: "mapa_base",
        type: "rectangle",
        url: "'http://localhost:8080/geoserver/pod_narino/wms'"
    }]
}).addTo(mymap);
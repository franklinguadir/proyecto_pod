var mymap = L.map("mapid", {center: [1.39322, -77.6497169], zoom: 8, zoomControl: false});

var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            minZoom: 8,
            maxZoom: 18,
            zoomControl: false,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZnJhbmtsaW45MyIsImEiOiJjbDJmb2h3cjIwMnB6M2pwaWNxMXhhMmI5In0.t2CIbZvMYnpNcWXgG0y0qg'
        }).addTo(mymap); 

var zoom_bar = new L.Control.ZoomBar({position: 'topleft'}).addTo(mymap);

var mapa_base;

function cambiar_mapabase(capa){
    if (mymap.hasLayer(mapa_base)) {
        mymap.removeLayer(mapa_base),
        mymap.removeControl(layerLegend);
      }
    
      if(capa!='ninguna'){
        mapa_base = L.tileLayer.wms('http://localhost:8080/geoserver/pod_narino/wms',{
            layers: capa,
            style: capa+'_estilo',
            format: 'image/png',
            attribution:'POD Nariño',
            transparent: true,
            tiled: true,
            //opacity: 0.7
        }).addTo(mymap);
    }
      if(capa!='niguna' && capa!='geologia_1' && capa!='geomorfologia'){
        layerLegend = L.Geoserver.legend("http://localhost:8080/geoserver/pod_narino/wms",{
        layers: capa,
        }).addTo(mymap);
    }   
};

//control de escala
L.control.scale({imperial:false}).addTo(mymap);

var info = L.control();

// Crear un div con una clase info
info.onAdd = function(mymap){
    this._div = L.DomUtil.create('div','info');
    this.update();
    return this._div;
};

// Agregar el metodo que actualiza el control segun el puntero vaya pasando
info.update = function(props){
    this._div.innerHTML = '<h4>Descripción</h4>' + 
                            (props ? '<b>' + props.MPIO_CNMBR + '</b><br/>' + props.SUB_REGION + '</sup>'
                            : 'Pase el puntero por un municipio');
};

info.addTo(mymap);

// Generar rangos de colores de acuerdo con el atributo o campo TOT_VIVIEN
function style_mpios(feature) {										
    return {
    fillColor: '#ffffff00',
    weight: 2,
    opacity: 0.3,
    color: 'black',
    dashArray: '1',
    fillOpacity: 0
}};

// Crear la funcion para mostrar la simbologia de acuerdo al campo TOT_VIVIEN

function style(feature){
    return {
        fillColor: getColor(feature.properties.MPIO_CNMBR),
        weight: 2,
        opacity: 0.3,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// AGregar interaccion del puntero con la capa para resaltar el objeto
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#FFE333',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties);
}

// Configurar los cambios de resaltado y zoom de la capa

var municipios;
var wmsgeologia;

function resetHighlight(e){
    municipios.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e){
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer){
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

municipios = L.geoJson(municipios,{
    style: style_mpios,
    onEachFeature: onEachFeature    
}).addTo(mymap);

var wmsgeologia = L.tileLayer.wms('http://localhost:8080/geoserver/pod_narino/wms?',{layers:'geologia_1'});
var wfsURL = wmsgeologia + "WFS&version=1.1.0&request=GetFeature&typeName=geologia_1&oupudFormat=application/json"

async function getWFSgeojson() {
    try{
        const response = await fetch(wfsURL);
        console.log(response);
        return await response.json();

    } catch(err){
        console.log(err);
    }
}
getWFSgeojson();

//impresión de mapas
var popup = L.popup();
var printer = L.easyPrint({
    tileLayer: mymap,
    sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
    filename: 'Mi mapa impreso',
    exportOnly: true,
    hideClasses: ['leaflet-control-easyPrint'],
    hideControlContainer: false
}).addTo(mymap);

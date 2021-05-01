var mymap = L.map('mapid').setView([1.2146013, -77.2782755], 8);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZnJhbmtsaW45MyIsImEiOiJja2FzYWp3NHYwYnF6MnRwYmNyODJ3MWFmIn0.xl8Lg71rMN8tvPlmPQNmnA'
        }).addTo(mymap);
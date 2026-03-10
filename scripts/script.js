let airports;
let voronoiPolygons;
function FetchAiports(){
fetch("data/airports.geojson")
.then(response => response.json())
.then(
    data => {
        console.log("start fetch")
        console.log(data)
        airports = data
        console.log("data fetched :)")
        voronoiPolygons = turf.voronoi(airports);
        for (i = 0; i < airports.features.length; i++){
            voronoiPolygons.features[i].properties.name = airports.features[i].properties.name
        }
    
        console.log("run voronoi")
        DisplayAirports()
        console.log("display the points")
    }
);
}


window.onload =  function (){
FetchAiports();
}

var map = L.map('map')
        .setView([20, 0], 3)

L.tileLayer(
           'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              maxZoom: 19,
              attribution:
                '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> <strong><a href="https://labs.mapbox.com/contribute/" target="_blank">Improve this map</a></strong>'
            }
          ).addTo(map);



function DisplayAirports(){;
    L.geoJSON(voronoiPolygons, {
        fillOpacity: 0.1,
        opacity: 1
    }).addTo(map)
    //L.geoJSON(airports).addTo(map)
    
    
}



map.on('click', function (e){

    let point = turf.point([e.latlng.lat,e.latlng.lng]);
    console.log(turf.booleanPointInPolygon(point,voronoiPolygons))
   
    
}) 

window.onload = function() {
    FetchAiports()
}

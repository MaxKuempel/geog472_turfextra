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



function DisplayAirports(){
    L.geoJSON(airports).addTo(map)
    L.geoJSON(voronoiPolygons).addTo(map)
    
}



map.on('click', function (e){
    console.log('bleh')
    console.log(e.latlng)
})//evennt listener :B
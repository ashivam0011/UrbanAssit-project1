//  extra work
 
// var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
// var imageryMap = L.tileLayer.provider('Esri.WorldImagery');
// var darkMap = L.tileLayer.provider('Stadia.AlidadeSmoothDark');

// var baseMaps = {
//     OSM: osmMap,
//     'World Imagery': imageryMap,
//     'Smooth Dark': darkMap
// }

 var baseLayer = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});

var map = L.map('map',{

    center: [22.735656, 79.892578],
    zoom: 10,
    zoomControl: false,

    // here instead of osmMap there should be baselayer
    layers: [baseLayer],
    
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
            text: 'Start from here',
            callback: startHere
    }, '-', {

        text: 'Go to here',
        callback: goHere

    }]
});

 L.control.locate().addTo(map);

 
// extra part
// var mapLayers = L.control.layers(baseMaps).addTo(map);
// // extra part

var control = L.Routing.control({

    waypoints: [

     L.latLng(23.0225, 72.5714),
     L.latLng(23.2294, 72.6741)

    ],
    createMarker: function (i, waypoints, n) {

       var startIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', 
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        iconSize: [25, 41], 
        iconAnchor: [12, 41], 
        popupAnchor: [1, -34], 
        shadowSize: [41, 41]
         });
       
       var sampahIcon = L.icon({
         iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png', 
         shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
         iconSize: [25, 41], 
         iconAnchor: [12, 41], 
         popupAnchor: [1, -34], 
         shadowSize: [41, 41]
         });
       
        var destinationIcon = L.icon({
         iconUrl:'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
         shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
         iconSize: [25, 41], 
         iconAnchor: [12, 41], 
         popupAnchor: [1, -34], 
         shadowSize: [41, 41]
         });

         if (i == 0){
            marker_icon = startIcon
         } else if (i > 0  &&  i < n - 1) {
            marker_icon = sampahIcon
         } else if (i == n - 1) {
            marker_icon = destinationIcon
         }
         var marker = L.marker(waypoints.latLng,{
                draggable: true,
                bounceOnhold: true,
                bounceOnAddOptions: {
                      duration: 1000,
                      height: 800,
                      function() {
                        (bindPopup(myPopup).openOn(mymap))
                      }
                },
                icon: marker_icon

         });
         return marker
        },
    showAlternatives: true,
    altLineOptions: {

       styles: [

          {color: 'black', opacity: 0.15, weight: 9},
          {color: 'white', opacity: 0.8, weight: 6},
          {color: 'blue', opacity: 0.5, weight: 2}

       ]


    },
    geocoder: L.Control.Geocoder.nominatim()
})
 
.on('routingstart', showSpinner)
.on('routesfound routingerror', hideSpinner)
.addTo(map); 



function startHere (e){
    control.spliceWaypoints(0, 1, e.latlng);
}

function goHere(e){
    control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
}

var spinner = true;
function showSpinner(){
      if (spinner) {
        document.getElementById("loader").style.display = "block";
      }
}

function hideSpinner(){
    if (spinner) {
      document.getElementById("loader").style.display = "none";
    }
}
map.on('zoomstart', function(e) { spinner = false });
map.on('zoomend', function(e) { spinner = true });

// var ctlMeasure = L.control.polylineMeasure ({
//   position: "topleft",
//   measureControlTitle: "Measure Length"
// }).addTo(map);
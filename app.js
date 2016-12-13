var selection = document.getElementById("select");
var dataButton = document.getElementById("getdata");
var mapButton = document.getElementById("getmap");
var results = document.getElementById("results");
var mapArea = document.getElementById("map")

var areaMap = L.map('map').fitBounds([
    [45.542001, -122.801056],
    [45.458945, -122.580814]
]);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(areaMap);

dataButton.addEventListener("click", function() {


    var urlBase = "http://biketownpdx.socialbicycles.com/opendata/free_bike_status";
    var urlEnd = ".json";
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", callback);
    xhr.open("GET", urlBase + urlEnd);
    xhr.send();

    function callback() {

        var data = JSON.parse(xhr.responseText);
        var htmlString = "";
        console.log(selection);
        htmlString += '<h3>Total Free Bikes available ' + data.data.bikes.length+ '</h3>'

        if(selection.value === "Any"){
            
            for(var i=0; i< data.data.bikes.length; i++){
                var marker = L.marker([data.data.bikes[i]['lat'], data.data.bikes[i]['lon']]).bindPopup(data.data.bikes[i]['name']).addTo(areaMap);
            
            }
            results.innerHTML = htmlString + '<div><button id="getMap">Map It?</button></div>';
            mapButton.hidden = "false"
        };
        
        if(selection.value === "Sneaker"){
            for(var i=0; i< data.data.bikes.length; i++){
                if(data.data.bikes[i]['name'].search("BIKETOWN") === -1){
                var marker = L.marker([data.data.bikes[i]['lat'], data.data.bikes[i]['lon']]).bindPopup(data.data.bikes[i]['name']).addTo(areaMap);
                }  
            
            }
            results.innerHTML = htmlString 
        };
      
    }



});
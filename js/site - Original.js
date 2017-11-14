$(document).ready(function(){
    $( "#progressbar" ).progressbar({
    value: 0
});
    $( "#radioset" ).buttonset();
});

 mapboxgl.accessToken = 'pk.eyJ1IjoiYnlyb25hZXJvIiwiYSI6ImNpaGgxeGkzaTBtZjl0Y2x6bmp6YW02NnQifQ.4tkhTXyt_T7Cfxbmre8Z-w';
        var polydata = JSON.parse(localStorage.getItem("polygondata"));
        var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-v9',
        // initial position in [lon, lat] format
        center: [153.007394, -27.554095],
        // initial zoom
        zoom: 18
        });

    map.on('load', function () {
        map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
        }));

        map.addLayer({
            'id': 'my-site',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                    'geometry': {
                            'type': 'Polygon',
                            'coordinates': [[polydata[0],
                                            polydata[1],
                                            polydata[2],
                                            polydata[3]]]
                }
            }
        },
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
    });
});

$("#progressbar > div").css({ 'background': '#00ff00' });


/*'<div class="content"><div class="recurrence">Recurrence</div>'
                            + '<select class="recurrencelist">  <option selected>Once</option> <option>Daily</option> <option>Weekly</option> <option>Monthly</option></select>'
                            + '<div class="priority">Priority Level</div>'
                            + '<select class="prioritylist">  <option>Priority 1</option> <option>Priority 2</option> <option selected>Priority 3</option> </select>'
                            + '<div class="data">Data Required</div>'
                            + '<input type="checkbox" id="rgb"><label>RGB</label>'
                            + '<input type="checkbox" id="thermal"><label>Thermal</label>'
                            + '<input type="checkbox" id="near-infrared"><label>Near-Infrared</label>'
                            + '<input type="checkbox" id="hyperspectral"><label>Hyperspectral</label>'
                            + '<div class="calculation-box" id="fgh">Select area to image.</div>'
                            + '<span id="calculated-area"></span>'
                            + '<input type="submit" value="Start Mission" onclick="sitedetails()">'
                            + '</div>');*/

function viewdata(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnlyb25hZXJvIiwiYSI6ImNpaGgxeGkzaTBtZjl0Y2x6bmp6YW02NnQifQ.4tkhTXyt_T7Cfxbmre8Z-w';
        var mapStyle = {
            "version": 8,
            "sources": {
                "satellite": {
            "type": "raster",
            "url": "mapbox://mapbox.satellite",
            "tileSize": 256
                },
                "overlay": {
                    "type": "image",
                    "url": "https://vignette.wikia.nocookie.net/narnia/images/7/7e/Caspian_dawn_treader.png/revision/latest?cb=20101213200426",
                    "coordinates": [
                        [153.007059, -27.553928], //top left
                        [153.007558, -27.553928],
                        [153.007558, -27.554348], //bottom right
                        [153.007059, -27.554348]
                    ]
                }
            },
            "layers": [{
                "id": "background",
                "type": "background",
                "paint": { "background-color": "rgb(4,7,14)" }
            }, {
                "id": "satellite",
                "type": "raster",
                "source": "satellite"
            }, {
                "id": "overlay",
                "type": "raster",
                "source": "overlay",
            }]
        };
        var map = new mapboxgl.Map({
            container: 'map',
            //minZoom: 14,
            zoom: 18,
            center: [153.007394, -27.554095],
            //bearing: 87,
            style: mapStyle,
});

        map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
        }));

///////////// Add Drawing Function ///////////////////
var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
        polygon: true,
        trash: true
        }
        });

        map.addControl(draw);

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);

        function updateArea(e) {
        var data = draw.getAll();
        var answer = document.getElementById('drawn-area');
        if (data.features.length > 0) {
            var area = turf.area(data);
            // restrict to area to integer
            var rounded_area = Math.round(Math.round(area*100)/100);
            answer.innerHTML = '<strong contenteditable="true">' + rounded_area + '</strong> m<sup>2</sup> selected.';
            localStorage.setItem("drawndata", JSON.stringify(data.features[0].geometry.coordinates[0]));
            /*console.log(data.features[0].geometry.coordinates[0]);*/
        } else {
            answer.innerHTML = '';
        }
        }
    }

function checkprogress(){
        var val = 1;
        var max = 10;
        var progressSoFar = $( "#progressbar" ).progressbar( "value" );
        $( "#progressbar" ).progressbar( "value", 10 );
        if (progressSoFar<max){
            val = val + 10;
            $( "#progressbar" ).progressbar( "value", val );
        }
}


function taskout(){
document.getElementById("btn-taskout").value = 'Tasking out...';
var x = document.getElementById("progress");
x.style.display = "block";
//document.getElementById("progress").innerHTML = '<div id="progressbar"></div>';
countdown();
map.jumpTo({ 'center': [153.003444, -27.546000], 'zoom': 14 });

//-27.546006, 153.003441
    // add the GeoJSON above to a new vector tile source
    map.addSource('drone', { type: 'geojson', data: point });

    map.addLayer({
        "id": "drone-glow-strong",
        "type": "circle",
        "source": "drone",
        "paint": {
            "circle-radius": 18,
            "circle-color": "#fff",
            "circle-opacity": 0.4
        }
    });

    map.addLayer({
        "id": "drone-glow",
        "type": "circle",
        "source": "drone",
        "paint": {
            "circle-radius": 40,
            "circle-color": "#fff",
            "circle-opacity": 0.1
        }
    });

    map.addLayer({
        "id": "drone",
        "type": "symbol",
        "source": "drone",
        "layout": {
            "icon-image": "airport-15",
            "icon-rotation-alignment": "map"
        }
    });
var timenow = new Date().getTime();

window.setInterval(function(){ // Set interval for checking

    var date = new Date().getTime(); // Create a Date object to find out what time it is
    if((date-timenow)<70000){ // Check the time
        setPosition1();}
    else if ( (date-timenow)>70000  && (date-timenow)<90000) {
        setPosition2(); }
        else if ( (date-timenow)>90000  && (date-timenow)<100000) {
            setPosition3();
} else {
    setPositionstop();
    }
}, 100); // Repeat every 60000 milliseconds (1 minute)

}

function countdown(){
// Set the date we're counting down to
var timeallocated = (0.05 * 60 * 1000)
var countDownDate = new Date().getTime() + timeallocated;
    countDownDate = new Date(countDownDate);
var progressleft = 100 - $( "#progressbar" ).progressbar( "value" );
//Work out how much value should increase on average
 progressleft = timeallocated/progressleft;
 progressupdate(progressleft);
// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML = "Data available in : " + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("btn-taskout").value = 'Task Out Available';
        ////append
        $('#viewdata').append('<input type="submit" name="submit" class="btn-addsite" value="View Data" onclick="viewdata()">');
        $('#analysis').append('<input type="submit" name="submit" class="btn-addsite" value="Analysis" onclick="viewdata()">');
        document.getElementById("timer").innerHTML = "Data is now available";
    }
}, 1000);

}

function progressupdate(progressleft){
    var y = setInterval(function(){
        var getprogress = $( "#progressbar" ).progressbar( "value" );
        document.getElementById("progresspct").innerHTML = 'Completion Rate : ' + Math.round((getprogress)) + '%';
        document.getElementById("distanceaway").innerHTML = 'Distance To Destination : ' + Math.round((100 - getprogress)*1.63732) + 'm';
        $( "#progressbar" ).progressbar( "value", getprogress + 1)},progressleft);

}



//////////////////////////////

var speed = 0.002;

// create a GeoJSON point to serve as a starting point
var point = {
    "type": "Point",
    "coordinates": [152.995604, -27.535429]
};

function setPosition1() {
    direction=2.4;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));

    //map.setCenter(point.coordinates);
}

function setPosition2() {
    direction=4;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPosition3() {
    direction=2;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPositionstop() {
    direction=2;
    speed=0;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

///////////

$(function () {
    var size = ['0.5', '1', '2', '3', '4'];
    $('#slider').slider({
        min: 0,
        max: 4,
        step: 1,
        create: function (event, ui) {
            $('#selectedMonth').text(size[0]);
        },
        slide: function (event, ui) {
            $('#selectedMonth').text(size[ui.value]);
        }
    });
});

/// Map Slider ///
function mapslider(){

var afterMapStyle = {
            "version": 8,
            "sources": {
                "satellite": {
            "type": "raster",
            "url": "mapbox://mapbox.satellite",
            "tileSize": 256
                },
                "overlay": {
                    "type": "image",
                    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wikipedia-logo-v2-en.svg/1200px-Wikipedia-logo-v2-en.svg.png",
                    "coordinates": [
                        [153.007059, -27.553928], //top left
                        [153.007558, -27.553928],
                        [153.007558, -27.554348], //bottom right
                        [153.007059, -27.554348]
                    ]
                }
            },
            "layers": [{
                "id": "satellite",
                "type": "raster",
                "source": "satellite"
            }, {
                "id": "overlay",
                "type": "raster",
                "source": "overlay",
            }]
        };

var afterMap = new mapboxgl.Map({
 container: 'after',
    //style: 'mapbox://styles/mapbox/dark-v9',
    style: afterMapStyle,
    zoom: 18,
    center: [153.007394, -27.554095],
});

var asd = new mapboxgl.Compare(map, afterMap, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
});
}
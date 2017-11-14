$(document).ready(function(){
    $( "#progressbar" ).progressbar({
    value: 0
});
    $( "#radioset" ).buttonset();
});

window.onload=hidepanel();
function hidepanel() {
        $header = $("#analysistype");
    $header.next().hide();
    $("#after").hide();
}

window.onload = function() {
    var end_time = JSON.parse(localStorage.getItem("endtime"));
        end_time = new Date(end_time);
    var updaterate1 = JSON.parse(localStorage.getItem("updaterate"));
    var timenow = new Date().getTime();
    if(timenow < end_time){
        ///Show taskout panel on loadout

        // button changes to tasking out...
        document.getElementById("btn-taskout").value = 'Tasking Out...';
        // Timer shows time left
        countdown1(end_time,updaterate1);
        // Distance shows distance left

        // Progress bar shows progress
        var x = document.getElementById("progress");
        x.style.display = "block";
    }
};

/*window.onbeforeunload = function(evt) {
    if(distance && distance > 0){
        var currentprogress = $( "#progressbar" ).progressbar( "value" )
        localStorage.setItem("progress", JSON.stringify(currentprogress));
    }
    window.open("https://www.w3schools.com");
    return true;
}*/

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
                            'coordinates': [polydata]
                }
            }
        },
        'layout': {},
        'paint': {
            "fill-color": "#27e846",
            "fill-opacity": 0.5
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
                    "url": "http://nearsat.com/img/taskoutdemo.jpg",
                    //"url": "https://vignette.wikia.nocookie.net/narnia/images/7/7e/Caspian_dawn_treader.png/revision/latest?cb=20101213200426",
                    "coordinates": [
                        [153.007247, -27.554039], //top left
                        [153.007671, -27.554039],
                        [153.007671, -27.554311], //bottom right
                        [153.007247, -27.554311]
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


function taskout(){
document.getElementById("btn-taskout").value = 'Tasking Out...';
var x = document.getElementById("progress");
x.style.display = "block";
//document.getElementById("progress").innerHTML = '<div id="progressbar"></div>';
countdown();
map.flyTo({ 'center': [153.005761, -27.553472], 'zoom': 17 , 'bearing': 0, 'speed':0.7})

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
            "circle-opacity": 0.5
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
    if((date-timenow)<85000){ // Check the time
        setPosition1();}
    else if ( (date-timenow)>85000  && (date-timenow)<100000) {
        setPosition2(); }
        else if ( (date-timenow)>100000  && (date-timenow)<105000) {
            setPosition3();}
             else if ( (date-timenow)>105000  && (date-timenow)<120000) {
                setPosition4();}
            else if ( (date-timenow)>120000  && (date-timenow)<125000) {
                setPosition5();}
            else if ( (date-timenow)>125000  && (date-timenow)<135000) {
                setPosition6();}
            else if ( (date-timenow)>135000  && (date-timenow)<145000) {
                setPosition7();}
            else if ( (date-timenow)>145000  && (date-timenow)<155000) {
                setPosition8();}
            else if ( (date-timenow)>155000  && (date-timenow)<165000) {
                setPosition9();}
            else if ( (date-timenow)>165000  && (date-timenow)<210000) {
                setPosition10();}
 else {
    setPositionstop();
    }
}, 100); // Repeat every 60000 milliseconds (1 minute)

}

function countdown(){
// Set the date we're counting down to
//var timeallocated = (0.05 * 60 * 1000)
var timeallocated = (15 * 60 * 1000)
var countDownDate = new Date().getTime() + timeallocated;
    countDownDate = new Date(countDownDate);
    localStorage.setItem("endtime", JSON.stringify(countDownDate));
var progressleft = 100 - $( "#progressbar" ).progressbar( "value" );
//Work out how much value should increase on average
 updaterate = timeallocated/progressleft;
 localStorage.setItem("updaterate", JSON.stringify(updaterate));
 progressupdate(updaterate);
// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML = "Data available in : " + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("btn-taskout").value = 'Task Out Available';
        ////append
        //$('#viewdata').append('<input type="submit" name="submit" class="btn-login" value="View Data" onclick="viewdata()">');
        //$('#analysis').append('<input type="submit" name="submit" class="btn-login" id="btn-taskout" value="Analysis" onclick="analysistypetoggle()">');
        document.getElementById("timer").innerHTML = "Data is now available";
    }
}, 1000);

}

function progressupdate(progressleft){
    var y = setInterval(function(){
        var getprogress = $( "#progressbar" ).progressbar( "value" );
        document.getElementById("progresspct").innerHTML = 'Taskout completion : ' + Math.round((getprogress)) + '%';
        $( "#progressbar" ).progressbar( "value", getprogress + 1)},progressleft);

}

function progressupdate1(updaterate1, valuenow){
    $( "#progressbar" ).progressbar( "value", valuenow);
    document.getElementById("progresspct").innerHTML = 'Taskout completion : ' + Math.round((valuenow)) + '%';

    var y = setInterval(function(){
        var getprogress = $( "#progressbar" ).progressbar( "value" );
        document.getElementById("progresspct").innerHTML = 'Completion Rate : ' + Math.round((getprogress)) + '%';
        $( "#progressbar" ).progressbar( "value", getprogress + 1)},updaterate1);
}


//////////////////////////////

var speed = 0.0005;

// create a GeoJSON point to serve as a starting point
var point = {
    "type": "Point",
    "coordinates": [153.003930, -27.552441]
};

function setPosition1() {
    direction=2.05;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));

    //map.setCenter(point.coordinates);
}

function setPosition2() {
    direction=0.5;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPosition3() {
    direction=5;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPosition4() {
    direction=3.5;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPosition5() {
    direction=5;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPosition6() {
    direction=0.5;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPosition7() {
    direction=5;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPosition8() {
    direction=3.5;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPosition9() {
    direction=5;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

function setPosition10() {
    direction=5.5;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}


function setPositionstop() {
    direction=5.5;
    speed=0;
    point.coordinates[0] += speed * Math.sin(direction) / 100;
    point.coordinates[1] += speed * Math.cos(direction) / 100;
    map.getSource('drone').setData(point);

    map.setLayoutProperty('drone', 'icon-rotate', direction * (180 / Math.PI));
    //map.setCenter(point.coordinates);
}

///////////

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

////////////// Analysis Panel //////////////

function analysistypetoggle(){
    $header = $("#analysistype");
    //getting the next element
    $content = $header.next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideToggle(400);
    }
function treecountingtoggledown(){
    analysistypetoggle()
    setTimeout(function(){
        $header = $("#analysistype");
        //getting the next element
        $content = $header.next().next();
        //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
        $content.slideDown(400);
    }, 400); 
    }
function treecountingtoggleup(){
    $header = $("#analysistype");
    //getting the next element
    $content = $header.next().next();
    //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
    $content.slideUp(400);
    setTimeout(analysistypetoggle(), 400); 
    }

var size = ['0.5', '1', '2', '3', '4'];
    $('#slider').slider({
        min: 0,
        max: 4,
        step: 1,
        value: 1,
        create: function (event, ui) {
            $('#selectedMonth').text(size[1]);
        },
        slide: function (event, ui) {
            $('#selectedMonth').text(size[ui.value]);
        }
    });

////////////// On return to window after tasking out //////////////
function countdown1(end_time, updaterate1){
// Update progress bar
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = end_time - now;
    var valuenow = Math.round(100 - (distance/updaterate1));
    progressupdate1(updaterate1,valuenow);

// Update the count down every 1 second
var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = end_time - now;
    
    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Output the result in an element with id="demo"
    document.getElementById("timer").innerHTML = "Data available in : " + minutes + "m " + seconds + "s ";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("btn-taskout").value = 'Task Out Available';
        ////append
        //$('#viewdata').append('<input type="submit" name="submit" class="btn-addsite" value="View Data" onclick="viewdata()">');
        //$('#analysis').append('<input type="submit" name="submit" class="btn-addsite" value="Analysis" onclick="analysistypetoggle()">');
        document.getElementById("timer").innerHTML = "Data is now available";
    }
}, 1000);

}
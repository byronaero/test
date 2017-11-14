$(document).ready(function(){
    $( "#progressbar" ).progressbar({
    value: 1
});
    $( "#radioset" ).buttonset();

    $( "#datepicker" ).datepicker({
    inline: true
});
    $('#timepicker').timepicker();;
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

        map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
        }));

    map.on('load', function () {
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
            "fill-color": "#27e846",
            "fill-opacity": 0.5
        }
    });
});

$("#progressbar > div").css({ 'background': '#00ff00' });

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


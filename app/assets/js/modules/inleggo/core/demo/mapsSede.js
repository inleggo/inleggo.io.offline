var styles = [{
    "featureType": "landscape",
    "stylers": [{
        "hue": "#FFBB00"
    }, {
        "saturation": 43.400000000000006
    }, {
        "lightness": 37.599999999999994
    }, {
        "gamma": 1
    }]
}, {
    "featureType": "road.highway",
    "stylers": [{
        "hue": "#FFC200"
    }, {
        "saturation": -61.8
    }, {
        "lightness": 45.599999999999994
    }, {
        "gamma": 1
    }]
}, {
    "featureType": "road.arterial",
    "stylers": [{
        "hue": "#FF0300"
    }, {
        "saturation": -100
    }, {
        "lightness": 51.19999999999999
    }, {
        "gamma": 1
    }]
}, {
    "featureType": "road.local",
    "stylers": [{
        "hue": "#FF0300"
    }, {
        "saturation": -100
    }, {
        "lightness": 52
    }, {
        "gamma": 1
    }]
}, {
    "featureType": "water",
    "stylers": [{
        "hue": "#0078FF"
    }, {
        "saturation": -13.200000000000003
    }, {
        "lightness": 2.4000000000000057
    }, {
        "gamma": 1
    }]
}, {
    "featureType": "poi",
    "stylers": [{
        "hue": "#00FF6A"
    }, {
        "saturation": -1.0989010989011234
    }, {
        "lightness": 11.200000000000017
    }, {
        "gamma": 1
    }]
}];

function initializeMap(mapCanvas,lat_,lng_,sede_) {
    var myLatLng = {lat: lat_, lng: lng_};
    var contentString = "<div class='card-head text-accent-dark'><head class='text-accent-dark'>" + sede_ + "</head></div>";
    var styledMap = new google.maps.StyledMapType(styles,{name: "Inleggo"});

    var mapOptions = {
        zoom: 16,
        center: myLatLng,
        mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };

    var map = new google.maps.Map(document.getElementById(mapCanvas),
        mapOptions);
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Sede',
        icon: "/assets/img/modules/inleggo/marker-green.png"
    });

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

};
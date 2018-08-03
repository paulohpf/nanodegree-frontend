import React, {Component} from 'react';
import LocationList from './LocationList';

class App extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = {
            'alllocations': [
                {
                    'name': "Papa Tudo Lanchonete",
                    'type': "Lanchonete",
                    'latitude': -22.3165328,
                    'longitude': -49.10701416,
                    'streetAddress': "Av. Pinheiro Machado, Quadra 14, Número 82"
                },
                {
                    'name': "Fornellone Pizzaria",
                    'type': "Pizzaria",
                    'latitude': -22.3158382,
                    'longitude': -49.10815116,
                    'streetAddress': "Av. Pinheiro Machado, Quadra 16, Número 88"
                },
                {
                    'name': "Pizzaria Passione Bauru",
                    'type': "Pizzaria",
                    'latitude': -22.3141316,
                    'longitude': -49.089966121,
                    'streetAddress': "Rua Carlos Marques, Quadra 15, Número 60"
                },
                {
                    'name': "Carllonni Pizzaria",
                    'type': "Pizzaria",
                    'latitude': -22.31381,
                    'longitude': -49.09073821,
                    'streetAddress': "Rua Carlos Marques, Quadra 16, Número 70"
                },
                {
                    'name': "Pizzaria Florenze",
                    'type': "Pizzaria",
                    'latitude': -22.3141108,
                    'longitude': -49.082407421,
                    'streetAddress': "Rua Alto Acre, Quadra 894, Número 984"
                },
                {
                    'name': "PamPastéis",
                    'type': "Pastelaria",
                    'latitude': -22.3135739,
                    'longitude': -49.083582921,
                    'streetAddress': "Rua Alto Acre - Vila Seabra"
                },
                {
                    'name': "Padaria Sabor & cia",
                    'type': "Padaria",
                    'latitude': -22.3146109,
                    'longitude': -49.08884161922,
                    'streetAddress': "Rua Caetano Cariani"
                },
                {
                    'name': "Padaria São Pedro",
                    'type': "Padaria",
                    'latitude': -22.3139432,
                    'longitude': -49.090837121,
                    'streetAddress': "Rua Carlos Marques, Quadra 16, Número 73"
                },
                {
                    'name': "Beer Brothers",
                    'type': "Bar",
                    'latitude': -22.3147187,
                    'longitude': -49.09158121,
                    'streetAddress': "Av. Pinheiro Machado, Quadra 1, Número 7"
                },
                {
                    'name': "Ranger's bar",
                    'type': "Bar",
                    'latitude': -22.3155001,
                    'longitude': -49.090320221,
                    'streetAddress': "Rua Rui Barbosa,"
                }
            ],
            'map': '',
            'infowindow': '',
            'prevmarker': ''
        };

        // retain object instance when used in the function
        this.initMap = this.initMap.bind(this);
        this.openInfoWindow = this.openInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

    componentDidMount() {
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAYUtc5zAonm5KfX-356f14MlvNr1eN_Pw&callback=initMap')
    }

    /**
     * Initialise the map once the google map script is loaded
     */
    initMap() {
        var self = this;

        var mapview = document.getElementById('map');
        mapview.style.height = window.innerHeight + "px";
        var map = new window.google.maps.Map(mapview, {
            center: {lat: -22.3163799, lng: -49.103},
            zoom: 15,
            mapTypeControl: false
        });

        var InfoWindow = new window.google.maps.InfoWindow({});

        window.google.maps.event.addListener(InfoWindow, 'closeclick', function () {
            self.closeInfoWindow();
        });

        this.setState({
            'map': map,
            'infowindow': InfoWindow
        });

        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            self.state.map.setCenter(center);
        });

        window.google.maps.event.addListener(map, 'click', function () {
            self.closeInfoWindow();
        });

        var alllocations = [];
        this.state.alllocations.forEach(function (location) {
            var longname = location.name + ' - ' + location.type;
            var marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function () {
                self.openInfoWindow(marker);
            });

            location.longname = longname;
            location.marker = marker;
            location.display = true;
            alllocations.push(location);
        });
        this.setState({
            'alllocations': alllocations
        });
    }

    /**
     * Open the infowindow for the marker
     * @param {object} location marker
     */
    openInfoWindow(marker) {
        this.closeInfoWindow();
        this.state.infowindow.open(this.state.map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        this.setState({
            'prevmarker': marker
        });
        this.state.infowindow.setContent('Loading Data...');
        this.state.map.setCenter(marker.getPosition());
        this.state.map.panBy(0, -200);
        this.getMarkerInfo(marker);
    }

    /**
     * Retrive the location data from the foursquare api for the marker and display it in the infowindow
     * @param {object} location marker
     */
    getMarkerInfo(marker) {
        var self = this;
        var clientId = "LXEYTKNGZ5UAXCZNJM0Q5D5EPS3YTVZNTDOKVLK2PEM5FZSE";
        var clientSecret = "B1ZP1L4Q4SLTWQISFITR03MMWPEADHWLYWZJMRBEO5VZGXBR";
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        self.state.infowindow.setContent("Sorry data can't be loaded");
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        var location_data = data.response.venues[0];
                        var verified = '<b>Verified Location: </b>' + (location_data.verified ? 'Yes' : 'No') + '<br>';
                        var checkinsCount = '<b>Number of CheckIn: </b>' + location_data.stats.checkinsCount + '<br>';
                        var usersCount = '<b>Number of Users: </b>' + location_data.stats.usersCount + '<br>';
                        var tipCount = '<b>Number of Tips: </b>' + location_data.stats.tipCount + '<br>';
                        var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
                        self.state.infowindow.setContent(checkinsCount + usersCount + tipCount + verified + readMore);
                    });
                }
            )
            .catch(function (err) {
                self.state.infowindow.setContent("Sorry data can't be loaded");
            });
    }

    /**
     * Close the infowindow for the marker
     * @param {object} location marker
     */
    closeInfoWindow() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(null);
        }
        this.setState({
            'prevmarker': ''
        });
        this.state.infowindow.close();
    }

    /**
     * Render function of App
     */
    render() {
        return (
            <div>
                <LocationList key="100" alllocations={this.state.alllocations} openInfoWindow={this.openInfoWindow}
                              closeInfoWindow={this.closeInfoWindow}/>
                <div id="map"></div>
            </div>
        );
    }
}

export default App;

/**
 * Load the google maps Asynchronously
 * @param {url} url of the google maps script
 */
function loadMapJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps can't be loaded");
    };
    ref.parentNode.insertBefore(script, ref);
}
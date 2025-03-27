const googleMapsScript = document.createElement('script');
googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDE11aTJrVTqmL9_YGYJnM3-ksqwjGyuk0&callback=initMap';
googleMapsScript.async = true;
googleMapsScript.defer = true;
document.head.appendChild(googleMapsScript);

let map;
let markers = [];

let locations = [
    { name: 'A1', position: { lat: 40.18433061962609, lng:-104.49194508667597 }, category: 'Full Scale' }, // 12002 WCR 59, Keenesurg CO 80643
    { name: 'MES Baltimore County', position: { lat: 39.393586206384995, lng: -76.38791980203953 }, category: 'Demo' }, // 6259 Days Cove Rd, White Marsh MD 21162
    { name: 'Better Root', position: { lat: 46.56524581686919, lng: -111.90506767299404 }, category: 'Demo' }, // 17 Powertrain Road, East Helena MT 59635
    { name: 'CSWM', position: { lat: 50.008263865650626, lng: -125.34884867842854 }, category: 'Full Scale' }, // 6700 Argonaut Rd, Campbell River BC V9H 1P3
    { name: 'Costa', position: { lat: -30.165374936128167, lng: 151.69173499773436 }, category: 'Demo' }, // 4774 New England Highway, Falconer NSW 2365
    { name: 'CSD Miramar', position: { lat: 32.85445988680054, lng: -117.16078752656507 }, category: 'Full Scale' }, // 5180 Convoy St, San Diego CA 92111
    { name: 'DSNY', position: { lat: 40.58144890340554, lng: -74.19326113084216 }, category: 'Full Scale' }, // 450 West Service Road, Staten Island NY 10314
    { name: 'Florence', position: { lat: 43.9683465508187, lng: -124.10719243074419 }, category: 'Full Scale' }, // 250 Highway 101, Florence OR 97439
    { name: 'Green Earth Tech', position: { lat: 48.89732803649927, lng: -122.45227335757806 }, category: 'Full Scale' }, // 774 Meadowlark Drive., Lynden WA 98264
    { name: 'Catapult Environmental', position: { lat: 50.631102885622234, lng: -113.8749908305337 }, category: 'Full Scale' }, // #300-82054 466th Avenue East, Foothills AB T1V 1P3
    { name: 'Happy Trash Can', position: { lat: 45.715226620639584, lng: -111.02175768836214 }, category: 'Full Scale' }, // 2143 Story Mill, Bozeman MT 59715
    { name: 'Loraas', position: { lat: 52.16610214966359, lng: -106.65365748630484 }, category: 'Full Scale' }, // 805-47th Street East, Saskatoon SK S7K 8G7
    { name: 'West Maui GreenCycle', position: { lat: 20.984939674138605, lng: -156.66717007803916 }, category: 'Community' }, // 5095 Napilihau Street, PMB 162, Lahaina HI 96761
    { name: 'MES Prince Gerorges County', position: { lat: 38.792908354125096, lng: -76.73387157322041 }, category: 'Full Scale' }, // 6550 Maude Savoy Brown Rd, Upper Marlboro MD 20772
    { name: 'Mid-Valley Disposal', position: { lat: 36.70634079637724, lng: -120.06557178676877 }, category: 'Full Scale' }, // 15300 W Jensen Avenue, Kerman CA 93630
    { name: 'Natural Soil Products', position: { lat: 40.62817618217673, lng: -76.46811427501832 }, category: 'Full Scale' }, // 2286 East Center St, Tremont PA 17981
    { name: 'Republic Services - Otay', position: { lat: 32.60137116499787, lng: -117.01216895803373 }, category: 'Full Scale' }, // 1700 Maxwell Rd, Chula Vista CA 91911
    { name: 'Peterborough', position: { lat: 44.2239949754384, lng:  -78.28282650190111 }, category: 'Full Scale' }, // 1260 Bensfort Rd, Peterborough ON K9J 1C5
    { name: 'C&S Waste Solutions (POS Ukiah)', position: { lat: 39.10568150368211, lng: -123.19126511738922 }, category: 'Full Scale' }, // 3515 Taylor Dr, Ukiah CA 95482
    { name: 'Compost Queen', position: { lat: 40.60788977432198, lng: -105.07933473084151 }, category: 'Community' }, // 1505 N College Ave, Fort Collins CO 80524
    { name: 'RDKB', position: { lat: 49.04986434697116, lng: -118.44167777291487 }, category: 'Full Scale' }, // 8798 Granby Rd, Grand Forks BC V0H 1H0
    { name: 'Renda', position: { lat: 32.994590152810964, lng: -97.23374448870847 }, category: 'Demo' }, // 522 Benson Lane, Roanoke TX 76262
    { name: 'Santa Barbara County', position: { lat: 34.47369861197598, lng: -120.12895710216677 }, category: 'Full Scale' }, // 14470 Calle Real, Goleta CA 93117
    { name: 'Septage', position: { lat: 41.524545948609436, lng: -81.05009427314462 }, category: 'Full Scale' }, // 12715 Madison Road, Middlefield OH 44062
    { name: 'Walker - All Treat Farms', position: { lat: 43.828101691327525, lng: -80.53702074424203 }, category: 'Full Scale' }, // 7963 Wellington Road 109, Arthur ON N0G 1A0
    { name: 'TRY', position: { lat: 43.07021412335865, lng: -81.2095738596063 }, category: 'Full Scale' }, // 21463 Clarke Road, Arva ON N0M 1C0
    { name: 'Walker - Thorold', position: { lat: 43.13215636484641, lng: -79.17485217309805 }, category: 'Full Scale' }, // 2800 Thorold Townline Rd, Niagara Falls Thorold ON L2E 6S4
    { name: 'Winton', position: { lat: 47.736226930771714, lng: -120.74403625576687 }, category: 'Full Scale' } // 17400 Winton rd, Leavenworth WA 98826
];


window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.8283, lng: -98.5795 },  // Center of the USA
        zoom: 4
    });

    addMarkers();

    // Add event listeners for the checkboxes if they exist
    const checkbox1 = document.getElementById('Full Scale');
    if (checkbox1) {
        checkbox1.addEventListener('change', updateMarkers);
    }
    const checkbox2 = document.getElementById('Demo');
    if (checkbox2) {
        checkbox2.addEventListener('change', updateMarkers);
    }
    const checkbox3 = document.getElementById('Community');
    if (checkbox3) {
        checkbox3.addEventListener('change', updateMarkers);
    }
};

function addMarkers() {
    locations.forEach(location => {
        const markerOptions = {
            position: location.position,
            map: map,
            title: location.name,
            category: location.category
        };
        // If the location is 'Full Scale', use the green pin
        if (location.category === 'Full Scale') {
            markerOptions.icon = '/icons/greenPin.svg';
        }
        // If the location is 'Demo', use a blue pin icon
        if (location.category === 'Demo') {
            markerOptions.icon = '/icons/bluePin.svg';
        }
        // If the location is 'Community', use a brown pin
        if (location.category === 'Community') {
            markerOptions.icon = '/icons/brownPin.svg';
        }
        const marker = new google.maps.Marker(markerOptions);
        markers.push(marker);

        // Create an info window to display the location's name
        const infoWindow = new google.maps.InfoWindow({
            content: `<div class="map"><h1>${location.name}</h1></div>`
        });

        // Open the info window when the marker is clicked
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    });
}

function updateMarkers() {
    const showCategory1 = document.getElementById('Full Scale').checked;
    const showCategory2 = document.getElementById('Demo').checked;
    const showCategory3 = document.getElementById('Community').checked;

    markers.forEach(marker => {
        if ((marker.category === 'Full Scale' && showCategory1) ||
            (marker.category === 'Demo' && showCategory2) ||
            (marker.category === 'Community' && showCategory3)) {
            marker.setMap(map);
        } else {
            marker.setMap(null);
        }
    });
}
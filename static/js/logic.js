// Earthquake data URL from the USGS for all earthquakes in the past week
let earthquakeDataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// request to the earthquake data URL
d3.json(earthquakeDataUrl).then(function (data) {
    console.log(data.features);
    createfeatures(data.features);
});

// Function to determine color based on earthquake depth
function getColorByDepth(depth) {
    // Color gradient based on depth ranges
    if (depth < 10) return "#006400"; 
    else if (depth < 30) return "#61FF33"; 
    else if (depth < 50) return "#FFFF00"; 
    else if (depth < 70) return "#FFA500";
    else if (depth < 90) return "#FF4500";
    else return "#FF0000";
}

// Marker size based on earthquake magnitude

function MarkerSize(magnitude) {
    return magnitude * 4;
}

// Create markers

function createMarkers(feature, latlng) {
    let options = {
        radius: MarkerSize(feature.properties.mag),
        fillColor: getColorByDepth(feature.geometry.coordinates[2]),
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }
    return L.circleMarker(latlng, options);
}

// Style for circle markers
var markerStyle = {
    stroke: true,
    weight: 0.5,
    fillOpacity: 1,
    opacity: 1,
};

// Function to create features
function createfeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><p>" + "Magnitude: " + feature.properties.mag + "</p>");
    }

    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: createMarkers,
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><p>" + "Magnitude: " + feature.properties.mag + "</p>");
        }
    });
    createMap(earthquakes);
}

// Create map

function createMap(earthquakes) {
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
    
    let Map = L.map("map", {
        center: [39.8283, -98.5795],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    // Base map
    let baseMaps = {
        "Street Map": streetmap
    };

    // Overlay map
    let overlayMaps = {
        Earthquakes: earthquakes
    };

    // Add layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(Map);

    // Create legend
    let legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        let div = L.DomUtil.create('div', 'info legend'),
            depth = [-10, 10, 30, 50, 70, 90];
        
        let legendInfo = "<h4>Earthquake Depth</h4>";
        div.innerHTML = legendInfo;

        // Create legend labels
        for (let i = 0; i < depth.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColorByDepth(depth[i] + 1) + '"></i> ' +
                depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
    };

    // Add legend to map
    legend.addTo(Map);
};

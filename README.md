# leaflet-challenge
# Overview
The challenge was addressed by creating an interactive map using JavaScript, D3, geoJSON, and Leaflet. 
This map visualizes earthquakes occurring in the last seven days. Each marker on the map represents an earthquake, with its size indicating depth and color reflecting magnitude. 
Additionally, a legend was incorporated to illustrate different magnitude ranges.

# Implementation Summary
To accomplish this challenge, the following key steps were taken:

Data Retrieval: Utilized the USGS and D3 to obtain earthquake data.

Marker Generation: Developed functions like markerSize and markerColour to dynamically generate markers based on earthquake depth and magnitude.

Marker Creation: Introduced the createMarker function, which invokes markerSize and markerColour to generate markers at the correct geographical coordinates.

Popup Integration: Implemented the createFeatures function to attach a popup to each marker, offering users detailed earthquake information. This function also establishes the geoJSON layer and constructs the map.

Map Construction: Created the createMap function to build the map base and overlay layers, including the addition of a magnitude legend.


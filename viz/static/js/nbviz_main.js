//...
var query_winners = 'winners?projection=' +
    JSON.stringify( {"mini_bio": 0, "bio_image": 0} );

queue()
    .defer(d3.json, "static/data/world-110m.json")
    .defer(d3.csv, "static/data/world-country-names-nobel.csv")
    .defer(d3.json, "static/data/winning_country_data.json")
    .defer(nbviz.getDataFromAPI, query_winners)
    .await(ready);

function ready(error, worldMap, names, countryData, winnersData) {
    // Log any error to console
    if(error) {
        return console.warn(error);
    }
    
    // Store our country-data dataset
    nbviz.data.countryData = countryData;
    
    // Make our filter and its dimensions
    nbviz.makeFilterandDimensions(winnersData);
    
    // Initialize menu and map
    nbviz.initMenu();
    nbviz.initMap(worldMap, countryNames);
    
    // Trigger update with full winners' dataset
    nbviz.onDataChange();
}
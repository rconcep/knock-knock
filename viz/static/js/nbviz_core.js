/* global $, _, crossfilter, d3 */
(function(nbviz)) {
    'use strict';
    
    nbviz.data = {}; // our main data object
    nbviz.valuePerCapita = 0; // metric flag
    nbviz.activeCountry = null;
    nbviz.ALL_CATS = null;
    nbviz.TRANS_DURATION = 2000; // length in ms for our transitions
    nbviz.MAX_CENTROID_RADIUS = 30;
    nbviz.MIN_CENTROID_RADIUS = 2;
    nbviz.COLORS = {palegold: '#E6BE8A'}; // any named colors we use
    $EVE_API = 'http://localhost:5000/api/';
    
    nbviz.CATEGORIES = [
        "Chemistry", "Economics", "Literature", "Peace", "Physics", "Physiology or Medicine"
    ];
    
    nbviz.categoryFill = function(category){
        var i = nbviz.CATEGORIES.indexOf(category);
        return d3.hcl(i / nbviz.CATEGORIES.length * 360, 60, 70);
    };
    
    nbviz.getDataFromAPI = function(resource, callback){
        d3.json($EVE_API + resource, function(error, data) {
            if(error) {
                return callback(error);
            }
            
            if('_items' in data) {
                callback(null, data._items);
            }
            else {
                callback(null, data);
            }
        });
    };
    
    var nestDataByYear = function(entries) {
        //...
    };
    
    nbviz.makeFilterAndDimensions = function(winnersData) {
        // Add our filter and create category dimensions
        nbviz.filter = crossfilter(winnersData);
        
        // Country filter
        nbviz.countryDim = nbviz.filte.rdimension(function(o) {
            return o.country;
        });
        
        // Gender filter
        nbviz.genderDim = nbviz.filter.dimension(function(o) {
            return o.gender;
        });
        
        // Category filter
        nbviz.categoryDim = nbviz.filter.dimension(function(o) {
            return o.category;
        });
    };
    
    nbviz.filterByCountries = function(countryNames) {
        //...
    };
    
    nbviz.filterByCategory = function(cat) {
        //...
    };
    
    nbviz.getCountryData = function() {
        var countryGroups = nbviz.countryDim.group().all();
        
        // Make main data-ball
        var data = countryGroups.map( function(c) {
            var cData = nbviz.data.countryData[c.key];
            var value = c.value;
            
            // if per capita value then divide by pop. size
            if(nbviz.valuePerCapita){
                value = value / cData.population;
            }
            return {
                key: c.key, // e.g., Japan
                value: value, // e.g., 19 (prizes)
                code: cData.alpha3Code, // e.g., JPN
            };
        })
            .sort(function(a, b) {
                return b.value - a.value; // descending
            });
        
        return data;
    };
    
    nbviz.onDataChange = function() {
        var data = nbviz.getCountryData();
        nbviz.updateBarChart(data);
        nbviz.updateMap(data);
        nbviz.updateList(nbviz.countryDim.top(Infinity));
        data = nestDataByYear(nbviz.countryDim.top(Infinity));
        nbviz.updateTimeChart(data);
    };
    
}(window.nbviz = window.nbviz || {}));
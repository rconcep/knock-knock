var API_URL = 'http://localhost:5000/api';

var displayJSON = function(query) {
    
    d3.json(API_URL + query, function(error, data) {
        
        // log any error to the console as a warning
        if(error){
            return console.warn(error);
        }
        
        d3.select('#query pre').html(query);
        d3.select('#data pre').html(JSON.stringify(data, null, 4));
        console.log(data);
    });
};

var filters = [ {"name": "year", "op": "gte", "val": 2000},
               {"name": "gender", "op": "==", "val": "female"} ];

var order_by = [ {"field": "year", "direction": "asc"} ];

var query = '/winners?' + 'q=' + JSON.stringify({'filters': filters, 'order_by': order_by
});

displayJSON(query);
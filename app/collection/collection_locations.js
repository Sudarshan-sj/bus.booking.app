define(['jquery', 'underscore', 'backbone', 'config', 'location'], function($, _, Backbone, Config, Location) {


    var Locations = Backbone.Collection.extend({
        model: Location,
        url: Config.URL.LOCATIONS,
        initialize: function() {

            // Populating List as soon as it's initialized
            this.fetch();
        },
        parse: function(data) {
            //console.log('sorting data....');


            //SORTING ON DEFAULT CONFIGURED PARAM BEFORE CREATING A COLLECTION
            var locationList = _.sortBy(data.result, Config.DEFAULT.LOCATION_SORT_PARAM);


            return locationList;
        }
    });


    return Locations;
});

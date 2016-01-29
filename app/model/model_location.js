    define(['jquery', 'underscore', 'backbone', 'config'], function($, _, Backbone, Config) {


        var Location = Backbone.Model.extend({

            defaults: {
                cityId: null,
                cityName: null,
                cityCode: null
            },
            initialize: function(model) {


            }
        });


        return Location;
    });

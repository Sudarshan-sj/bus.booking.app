// Configure loading modules from the current directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: '.',
    paths: {
        /* DOM MANIPULATION LIBRARY*/
        "jquery": "./node_modules/jquery/dist/jquery",

        /*GENERAL TEMPLATING/UTILITY LIBRARY*/
        "underscore": "./node_modules/underscore/underscore",

        /* BACKBONE - gives structure to web applications*/
        'backbone': './node_modules/backbone/backbone',

        //REQUIREJS TEXT PLUG-IN - Load text files and treat them as dependencies.  http://requirejs.org/docs/download.html#text
        //Great for loading templates. The text strings can be inlined in an optimized build when the optimizer is used.
        'text': './node_modules/requirejs-text/text',


        'config': './app/config',
        'pubSub': './app/pubSub',

        /*-----THIRD PARTY LIBRARIES-----*/
        'select2': './node_modules/select2/dist/js/select2.full.min', //https://select2.github.io/
        'datepicker': './node_modules/zebra_datepicker/public/javascript/zebra_datepicker', //https://github.com/stefangabos/Zebra_Datepicker && http://stefangabos.ro/jquery/zebra-datepicker/
        'sortable': './node_modules/tablesorter/dist/js/jquery.tablesorter', //https://mottie.github.io/tablesorter/docs/ && 


        /*-----VIEWS-----*/
        'app_view': './app/view/view_home',
        'dropdown_view': './app/view/view_dropdown',
        'datepicker_view': './app/view/view_datepicker',
        'passengerlist_view': './app/view/view_passengerlist',
        'searchbutton_view': './app/view/view_searchbutton',

        'listing_view': './app/view/view_listing',
        'bookingmodal_view': './app/view/view_bookingmodal',


        /*-----MODEL-----*/
        'location': './app/model/model_location',


        /*-----COLLECTION-----*/
        'locationlist': './app/collection/collection_locations',


        /*-----TEMPLATE-----*/
        'dropdown_tmpl': './app/template/template_dropdown.html',
        'datepicker_tmpl': './app/template/template_datepicker.html',
        'listingtable_tmpl': './app/template/template_listingtable.html',
        'bookingmodal_tmpl': './app/template/template_bookingmodal.html',



    },
    waitSeconds: 20,
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'sortable': {
            deps: ['jquery'],
        },
        'select2': {
            deps: ['jquery'],
        },
        'datepicker': {
            deps: ['jquery'],
        },
    }
});


// Initialising the App
requirejs(['underscore', 'backbone', 'app_view'], function(_, Backbone, Application) {

    Backbone.View.prototype.Pubsub = _.extend({}, Backbone.Events)


    new Application();


});

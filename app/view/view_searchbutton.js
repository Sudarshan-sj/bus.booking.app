define([
        'jquery', 'underscore', 'backbone',
        'config', 'pubSub'
    ],
    function(
        $, _, Backbone,
        Config, PubSub
    ) {


        var DropdownView = Backbone.View.extend({

            tagName: 'div',
            className: 'searchButtonContainer',

            template: _.template("<button class='searchButton'>Search</button>"),

            events: {
                'click .searchButton': 'searchClicked',
            },

            initialize: function(args) {
                this.options = args;


                this.render();

            },

            render: function() {
                this.$el.append(this.template());

                return this;
            },

            searchClicked: function(evt) {


                PubSub.trigger(this.options.id + ':clicked', null);


            },
            toggleButton: function(disabled) {
                this.$el.prop("disabled", disabled);

                if (!disabled) {
                    this.openDropdown();
                }
            },


            scrollto: function(elem) {
                $(elem).scroll();
            },
            showPopup: function() {},
            showMessage: function(msg) {

                // SHOW MESSAGE

                // REMOVE MESSAGE ON CLICKING OUTSIDE
                $(body).click(REMOVEMESSAGE)

            },

        });


        return DropdownView;


    });

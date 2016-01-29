define([
        'jquery', 'underscore', 'backbone',
        'config', 'pubSub',
        'locationlist',
        'select2',
        'text!dropdown_tmpl'
    ],
    function(
        $, _, Backbone,
        Config, PubSub,
        Locations,
        select2,
        DropdownTMPL
    ) {


        var DropdownView = Backbone.View.extend({

            tagName: 'select',
            className: 'select2Dropdown locationDropdown',

            template: _.template(DropdownTMPL),

            events: {

            },

            initialize: function(args) {
                this.options = args;
                this.collection = new Locations(args);


                // CALLING 'render' after data is fetched
                this.collection.on('sync', this.parseData, this);

                this.render();

            },
            parseData: function() {
                this.data = [];
                this.collection.forEach(function(model) {

                    this.data.push({
                        id: model.get('cityId'),
                        text: model.get('cityName')
                    });


                }, this);

                this.render();

            },

            render: function() {
                var that = this;
                // setTimeout(function() {
                this.$el.select2({
                    data: this.data,
                    disabled: this.options.disabled || false
                });

                this.attachSelect2Events();

                //$(document.body).append(this.$el);

                return this;


            },
            attachSelect2Events: function() {
                var that = this;

                this.$el.on("select2:select", this.itemSelected.bind(this));
            },

            itemSelected: function(item) {

                if (item.params.data) {
                    PubSub.trigger(this.options.id + ':selected', item.params.data);
                }

            },
            toggleDropdown: function(disabled) {
                this.$el.prop("disabled", disabled);

                if (!disabled) {
                    this.openDropdown();
                }
            },
            openDropdown: function() {
                this.$el.select2("open");
            },

            fetched: function() {
                alert()
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

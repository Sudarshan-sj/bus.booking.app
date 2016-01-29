define([
        'jquery', 'underscore', 'backbone',
        'config', 'pubSub'

    ],
    function(
        $, _, Backbone,
        Config, PubSub

    ) {


        var PassengerListView = Backbone.View.extend({

            tagName: 'div',
            className: 'passengerDropdownContainer',


            //template: _.template(DatePickerTMPL),

            events: {
                'change .passengerDropdown': 'optionSelected',
            },

            initialize: function(args) {
                this.options = args;


                this.initializeDropdown();

                this.render();


            },
            initializeDropdown: function() {

                var i = 1,
                    maxPassengers = this.options.maxPassengers || 6;


                var selectElem = document.createElement('select');
                selectElem.setAttribute('class', 'passengerDropdown')


                while (i <= maxPassengers) {
                    var option = document.createElement('option');

                    $(option).attr('value', i);
                    //option.setAttribute('value', i);
                    $(option).text(i);
                    //option.innerText = i;
                    selectElem.appendChild(option);

                    ++i;
                }

                this.$select = $(selectElem);

            },

            render: function() {

                this.$el.append("<span>No. Of Pasengers</span>");
                this.$el.append(this.$select);

                //$(document.body).append(this.$el);


                return this;


            },
            optionSelected: function(evt) {

                var passengers = evt.target.value;


                if (passengers) {
                    PubSub.trigger(this.options.id + ':selected', passengers);
                }


            },

            fetched: function() {
                alert()
            },
            toggleDatePicker: function(disabled) {


                this.$datePicker.attr('disabled', disabled)


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


        return PassengerListView;


    });

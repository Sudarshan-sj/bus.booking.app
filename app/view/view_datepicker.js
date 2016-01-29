define([
        'jquery', 'underscore', 'backbone',
        'config', 'pubSub',
        'datepicker',
        'text!datepicker_tmpl'
    ],
    function(
        $, _, Backbone,
        Config, PubSub,
        DatePicker,
        DatePickerTMPL
    ) {


        var DatePickerView = Backbone.View.extend({

            tagName: 'div',
            className: 'datepickerContainer',


            template: _.template(DatePickerTMPL),

            events: {

            },

            initialize: function(args) {
                this.options = args;


                this.cacheDOM();

                this.render();


            },
            cacheDOM: function() {

                this.$el.append(this.template());
                this.$datePicker = this.$el.find('.txtDatePicker');
                this.toggleDatePicker(this.options.disabled);

            },

            render: function() {


                //$(document.body).append(this.$el);

                var that = this
                setTimeout(function() {
                    that.$datePicker.Zebra_DatePicker({
                        //start_date: true,
                        direction: true,
                        //default_position: 'below',
                        //format: 'M d, Y',
                        format: 'd-m-Y',
                        onSelect: that.itemSelected.bind(that)
                    });


                }, 0)

                return this;


            },
            itemSelected: function() {

                var date = arguments[2];

                if (date) {
                    PubSub.trigger(this.options.id + ':selected', date);
                }


            },

            toggleDatePicker: function(disabled) {


                this.$datePicker.attr('disabled', disabled);

                if (!disabled) {
                    this.openDatePicker();
                }

            },
            openDatePicker: function() {
                this.$datePicker.data('Zebra_DatePicker').show();
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


        return DatePickerView;


    });

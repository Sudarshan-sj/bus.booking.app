define([
        'jquery', 'underscore', 'backbone',
        'config', 'pubSub',
        'text!bookingmodal_tmpl'

    ],
    function(
        $, _, Backbone,
        Config, PubSub,
        BookingModalTMPL
    ) {


        var BookingModalView = Backbone.View.extend({

            el: '#bookingContainer',


            template: _.template(BookingModalTMPL),

            events: {
                'click .availableSeat': 'seatClicked',
                'click button.payNowButton': 'payClicked',
                'click button.closeModal': 'destroy',
                'click #bookingContainer': 'destroy',

                'click .busRow .busSeat': 'seatClicked',


            },

            initialize: function(args) {

                this.options = args;
                this.seatsSelected = [];

                this.render();


            },

            cacheDOM: function() {
                var selectedSeatsText = this.$el.find('#seatsSelectedText')
                this.$selectedSeatsText = $(selectedSeatsText);


                var totalAmount = this.$el.find('#totalAmount')
                this.$totalAmount = $(totalAmount);

            },
            render: function() {
                // EMPTYING PREVIOUS DATA
                this.$el.empty();
                this.$el.append(this.template(this.options));
                this.cacheDOM();
                this.$el.show();
                //$(document.body).append(this.$el);


                return this;


            },
            seatClicked: function(evt) {

                var $seat = $(evt.target),
                    isBooked = $seat.attr('data-booked') == "true" ? true : false;


                if (isBooked) {
                    PubSub.trigger('show:message', Config.MESSAGES.SEAT_NOT_AVAILABLE);

                    return;
                }

                // SELECT CLASS
                this.selectSeat($seat);
            },
            checkMaxSeatSelected: function() {
                if (this.seatsSelected.length == (Config.MAX_SEATS_SELECTABLE || 6)) {
                    PubSub.trigger('show:message', Config.MESSAGES.MAX_SEAT_SELECTED);
                    return true;
                }
                return false;
            },
            addSeatToList: function(seat) {
                this.seatsSelected.push(seat);
            },
            removeSeatFromList: function(seat) {
                var $seat = seat;
                var seatID = $seat.attr('data-seatid');


                var $seatFound = _.find(this.seatsSelected, function(val) {
                    return val.attr('data-seatid') == seatID;

                });

                if ($seatFound) {
                    this.seatsSelected = _.without(this.seatsSelected, $seatFound);
                } else {
                    PubSub.trigger('show:message', Config.MESSAGES.GENERAL_ERROR_OCCURED);

                }


            },
            updateTotalPrice: function() {
                var price = this.seatsSelected.length * this.options.selectedOperator.price;
                this.$totalAmount.text('Amount:- MYR ' + price || 0);
            },
            updateSeatSelected: function(seat) {

                var str = "";
                _.each(this.seatsSelected, function(val) {
                    str += val.attr('data-seatid') + ", ";
                });

                // TRIMMING LAST COMMA
                str = str.substr(0, str.length - 1);

                this.$selectedSeatsText.text('Seats Selected:- ' + str || "N.A");
            },

            selectSeat: function(seat) {
                var $seat = seat;

                if ($seat.hasClass('selected')) {
                    $seat.addClass('available');

                    $seat.removeClass('selected');
                    // REMOVE FROM SEAT  LIST
                    this.removeSeatFromList($seat);


                } else {

                    if (!this.checkMaxSeatSelected()) {
                        $seat.removeClass('available');


                        $seat.addClass('selected');
                        //ADD TO SEAT LIST
                        this.addSeatToList($seat);
                    } else {
                        return;
                    }

                }


                // UPDATE SEATS SELECTED & TOTAL PRICE
                this.updateTotalPrice();
                this.updateSeatSelected($seat);
            },

            destroy: function() {
                // COMPLETELY UNBIND THE VIEW
                this.undelegateEvents();
                delete this.options;
                this.$el.empty();
                this.$el.hide();
            }

        });


        return BookingModalView;


    });

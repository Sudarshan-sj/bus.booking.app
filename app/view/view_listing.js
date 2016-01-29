define([
        'jquery', 'underscore', 'backbone',
        'config', 'pubSub',
        'sortable',
        'bookingmodal_view',
        'text!listingtable_tmpl'
    ],
    function(
        $, _, Backbone,
        Config, PubSub,
        Sortable,
        BookingModalView,
        ListingTableTMPL
    ) {


        var ListingView = Backbone.View.extend({

            el: '#listingContainer',


            template: _.template(ListingTableTMPL),

            events: {
                'click button.bookBtn': 'bookClicked',
                'click #bookingContainer': 'destroyModal'
            },

            initialize: function(args) {
                this.options = args;

                this.generateRandomListingData();


                if (this.options['availableOperators']) {

                    this.preRender();

                    this.render();
                }

            },
            preRender: function() {
                this.$el.append(this.template(this.options));

                // CACHING LISTING TABLE DOM
                this.ListingTable = this.$el.find('table#listingTable')
                this.$ListingTable = $(this.ListingTable);

                // CACHING BOOKING WINDOW DOM
                this.BookingWindow = this.$el.find('div#bookingContainer')
                this.$BookingWindow = $(this.BookingWindow);


            },
            render: function() {
                // APPLYING SORTING FUNCTIONALITY TO THE LISTING TABLE
                this.$ListingTable.tablesorter({
                    headers: {
                        2: {
                            sorter: false
                        },
                        6: {
                            sorter: false
                        }
                    }
                });

                return this;


            },

            generateRandomListingData: function() {

                //Generate Random List Items
                this.options['busesAvailable'] = this.getRandomNumber(0, Config.FAKE_LISTING_DATA.length);

                // Shuffle the current Pool of data items
                var shuffledListing = _.shuffle(Config.FAKE_LISTING_DATA);

                // Only allow a total no of items equalling the random number
                var availableOperators = shuffledListing.splice(0, this.options['busesAvailable']);


                if (availableOperators.length <= 0) {

                    PubSub.trigger('show:message', Config.MESSAGES.NO_BUS_AVAILABLE);

                    return;

                }


                var generatedListing = this.fillRandomDataIntoParameters(availableOperators);


                // Sort the narrowed item list on the default parameter
                this.options['availableOperators'] = _.sortBy(generatedListing, Config.DEFAULT.LISTING_SORT_PARAM);


            },
            getRandomNumber: function(min, max) {

                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            fillRandomDataIntoParameters: function(arr) {


                var options = this.options,
                    incompleteArray = arr;

                var baseDate = this.options['startDate'];
                var basePrice = this.getRandomNumber(10, 50);


                for (var i = 0; i < incompleteArray.length; i++) {

                    var startTime = this.getStartTime(baseDate),
                        addHour = this.getRandomNumber(1, 6),
                        addMinutes = this.getRandomNumber(0, 59),
                        endTime = this.getEndTime(startTime, addHour, addMinutes),
                        duration = this.getTimeDiffrence(startTime, endTime);


                    incompleteArray[i]['dateText'] = this.getDateText(startTime);

                    incompleteArray[i]['departTime'] = startTime;
                    incompleteArray[i]['departTimeText'] = this.getTimeText(startTime);

                    incompleteArray[i]['arrivalTime'] = endTime;
                    incompleteArray[i]['arrivalTimeText'] = this.getTimeText(endTime);

                    incompleteArray[i]['duration'] = duration;
                    incompleteArray[i]['durationText'] = this.getDurationText(duration);


                    incompleteArray[i]['price'] = this.getRandomNumber(basePrice - 10, basePrice + 10);

                }

                return incompleteArray;


            },
            getStartTime: function(date) {
                var startTime = new Date(date);

                var startHour = this.getRandomNumber(0, 23);
                var startMinutes = this.getRandomNumber(0, 59);

                startTime.setHours(startHour);
                startTime.setMinutes(startMinutes);

                return startTime;

            },
            getTimeText: function(date) {

                var hour = date.getHours(),
                    min = date.getMinutes();

                if (hour < 10) {
                    hour = "0" + hour;
                }

                if (min < 10) {
                    min = "0" + min;
                }

                return hour + ':' + min;
            },
            getDateText: function(date) {
                return date.toDateString();
            },
            getDurationText: function(unixtime) {
                var MINUTE = 1000 * 60,
                    timeStamp = unixtime;

                var TOTAL_DURATION_MINUTES = timeStamp / MINUTE;

                return ~~(TOTAL_DURATION_MINUTES / 60) + " Hours, " + (TOTAL_DURATION_MINUTES % 60) + " Minutes";

            },
            getEndTime: function(date, hour, min) {


                var endTime = new Date(date);
                endTime.setHours(endTime.getHours() + hour);
                endTime.setMinutes(endTime.getMinutes() + min);

                return endTime;

            },
            getTimeDiffrence: function(startTime, endTime) {
                return endTime - startTime;
            },
            generateSeatingInformation: function() {

                var seatingInformation = {
                    rows: null,
                    columns: null,
                    total: null,
                    available: null,
                    booked: null,
                    seatingData: []
                };


                var rows = seatingInformation['rows'] = this.getRandomNumber(6, 12);
                var cols = seatingInformation['columns'] = this.getRandomNumber(2, 4);
                var total = seatingInformation['total'] = rows * cols;


                var _row, _column, _seat, _booked, _available = 0;

                for (var i = 0; i < rows; i++) {

                    for (var j = 0; j < cols; j++) {

                        // ROW
                        _row = i + 1;

                        // COLUMN
                        _column = String.fromCharCode(97 + j);


                        // SEAT
                        _seat = _row + _column;

                        // BOOKED

                        _booked = (this.getRandomNumber(0, 1)) ? true : ++_available && false;

                        // SAVE
                        seatingInformation.seatingData.push({
                            row: _row,
                            column: _column,
                            seat: _seat,
                            booked: _booked
                        });
                    }


                }

                seatingInformation['available'] = _available;
                seatingInformation['booked'] = total - _available;


                return seatingInformation;
            },


            bookClicked: function(evt) {
                $btn = $(evt.target);
                var operatorId = Number($btn.attr('data-operatorid'));

                if (isNaN(operatorId)) {
                    PubSub.trigger('show:message', Config.MESSAGES.GENERAL_ERROR_OCCURED);

                    return;
                } else {

                    this.options['selectedOperator'] = _.find(this.options['availableOperators'], {
                        operatorId: operatorId
                    });

                    if (typeof this.options['selectedOperator'] == "undefined") {
                        PubSub.trigger('show:message', Config.MESSAGES.GENERAL_ERROR_OCCURED);
                        return;
                    }

                    this.createBookingWindow();


                }

            },
            createBookingWindow: function() {
                // $('#bookingContainer').show();


                this.options['selectedOperator']['seatingInformation'] = this.generateSeatingInformation();


                // CREATE BOOKING WINDOW VIEW

                this.bookingModalView = new BookingModalView(this.options);

            },
            destroyBookingWindow: function() {

                this.options['selectedOperator'] = undefined;

            },


            destroy: function() {
                // COMPLETELY UNBIND THE VIEW
                this.undelegateEvents();
                delete this.options;
                this.$el.empty();

            },
            destroyModal: function(evt) {


                if (evt.target != evt.currentTarget) {
                    return;
                }

                if (this.bookingModalView) {
                    this.bookingModalView.destroy();
                    this.bookingModalView = undefined;

                };
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


        return ListingView;


    });

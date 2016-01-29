define([
        'jquery', 'underscore', 'backbone',
        'config', 'pubSub',


        'dropdown_view', 'datepicker_view', 'passengerlist_view', 'searchbutton_view',
        'listing_view',
        'select2'
    ],
    function(
        $, _, Backbone,
        Config, PubSub,
        DropdownView, DatePickerView, PassengerListView, SearchButtonView,
        ListingView,
        select2
    ) {


        var RootView = Backbone.View.extend({

            el: '#mainApp',

            events: {

            },

            initialize: function() {

                this.options = {
                    source: null,
                    destination: null,
                    startDate: null,
                    endDate: null,
                    passengers: 1
                };


                this.cacheDOM();


                this.initializeFilterView();
                this.listeners();


            },
            listeners: function() {


                PubSub.on('from:selected', this.fromSelected, this);

                PubSub.on('to:selected', this.toSelected, this);

                PubSub.on('fromDate:selected', this.departureDateSelected, this);

                PubSub.on('passengers:selected', this.passengersSelected, this);

                PubSub.on('searchButton:clicked', this.searchClicked, this);

                PubSub.on('show:message', this.showMessage, this);
            },
            cacheDOM: function() {


                this.filterEl = this.$el.find('#filterContainer');
                this.$filterEl = $(this.filterEl);

                this.listingEl = this.$el.find('#listingContainer');
                this.$listingEl = $(this.listingEl);

                this.messageBoxEl = this.$el.find('#messageBox');
                this.$messageBoxEl = $(this.messageBoxEl);
                this.$messageBoxEl.hide();

                // REMOVE MESSAGE ON CLICKING OUTSIDE
                //$(document.body).on('click', this.removeMessage.bind(this))


            },

            initializeFilterView: function() {
                this.sourceView = new DropdownView({
                    id: 'from',
                    disabled: false

                });

                this.destinationView = new DropdownView({
                    id: 'to',
                    disabled: true

                });

                this.dateView = new DatePickerView({
                    id: 'fromDate',
                    disabled: true
                });


                this.passengerListView = new PassengerListView({
                    id: 'passengers',
                    maxPassengers: 6
                });


                this.searchButtonView = new SearchButtonView({
                    id: 'searchButton'

                });

                this.renderFilterView();
            },
            renderFilterView: function() {

                this.$filterEl.append(this.sourceView.$el);
                this.$filterEl.append(this.destinationView.$el);
                this.$filterEl.append(this.dateView.$el);
                this.$filterEl.append(this.passengerListView.$el);
                this.$filterEl.append(this.searchButtonView.$el);


                // filterEL.append();

            },

            fromSelected: function(location) {
                this.options['source'] = location;

                this.destinationView.toggleDropdown(false);

            },

            toSelected: function(location) {
                this.options['destination'] = location;

                this.dateView.toggleDatePicker(false);

            },
            departureDateSelected: function(date) {
                this.options['startDate'] = date;

                this.showMessage({
                    msg: 'Click on the Search Button to get a List of Bus Available'
                });


            },
            passengersSelected: function(passengers) {
                this.options['passengers'] = Number(passengers);
            },
            searchClicked: function(args) {

                this.validateFilterValues();

            },
            validateFilterValues: function() {
                var that = this;

                if (!this.options['source']) {
                    this.showMessage(Config.MESSAGES.SOURCE_NOT_SELECTED);
                    return;
                }

                if (!this.options['destination']) {
                    this.showMessage(Config.MESSAGES.DESTINATION_NOT_SELECTED);
                    return;
                }

                if (this.options['source']['id'] == this.options['destination']['id']) {
                    this.showMessage(Config.MESSAGES.DESTINATIONS_CANNOT_BE_SAME);
                    return;

                }

                if (!this.options['startDate']) {
                    this.showMessage(Config.MESSAGES.FROM_DATE_NOT_SELECTED);
                    return;
                }


                // IF LISTING VIEW CREATED THEN DESTROY IT 
                if (this.listingView) {

                    this.listingView.destroy();
                    this.listingView = undefined;

                }

                //setTimeout(function() {
                this.createListingView();
                //}, 1000);


            },

            createListingView: function() {

                this.listingView = new ListingView(this.options);


                this.scrollTo(this.$listingEl);
            },


            scrollTo: function(elem) {
                $('html,body').animate({
                    scrollTop: elem.offset().top
                }, 'slow');
            },
            showPopup: function() {},
            showMessage: function(args) {

                this.messageType = args.type || 'default'

                // SET MESSAGE

                this.$messageBoxEl.text(args.msg);
                this.$messageBoxEl.addClass(this.messageType);
                this.$messageBoxEl.show();

                setTimeout(this.removeMessage.bind(this), args.time || Config.MESSAGES.TIME_LIMIT);


            },
            removeMessage: function(evt) {

                // if (this.$messageBoxEl[0] != evt.target) {
                this.$messageBoxEl.text('');
                this.$messageBoxEl.removeClass(this.messageType);
                this.$messageBoxEl.hide();

                //}
            },

        });


        return RootView;


    });

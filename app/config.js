define([], function() {


    var config = {
        URL: {
            LOCATIONS: "./app/data/locations.json"

        },
        DEFAULT: {
            LOCATION_SORT_PARAM: 'cityName',
            LISTING_SORT_PARAM: 'price'

        },
        GLOBAL_CONTEXT: window || self,
        MAX_SEATS_SELECTABLE: 6,
        MESSAGES: {
            TIME_LIMIT: 3000, //ms
            SOURCE_NOT_SELECTED: {
                msg: 'Please select a City for Departure',
                type: 'warn'
            },
            DESTINATION_NOT_SELECTED: {
                msg: 'Please select a City for Arrival',
                type: 'warn'
            },
            FROM_DATE_NOT_SELECTED: {
                msg: 'Please select a Date for Departure',
                type: 'warn'
            },
            TO_DATE_NOT_SELECTED: {
                msg: 'Please select a Date for Arrival',
                type: 'warn'
            },
            DESTINATIONS_CANNOT_BE_SAME: {
                msg: 'Both Destination cannot be the same. Choose a diffrent Destination.',
                type: 'warn'
            },
            NO_BUS_AVAILABLE: {
                msg: 'Sorry, We could\'nt find any Bus Available. Try a different Date.',
                type: 'warn'
            },
            GENERAL_ERROR_OCCURED: {
                msg: 'An Error Occured , Please Try Again Later',
                type: 'error'
            },
            SEAT_NOT_AVAILABLE: {
                msg: 'Sorry, this seat is already booked. Select any other available seat',
                type: 'warn'
            },
            MAX_SEAT_SELECTED: {
                msg: 'You can only select a maximum of 6 Seats.',
                type: 'warn'
            },

        },
        FAKE_LISTING_DATA: [{
            operatorName: 'S&S International Express',
            operatorId: 0,
            logo: './images/operators/S&S_International_Express.png',
            departTime: null,
            duration: null,
            arrivalTime: null,
            price: null

        }, {
            operatorName: 'Mega Jaya Express',
            operatorId: 1,
            logo: './images/operators/Mega_Jaya_Express.png',
            departTime: null,
            duration: null,
            arrivalTime: null,
            price: null

        }, {
            operatorName: 'Plusliner',
            operatorId: 2,
            logo: './images/operators/Plusliner.png',
            departTime: null,
            duration: null,
            arrivalTime: null,
            price: null

        }, {
            operatorName: 'Unititi Express',
            operatorId: 3,
            logo: './images/operators/Unititi_Express.png',
            departTime: null,
            duration: null,
            arrivalTime: null,
            price: null

        }, {
            operatorName: 'Transnasional',
            operatorId: 4,
            logo: './images/operators/Transnasional.png',
            departTime: null,
            duration: null,
            arrivalTime: null,
            price: null

        }, {
            operatorName: 'Darulnaim Express',
            operatorId: 5,
            logo: './images/operators/Darulnaim_Express.png',
            departTime: null,
            duration: null,
            arrivalTime: null,
            price: null

        }, {
            operatorName: 'Cepat Ekspres',
            operatorId: 6,
            logo: './images/operators/Cepat_Ekspres.png',
            departTime: null,
            duration: null,
            arrivalTime: null,
            price: null

        }]

    };


    return config;
});

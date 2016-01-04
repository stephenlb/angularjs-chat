// -- TODO --
//
// - https://developer.layer.com/docs/ios/integration
// - AddressBook   = Presence/State + ChannelGroups
// - Notifications = History + PubSub
// - Messages      = History + PubSub
// - Groups        = History + PubSub
// - TypeingIndicator = ???
//
// - Signals       = PubSub
// - History       = History
//
// -- TODO --

'use strict';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// AngularJS Chat Module
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module( 'chat', [] );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Messages
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


/*

        /PUBLISH 
        /PUBLISH 
        /PUBLISH 
        var request = {
            method  : 'POST'
        ,   url     : ''
        ,   data    : {}
        ,   params  : {}
        ,   timeout : timeout
        ,   success : next
        ,   fail    : function(){ next() }
        };

*/
angular.module('chat').service( 'Messages', [ 'config', function(config) {
    var messages     = {}    // keyed by timetoken
    ,   subscription = null;
    this.derbs="123";
} ] );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// AngularJS Chat Core Service
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module('chat').service( 'ChatCore', [ 'config', function(config) {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // API Keys
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var pubkey = config['publish-key']
    ,   subkey = config['subscribe-key'];

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Publish via PubNub
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    this.publish = function(setup) {
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Subscribe via PubNub
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    this.subscribe = function(setup) {
        var channels  = setup.channels  || 'a'
        ,   groups    = setup.groups    || ''
        ,   userid    = setup.userid    || 'user-'+Math.random()
        ,   message   = setup.message   || function(){}
        ,   timeout   = setup.timeout   || 290000
        ,   timetoken = setup.timetoken || '0'
        ,   windowing = setup.windowing || 10
        ,   stop      = false
        ,   url       = ''
        ,   origin    = 'ps'+(Math.random()+'').split('.')[1]+'.pubnub.com';

        // Request Object
        var request = {
            method  : 'GET'
        ,   url     : ''
        ,   params  : { uuid : userid }
        ,   timeout : timeout
        ,   success : next
        ,   fail    : function(){ next() }
        };

        // Channel Groups
        if (groups) request.params['channel-group'] = groups;

        // Subscribe Loop
        function next(payload) { 
            if (stop) return;
            if (payload) {
                timetoken = payload.t.t;
                message(payload);
            }

            url = [
                'https://',       origin, 
                '/v2/subscribe/', subkey,
                '/',              channels,
                '/0/',            timetoken
            ].join('');

            setTimeout( function() {
                request.url = url;
                $http(request).then( request.success, request.fail );
            }, windowing );
        }

        // Cancel Subscription
        function unsubscribe() {
            stop = true;
        }

        // Start Subscribe Loop
        next();

        // Allow Cancelling Subscriptions
        return {
            unsubscribe : unsubscribe
        };
    };
} ] );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// AddressBook
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module('chat').service( 'AddressBook', function() {
    // - 
    // - 
} );

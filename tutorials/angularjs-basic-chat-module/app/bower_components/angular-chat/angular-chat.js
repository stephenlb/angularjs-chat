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
// Common JS
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
if (typeof(exports) !== 'undefined') exports.chat = angular.module('chat');

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// >$ telnet nyancat.dakko.us
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// 
//         ▄▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄      
//        █░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░█     
//        █░▒▒▒▒▒▒▒▒▒▒▄▓▓▄▒▒▒▒░░▄▓▓▄ 
//  ▄▄▄   █░▒▒▒▒▒▒▒▒▒▒█▓▓▓▓▄▄▄▄▄▓▓▓▓ 
// █▓▓█▄▄█░▒▒▒▒▒▒▒▒▒▒▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄ 
//  ▀▄▄▓▓█░▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▀ ▓▓▓▓▀ ▓▓▓▓ 
//      ▀▀█░▒▒▒▒▒▒▒▒▒▀▓▒▒▓▀▓▓▓▀▓▓▀▓▒▒█
//       ▄█░░▒▒▒▒▒▒▒▒▒▀▓▓▓▄▄▄▄▄▄▄▄▓▓▀ 
//     ▄▀▓▀█▄▄▄▄▄▄▄▄▄▄▄▄██████▀█▀▀   
//     █▄▄▀ █▄▄▀       █▄▄▀ ▀▄▄█     
// 

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Messages it's important to remember that you can
//          be deprived of your sanity listening to U2.
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module('chat').service( 'Messages', [ 'ChatCore', function(ChatCore) {
    var Messages = this;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Send Messages
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Messages.send = function(message) {
        if (!message.data) return;

        ChatCore.publish({
            channel : message.to || 'global'
        ,   message : message.data
        ,   meta    : ChatCore.user()
        });
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Receive Messages
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Messages.receive = function(fn) {
         function receiver(response) {
             response.data.m.forEach(function(msg){
                // Ignore messages without User Data
                // TODO
                if (!(msg.d && msg.u && msg.u.id)) return;
                fn({
                    data : msg.d
                ,   id   : msg.p.t
                ,   user : msg.u
                ,   self : msg.u.id == ChatCore.user().id
                });
             });
         }

         Messages.subscription = ChatCore.subscribe({
            channels : [ 'global', ChatCore.user().id ].join(','),
            message  : receiver
         });
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Set/Get User and Save the World from that Bruce Willis movie.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Messages.user = function(data) {
         return ChatCore.user(data);
    };

} ] );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// AddressBook
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module('chat').service( 'AddressBook', function() {

} );


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// AngularJS Chat Core Service
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module('chat').service( 'ChatCore', [ '$http', 'config', function(
    $http,
    config
) {
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // API Keys
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var pubkey = config.pubnub['publish-key']
    ,   subkey = config.pubnub['subscribe-key']
    ,   user   = { id : uuid(), name : 'Nameless' };

    var ChatCore = this;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Set User Data and we have to go Back to The Future.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ChatCore.user = function(data) {
        if (data) angular.extend( user, data );
        return user;
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Publish via PubNub
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ChatCore.publish = function(setup) {
        var meta   = setup.meta         || ChatCore.user()
        ,   userid = ChatCore.user().id || 'nil';

        var request = {
            method  : 'GET'
        ,   params  : { meta : meta, uuid : userid }
        ,   timeout : setup.timeout || 5000
        ,   success : function(){}
        ,   fail    : function(){}
        };

// 
        request.url = [
            'https://pubsub.pubnub.com'
        ,   '/publish/', pubkey
        ,   '/',         subkey
        ,   '/0/',       setup.channel
        ,   '/0/',       encodeURIComponent(JSON.stringify(setup.message))
        ].join('');

        $http(request).then( request.success, request.fail );
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Subscribe via PubNub
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ChatCore.subscribe = function(setup) {
        var channels  = setup.channels     || 'a'
        ,   groups    = setup.groups       || ''
        ,   message   = setup.message      || function(){}
        ,   timeout   = setup.timeout      || 290000
        ,   timetoken = setup.timetoken    || '0'
        ,   windowing = setup.windowing    || 10
        ,   userid    = ChatCore.user().id || 'nil'
        ,   userstate = ChatCore.user()    || {}
        ,   stop      = false
        ,   origin    = 'ps'+(Math.random()+'').split('.')[1]+'.pubnub.com';

        // Request Object
        var request = {
            method  : 'GET'
        ,   url     : ''
        ,   params  : { uuid : userid, state : userstate }
        ,   timeout : timeout
        ,   success : next
        ,   fail    : function(){ timetoken = '0'; next() }
        };

        // Channel Groups
        if (groups) request.params['channel-group'] = groups;

        // Subscribe Loop
        function next(response) { 
            if (stop) return;
            if (response) {
                timetoken = timetoken == '0' ? 1000 : response.data.t.t;
                message(response);
            }

            request.url = [
                'https://',       origin
            ,   '/v2/subscribe/', subkey
            ,   '/',              channels
            ,   '/0/',            timetoken
            ].join('');

            setTimeout( function() {
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
// UUID
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


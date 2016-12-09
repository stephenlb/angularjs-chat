'use strict';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// AngularJS Chat Module
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module( 'chat', [] );

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Common JS
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
if (typeof(exports) !== 'undefined') exports.chat = angular.module('chat');

angular.module('chat').service( 'Messages', [ 'ChatCore', function(ChatCore) {
    var Messages = this;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Send Messages
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Messages.send = function(message) {

        if (!message.data) return;

        ChatCore.publish({
            channel: message.to || 'global',   
            message: message.data,   
            meta: ChatCore.user()
        });

    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Receive Messages
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Messages.receive = function(fn) {

        Messages.subscription = ChatCore.subscribe({
            channels: [ 'global', ChatCore.user().id ].join(','),
            message: fn
        });
    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Set/Get User and Save the World from that Bruce Willis movie.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Messages.user = function(data) {
        return ChatCore.user(data);
    };

}]);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// AngularJS Chat Core Service
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module('chat').service('ChatCore', 
    ['$rootScope', '$http', 'config', 
    function($rootScope, $http, config) {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // API Keys
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var pubkey = config.pubnub['publish-key']; 
    var subkey = config.pubnub['subscribe-key'];

    var user   = { id : uuid(), name : 'Nameless' };

    var ChatCore = this;

    var realtime = rltm('pubnub', {
        publishKey: 'demo',
        subscribeKey: 'demo',
        uuid: user.uuid,
        state: user
    });

    var room;

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

        var meta   = setup.meta || ChatCore.user();
        var userid = ChatCore.user().id || 'nil';

        room.publish({
            data: setup.message,
            user: user
        });

        return false;

    };

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Subscribe via PubNub
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ChatCore.subscribe = function(setup) {

        room = realtime.join(setup.channels[0]);

        room.on('message', function(uuid, data) {
            setup.message(data);  
            $rootScope.$apply();
        });

    };

}]);

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


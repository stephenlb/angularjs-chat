'use strict';

angular.module('chat', []);

// Common JS
if (typeof(exports) !== 'undefined') exports.chat = angular.module('chat');

// define Angular Message module
angular.module('chat').service( 'Messages', [ 'ChatCore', function(ChatCore) {

    var self = this;

    // Send Messages
    self.send = function(message) {

        if (!message.data) return;

        ChatCore.publish({
            channel: message.to || 'global',   
            message: message.data,   
            meta: ChatCore.user()
        });

    };

    // Receive Messages
    self.receive = function(fn) {

        self.subscription = ChatCore.subscribe({
            channels: [ 'global', ChatCore.user().id ].join(','),
            message: fn
        });
    };

    // Set/Get User
    self.user = function(data) {
        return ChatCore.user(data);
    };

    return self;

}]);

// AngularJS Chat Core Service
angular.module('chat').service('ChatCore', 
    ['$rootScope', '$http', 'config', 
    function($rootScope, $http, config) {

    var user = { 
        id : uuid(),
        name : 'Nameless'
    };

    var self = this;

    self.rltm = rltm(config.rltm);
    self.room;

    // Set User Data
    self.user = function(data) {

        if (data) {
            angular.extend(user, data);
        }

        return user;

    };

    // Publish over network
    self.publish = function(setup) {

        var meta = setup.meta || self.user();
        var userid = self.user().id || 'nil';

        return self.room.publish({
            data: setup.message,
            user: user
        });

    };

    // Subscribe to new messages
    self.subscribe = function(setup) {

        self.room = self.rltm.join(setup.channels[0]);

        self.room.on('message', function(uuid, data) {

            setup.message(data);  
            $rootScope.$apply();
        });

        return self.room;

    };

}]);

// UUID utility
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


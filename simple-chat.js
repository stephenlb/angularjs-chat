'use strict';

var chat = angular.module( 'simpleChat', ['chat'] );

chat.controller( 'chatController', [ 'Messages', function( Messages ) {
    var chat = this;
    chat.messages = [];

    // Set User Data
    Messages.user({ id  : 'stephen-t13isk', name : 'Stephen' });

    // Receive Messages
    Messages.receive(function(msg){
        chat.messages.unshift(msg);
    });

    // Send Messages
    chat.send = function() {
        Messages.send({ to : 'stephen-t13isk', data : chat.textbox || "Hi" });
        chat.textbox = "";
    };

} ] );

'use strict';

// Chat App Module
var basicChat = angular.module( 'BasicChat', ['chat'] );

// Chat App Controller
basicChat.controller( 'BasicController', [ 'Messages', function( Messages ) {
    var chat = this;
    chat.messages = [];

    // Set User Data
    Messages.user({ id  : 'BasicUser', name : 'Stephen' });

    // Receive Messages
    Messages.receive(function(msg){
        chat.messages.unshift(msg);
    });

    // Send Messages
    chat.send = function() {
        Messages.send({ to : 'BasicUser', data : chat.textbox || "Hi" });
        chat.textbox = "";
    };

} ] );

'use strict';

var simplechat = angular.module( 'simple-chat', ['chat'] );

simplechat.controller( 'simple-chat-controller', [
'$http',
'Messages',
function( $http, Messages ) {
    var chat      = this;
    chat.messages = [];
    chat.send     = function() {
        chat.messages.unshift({ body : Messages.derbs + (chat.textbox || "Hi") });
        var message = encodeURIComponent(JSON.stringify({ body : chat.textbox || "Hi" }));
        $http({
            method: 'GET',
            url: 'http://pubsub.pubnub.com/publish/demo/demo/0/hello/0/' + message
            }).then(function(response) {
                
            }, function(response) {
                
        });
        chat.textbox = "";
    };
    chat.receive = function(message) {
    };
} ] );

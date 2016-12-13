'use strict';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Chat App Module
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
var basicChat = angular.module( 'BasicChat', ['chat'] );

// angular.module('chat').constant( 'config', {
//     rltm: {
//         service: 'pubnub', 
//         config: {
//             publishKey: 'demo',
//             subscribeKey: 'demo'
//         }
//     }
// });

// or use socket.io
// make sure to run socket.io-server from rltm.js
angular.module('chat').constant( 'config', {
    rltm: {
        service: 'socketio', 
        config: {
            endpoint: 'http://localhost:9000'
        }
    }
});


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Chat App Controller
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
basicChat.controller( 'BasicController', ['$scope', 'Messages', function($scope, Messages) {

    // Sent Indicator
    $scope.status = "";

    // Keep an Array of Messages
    $scope.messages = [];

    $scope.me = {name: sillyname()};

    console.log('i am', $scope.me)

    // Set User Data
    Messages.user($scope.me);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Get Received Messages and Add it to Messages Array.
    // This will automatically update the view.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var chatmessages = document.querySelector(".chat-messages");

    Messages.receive(function(msg) {

        console.log(msg)
        
        $scope.messages.push(msg);
    
        setTimeout( function() {
            chatmessages.scrollTop = chatmessages.scrollHeight;
        }, 10 );

    });

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Send Messages
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $scope.send = function() {

        Messages.send({data: $scope.textbox});
        
        $scope.status = "sending";
        $scope.textbox = "";

        setTimeout(function() { 
            $scope.status = "" 
        }, 1200 );

    };

} ] );

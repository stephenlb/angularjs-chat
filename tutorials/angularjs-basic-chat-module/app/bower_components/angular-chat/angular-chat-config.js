'use strict';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// AngularJS Chat Configuration
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module('chat').constant( 'config', {
    //
    // Get your API Keys -> https://admin.pubnub.com/#/register
    //
    "pubnub": {
        "publish-key"   : "demo",
        "subscribe-key" : "demo"
    }
} );

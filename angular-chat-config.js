'use strict';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// AngularJS Chat Configuration
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
angular.module('chat').constant( 'config', {
    //
    // Get your API Keys -> https://www.pubnub.com/get-started/?medium=sbng2016&source=sbng2016&campaign=sbng2016&keyword=sbangularjs&content=sbng2016
    //
    "pubnub": {
        "publish-key"   : "__YOUR_PUBLISH_KEY__",
        "subscribe-key" : "__YOUR_SUBSCRIBE_KEY__"
    }
} );

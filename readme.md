# AngularJS Chat

> [AngularJS Chat](http://angular.chat)

Enable messaging experiences for Web, iOS and Android apps.
Coming Soon AngularJS and the best frameworks Ionic, PubNub, PhoneGap

![AngularJS Chat Website](http://i.imgur.com/Nb6EzZB.png)

## NPM Install

```shell
npm install angular-chat
```

## Bower Install

```shell
bower install angular-chat
```

## Include the files

Include the angular chat files in your template.

```html
<script src="bower_components/rltm/web/rltm.js"></script>
<script src="bower_components/angular-chat/angular-chat.js"></script>
```

## Include the Angular module

```js
var chat = angular.module('BasicChat', ['chat']);
```

## Configure

In order to use angularjs-chat, you must configure a connection to a realtime 
service. This library includes rltm.js as a dependency which lets you switch 
between realtime service providers like Socket.io and PubNub easily.  We 
recommend [setting up with PubNub](https://github.com/pubnub/rltm.js#pubnub) 
to get started quickly and scale to infinity.

```js
angular.module('chat').constant('config', {
    rltm: {
        service: "pubnub",
        config: {
            "publishKey": "demo",
            "subscribeKey": "demo"
        }
    }
});
```

## Example Controller

The chat module exposes an object called ```Messages``` which includes
a ```send``` and ```receive``` method. 

```js
chat.controller( 'chat', [ 'Messages', '$scope', function( Messages, $scope ) {
    // Message Inbox
    $scope.messages = [];
    // Receive Messages
    Messages.receive(function(message) {
        $scope.messages.push(message);
    });
    // Send Messages
    $scope.send = function() {
        Messages.send({ 
            data: $scope.textbox 
        });
    };
}]);
```

In this controller we keep a list of messages in ```$scope.messages``` and 
push a new message every time the ```Messages.receive()``` callback is called.

To send a message over the Internet, we use the ```Messages.send()``` method
and attach it to ```$scope.send()```` so we can call bind it to the DOM.

## Create your view

We use the ```$scope.send()``` method and ```$scope.messages``` variable in 
our view.

```html
<div ng-app="BasicChat">
    <div ng-controller="chat">
        <div ng-repeat="message in messages">
            <strong>{{message.user.name}}:</strong>
            <span>{{message.data}}</span>
        </div>
        <form ng-submit="send()">
            <input ng-model="textbox">
        </form>
    </div>
</div>
```

### Set User ID

Set some identification for this user.

```js
Messages.user({ id: MY_USER_ID, name : sillyname() });
```

### Send to User

Send a message to another user.

```js
Messages.send({ to: target_user_id, data : message_body });
```

If you want random user id's that are transient...  you can publish the LIST 
of users to the "global" channel and receive each user who has come online.

# Basic Example

Check out ```/examples/basic/index.html``` for an example of a chatroom that
every visitor can chat in.

# Support Desk (many to one) Example

Check out ```/examples/support-chat/index.html``` and 
```/examples/support-chat/admin.html``` for an example of a embedded support
type chatroom. The page ```index.html``` can only chat with the user on
```admin.html```. The page ```admin.html``` creates a new instance of a 
chatroom for every new user on ```index.html```.


## AngularJS Chat Resources

 - [AngularJS Chat Website](http://angular.chat)
 - [AngularJS Chat Documentation](https://github.com/stephenlb/angularjs-chat/wiki/AngularJS-Chat-Module)
 - [AngularJS Chat GitHub](https://github.com/stephenlb/angularjs-chat)
 - [Twitter](https://twitter.com/stephenlb)
 - [Get PubNub API Keys](https://www.pubnub.com/get-started/?medium=sbng2016&source=sbng2016&campaign=sbng2016&keyword=sbangularjs&content=sbng2016)
 - [YouTube](https://www.youtube.com/c/StephenBlum)
 - [LinkedIn](https://www.linkedin.com/in/stephenlb)
 - [Vine](https://vine.co/Stephen.Blum)
 - [G+](https://plus.google.com/+StephenBlum)

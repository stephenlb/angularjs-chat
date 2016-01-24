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

## Basic Chat Demo

```html
<!-- =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= -->
<!-- includes -->
<!-- =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= -->
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-chat/angular-chat.js"></script>
<script src="bower_components/angular-chat/angular-chat-config.js"></script>

<!-- =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= -->
<!-- controller -->
<!-- =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= -->
<script type="text/javascript">
var chat = angular.module( 'BasicChat', ['chat'] );
chat.controller( 'chat', [ 'Messages', '$scope', function( Messages, $scope ) {
    // Message Inbox
    $scope.messages = [];
    // Receive Messages
    Messages.receive(function(message){
        $scope.messages.push(message);
    });
    // Send Messages
    $scope.send = function() {
        Messages.send({ data : $scope.textbox });
    };
} ]);
</script>

<!-- =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= -->
<!-- view -->
<!-- =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= -->
<div ng-app="BasicChat">
    <div ng-controller="chat">
        <div ng-repeat="message in messages">
            {{ message.user.name }}:
            {{ message.data }}
        </div>
        <form ng-submit="send()">
            <input ng-model="textbox">
        </form>
    </div>
</div>
```


## AngularJS Chat Resources

 - [AngularJS Chat Website](http://angular.chat)
 - [AngularJS Chat Documentation](https://github.com/stephenlb/angularjs-chat/wiki/AngularJS-Chat-Module)
 - [AngularJS Chat GitHub](https://github.com/stephenlb/angularjs-chat)
 - [Twitter](https://twitter.com/stephenlb)
 - [YouTube](https://www.youtube.com/c/StephenBlum)
 - [LinkedIn](https://www.linkedin.com/in/stephenlb)
 - [Vine](https://vine.co/Stephen.Blum)
 - [G+](https://plus.google.com/+StephenBlum)
 - [PubNub](https://www.pubnub.com/)

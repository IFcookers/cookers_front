/**
 * Created by airnold on 15. 11. 25..
 */



angular.module('cookers.services')
    .factory('socket',[
        'socketFactory',
        'cookers_config',
        function(socketFactory,cookers_config) {
            var url = cookers_config;
            var myIoSocket = io.connect('htto://localhost:3100');

            mySocket = socketFactory({
                ioSocket: myIoSocket
            });

            console.log('socket');

            return mySocket;

        }])

    .factory('badgeService',['socket',
        function(socket){

            var badge = {};

            badge.somenotiPush = function(touserid){
                socket.emit('notipush', touserid);
            };

            return badge;

        }]);

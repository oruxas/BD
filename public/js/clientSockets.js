 var socket = io(); //initiating request from client to open conneection and keep it open; socket variable critical to listen
                
                //arrow functions may not work in other browsers
                socket.on('connect', function(){
                    console.log('connected to server');
                });

                //happens when server goes down
                socket.on('disconnect', function(){
                    console.log('Disconnected from server');
                });
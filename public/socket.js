var socket = io.connect('http://localhost:8080');
console.log("hi there, bitch");
var client = prompt('rentrez votre pseudo:');
socket.emit('newClient', client);
socket.on('message', function(message){
	alert('hi ' + message);
});
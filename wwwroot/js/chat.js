'use strict';

const connection = new signalR
    .HubConnectionBuilder()
    .withUrl('/chat-hub')
    .build();

document.getElementById('sendButton').disabled = true;

connection.on('ReceiveMessage', (user, message) => {
        const msg = message
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        const encodedMessage = user + ' diz: ' + msg;
        const li = document.createElement('li');
        li.textContent = encodedMessage;
        document.getElementById('messagesList').appendChild(li);
        clearInputFields();
});

function clearInputFields() {
    console.log('vou apagar user: ', document.getElementById('userInput').value)
    document.getElementById('userInput').value = '';
    document.getElementById('messageInput').value = '';
}

connection.start()
    .then(() => {
        document.getElementById('sendButton').disabled = false;
    })
    .catch(console.error);

document.getElementById('sendButton')
    .addEventListener('click', () => {
        const user    = document.getElementById('userInput').value;
        const message = document.getElementById('messageInput').value;
        connection
            .invoke('SendMessage', user, message)
            .catch(console.error);
        event.preventDefault();
});

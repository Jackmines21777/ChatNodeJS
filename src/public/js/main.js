$(function (){
    const socket = io();
    // obtener dOM
    const messageForm = $('#message-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    // var nick = '';

    //obtener nickname form
    const nickForm = $('#nickForm');
    const nickname = $('#nickname');
    const nickError = $('#nickError');
    const usernames = $('#usernames');


    nickForm.submit(e =>{
        e.preventDefault();
        socket.emit('nuevo usuario', nickname.val(), data =>{
            if(data){
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            }else{
                nickError.html(`
                <div class="alert alert-danger"> 
                 Usuario ya existe.
                </div>
                `);
            }
        });
    });


    // eventos
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val(), data =>{
            $chat.append(`<p class="error"> ${data}</p> `)
        });
        messageBox.val('');
    });

    socket.on('nuevo mensaje', function(data) {
        let color = "#f4f4f4";

        // if(nick=data.usuarios) {
        //     color = "#9ff4c5";
        // }
            
        chat.append(`<div style="background-color:${color}"><b>${data.nick}: </b>${data.msg}</div>`);
            
            
        });

    socket.on('usernames', data =>{
        let html ='';
        for (let i=0; i<data.length; i++){
            html += `<p> 👀 ${data[i]}</p>`
        }
        usernames.html(html);
    });

    socket.on('privado', data =>{
        chat.append(`<p class="privado"><b>${data.nick}: </b>${data.msg}</p>`);
    });

})

module.exports = function(io){

    let usuarios = {};    

    io.on('connection', socket => {
        console.log('Nuevo usuario conectado');

        socket.on('nuevo usuario', (data, callback) =>{
            if(data in usuarios){
                callback(false);
            }else{
                callback(true);
                socket.nickname = data;
                usuarios[socket.nickname] = socket;
                updateNicknames();
            }
        });

        socket.on('enviar mensaje', (data, callback) => {
            var msg =  data.trim();

            if(msg.substr(0, 3) === '/p '){
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if(index !== -1) {
                    var name = msg.substring(0, index);
                    var msg = msg.substring(index + 1);
                    if(name in usuarios) {
                        usuarios[name].emit('privado', {
                            msg,
                            nick: socket.nickname
                        });
                    } else{
                    callback('Error, ingresa un usuario válido');
                    }
                } else{
                callback('Error, ingresa un mensaje');
                }   
            }else{
                io.sockets.emit('nuevo mensaje', {
                    msg: data,
                    nick: socket.nickname,
                });
            }
        });

        socket.on('disconnect', data =>{
            if(!socket.nickname) return;
            delete usuarios[socket.nickname];
            updateNicknames(); 
        });

        function updateNicknames(){
            io.sockets.emit('usernames', Object.keys(usuarios));
        }



    });

   
}

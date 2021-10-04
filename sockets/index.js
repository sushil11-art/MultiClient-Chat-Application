const formatMessage = require("../utils/messages");
const { userJoin ,getRoomUsers} = require("../utils/users");

var ably = new require('ably').Realtime('jWXd4w.O6jOfA:bK7I2Gnri_U0IslR');


function ablySocket(server){

    ably.connection.on('connected',()=>{
        console.log("Ably is connected")
    });

    const roomEntryChannel=ably.channels.get("roomEntryChannel")
    roomEntryChannel.subscribe('joinRoom',async(event)=>{
        const id=event.id;
        const username=event.data.username;
        const room=event.data.room
        const user=userJoin(id,username,room)
        const roomChannel=ably.channels.get(room)
        const users=await getRoomUsers(room)
        await roomChannel.publish('getUsersRoom',{room:user.room,users:users})
        await roomChannel.publish('userJoined',user)
        await roomChannel.subscribe('sendMessage',async(message)=>{
            const text=message.data.text;
            const username=message.data.name
            const data={text:text,username:username}
            console.log(data)
            await roomChannel.publish('receiveMessage',data)

        })
        // roomChannel.publish("joined","User has successfully joined")
    })

    // roomEntryChannel.unsubscribe('leftRoom',async(user)=>{
    //         console.log("user has left the chat")
    // })



    // roomChannel.subscribe('connect',(message)=>{
    //     console.log(message.data);
    // })

    // roomChannel.subscribe('sendMessage',(message)=>{

    //     roomChannel.publish('receiveMessage',formatMessage('User',message.data))

    // })
    
    // roomChannel.presence.leave(function(err){
    //     console.log("user has left the chanel");
    
    // })


    
      //   simple chat without room
    // const chatChannel=ably.channels.get("chatChannel")

    // chatChannel.subscribe('startChat',(message)=>{
    //     let data=message.data
    //     chatChannel.publish('displayText',data)

    // })
     
}



module.exports=ablySocket

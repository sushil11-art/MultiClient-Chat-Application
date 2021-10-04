const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


var input = document.getElementById('msg');



// get username and roomName from url


const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  })

// console.log(username);



var client = new Ably.Realtime('jWXd4w.O6jOfA:bK7I2Gnri_U0IslR');



var roomEntryChannel =client.channels.get("roomEntryChannel")

const roomChannel=client.channels.get(room)

roomEntryChannel.publish('joinRoom',{username,room});


roomChannel.subscribe('userJoined',(message)=>{

    let data=message.data
    // data.push({text:"Just joined the chat"})
    if(username != message.data.username){
        outputMessage(data)
        // alert(message.data.username)
    }
})

roomChannel.subscribe('getUsersRoom',(infos)=>{
    outputRoomName(infos.data.room)
    outputUsers(infos.data.users)
})

chatForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    if(input.value){
        const text=input.value
        const name=username
        const message={text,name}
        await roomChannel.publish("sendMessage",message);
        input.value=" "
    }

})


// receive message

roomChannel.subscribe('receiveMessage',async(message)=>{
    let data=message.data
    // to output message in dom
    await outputMessage(data)
    chatMessages.scrollTop = chatMessages.scrollHeight;
})



//Prompt the user before leave chat room
// document.getElementById('leave-btn').addEventListener('click', () => {
//     const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
//     if (leaveRoom) {

//     roomEntryChannel.publish("leftRoom",username)
//       window.location = '../index.html';
//     } else {
//     }
//   });

// output message function


function outputMessage(data){

    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText =`${data.username}`
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = data.text == undefined ? "Joined the chat" : `${data.text}`
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}



// output room and users


function outputRoomName(room) {
    roomName.innerText = room;
  }
  
  // Add users to DOM
  function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }
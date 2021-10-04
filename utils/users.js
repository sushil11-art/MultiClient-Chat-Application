const users=[]


function userJoin (id,username,room){
    const user={id,username,room}
    users.push(user)
    return user
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
  }


module.exports={
    userJoin,
    getRoomUsers
}

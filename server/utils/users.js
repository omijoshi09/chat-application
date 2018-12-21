
//addUser(id,name,room)

//removeUser(id)

//getUser(id)

//getUserList(room)

class Users {
    constructor(){
        this.users = [];
    }

    addUser(id,name,room){
        var user = {id:id,name:name,room:room};
        this.users.push(user);
        return user;
    }

    removeUser(id){

        //Old approach

       /* this.users.forEach((user,index)=>{
            if(user.id == id){
                this.users.splice(index,1);
                return this.users;
            }
        })*/

       //New method

        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=> user.id !== id);
        }

        return user;
    }

    getUser(id){

        //Old Method
        /*this.users.forEach((user,index)=>{
            if(user.id == id){
                return user;
            }
        })*/
        //New method
        console.log(this.users);
       return this.users.filter((user) =>  user.id == id )[0];

    }

    getUserList(room){
        var users = this.users.filter((user)=>{
            return user.room == room;
        });
        var namesArray = users.map((user)=>{
          return user.name
        });

        return namesArray;
    }
}
module.exports = {Users}


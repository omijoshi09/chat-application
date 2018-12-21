const expect = require('expect');

const {Users} = require('./users');


describe('Users',()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [
            {
                id:'1',
                name:'Omkar',
                room:'Office group'
            },
            {
                id:'2',
                name:'Bhushan',
                room:'tinder boy'
            },
            {
                id:'3',
                name:'Akash',
                room:'train boy'
            },
            {
                id:'4',
                name:'Chetan',
                room:'tinder boy'
            }
        ]

    })

    it('Should add new user',() => {
        var users = new Users();
        var user = {
            id:'123',
            name:'omkar',
            room:'Office family'
        };

        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.users).toEqual([user]);
    })

    it('Should Return name for tinder',() => {
       var userList = users.getUserList('tinder boy');

       expect(userList).toEqual(['Bhushan','Chetan']);
    })

    it('Should Return name for train',() => {
        var userList = users.getUserList('train boy');

        expect(userList).toEqual(['Akash']);
    });

    it('Should Return the user ',() => {
        var user = users.getUser('1');

        expect(user).toEqual({
            id:'1',
            name:'Omkar',
            room:'Office group'
        });
    });

    it('Should not return the user ',() => {
        var user = users.getUser('5');

        expect(user).toEqual(undefined);
    });

    //Should remove user

    it('Should remove user id ',() => {

        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
       // expect(users.users.length).toBe(2);

    });

    //should not remove user
    it('Should not remove user',() => {

        var userId = '1';
        var user = users.removeUser(userId);

        expect(user).toBeTruthy();
        expect(users.users.length).toBe(3);

    });
})
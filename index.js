const passwordCheck = require('./passwordCheck');
const usernameCheck = require('./usernameCheck');

const event =  {
    request: {
        userAttributes: {
            username: 'Node-js'
        },
        userPassword: '{#######}'
    }
}

passwordCheck.handler(event,{},()=>{});
console.log("password validation: ", event.success);
usernameCheck.handler(event,{},()=>{});
console.log("username validation: ", event.success);

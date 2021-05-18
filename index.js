const passwordCheck = require('./passwordCheck');
const usernameCheck = require('./usernameCheck');

const event =  {
    request: {
        userAttributes: {
        username: 'Node-js'
        },
        userPassword: 'AAaaaaaaaaa#'
    }
}

console.log(passwordCheck.handler(event,{},()=>{}));
console.log(usernameCheck.handler(event,{},()=>{}));
const usernameCheck = require('./usernameCheck');

const event =  {
    request: {
        userAttributes: {
        username: 'Node-js'
        },
        userPassword: "{########}"
    }
}

const cases = [
    [null, false],
    ["", false],
    ['z', false],
    ['H', false],
    ['@', false],
    ['AAAA', true],
    ['AAaa', true],
    ['AAaaaaaaaa#', false],
    ['1234567891011', true],
    ['AAaaaa1aaaa#', false],
    ['utilisateur-1', true],
    ['utilisateur_1', true],
    ['-utilisateur_1', false],
    ['utilisateur_1-', false],
    ['utilisateur__1', false]
];

test.each(cases)("if password is '%s' return %s", (username, expected) => {
    event.request.userAttributes.username = username;
    usernameCheck.handler(event,{},()=>{})
    expect(event.success).toEqual(expected);
});
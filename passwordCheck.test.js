const passwordCheck = require('./passwordCheck');

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
  ['AAAAAAAAAAAA', false],
  ['AAAAAAaaaaaa', false],
  ['AAAAAAaaaaa#', false],
  ['1234567891011', false],
  ['AAaaaa1aaaa#', true],
  ['!Zorglub1987#', true]
];

test.each(cases)("if password is '%s' return %s", (username, expected) => {
  event.request.userPassword = username;
  passwordCheck.handler(event,{},()=>{})
  expect(event.success).toEqual(expected);
});


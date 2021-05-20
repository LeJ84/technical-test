exports.handler = (event, context, callback) => {

    const {username} = event.request.userAttributes;
    let isValid = true;
    const minUsernameLength = 4;
    const errorCases = [
        [`.{${minUsernameLength}}`,`Username must be at least ${minUsernameLength} characters long`],
        ['^[\\w-]+$',"Username must contains only contains -,_ or alphanumeric characters"],
        ['^(?!-|_).*[^\\W_]$',"Username must not start or end by - or _"],
        ['^((?!--|-_|_-|__).)*$',"Username must not contains consecutives - or _"]
    ]
    const errorMessages = [];

    if (username) {
        for (errorCase of errorCases) {
            const [pattern, message] = errorCase;
            const regex = new RegExp(pattern);
            if (!regex.test(username)) errorMessages.push(message);
        }
    } else {
        errorMessages.push("Username cannot be empty !")
    }

    if (errorMessages.length > 0) isValid = false;
    event.success = isValid;

    if (isValid) { 
        callback(null, event);
        // Optional chaining to avoid errors during tests when context is an empty Object
        // context.succeed?.("Username OK");
    } else {
        // Optional chaining to avoid errors during tests when context is an empty Object
        // context.fail?.(errorMessages.join('\n'));
    }
};

//^(?!-|_)((?!--|-_|_-|__)[\\w-]){3,}[^\\W_]$
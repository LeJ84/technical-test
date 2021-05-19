
exports.handler = (event, context, callback) => {
    const {userPassword} = event.request;
    let isValid = true;
    const minPasswordLength = 12;
    const errorCases = [
        [`.{${minPasswordLength}}`,`Password must be at least ${minPasswordLength} characters long`],
        ['.*[a-z]',"Password must contains at least one lowercase character"],
        ['.*[A-Z]',"Password must contains at least one uppercase character"],
        ['.*\\d',"Password must contains at least one number"],
        ['.*\\W',"Password must contains at least one special character"]
    ]
    const errorMessages = [];

    if (userPassword) {
        for (errorCase of errorCases) {
            const [pattern, message] = errorCase;
            const regex = new RegExp(pattern);
            if (!regex.test(userPassword)) errorMessages.push(message);
        }
    } else {
        errorMessages.push("Password cannot be empty !")
    }

    if (errorMessages.length > 0) isValid = false;
    if (isValid) { 
        callback(null, event);
        context.succeed?.("Password OK");
    } else {
        context.fail?.(errorMessages.join('\n'));
    }
    event.success = isValid;
};

//^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W])[\\W\\w]{12,}$


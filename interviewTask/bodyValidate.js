exports.validateBodySignup = (email, password, callback) => {
        if (email == null || email == undefined || !email) {
            return callback({ code: 210, msg: "email not found" })
        } else {
            if (password == null || password == undefined || !password) {
                return callback({ code: 210, msg: "password not found" })
            } else {
                return callback("success")
            }
        }
}


exports.validateBodyLogin = (email, password, callback) => {
    if (email == null || email == undefined || !email) {
        return callback({ code: 210, msg: "email not found" })
    } else {
        if (password == null || password == undefined || !password) {
            return callback({ code: 210, msg: "password not found" })
        } else {
            console.log("body validate")
            return callback("success")

        }
    }
}
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const { validateBodySignup, validateBodyLogin } = require('../bodyValidate')
const jwt = require("jsonwebtoken")

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

const validateEmail = (email) => {
    return email.match(/\S+@\S+\.\S+/);
}



exports.normal_signup = async (req, res) => {
    const {
        email,
        password,
    } = req.body
    await validateBodySignup(email, password, async (data) => {
        if (data == "success") {
            const emailverified = validateEmail(email)
            if (emailverified || emailverified != null) {
                let emails = email.replace(/\s/g, "")
                const hashedPassword = await hashPassword(password)
                const user_check = await User.findOne({
                    email: emails
                })
                if (!user_check) {
                    const newUser = new User({
                        email: emails,
                        password: hashedPassword,
                        login_status: "1"
                    })
                    var Token = jwt.sign({
                        _id: newUser._id
                    }, "mysecreatekey")
                    newUser.bearer_token = Token
                    newUser.save()
                        .then(async (resp) => {
                            res.json({
                                code: 212,
                                data: resp,
                                bearer_token: Token,
                                msg: "Congradulation! You have sign up successfully."
                            })

                        })
                } else {
                    res.json({
                        code: 211,
                        msg: "An account already exists with this email address.",
                        data: {}
                    })
                }
            } else {
                res.json({
                    code: 211,
                    msg: "Invalid Email!",
                    data: {}
                })
            }

        } else {
            console.log("some error : ", data)
            res.json(data)
        }

    })

};

exports.login = async (req, res) => {
    const {
        email,
        password
    } = req.body
    console.log("normal signin API called Body Data :-- ", req.body)
    await validateBodyLogin(email, password, async (data) => {
        if (data == "success") {
            const emailverified = validateEmail(email)
            if (emailverified || emailverified != null) {
                console.log("LOGIN By Email ID :--- ", email)
                let emails = email.replace(/\s/g, "")
                console.log("emails:-", emails)
                const user = await User.findOne({
                    email: emails
                })
                if (!user) {
                    console.log("LOGIN API --Email id not exits in users")
                    res.json({
                        code: 211,
                        msg: 'This is not a registered Email id.'
                    })
                } else {
                    const validPassword = await validatePassword(password, user.password)
                    console.log(validPassword, '44')
                    if (!validPassword) {
                        console.log("Password is wrong in login API")
                        res.json({
                            code: 211,
                            msg: 'Incorrect Password!'
                        })
                    } else {
                        const updateLoginStatus = await User.updateOne({
                            _id: user._id
                        }, {
                            $set: {
                                login_status: "1"
                            }
                        })
                        if (updateLoginStatus.modifiedCount && updateLoginStatus.matchedCount) {
                            res.json({
                                code: 212,
                                msg: "User Login Successful!",
                                loginStatus: "1",
                            })
                        }else{
                            res.json({
                                code: 211,
                                msg: "Details Not updated.",
                                data: {}
                            })
                        }
                    }
                }
            }
            else {
                res.json({
                    code: 211,
                    msg: "Invalid Email!",
                    data: {}
                })
            }
        } else {
            console.log("some error : ", data)
            res.json(data)

        }
    })
}

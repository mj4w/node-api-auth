const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const { create } = require('../Models/User')

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                // iss: "website.com",
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: "1h",
                issuer: "website.com",
                audience: userId,
            }
            JWT.sign(payload,secret,options, (error, token) => {
                if (error) {
                    console.log(error.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    }
}
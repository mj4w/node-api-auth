const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User')
const {
    registrationSchema,
    loginSchema
} = require('../helpers/validation_schema')
const { signAccessToken,signRefreshToken } = require('../helpers/jwt_helper')
const { verifyRefreshToken } = require('../helpers/jwt_helper')

router.post('/register', async (req, res, next) => {
    console.log(req.body);
    try {
        const result = await registrationSchema.validateAsync(req.body);

        // Check if the email is already registered
        const doesExist = await User.findOne({ email: result.email });
        if (doesExist) throw createError.Conflict(`${result.email} is already registered`);

        // Create a new user
        const user = new User({ email: result.email, password: result.password });
        const savedUser = await user.save();

        // Generate tokens
        const accessToken = await signAccessToken(savedUser.id);
        const refreshToken = await signRefreshToken(savedUser.id);

        // Respond with tokens
        res.send({ accessToken, refreshToken });

    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const result = await loginSchema.validateAsync(req.body);

        const user = await User.findOne({ email: result.email });
        if (!user) throw createError.NotFound("User not registered");

        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) throw createError.Unauthorized("Username or password is incorrect");

        const accessToken = await signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res.send({ accessToken, refreshToken });
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest('Invalid email or password'));
        next(error);
    }
});

router.post('/refresh-token',async(req,res,next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)
        
        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)
        
        res.send({ accessToken:accessToken, refreshToken:refToken })
    
    } catch(error){
        next(error)
    }
})

router.delete('/logout',async(req,res,next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest
        const userId = await verifyRefreshToken(refreshToken)
        if (err) {
            console.log(err.message)
            throw createError.InternalServerError()
        }
        console.log(val)
        res.sendStatus(204)
    } catch (error){
        next(error)
    }
    res.send("logout route")
})


module.exports = router
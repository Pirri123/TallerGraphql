const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {APP_SECRET, getUserID} = require('../utils')

async function signup(parent, args, context){
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({...args, password})
    const token = jwt.sign({userId: user.id}, APP_SECRET)

    return {
        token,
        user
    }
}

async function login(parent, args, context){
    const user = await context.prisma.user({email: args.email})
    if (!user){
        throw new Error ('Invalid password or email')
    }
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    return {
        token,
        user
    }
}

function post(parent, args, context){
    const userId = getUserID(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: {connect: {id: userId}}
    })
}

module.exports = {
    signup,
    login,
    post
}
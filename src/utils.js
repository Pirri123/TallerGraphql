const jwt = require('jsonwebtoken')
const APP_SECRET = 'Taller GraphQL';

function getUserID(context){
    const Authorization = context.request.get('Authorization')
    if (Authorization){
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId
    }
    throw new Error('No se autentico')
}

module.exports = {
    APP_SECRET,
    getUserID
}
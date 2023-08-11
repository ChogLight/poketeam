// @ts-nocheck
import { JWT_SECRET } from '$env/static/private'
import jwt from 'jsonwebtoken';
import db from '$lib/db'
import { ObjectId } from 'mongodb';
/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    
    const authCookie = event.cookies.get('AuthorizationToken')
    if(authCookie) {
        const token = authCookie.split(' ')[1]
        try {
            const jwtUser = jwt.verify(token, JWT_SECRET)
            if(typeof jwtUser === 'string'){
                throw new Error('Something went wrong')
            }
            const user = await db.collection('users').findOne({
                _id: new ObjectId(jwtUser.id)
            })
            if(!user) {
                throw new Error("User not found")
            }
            const sessionUser = {
                id:user._id.toString(),
                user: user.user
            }
            event.locals.user = sessionUser
        }
        catch (error) {
            console.error(error)
        }
    }

    return await resolve(event)
}
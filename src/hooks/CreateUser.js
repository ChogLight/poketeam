// @ts-nocheck
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs'
import db from '$lib/db';
export const createUser = async (user, password, email) => {

    const userCheck = await db.collection('users').distinct("user")
    const emailCheck = await db.collection('users').distinct('email')
    if(userCheck.includes(user)){
        return {
            error: 'Username already taken'
        }
    }
    else if (emailCheck.includes(email)){
        return {
            error: 'Email already signed in'
        }
    }

    try {
        
        const newUser = await db.collection('users').insertOne({
            user: user.toLowerCase(),
            email:email,
            password: await bcrypt.hash(password, 10)
        })
        return { newUser }
    } catch (error) {
        return{
            error: "Something went wrong"
        }
    }

}



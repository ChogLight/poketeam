// @ts-nocheck
import db from "$lib/db"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "$env/static/private"
import { redirect } from "@sveltejs/kit"
export const login = async (user, password) => {
    const userCheck = await db.collection('users').findOne({user: user})
    if(!user){
        return {
            error: "Username does not exist"
        }

    }
    if(!userCheck){
        redirect(500, '/login')

    }
    const isPasswordValid = await bcrypt.compare(password, userCheck.password)

    if(!isPasswordValid){
        return {
            error: 'Invalid credentials'
        }
    }

    const jwtUser = {
        id: userCheck._id.toString(),
        user: userCheck.user
    }
    const token = jwt.sign(jwtUser, JWT_SECRET, {
        expiresIn:'1d'
    })
    return{ token }
}
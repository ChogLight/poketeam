// @ts-nocheck
import { redirect, fail } from '@sveltejs/kit'
import { createUser } from '../../hooks/CreateUser.js'
import { login } from '../../hooks/Login.js'
export const actions = {
    signin: async (event) => {
        const formData = Object.fromEntries(await event.request.formData())
        if(!formData.user || !formData.password){
            return fail(400, {
                error: "Missing user or password"
            })
        }

        const {user, password, email, repeat} = formData 
        if(password != repeat){
            return fail (400, {
                error: "The passwords do not match"
            })
        }
        const {error} = await createUser(user, password, email)

        if(error) {
            return fail(500, {
                error
            })
        }

        throw redirect(302, '/login')
    },
    login: async(event) => {
        const formData = Object.fromEntries(await event.request.formData())
        if(!formData.userlog || !formData.passwordlog){
            return fail(400, {
                error: 'Missing email or password'
            })
        }

        const { userlog, passwordlog } = formData

        const { error, token } = await login(userlog, passwordlog)

        if(error){
            return fail(401, {
                error
            })
        }

        event.cookies.set('AuthorizationToken', `Bearer ${token}`, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict',
            maxAge: 60* 60* 24
        })

        throw redirect(302, '/pokedex')
    }
}

export const load = (event) => {
    const user = event.locals.user

    if(user){
        throw redirect(302,'/')
    }

}
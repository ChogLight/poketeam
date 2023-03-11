// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken'
/** @type {import('./$types').PageServerLoad} */
export const load = (event) => {
    const user = event.locals.user
    if(!user) {
        throw error(401, {
            message:'You must be logged in to view this page'
        })
    }
    const getTeams = async () => {
        const res = await event.fetch('/team')
        const team = await res.json()
        return team
    }
    return {
        user,
        teams: getTeams()
    }
}

/** @type {import('./$types').Actions} */

export const actions = {
    logout: async (event) => {
        event.cookies.delete('AuthorizationToken')
        throw redirect(302, '/')
    }
}
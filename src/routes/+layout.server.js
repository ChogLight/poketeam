// @ts-nocheck
/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
        
        const user = event.locals.user
        const res = await event.fetch("https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0")
        const item = await res.json()
        const length = item.count - 271
        return{item, length, user}
}



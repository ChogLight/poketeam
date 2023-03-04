// @ts-nocheck
/** @type {import('./$types').LayoutLoad} */
export async function load({fetch}) {
    
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0")
        const item = await res.json()
        const length = item.count - 271
        return{item, length}
}
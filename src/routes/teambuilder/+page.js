// @ts-nocheck
/** @type {import('./$types').PageLoad} */
export async function load ({ fetch }) {
    const res = await fetch("https://pokemonteam-api.onrender.com/poketeam")
    const item = await res.json()
    const length = item.length
    return {item, length}
  }
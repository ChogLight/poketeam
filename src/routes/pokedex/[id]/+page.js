// @ts-nocheck
/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params, url }) {
    let pokemonSearch = {}
    const by = 
        url.searchParams.get('by') ===null ? 
        9:
        url.searchParams.get('by')
    const pokemonQuery = url.searchParams.get('pokemon')
    const counter = by*(parseInt(params.id) - 1)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${by}&offset=${counter}`);
    const item = await res.json()
    const pokemonPromise = item.results.map(async pokemon => {
        const res = await fetch(pokemon.url)
        return res.json()
    })

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonQuery}`)
        if(res.status === 200){
            pokemonSearch = res.json()
        }
        else{
            pokemonSearch = {message: "Your pokemon could not be found"}
        }
    } catch (error) {
        pokemonSearch = {message:error}
    }
    

    const pokemon = Promise.all(pokemonPromise)
    return {pokemon, item, by, pokemonSearch}
  }

 /** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch('/team')
    const team = await res.json()
    return { team } 
}
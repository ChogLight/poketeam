<script>
// @ts-nocheck
    import Pokeball from "../../lib/images/Pokeball.svelte"
    import PaginatorMyTeams from "../../components/PaginatorMyTeams.svelte";
    let url = "https://pokemonteam-api.onrender.com/poketeam"
    let myTeams = []
    let page = 0
    const getTeams = async () => {
        const res = await fetch(url)
        const result = await res.json()
        myTeams = [...myTeams, result]
        return result
    }
</script>


<div class="md:flex flex-col h-full">
    <div class="flex md:flex-col basis-2/5 py-5 md:border-r-4 border-black border-b-4 bg-slate-300 justify-center">
        {#await getTeams()}
            <div class="mx-auto content-center">
                <Pokeball height ="120px" width = "120px" animation= "animate-spin"/>
            </div>
        {:then results} 
                <div class="flex flex-col md:flex-row items-center gap-6 bg-red-500 text-white rounded-lg md:p-5 p-2 mx-2">
                    <h1 class="font-bold md:text-3xl text-xl">{results[page].team_name}</h1>
                    <div class="md:flex grid grid-cols-2 gap-1">
                        <img src={results[page].pokemon_1.sprites.front_default} alt={results[page].pokemon_1.name}>
                        <img src={results[page].pokemon_2.sprites.front_default} alt={results[page].pokemon_2.name}>
                        <img src={results[page].pokemon_3.sprites.front_default} alt={results[page].pokemon_3.name}>
                        <img src={results[page].pokemon_4.sprites.front_default} alt={results[page].pokemon_4.name}>
                        <img src={results[page].pokemon_5.sprites.front_default} alt={results[page].pokemon_5.name}>
                        <img src={results[page].pokemon_6.sprites.front_default} alt={results[page].pokemon_6.name}>

                    </div>
                    <PaginatorMyTeams bind:currentPage = {page} 
                    numberOfPages = {results.length}/>
                </div>
        {:catch error}
                
            <div>{error.message}</div>
        {/await}

    </div>
    <div class="grid basis-3/5">

    </div>
</div>
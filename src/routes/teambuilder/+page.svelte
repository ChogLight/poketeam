<script>
// @ts-nocheck
    import Pokeball from "../../lib/images/Pokeball.svelte"
    import PaginatorMyTeams from "../../components/PaginatorMyTeams.svelte";
    let promise
    let url = "https://pokemonteam-api.onrender.com/poketeam"
    let myTeams
    let page = 0
    let searchTeam
    const getTeams = async () => {
        const res = await fetch(url)
        const result = res.json()
        myTeams = result
        return myTeams
    }
    
    promise = getTeams()

    const findTeam = (team, name) => {
        return team.findIndex(team => team.team_name === name)
    }
</script>


<div class="flex flex-col h-full">
    <div class="flex md:flex-col basis-2/5 py-5 md:border-r-4 border-black overflow-scroll border-b-4">
        {#await promise}
            <div class="mx-auto content-center">
                <Pokeball height ="120px" width = "120px" animation= "animate-spin"/>
            </div>
        {:then result} 
            <div class="p-2 m-2">
                <PaginatorMyTeams bind:currentPage = {page} 
                    numberOfPages = {result.length} bind:searchTeam />
                <div class="flex flex-col gap-2 items-center">
                    <p>{result[page].team_name}</p>
                    <div class="flex gap-1">
                        <img src={result[page].pokemon_1.sprites.front_default} alt={result[page].pokemon_1.name}>
                        <img src={result[page].pokemon_2.sprites.front_default} alt={result[page].pokemon_2.name}>
                        <img src={result[page].pokemon_3.sprites.front_default} alt={result[page].pokemon_3.name}>
                        <img src={result[page].pokemon_4.sprites.front_default} alt={result[page].pokemon_4.name}>
                        <img src={result[page].pokemon_5.sprites.front_default} alt={result[page].pokemon_5.name}>
                        <img src={result[page].pokemon_6.sprites.front_default} alt={result[page].pokemon_6.name}>

                    </div>
                </div>
            </div>
        {/await}

    </div>
    <div class="grid basis-3/5">

    </div>
</div>
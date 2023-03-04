<script>
// @ts-nocheck
    import PaginatorMyTeams from "../../components/PaginatorMyTeams.svelte";
    export let data
    let page = 0
    let pokemonTeam = data.item
    let length = data.length
</script>


<div class="md:flex flex-col h-full">
    <div class="flex md:flex-col basis-2/5 py-5 md:border-r-4 border-black border-b-4 bg-slate-300 justify-center">
            <div class="flex flex-col md:flex-row items-center gap-6 bg-red-500 text-white rounded-lg md:p-5 p-2 mx-2">
                {#each pokemonTeam as pokemon}
                    <h1 class="font-bold md:text-3xl text-xl">{pokemon.team_name}</h1>
                    <div class="md:flex grid grid-cols-2 gap-1">
                        <img src={pokemon.pokemon_1.sprites.front_default} alt={pokemon.pokemon_1.name}>
                        <img src={pokemon.pokemon_2.sprites.front_default} alt={pokemon.pokemon_2.name}>
                        <img src={pokemon.pokemon_3.sprites.front_default} alt={pokemon.pokemon_3.name}>
                        <img src={pokemon.pokemon_4.sprites.front_default} alt={pokemon.pokemon_4.name}>
                        <img src={pokemon.pokemon_5.sprites.front_default} alt={pokemon.pokemon_5.name}>
                        <img src={pokemon.pokemon_6.sprites.front_default} alt={pokemon.pokemon_6.name}>

                    </div>
                {/each}
                <PaginatorMyTeams bind:currentPage = {page} 
                numberOfPages = {length}/>
            </div>
        </div>
    <div class="grid basis-3/5">

    </div>
</div>
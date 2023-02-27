<script>
// @ts-nocheck
    import { onMount } from "svelte"
    import Pokemon from "../../components/Pokemon.svelte"
    import Module from "../../components/Module.svelte";
    import Paginator from "../../components/Paginator.svelte";
    import Pokeball from "$lib/images/Pokeball.svelte";
    let counter = 0
    let pageCount = 9
    let currentPage = 1
    let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    let promise
    let innerPromise
    let pokeArray = []
    let pokemonNumber = 1279
    let numberOfPages
    let pokemonModule
    let card = false
    let teamName
    let myTeam = []
    let i = 0
    let id
    $:{
      numberOfPages = Math.round(pokemonNumber/pageCount) >= pokemonNumber/pageCount? 
        Math.round(pokemonNumber/pageCount):
        Math.round(pokemonNumber/pageCount);
        pokeArray = [...pokeArray];
        id = getID(i)
    }

    onMount(() => {
      promise = getPokemon();
    })

    const getID = (i) => {
      i++
      return `pokemon_${i}`
    }

    const postTeam = () => {
      fetch('https://pokemonteam-api.onrender.com/poketeam', {
        method: 'POST',
        body: JSON.stringify({
          team_name: teamName,
          pokemon_1: myTeam[0],
          pokemon_2: myTeam[1],
          pokemon_3: myTeam[2],
          pokemon_4: myTeam[3],
          pokemon_5: myTeam[4],
          pokemon_6: myTeam[5],
        }),
        headers: {
                    'Content-Type': 'application/json'
                }
      }).then(response => response.json())
      .then(data => console.log("Result:", data))
      .catch(error => console.log("Error:", error))
    }
    const getPokemon = async () => {

      const response  = await fetch(url)
      const result  = await response.json()
      innerPromise = await Promise.all(result.results.map(async(url) => {
        await fetch(url.url)
        .then(response => response.json())
        .then(response =>{
          pokeArray.push(response)
          pokeArray.sort((a,b) => {
            return a.id - b.id
          })
        })
      }))
      return pokeArray
    }

    const searchPokemon = (pokemonSearch) => {
      if(pokeArray.filter(pokemon => pokemon.name == pokemonSearch.toLowerCase()).length != 0){
        return pokeArray.filter(pokemon => pokemon.name == pokemonSearch.toLowerCase())[0]
      }
      else{
        return "Pokemon could not be found"
      }
      
    }
</script>

<svelte:head>
	<title>PokeDex</title>
</svelte:head>
<div class="flex flex-col m-auto overflow-auto">
  {#if card}
    <Module bind:card bind:myTeam pokemon = {pokemonModule}/>
  {/if}
  <Paginator bind:counter bind:pageCount bind:currentPage bind:numberOfPages 
    searchPokemon = {searchPokemon} bind:card bind:pokemonModule/>
  {#await promise}
    <div class="mx-auto content-center">
      <Pokeball height ="120px" width = "120px" animation= "animate-spin"/>
    </div>
  {:then results}
    <div class="md:grid grid-cols-3 gap-4 mt-10 w-full">
      {#if results !== undefined}
        {#each results.slice(counter, counter + pageCount) as pokemon}
          <Pokemon pokemon = {pokemon} bind:pokemonModule bind:card/>
        {/each}
      {/if}
    </div>
  {:catch error}
    <div>error.message</div>
  {/await}
  <form class="flex items-center mx-5 border-4 justify-between">
    <div class="flex gap-2 mx-1">
      <label for="team_name">Team Name:</label>
      <input bind:value = {teamName} id = "team_name" name = "team_name" type="text"/>
    </div>
    {#each myTeam as pokemon}
    <div class="flex gap-2">
      <img class="animate-appear duration-300" src="{pokemon.sprites.front_default}" alt={`${pokemon.name}_img`}>
      <input id = {id} name = {id} type="hidden" value = {JSON.stringify(pokemon)} visible = "false"/>
    </div>
  {/each}
    <button class = "border-4 rounded-full p-2 m-1" on:click={postTeam}>SaveTeam</button>
  </form> 
</div>



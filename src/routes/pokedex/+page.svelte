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
    $:{
      numberOfPages = Math.round(pokemonNumber/pageCount) >= pokemonNumber/pageCount? 
        Math.round(pokemonNumber/pageCount):
        Math.round(pokemonNumber/pageCount);
        pokeArray = [...pokeArray]
      
    }

    onMount(() => {
      promise = getPokemon();
    })
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
    <Module bind:card pokemon = {pokemonModule}/>
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
</div>



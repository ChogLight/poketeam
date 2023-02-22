<script>
// @ts-nocheck
    import { onMount } from "svelte"
    import Pokemon from "../../components/Pokemon.svelte"
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

    $:{
      numberOfPages = Math.round(pokemonNumber/pageCount) >= pokemonNumber/pageCount? 
        Math.round(pokemonNumber/pageCount):
        Math.round(pokemonNumber/pageCount);
      
    }

    onMount(() => {
      getPokemon();
    })
    const getPokemon = async () => {
      const response = await fetch(url)
      promise = response.json()
      promise.then(async(pokemonList) => {
      pokemonList.results.map(async (pokemon)=> {
        const response = await fetch(pokemon.url)
        innerPromise = response.json()
        innerPromise.then((poke) => {
          pokeArray.push(poke)
          console.log(poke)
          pokeArray.sort((a,b) => a.id - b.id)
        })
      })
    })
    }
    
</script>


<div class="flex flex-col m-auto overflow-auto">
  <Paginator bind:counter bind:pageCount bind:currentPage bind:numberOfPages/>
      {#await innerPromise}
        <div class="mx-auto content-center">
          <Pokeball height ="120px" width = "120px" animation= "animate-spin"/>
        </div>
      {:then results}
        <div class="md:grid grid-cols-3 gap-4 mt-10 w-full">
          {#if results !== undefined}
            {#each pokeArray.slice(counter, counter + pageCount) as pokemon}
            <Pokemon pokemon = {pokemon}/>
            {/each}
          {/if}
        </div>
      {:catch error}
      <div>error.message</div>
      {/await}
      
</div>



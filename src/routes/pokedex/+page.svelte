<script>
// @ts-nocheck
    import { onMount } from "svelte"
    import Pokemon from "../../components/Pokemon.svelte"
    import Module from "../../components/Module.svelte";
    import PaginatorPokedex from "../../components/PaginatorPokedex.svelte";
    import Pokeball from "$lib/images/Pokeball.svelte";
    let counter = 0
    let pageCount = 9
    let currentPage = 1
    let url = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    let promise
    let innerPromise
    let pokeArray = []
    let pokemonNumber
    let numberOfPages
    let pokemonModule
    let card = false
    let teamName
    let myTeam = []
    let postPromise

    // Calculates the number of pages
    $:{
      numberOfPages = Math.round(pokemonNumber/pageCount) >= pokemonNumber/pageCount? 
        Math.round(pokemonNumber/pageCount):
        Math.round(pokemonNumber/pageCount);
    }

    //Post function [post team]

    const postTeam = () => {
      postPromise = fetch('https://pokemonteam-api.onrender.com/poketeam', {
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
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(data => {
        console.log("Result:", data);
        if(data.message){
          myTeam.length<6?
          alert("Your team needs 6 Pokemon!!"):
          alert("Your team needs a name")
        }
        else{
          alert("Team created successfully!");
        myTeam = [];
        teamName = ""
        }
      })
      .catch(error =>console.log("Error:", error))

      return postPromise
    }

    //Get all pokemon
    const getPokemon = async () => {

      const response  = await fetch(url)
      const result  = await response.json()
      pokemonNumber = result.count
      innerPromise = await Promise.all(result.results.map(async(url) => {
        await fetch(url.url)
        .then(response => response.json())
        .then(response =>{
          pokeArray = [...pokeArray, response]
          pokeArray.sort((a,b) => {
            return a.id - b.id
          })
        })
      }))
      return pokeArray
    }

    //Search pokemon
    const searchPokemon = (pokemonSearch) => {
      if(pokeArray.filter(pokemon => pokemon.name == pokemonSearch.toLowerCase()).length != 0){
        return pokeArray.filter(pokemon => pokemon.name == pokemonSearch.toLowerCase())[0]
      }
      else{
        return "Pokemon could not be found"
      }
      
    }
    
    //Remove from pokemon list
    const removePokemon = (comparedPokemon) => {
      myTeam = myTeam.filter(pokemon => pokemon != comparedPokemon)
    }

    //On mount get all Pokemon
    onMount(() => {
      promise = getPokemon();
    })

</script>
<!--Title-->
<svelte:head>
	<title>PokeDex</title>
</svelte:head>

<!--Body-->
<div class="flex flex-col m-auto overflow-auto">
  <PaginatorPokedex bind:counter bind:pageCount bind:currentPage bind:numberOfPages 
    searchPokemon = {searchPokemon} bind:card bind:pokemonModule/>

  <!--Loading screen when fetching all pokemon from PokeAPI-->
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

   <!--Team builder tool-->
  <div class="flex md:flex-row flex-col items-center mx-5 my-2 border-4 justify-between border-black">
    <div class="flex gap-2 mx-1 my-2">
      <label class="font-bold" for="team_name">Team Name:</label>
      <input class="border-2 border-black" bind:value = {teamName} id = "team_name" name = "team_name" type="text"/>
    </div>
    {#each myTeam as pokemon}
      <div class="flex gap-2">
        <div class="relative">
          <div class="absolute top-3">
            <button on:click={removePokemon(pokemon)} class="rounded-full text-bold text-base bg-red-500 px-2 text-white">-</button>
          </div>
          <img class="animate-appear duration-300" src="{pokemon.sprites.front_default}" alt={`${pokemon.name}_img`}>
        </div>
      </div>
    {/each}
    <button class = "border-2 border-black bg-red-500 text-white font-bold rounded-full p-2 m-1" on:click={postTeam}>Save Team</button>
</div> 

<!--Module for each pokemon card-->
  {#if card}
    <Module bind:card pokemon = {pokemonModule} bind:myTeam/>
  {/if}

  <!--Loading screen when creating teams-->
  {#await postPromise}
  <div class="mx-auto content-center">
    <div class="relative z-10" role="dialog">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class=" animate-appear relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 my-auto md:w-full md:max-w-lg">
            <h1 class="m-4 text-2xl font-bold">Saving Team...</h1>
              <div class="flex bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 content-center">
                <div class="mx-auto content-center">
                  <Pokeball height ="120px" width = "120px" animation= "animate-spin"/>
                </div>
              </div>
          </div>
          </div>
      </div>
  </div>
  </div>
  {/await}
</div>



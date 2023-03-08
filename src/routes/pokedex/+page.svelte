<script>
// @ts-nocheck
    import Pokemon from "../../components/Pokemon.svelte"
    import Module from "../../components/Module.svelte";
    import PaginatorPokedex from "../../components/PaginatorPokedex.svelte";
    import Pokeball from "$lib/images/Pokeball.svelte";
    import MediaQuery from "../../components/MediaQuery.svelte";
    import useChart from "../../hooks/UseChart";
    export let data
    let pokemonQuery = ""
    let currentPage = 1
    let card = false
    let teamName
    let myTeam = []
    let postPromise
    let teamHidden = false
    let pokemonSearched = { message: "Select a Pokemon"}
    const {item, length} = data
    const pageCount  = Math.round(length/150) + 1
    // Calculates the number of pages

    const capitalizeWord = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
    //Post function [post team]
    const postTeam = () => {
      postPromise = fetch('https://pokemonteam-api.onrender.com/poketeam', {
        method: 'POST',
        body: JSON.stringify({
          team_name: teamName,
          pokemon_1: {name: myTeam[0].name, url:`https://pokeapi.co/api/v2/pokemon/${myTeam[0].name}`},
          pokemon_2: {name: myTeam[1].name, url:`https://pokeapi.co/api/v2/pokemon/${myTeam[1].name}`},
          pokemon_3: {name: myTeam[2].name, url:`https://pokeapi.co/api/v2/pokemon/${myTeam[2].name}`},
          pokemon_4: {name: myTeam[3].name, url:`https://pokeapi.co/api/v2/pokemon/${myTeam[3].name}`},
          pokemon_5: {name: myTeam[4].name, url:`https://pokeapi.co/api/v2/pokemon/${myTeam[4].name}`},
          pokemon_6: {name: myTeam[5].name, url:`https://pokeapi.co/api/v2/pokemon/${myTeam[5].name}`}
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
    //Remove from pokemon list
    const removePokemon = (comparedPokemon) => {
      myTeam = myTeam.filter(pokemon => pokemon != comparedPokemon)
    }
    //Fetch Pokemon
    const fetchPokemon = async(url) => {
      const res = await fetch(url)
      const pokemon = await res.json()
      return pokemon
    }
    //Get pokemon Weakness
    const pokemonWeakness = (pokemonSearched) => {
      if(pokemonSearched.message){
        return ""
      }else{
        return pokemonSearched.types[1]?
        useChart(pokemonSearched.types[0].type.name, pokemonSearched.types[1].type.name):
        useChart(pokemonSearched.types[0].type.name)
      }
      
    }
</script>
<!--Title-->
<svelte:head>
	<title>PokeDex</title>
</svelte:head>

<!--Body-->
<div class="flex md:flex-row flex-col m-auto h-full">

  <!--Used to hide and show team selector on mobile-->
  <MediaQuery query = "(max-width: 428px)" let:matches>
    {#if matches}
      <button on:click={() => {teamHidden = !teamHidden}} class="rounded-full text-white bg-red-500 mx-{teamHidden?"40":"44"} my-5">
        {#if teamHidden}
          <h1>My team</h1>
        {:else}
          <i class="fa-solid fa-arrow-up"></i>
        {/if}
      </button>
    {/if}
  </MediaQuery>
  
  <!--My team selector (innner pokemon loading)-->
  <div class="md:basis-4/5 p-5 md:flex md:flex-col {teamHidden? "hidden":""}">
    <div class="basis-1/12 flex md:flex-row flex-col items-center mx-5 my-2 border-4 justify-between border-black ">
      <div class="flex gap-2 mx-1 my-2">
        <label class="font-bold" for="team_name">Team Name:</label>
        <input autocomplete="off" class="border-2 border-black" bind:value = {teamName} id = "team_name" name = "team_name" type="text"/>
      </div>
      <div class="md:flex grid grid-cols-2 gap-2">
      {#each myTeam as pokemon}
        
          <div class="relative">
            <div class="absolute top-3">
              <button on:click={removePokemon(pokemon)} class="rounded-full text-bold text-base bg-red-500 px-2 text-white">-</button>
            </div>
            <img class="animate-appear duration-300" src="{pokemon.sprites.front_default}" alt={`${pokemon.name}_img`}>
          </div>
        
      {/each}
      </div>
        <button class = "border-2 border-black bg-red-500 text-white font-bold rounded-full p-2 m-1" on:click={postTeam}>Save Team</button>
      </div> 

    <!--Pokemon Loading-->
    <MediaQuery query="(min-width: 1281px)" let:matches>

      {#if matches}
        <Pokemon bind:myTeam bind:pokemon = {pokemonSearched} weakneasses = {pokemonWeakness} capitalizeWord = {capitalizeWord}/>
      {/if}

    </MediaQuery>
  </div>
  <!--Pokemon shown when width is 428px or less-->
  <MediaQuery query = "(max-width: 428px)" let:matches>

    {#if matches}
        <Module pokemon = {pokemonSearched} capitalizeWord = {capitalizeWord} weakneasses = {pokemonWeakness} bind:card bind:myTeam/>
    {/if}
  </MediaQuery>
  <!--List of Pokemon-->
  <div class="md:basis-1/5 p-5 overflow-auto h-screen" dir="rtl">
    <PaginatorPokedex pageCount = {pageCount} bind:currentPage bind:pokemonQuery/>
    <ul class=" bg-red-400 rounded-lg" dir="ltr">
      {#each 
        pokemonQuery === ""?
        item.results.slice(150*(currentPage - 1),currentPage*150):
        item.results.filter(pokemon => pokemon.name.includes(pokemonQuery.toLowerCase()))
        as pokemon}
        <li class="text-center py-1">
          <button on:click={(() => {pokemonSearched = fetchPokemon(pokemon.url); card = true})}
            class="gap-2 text-left w-5/6 bg-red-500 p-2 m-1 text-xl font-bold 
              text-white drop-shadow-lg active:drop-shadow-sm shadow-black rounded-r-full">
            <div class="flex">
              <div class="mx-2 mt-1">
                <Pokeball height = "20px" width = "20px" animation="none"/> 
              </div>
                {capitalizeWord(pokemon.name)}
            </div>
          </button>
        </li>
      {/each}
    </ul>
  </div>
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


<style>
  /* width */
::-webkit-scrollbar {
  width: 10px;

}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(128, 128, 128);
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #FA5F5F;
  border-radius: 10px;
}
</style>
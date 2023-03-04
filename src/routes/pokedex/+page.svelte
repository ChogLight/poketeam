<script>
// @ts-nocheck
    import Pokemon from "../../components/Pokemon.svelte"
    import Module from "../../components/Module.svelte";
    import PaginatorPokedex from "../../components/PaginatorPokedex.svelte";
    import Pokeball from "$lib/images/Pokeball.svelte";
    export let data
    let pokemonModule
    let pokemonQuery = ""
    let currentPage = 1
    let card = false
    let teamName
    let myTeam = []
    let postPromise
    let pokemonSearched = { message: "Select a Pokemon"}
    let url = {message:"Select a Pokemon"}
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
</script>
<!--Title-->
<svelte:head>
	<title>PokeDex</title>
</svelte:head>

<!--Body-->
<div class="flex md:flex-row flex-col m-auto h-full">


  <div class="md:basis-4/5 p-5">
    <div class="flex md:flex-row flex-col items-center mx-5 my-2 border-4 justify-between border-black">
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

    <Pokemon bind:pokemon = {pokemonSearched}/>
  </div>
  
  <div class="md:basis-1/5 p-5 overflow-auto" dir="rtl">
    <PaginatorPokedex pageCount = {pageCount} bind:currentPage bind:pokemonQuery/>
    <ul class=" bg-red-400 rounded-lg" dir="ltr">
      {#each 
        pokemonQuery === ""?
        item.results.slice(150*(currentPage - 1),currentPage*150):
        item.results.filter(pokemon => pokemon.name.includes(pokemonQuery.toLowerCase()))
        as pokemon}
        <li class="text-center py-1">
          <button on:click={(() => pokemonSearched = fetchPokemon(pokemon.url))}
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
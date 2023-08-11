<script>
// @ts-nocheck
/** @type {import('./$types').PageData} */
    import Pokeball from "$lib/images/Pokeball.svelte";
    import useChart from "../../hooks/UseChart";
    import Module from "../../components/Module.svelte";
    import MediaQuery from "../../components/MediaQuery.svelte";
    let card = false
    export let data
    const { teams } = data
    const { user } = data
    let promise = Promise.resolve({message:`Select a team`})
    let moveFetched = Promise.resolve({message: "Select a move"})
    let selectedPokemon
    let teamName
    let teamID
    let visible = false
    const capitalizeWord = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
    console.log(user)
    const getTeam = async (object) => {
        const{pokemon_1, pokemon_2, pokemon_3, pokemon_4, pokemon_5, pokemon_6} = object
        const objectTeam = [
                pokemon_1,
                pokemon_2,
                pokemon_3,
                pokemon_4,
                pokemon_5,
                pokemon_6
            ]
        const team = await Promise.all(
                objectTeam.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            return res.json()
        }))
        promise = team
    }   
    const weakneasses = (pokemonSearched) => {
      if(pokemonSearched.message){
        return ""
      }else{
        return pokemonSearched.types[1]?
        useChart(pokemonSearched.types[0].type.name, pokemonSearched.types[1].type.name):
        useChart(pokemonSearched.types[0].type.name)
      }
      
    } 

    const deleteTeam = async (id) => {
        fetch(`/team/${id}`, {
            method: 'DELETE',
        }).then(res => {
            res.json();
            console.log(id)
            location.reload()
        })
    }
    const deletePokemon = () => {

    }
</script>


<div class="md:flex h-full justify-between">
    
    {#await promise}
        <h1>...Loading</h1>
    {:then pokemonTeam}
        {#if !pokemonTeam.message}
            {#if card}
             <Module  deletePokemon= {deletePokemon} bind:moveFetched option = {"Delete"} weakneasses = {weakneasses} 
                bind:card pokemon = {selectedPokemon} capitalizeWord = {capitalizeWord}/>
            {/if}
            <div class="flex flex-col basis-4/5">
                <div class="flex justify-between basis-1/6">
                    <h1 class="text-red-500 text-4xl mx-10 my-4 font-bold">{teamName}</h1>
                    <button on:click={() => visible = true} class="px-3 py-2 bg-red-500 m-5 text-white text-sm font-bold rounded-md">Delete Team</button>
                </div>
                <div class=" card grid grid-cols-3 basis-4/6 gap-2">
                    {#each pokemonTeam as pokemon}
                        <MediaQuery query="(min-width: 1281px)" let:matches>
                            {#if matches}
                                <button on:click={() => {card = true; selectedPokemon = pokemon;}} 
                                    class="animate-appear relative transform rounded-lg
                                        bg-white text-left shadow-xl transition-all md:my-2 my-auto md:w-full md:max-w-lg">
                                    <div class="flex bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div class="w-1/3 font-bold text-red-600 text-xs">
                                        <p class="font-bold text-red-600 text-lg">
                                            N.°{pokemon.id}
                                        </p>
                                        <img class = "object-contain h-48 w-48"
                                            src = {pokemon.sprites.other['official-artwork'].front_default} alt = "">
                                        </div>
                                        <div class="w-2/3">
            
                                            <p class="font-bold mb-3 text-gray-700 uppercase">
                                                Pokemon: {''}
                                                <span class="font-normal capitalize">
                                                    {pokemon.name}
                                                </span> 
                                            </p>
            
                                            <p class="font-bold mb-3 text-gray-700 uppercase">
                                                Type: {''}
                                                <span class="font-normal capitalize">
                                                {pokemon.types[1]  ? `${pokemon.types[0].type.name}/${pokemon.types[1].type.name}` : pokemon.types[0].type.name}
                                                </span>
            
                                            </p>
            
                                            <p class="font-bold mb-3 text-gray-700 uppercase">
                                                Size: {''}
                                                <span class="font-normal normal-case">
                                                {`${pokemon.height/10}m`}
                                                </span>
            
                                            </p>
                                            <p class="font-bold mb-3 text-gray-700 uppercase">
                                                Weight: {''}
                                                <span class="font-normal normal-case">
                                                {`${pokemon.weight/10}Kg`}
                                                </span>
            
                                            </p>
                                            <div class="flex">
                                                <p class="font-bold mb-3 text-gray-700 uppercase">
                                                    Abilities:
                                                </p>
                                                <ul>
                                                    {#each pokemon.abilities as abilities}
                                                        <li class="capitalize {abilities.is_hidden?"text-red-400":""}">
                                                            {abilities.ability.name}
                                                        </li>
                                                    {/each}
                                                </ul>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </button>
                            {/if}
                        </MediaQuery>
                        <MediaQuery query="(max-width: 428px)" let:matches>
                            {#if matches}
                                <button on:click={() => {card = true; selectedPokemon = pokemon;}} 
                                class="animate-appear relative transform rounded-lg
                                     bg-white text-left shadow-xl transition-all md:my-2 my-auto md:w-full md:max-w-lg">
                                <div class="flex flex-col bg-white mx-1">
                                    <div class="w-1/3">
                                        <p class="font-bold mb-3 text-sm capitalize text-red-500">
                                                {pokemon.name}
                                        </p> 
                                    </div>
                                    <div class="w-2/3 font-bold text-red-600 text-xs">
                                        <img class = "object-contain h-70 w-70"
                                            src = {pokemon.sprites.other['official-artwork'].front_default} alt = "">
                                    </div>
                                </div>
                                </button>
                            {/if}
                        </MediaQuery>
                        
                    {/each}
                </div>
            </div>
        {:else}
            <div class="flex justify-center items-center flex-1 text-xs opacity-50">{pokemonTeam.message}</div>
        {/if}
    {/await}
    {#await teams}
        <h1>Loading</h1>
    {:then teams} 
    <div class="md:basis-1/5 p-5 overflow-y-scroll border border-black bg-red-400" dir="rtl">
        <h1>{user.user}'s Teams</h1>
        <ul class="rounded-lg" dir="ltr">
            {#each teams as team}
                <li><button on:click={() => {getTeam(team); teamName = team.team_name; teamID = team._id}} class="gap-2 text-left w-5/6 bg-red-500 p-2 m-1 text-xl font-bold 
                      text-white drop-shadow-lg active:drop-shadow-sm shadow-black rounded-r-full">
                      <div class="flex">
                            <div class="mx-2 mt-1">
                            <Pokeball height = "20px" width = "20px" animation="none"/> 
                            </div>
                            {team.team_name? team.team_name: "Build your first team!"}
                      </div>
                    </button>
                </li>
            {/each}
        </ul>
      </div>
    {/await}
</div>
{#if visible}
<div class="relative z-10" role="dialog" >

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="animate-appear relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 my-auto md:w-full md:max-w-lg">
                <h1 class="mx-10 my-2 text-xl">Do you want to delete this team?</h1>
                <div class="flex justify-evenly">
                    <button on:click={() => deleteTeam(teamID)} class="px-3 py-2 bg-red-500 m-5 text-white text-sm font-bold rounded-md">Yes</button>
                    <button on:click={() => visible = false} class="px-3 py-2 bg-red-500 m-5 text-white text-sm font-bold rounded-md">No</button>
                </div>
            </div>
        </div>
    </div>
</div>
{/if}
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
    background: #9b9595;
    border-radius: 10px;
  }

  
  </style>


<script>
// @ts-nocheck
/** @type {import('./$types').PageData} */
    import PaginatorMyTeams from "../../components/PaginatorMyTeams.svelte";
    import Pokeball from "$lib/images/Pokeball.svelte";
    import useChart from "../../hooks/UseChart";
    import { Radar } from 'svelte-chartjs'
    import Module from "../../components/Module.svelte";
    import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement,
  } from 'chart.js';
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
    LineElement
  );
    let card = false
    let page = 1
    export let data
    let myTeams = data.team
    let promise = Promise.resolve({message:"This is a message"})
    let selectedPokemon
    const capitalizeWord = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const getTeam = async (object) => {
        const team = await Promise.all(
                [object.pokemon_1,
                object.pokemon_2,
                object.pokemon_3,
                object.pokemon_4,
                object.pokemon_5,
                object.pokemon_6
            ].map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            return res.json()
        }))
        promise = team
        return team
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
</script>


<div class="md:flex h-full justify-between">
    
    {#await promise}
        <h1>...Loading</h1>
    {:then pokemonTeam}
        {#if !pokemonTeam.message} 
            <!-- <Module weakneasses = {weakneasses} bind:card pokemon = {selectedPokemon} capitalizeWord = {capitalizeWord}/> -->
            <div class="grid grid-cols-3 basis-4/5">
                {#each pokemonTeam as pokemon}
                    <button on:click={() => {card = true}} 
                        class="animate-appear relative transform overflow-hidden rounded-lg
                             bg-white text-left shadow-xl transition-all md:my-8 my-auto md:w-full md:max-w-lg">
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
                {/each}
            </div>
        {:else}
            <h1>{pokemonTeam.message}</h1>
        {/if}
    {/await}
    
    <div class="md:basis-1/5 p-5 overflow-auto h-screen" dir="rtl">
        <ul class=" bg-red-400 rounded-lg" dir="ltr">
            {#each myTeams as team}
                <li><button on:click={() => {getTeam(team)}} class="gap-2 text-left w-5/6 bg-red-500 p-2 m-1 text-xl font-bold 
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
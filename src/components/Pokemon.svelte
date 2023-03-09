<script>
// @ts-nocheck
    import Pokeball from "$lib/images/Pokeball.svelte";
    import PaginatorPokedex from "./PaginatorPokedex.svelte";
    import { Radar } from 'svelte-chartjs'
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
    export let pokemon
    export let capitalizeWord
    export let weakneasses
    export let myTeam
    export let moveFetched
    let page = 1
    const getType = (types) => {

        if (types[1]) {
            return `${types[0].type.name}/${types[1].type.name}`
        }
        else{
            return types[0].type.name
        }
    }
    const addToTeam = (array, pokemon) => {
        if(array.includes(pokemon)){
            alert(`${pokemon.name} is already on your Team!!`)
        }
        else if (array.length === 6){
            alert(`You can only have 6 Pokemon in your Team!!!`)
        }
        else{
            myTeam = [...myTeam, pokemon]
        }
    }
    const getMove = async (move) => {
        const res = await fetch(move)
        moveFetched = await res.json()
    }
</script>

{#await pokemon}
    <div class="mx-auto">
        <Pokeball height ="120px" width = "120px" animation= "animate-spin"/>
    </div>
{:then pokemon } 
{#if !pokemon.message}
    <div class="flex {page==2? "justify-start":"justify-end"} mx-4 my-1">
        {#if page ==2}
            <button on:click={() => page = page - 1} disabled="{page ===1? "disabled": ""}">{"<"} Pokemon Info</button>
        {:else}
            <button on:click={() => page = page + 1} disabled="{page ===2? "disabled": ""}">Moves {">"}</button>
        {/if}
    </div>
    <div class="flex bg-white rounded-md mx-5 my-3 p-5 shadow-lg basis-11/12 gap-10 overflow-y-scroll {page ==1? "":"hidden"}">
        <div class="flex flex-col basis-1/4">
            <div>
                <h1 class="text-center text-red-500 font-bold text-6xl">{capitalizeWord(pokemon.name)}</h1>
                <p class="text-red-600 font-bold text-sm">
                    N.°{pokemon.id}
                </p>
            </div>
                <img class="m-2" width = "184" height="184" src={pokemon.sprites.other['official-artwork'].front_default} alt = {`${pokemon.name}_img`}/>
                <p class="font-bold mb-3 text-gray-700 uppercase">
                    Type: {''}
                    <span class="font-normal capitalize">
                        {getType(pokemon.types)}
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
                    {`${pokemon.weight/10}kg`}
                    </span>
                
                </p>
                <div class="flex">
                    <p class="font-bold mb-3 text-gray-700 uppercase">
                        Abilities:
                    </p>
                    <ul>
                        {#each pokemon.abilities as abilities}
                            <li class="{abilities.is_hidden?"text-red-400":""}">
                                {capitalizeWord(abilities.ability.name)}
                            </li>
                        {/each}
                    </ul>
                </div>
                <table class="table-auto basis 1/2 border border-black text-left my-10">
                    <thead class="border border-black">
                        <th class="py-2 px-1 border border-black">Stat name</th>
                        <th class="py-2 px-1  border border-black">Base stat</th>
                        <th class="py-2 px-1  border border-black">EV</th>
                    </thead>
                    <tbody>
                        {#each pokemon.stats as stats}
                            <tr class="odd:bg-white even:bg-red-200 text-sm odd:hover:bg-slate-100 even:hover:bg-red-300">
                                <td class="border border-black">{capitalizeWord(stats.stat.name)}</td>
                                <td class="border border-black">{stats.base_stat}</td>
                                <td class="border border-black">{stats.effort}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                
        </div>
       
        <div class="basis-3/4">
            <div class="flex flex-col gap-5">
                <div class="basis-4/5 flex justify-center my-5">
                    <div class="basis-3/4">
                        <Radar data = {
                            {
                                labels:[
                                    'Normal',
                                    'Fire',
                                    'Water',
                                    'Electric',
                                    'Grass',
                                    'Ice',
                                    'Fighting',
                                    'Poison',
                                    'Ground',
                                    'Flying',
                                    'Psychic',
                                    'Bug',
                                    'Rock',
                                    'Ghost',
                                    'Dragon',
                                    'Dark',
                                    'Steel',
                                    'Fairy'
                                ],
                                datasets:[
                                    {
                                        label: `${capitalizeWord(pokemon.name)} Weaknesses`,
                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                        borderColor: 'rgb(255, 99, 132)',
                                        pointBackgroundColor: 'rgb(255, 99, 132)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgb(255, 99, 132)',
                                        data: weakneasses(pokemon)

                                    }
                                ]
                            }
                        } options={{ responsive: true }}/>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button 
                    type = "button" 
                    class="px-3 py-2 bg-red-500 m-5 text-white text-sm font-bold rounded-md"
                    on:click={()=>addToTeam(myTeam, pokemon)}>
                    Add to my Team
                    </button>
                </div>
            </div>
            
        </div>
    </div>
    <div class="flex flex-col bg-white rounded-md mx-5 my-3 p-5 shadow-lg basis-11/12 gap-10 {page ==2? "":"hidden"} overflow-y-scroll">
        <h1 class=" text-red-500 font-bold text-6xl basis-1/5 capitalize">{pokemon.name} moves</h1>
        <div class="flex text-sm font-bold content-center h-3/5 gap-20">
            <div class="basis-1/5 overflow-y-scroll">
                <ul class="">
                    {#each pokemon.moves as move}
                        <li class="even:bg-red-200 odd:bg-slate-50"><button class="capitalize" on:click={() => {getMove(move.move.url)}} >{move.move.name}</button></li>
                        
                    {/each}
                </ul>
            </div>
            <div class="basis-4/5">
                {#await moveFetched}
                    <h1>...Loading</h1>
                {:then moveFetched } 
                    {#if moveFetched.message}
                        <div class="flex justify-center items-center flex-1 text-xs opacity-50 h-full ">
                            {moveFetched.message}
                        </div>
                    {:else}
                        <div class="flex flex-col gap-5 border-black border p-5">
                            <div class="flex gap-10">
                                <h1 class="text-4xl text-red-500 font-bold capitalize">{moveFetched.name}</h1>
                            </div>
                            <p>{moveFetched.flavor_text_entries.length > 0?
                                    moveFetched.flavor_text_entries.find(text => text.language.name == 'en').flavor_text:""}</p>
                            <div class="flex gap-5">
                                <h2 class="text-xl text-red-500 font-bold">Type:</h2>
                                <p class="text-lg capitalize align-bottom">{moveFetched.type.name}</p>
                            </div>
                            <div class="flex gap-5">
                                <h2 class="text-xl text-red-500 font-bold">Power:</h2>
                                <p class="text-lg capitalize align-bottom">{moveFetched.power}</p>
                            </div>
                            <div class="flex gap-5">
                                <h2 class="text-xl text-red-500 font-bold">Damage class:</h2>
                                <p class="text-lg capitalize align-bottom">{moveFetched.damage_class.name}</p>
                            </div>
                            <div class="flex gap-5">
                                <h2 class="text-xl text-red-500 font-bold">Accuracy:</h2>
                                <p class="text-lg capitalize align-bottom">{moveFetched.accuracy}</p>
                            </div>
                        </div>
                    {/if}
                {/await}
            </div>
            
        </div>
        
    </div>
    
    {:else}
    <div class="basis-11/12 flex items-center justify-center">
        <h1 class="opacity-50 text-xs">{pokemon.message}</h1>
    </div>
    {/if}
{/await}

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
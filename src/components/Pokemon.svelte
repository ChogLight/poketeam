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
    export let user
    let page = 1
    let description = ''
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

    const getFlavorText = async (url) => {
        const res = await fetch(url)
        const flavorText = await res.json()
        description = flavorText
    }
    console.log(pokemon)
</script>

{#await pokemon}
    <div class="mx-auto">
        <Pokeball height ="120px" width = "120px" animation= "animate-spin"/>
    </div>
{:then pokemon}
{#if !pokemon.message}
    <div class="flex {page==2? "justify-start":"justify-end"} mx-4 my-1">
        {#if page ==2}
            <button on:click={() => page = page - 1} disabled="{page ===1? "disabled": ""}">{"<"} Pokemon Info</button>
        {:else}
            <button on:click={() => page = page + 1} disabled="{page ===2? "disabled": ""}">Moves {">"}</button>
        {/if}
    </div>
    <div class="font-[khand] flex flex-col bg-white rounded-[40px] mx-10 my-3 p-12 basis-11/12 gap-10 overflow-y-scroll {page ==1? "":"hidden"} border-black border-4">
        <div class="flex basis-4/12 justify-between">
                <h1 class="text-center text-[#1E1E1E] font-bold text-8xl">{capitalizeWord(pokemon.name)}</h1>
                <h1 class="text-[#DD4D4D] font-bold text-8xl text-right m-3">#{pokemon.id}</h1>
                <!-- <p class="font-bold mb-3 text-gray-700 uppercase">
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
                
                </p> -->
                
                <!-- <table class="table-auto basis 1/2 border border-black text-left my-10">
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
                </table> -->
                
        </div>
        <div class="flex basis-6/12 justify-between">
            <img class="m-auto basis-2/4" width = "80%"  src={pokemon.sprites.other['official-artwork'].front_default} alt = {`${pokemon.name}_img`}/>
        </div>
        <div class="flex basis 2/12 justify-between">

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
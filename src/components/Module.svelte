<script>
// @ts-nocheck
    import Pokeball from "$lib/images/Pokeball.svelte";
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
    export let card
    export let myTeam = []
    export let weakneasses
    export let capitalizeWord
    export let moveFetched
    export let option
    export let deletePokemon = 0
    export let user
    //Fetch move
    const getMove = async (move) => {
        const res = await fetch(move)
        moveFetched = await res.json()
    }
    
    //Add pokemon to to team
    const addToTeam = (array, pokemon) => {
        if(array.includes(pokemon)){
            alert(`${pokemon.name} is already on your Team!!`)
            card = false
        }
        else if (array.length === 6){
            alert(`You can only have 6 Pokemon in your Team!!!`)
            card = false
        }
        else{
            myTeam = [...myTeam, pokemon]
            card = false
        }
    }
    let page = 1

</script>

{#await pokemon}
<div class="{card? "": "hidden"} mx-auto">
    <div class="relative z-10" role="dialog" >

        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        
        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            
            <div class=" animate-appear relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 my-auto md:w-full md:max-w-lg">
                <div class="flex bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="mx-auto">
                        <Pokeball height ="120px" width = "120px" animation= "animate-spin"/>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
</div>
{:then pokemon} 
{#if pokemon.id}

<div class="{card? "": "hidden"} relative z-10" role="dialog" >

    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity "></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        
        <div class="animate-appear relative transform overflow-scroll w-full max-w-lg rounded-lg bg-white text-left shadow-xl transition-all md:my-8 my-auto md:w-full md:max-w-lg">
            <div class="flex justify-between mx-4 my-1">
                <button on:click={() => page = page - 1} disabled="{page ===1? "disabled": ""}">{"<"}</button>
                <button on:click={() => page = page + 1} disabled="{page ===4? "disabled": ""}">{">"}</button>
            </div>
            <div class="flex bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 {page==1? "":"hidden"}">
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
            <div class="flex flex-col bg-white justify-center px-3 pt-5 pb-4 {page==2? "":"hidden"}">
                <h1 class="text-2xl text-red-500 font-bold capitalize">{pokemon.name} stats</h1>
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
            <div class="flex flex-col basis-11/12 gap-10 p-10 {page==3? "":"hidden"}">
                <h1 class=" text-red-500 font-bold text-2xl basis-1/5 capitalize">{pokemon.name} moves</h1>
        <div class="flex flex-col md:flex-row md:gap-0 gap-10 text-sm font-bold content-center h-3/5">
            <div class="basis-1/5 overflow-y-scroll">
                <ul class=" h-44">
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
                                <h1 class="text-xl text-red-500 font-bold capitalize">{moveFetched.name}</h1>
                            </div>
                            <p class="text-sm">{moveFetched.flavor_text_entries.length > 0?
                                    moveFetched.flavor_text_entries.find(text => text.language.name == 'en').flavor_text:""}</p>
                            <div class="flex items-center">
                                <h2 class="text-lg text-red-500 font-bold">Type:</h2>
                                <p class="text-sm capitalize align-bottom">{moveFetched.type.name}</p>
                            </div>
                            <div class="flex items-center">
                                <h2 class="text-lg text-red-500 font-bold">Power:</h2>
                                <p class="text-sm capitalize align-bottom">{moveFetched.power}</p>
                            </div>
                            <div class="flex items-center">
                                <h2 class="text-lg text-red-500 font-bold">Damage class:</h2>
                                <p class="text-sm capitalize align-bottom">{moveFetched.damage_class.name}</p>
                            </div>
                            <div class="flex items-center">
                                <h2 class="text-lg text-red-500 font-bold">Accuracy:</h2>
                                <p class="text-sm capitalize align-bottom">{moveFetched.accuracy}</p>
                            </div>
                        </div>
                    {/if}
                {/await}
            </div>
            
        </div>
            </div>
            <div class="flex bg-white  {page==4? "":"hidden"} justify-center items-center p-3">
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
                                label: `${capitalizeWord(pokemon.name)} weaknesses`,
                                pointRadius: 0,
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
            <div class="flex justify-between">
                {#if user}
                    <button 
                        type = "button" 
                        class="px-3 py-2 bg-red-500 m-5 text-white text-sm font-bold rounded-md"
                        on:click={()=>{
                            if(option === "Add"){
                                addToTeam(myTeam, pokemon)
                            }
                            else{
                                deletePokemon(pokemon.name)
                            }
                            }}>
                        {option}
                    </button>
                {/if}
            <button 
                type = "button" 
                class="px-3 py-2 bg-red-500 m-5 text-white text-sm font-bold rounded-md"
                on:click={()=>{card = false; page = 1; moveFetched = Promise.resolve({message: "Select a move"})}}>
                Close
            </button>
            </div>
        </div>
        </div>
    </div>
</div>
{:else}
<div class="{card? "": "hidden"} relative z-10" role="dialog" >

<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

<div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    
    <div class=" animate-appear relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 my-auto md:w-full md:max-w-lg">
        <div class="flex bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {pokemon}  
        </div>
        <button 
            type = "button" 
            class="px-3 py-2 bg-red-500 m-5 text-white text-sm font-bold rounded-md"
            on:click={()=>{page = 1;card = false}}>
            Close
        </button>
    </div>
    </div>
</div>
</div>
{/if}
{/await}



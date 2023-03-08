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
    export let myTeam
    export let weakneasses
    export let capitalizeWord
    
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
        
        <div class="animate-appear relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all md:my-8 my-auto md:w-full md:max-w-lg">
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
            <div class="flex bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 {page==2? "":"hidden"}">
                <table class="basis 1/2 border border-black">
                    <thead>
                        <th>Stat name</th>
                        <th>Base stat</th>
                        <th>EV</th>
                    </thead>
                    <tbody>
                        {#each pokemon.stats as stats}
                            <tr class="capitalize">
                                <td>{stats.stat.name}</td>
                                <td>{stats.base_stat}</td>
                                <td>{stats.effort}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                
            </div>
            <div class="flex justify-center bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 {page==3? "":"hidden"}">
                <div class=" max-h-96 overflow-y-scroll border border-black">
                    <table>
                        <thead>
                            <th>Move Name</th>
                        </thead>
                        <tbody class="overflow-hidden">
                            {#each pokemon.moves as move}
                                <tr>
                                    <td class="capitalize">{(move.move.name)}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="flex bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 {page==4? "":"hidden"}">
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
                                label: `${capitalizeWord(pokemon.name)} Weakneasses`,
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
                <button 
                type = "button" 
                class="px-3 py-2 bg-red-500 m-5 text-white text-sm font-bold rounded-md"
                on:click={()=>addToTeam(myTeam, pokemon)}>
                Add to my Team
            </button>

            <button 
                type = "button" 
                class="px-3 py-2 bg-red-500 m-5 text-white text-sm font-bold rounded-md"
                on:click={()=>{card = false; page = 1}}>
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

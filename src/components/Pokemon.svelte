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
    export let capitalizeWord
    export let weakneasses
    const getType = (types) => {

        if (types[1]) {
            return `${types[0].type.name}/${types[1].type.name}`
        }
        else{
            return types[0].type.name
        }
    }

</script>

{#await pokemon}
    <div class="mx-auto">
        <Pokeball height ="120px" width = "120px" animation= "animate-spin"/>
    </div>
{:then pokemon } 
{#if !pokemon.message}
    <div class="flex bg-white rounded-md mx-5 my-3 p-5 shadow-lg basis-11/12 gap-10">
        
        <div class="flex flex-col basis-1/4">
                <p class="text-red-600 font-bold text-sm">
                    N.°{pokemon.id}
                </p>
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
                <table class="basis 1/2 border border-black">
                    <thead>
                        <th>Stat name</th>
                        <th>Base stat</th>
                        <th>EV</th>
                    </thead>
                    <tbody>
                        {#each pokemon.stats as stats}
                            <tr>
                                <td>{capitalizeWord(stats.stat.name)}</td>
                                <td>{stats.base_stat}</td>
                                <td>{stats.effort}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
        </div>
       
        <div class="basis-3/4">

            <div class="flex flex-col gap-5">
                <h1 class="text-center text-red-500 font-bold text-6xl basis-1/5">{capitalizeWord(pokemon.name)}</h1>
                <div class="basis-4/5 flex justify-between">
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
                                        label: `${capitalizeWord(pokemon.name)} Weakneasses`,
                                        fill: true,
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
                   
                    <div class=" max-h-96 overflow-y-scroll border border-black basis-1/4">
                        <table>
                            <thead>
                                <th>Move Name</th>
                            </thead>
                            <tbody class="overflow-hidden">
                                {#each pokemon.moves as move}
                                    <tr>
                                        <td>{capitalizeWord(move.move.name)}</td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    {:else}
    <div class="basis-11/12 flex items-center justify-center">
        <h1 class="opacity-50 text-xs">{pokemon.message}</h1>
    </div>
    {/if}
{/await}
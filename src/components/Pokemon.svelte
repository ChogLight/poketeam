<script>
// @ts-nocheck
    export let pokemon
    export let pokemonModule
    export let card
    const getType = (types) => {

        if (types[1]) {
            return `${types[0].type.name}/${types[1].type.name}`
        }
        else{
            return types[0].type.name
        }
    }

</script>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => {pokemonModule = pokemon; card = true; console.log(pokemonModule)}} class="bg-white rounded-md mx-5 my-3 flex p-3 hover:scale-105 duration-500 shadow-lg cursor-pointer">
        
        <div class="w-1/3 font-bold text-red-600 text-xs mr-5">
            <p>
                N.°{pokemon.id}
            </p>
            <img class="m-2" width = "184" height="184"
                src={pokemon.sprites.other['official-artwork'].front_default} alt = {`${pokemon.name}_img`}/>
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
            
        </div>
    </div>

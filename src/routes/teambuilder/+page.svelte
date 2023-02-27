<script>
    import { onMount } from "svelte";
    let myPokemon
    let myTeams
    let myPC

    onMount(()=>{
        
    })

</script>


<div class="flex flex-col md:flex-row h-full">
    <div class="flex md:flex-col basis-1/5 py-5 md:border-r-4 border-black overflow-scroll border-b-4">
        <button class="border-4 rounded-full px-2 md:mx-8 mx-2 bg-red-500 text-white border-black">Add new Pokemon</button>

    </div>
    <div class="grid basis-4/5">

    </div>
</div>
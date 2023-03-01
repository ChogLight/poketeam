<script>
// @ts-nocheck
    import Pokeball from '../lib/images/Pokeball.svelte'
    export let navBarSize
    export let animation
    export let width
    export let height
</script>
<nav class="flex justify-between {navBarSize} w-screen bg-red-500 items-center text-white duration-300 ">

    <a href="/"><Pokeball width = {width} height = {height} animation = {animation}/></a>
    <div class="flex gap-x-10 text-xl font-bold items-center">
        <a class="basis-1/3" href="/"><i class="fa-solid fa-house"></i></a>
        <a class="basis-1/3" href="/pokedex"><i class="fa-sharp fa-solid fa-mobile-retro"></i></a>
        <a class="basis-1/3" href="/teambuilder"><i class="fa-solid fa-hammer"></i></a>
    </div> 
    <div class="flex items-center gap-x-5 mr-4">
        <a class="hover:text-yellow-400 duration-100" href="/login"> <i class="fa-solid fa-right-to-bracket"></i></a>
    </div>

</nav>
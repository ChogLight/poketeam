<script>
// @ts-nocheck
    import Pokeball from '../lib/images/Pokeball.svelte'
    export let navBarSize
    export let width
    export let height
    export let animation
    export let user
    let today = new Date();
</script>

<div class = "flex flex-col {navBarSize} bg-red-500 items-center text-white h-full duration-300">
    <div class = "basis-1/3 p-6">
        <a href="/"><Pokeball width = {width} height = {height} animation = {animation}/></a>
    </div>
    <nav class="flex flex-col basis-2/3 text-2xl font-bold items-center">
        {#if navBarSize <= "basis-1/6" && navBarSize> "basis-1/12"}
            <a class="basis-1/3 hover:text-3xl duration-300" href="/">Home</a>
            <a class="basis-1/3 hover:text-3xl duration-300" href="/pokedex">PokeDex</a>
            <a class="text-xl basis-1/3 hover:text-3xl duration-300" href="/teambuilder">Team builder</a>
        {:else if navBarSize === "basis-1/12"}
            <a class="basis-1/3" href="/"><i class="fa-solid fa-house"></i></a>
            <a class="basis-1/3" href="/pokedex"><i class="fa-sharp fa-solid fa-mobile-retro"></i></a>
            <a class="basis-1/3" href="/teambuilder"><i class="fa-solid fa-hammer"></i></a>
        {/if}

    </nav>
    
    <div class="basis-1/3 flex items-center text-sm gap-14">
        {#if navBarSize == "basis-1/6"}
            {#if !user}
                <a class="hover:text-yellow-400 duration-100" href="/login">Log in</a>
            {:else}
            <form action="/teambuilder?/logout" method="POST"><button class="hover:text-yellow-400 duration-100">Log out</button></form>
            {/if}
        {:else if navBarSize == "basis-1/12"}
            {#if !user}
                <i class="fa-solid fa-right-to-bracket"></i>
            {:else}
                <i class="fa-solid fa-power-off"></i>
            {/if}
        {/if}
        
    </div>
    {#if navBarSize === 'basis-1/6'}
    <footer class="text-sm italic my-3 text-black flex font-bold gap-2">
        <Pokeball animation = {"none"} height = "20px" width = "20px"/>
        <p>
            <a class = "hover:text-yellow-400 duration-300" 
                href= "https://sebastian-galvis.netlify.app/" target="_blank" rel="noreferrer">
                Sebastian Galvis
            </a> {today.getFullYear()} 
        </p>
    </footer>

    {/if}
    

</div>


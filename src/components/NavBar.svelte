<script>
// @ts-nocheck
    import img from '../lib/images/pokeball.svg'
    let navBarSize = "w-1/12"
    const changeIconHoverIn = () => {
        navBarSize = "w-1/6"
    }
    const changeIconHoverOut = () => {
        navBarSize = "w-1/12"
    }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div on:mouseenter={changeIconHoverIn} on:mouseleave={changeIconHoverOut} 
    class = "flex flex-col {navBarSize} bg-red-500 h-screen items-center text-white duration-300">
 
    <div class = "basis-1/3 p-6">
        <a href="/"><img src={img} alt="logo"/></a>
    </div>
    <nav class="flex flex-col basis-2/3 text-2xl font-bold items-center">
        {#if navBarSize <= "w-1/6" && navBarSize> "w-1/12"}
            <a class="basis-1/3 hover:text-3xl duration-300" href="/">Home</a>
            <a class="basis-1/3 hover:text-3xl duration-300" href="/pokedex">PokeDex</a>
            <a class="basis-1/3 hover:text-3xl duration-300" href="/teambuilder">Team builder</a>
        {:else if navBarSize === "w-1/12"}
            <a class="basis-1/3" href="/"><i class="fa-solid fa-house"></i></a>
            <a class="basis-1/3" href="/pokedex"><i class="fa-sharp fa-solid fa-mobile-retro"></i></a>
            <a class="basis-1/3" href="/teambuilder"><i class="fa-solid fa-hammer"></i></a>
        {/if}

    </nav>
    
    <div class="basis-1/3 flex items-center text-sm gap-14">
        {#if navBarSize == "w-1/6"}
            <a class="hover:text-yellow-400 duration-100" href="/login">Log in</a>
            <a class = "hover:text-yellow-400 duration-100" href="/signin">Sign in</a>
        {:else if navBarSize == "w-1/12"}
            <i class="fa-solid fa-right-to-bracket"></i>
            <i class="fa-solid fa-pen-nib"></i>
        {/if}
        
    </div>


</div>

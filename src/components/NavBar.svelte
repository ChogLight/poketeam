<script>
// @ts-nocheck
    import Pokeball from '../lib/images/Pokeball.svelte'
    let navBarSize = "w-1/12"
    let width = '60px'
    let height = '60px'
    let animation = '0'
    const changeIconHoverIn = () => {
        navBarSize = "w-1/6"
        width = '120px'
        height = '120px'
        animation = 'rotate-[720deg]'
    }
    const changeIconHoverOut = () => {
        navBarSize = "w-1/12"
        width = '60px'
        height = '60px'
        animation = "rotate-[-720deg]"
    }
</script>

<div on:mouseenter={changeIconHoverIn} on:mouseleave={changeIconHoverOut} 
    class = "group/nav flex flex-col {navBarSize} bg-red-500 h-screen items-center text-white duration-300">
    <div class = "basis-1/3 p-6">
        <a href="/"><Pokeball width = {width} height = {height} animation = {animation}/></a>
    </div>
    <nav class="flex flex-col basis-2/3 text-2xl font-bold items-center">
        {#if navBarSize <= "w-1/6" && navBarSize> "w-1/12"}
            <a class="basis-1/3 hover:text-3xl duration-300" href="/">Home</a>
            <a class="basis-1/3 hover:text-3xl duration-300" href="/pokedex">PokeDex</a>
            <a class="text-xl basis-1/3 hover:text-3xl duration-300" href="/teambuilder">Team builder</a>
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

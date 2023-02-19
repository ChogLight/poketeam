<script>
// @ts-nocheck
    import img from '../lib/images/pokeball.svg'
    import home from '../lib/images/house-solid.svg'
    import hammer from '../lib/images/hammer-solid.svg'
    import phone from '../lib/images/mobile-retro-solid.svg'
    import pen from '../lib/images/pen-nib-solid.svg'
    import log from '../lib/images/right-to-bracket-solid.svg'
    let navBarSize = "w-1/12"
    const changeIconHoverIn = () => {
        navBarSize = "w-1/6"
    }
    const changeIconHoverOut = () => {
        navBarSize = "w-1/12"
    }
</script>

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
            <a class="basis-1/3" href="/"><img height="20px" width="20px" src={home} alt="home"></a>
            <a class="basis-1/3" href="/pokedex"><img height="15px" width="15px" src={phone} alt="dex"></a>
            <a class="basis-1/3" href="/teambuilder"><img height="20px" width="20px" src={hammer} alt="build"></a>
        {/if}

    </nav>
    
    <div class="basis-1/3 flex items-center text-sm gap-14">
        {#if navBarSize == "w-1/6"}
            <a class="hover:text-yellow-400 duration-100" href="/login">Log in</a>
            <a class = "hover:text-yellow-400 duration-100" href="/signin">Sign in</a>
        {:else if navBarSize == "w-1/12"}

            <img height="20px" width="20px" src={log} alt="log">
            <img height="20px" width="20px" src={pen} alt="pen">
        {/if}
        
    </div>


</div>

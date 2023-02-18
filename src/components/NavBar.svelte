<script>
    import img from '../lib/images/pokeball.svg'

</script>

<div class = "flex flex-col w-1/6 bg-red-500 h-screen items-center text-white">
 
    <div class = "basis-1/3 p-6">
        <a href="/"><img src={img} alt="logo"/></a>
    </div>
    <nav class="flex flex-col basis-2/3 text-2xl font-bold items-center">
        <a class="basis-1/3 hover:text-3xl duration-300" href="/">Home</a>
        <a class="basis-1/3 hover:text-3xl duration-300" href="/pokedex">Pokedex</a>
        <a class="basis-1/3 hover:text-3xl duration-300" href="/teammaker">Team Maker</a>

    </nav>
    
    <div class="basis-1/3 flex items-center text-sm gap-14">
        <a class="hover:text-yellow-400 duration-100" href="/login">Log in</a>
        <a class = "hover:text-yellow-400 duration-100" href="/signin">Sign in</a>
    </div>


</div>
<script>

</script>
<div class="flex md:flex-row flex-col h-full m-10 justify-around">
    <div class="flex flex-col text-black bg-red-500 py-10 px-24 gap-2 rounded-xl">
        <h1 class="text-5xl my-10 text-white text-center font-extrabold">Login</h1>

        <div class="mb-20 mt-10 text-xl">
            <p class=" text-white font-bold">Username</p>
            <input class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="text" placeholder="Username"/>
        </div>
        
        <div class="mb-20 text-xl">
            <p class=" text-white  font-bold">Password</p>
            <input class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="password" placeholder="Password"/>
        </div>

        <div class="flex justify-between">
            <button class="rounded-full border-white border-2 px-5 py-2 hover:bg-red-400 text-white">Log in</button>
            <button class="rounded-full border-white border-2 px-5 py-2 hover:bg-red-400 text-white">Sign up</button>
        </div>
    </div>

    <div class="md:flex flex-col text-black bg-red-500 py-10 px-24 gap-2 rounded-xl md:overflow-scroll hidden">
        <h1 class="text-5xl my-10 text-white text-center font-extrabold">Sign in</h1>

        <div class="mb-20 mt-10 text-xl">
            <p class=" text-white font-bold">Username</p>
            <input class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="text" placeholder="E-mail"/>
        </div>
        
        
        <div class="mb-20 text-xl">
            <p class=" text-white font-bold">Email</p>
            <input class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="text" placeholder="E-mail"/>
        </div>

        <div class="mb-20 text-xl">
            <p class=" text-white  font-bold">Password</p>
            <input class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="password" placeholder="Password"/>
        </div>

        <div class="mb-20 text-xl">
            <p class=" text-white  font-bold">Repeat your password</p>
            <input class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="password" placeholder="Password"/>
        </div>

        <div class="flex justify-between">
            <button class="rounded-full border-white border-2 px-5 py-2 hover:bg-red-400 text-white">Sign up</button>
            <button class="rounded-full border-white border-2 px-5 py-2 hover:bg-red-400 text-white">Cancel</button>
        </div>
    </div>
</div>
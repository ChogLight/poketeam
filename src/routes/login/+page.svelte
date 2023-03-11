<script>
    export let form

</script>
<div class="flex md:flex-row flex-col h-full m-10 md:justify-around justify-between gap-10">
    <form  class="flex flex-col text-black bg-red-500 py-10 px-10 md:px-24 gap-2 rounded-xl" method = "POST" action="?/login">
        
        <h1 class="text-5xl my-10 text-white text-center font-extrabold">Login</h1>
        {#if form?.error}
            <h2 class=" animate-appear capitalize text-white font-bold text-lg">{form.error}</h2>
        {/if}
        <div class="mb-20 mt-10 text-xl">
            <p class=" text-white font-bold">Username</p>
            <input required name="userlog" id="userlog" class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="text" placeholder="Username"/>
        </div>
        
        <div class="mb-20 text-xl">
            <p class=" text-white  font-bold">Password</p>
            <input required name="passwordlog" id="passwordlog" class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="password" placeholder="Password"/>
        </div>

        <div class="flex justify-between">
            <button type="submit" class="rounded-full border-white border-2 px-5 py-2 hover:bg-red-400 text-white">Log in</button>
        </div>
    </form>

    <form class="md:flex flex-col text-black bg-red-500 py-10 md:px-24 px-10 gap-2 rounded-xl md:overflow-x-auto" method="POST" action="?/signin">
        <h1 class="text-5xl my-10 text-white text-center font-extrabold">Sign in</h1>
        {#if form?.error}
            <h2 class=" animate-appear capitalize text-white font-bold text-lg">{form.error}</h2>
        {/if}
        <div class="mb-20 mt-10 text-xl">
            <p class=" text-white font-bold">Username</p>
            <input name="user" id="user" class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="text" placeholder="E-mail"/>
        </div>
        
        
        <div class="mb-20 text-xl">
            <p class=" text-white font-bold">Email</p>
            <input name="email" id="email" class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="text" placeholder="E-mail"/>
        </div>

        <div class="mb-20 text-xl">
            <p class=" text-white  font-bold">Password</p>
            <input name="password" id="password" class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="password" placeholder="Password"/>
        </div>

        <div class="mb-20 text-xl">
            <p class=" text-white  font-bold">Repeat your password</p>
            <input id="repeat" name="repeat" class="bg-red-500 outline-none text-white placeholder:text-white placeholder:opacity-40" type="password" placeholder="Password"/>
        </div>

        <div class="flex justify-between">
            <button type="submit" class="rounded-full border-white border-2 px-5 py-2 hover:bg-red-400 text-white">Sign in</button>
        </div>
    </form>
</div>

<style>
    /* width */
  ::-webkit-scrollbar {
    width: 10px;
  
  }

  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(232, 167, 167)5F;
    border-radius: 10px;
  }
  </style>
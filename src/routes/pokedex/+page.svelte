<script>
// @ts-nocheck
    import { onMount } from "svelte"
    import Pokemon from "../../components/Pokemon.svelte"
    let counter = 0
    let url = `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${counter}`
    let promise

    
    onMount(async () => {
      const response = await fetch(url)
      promise = response.json()

    })
</script>

<div class="container">


    <div class="md:grid grid-cols-3 gap-4 mt-10">
      {#await promise}
        <div>
          <h1>...waiting for info</h1>
        </div>
      {:then results}

      {#if results !== undefined}
        {#each results.results as pokemon }
        <Pokemon url = {pokemon.url}/>
        {/each}
      {/if}
      {:catch error}
      <div>error.message</div>
      {/await}
    </div>
    
    

</div>


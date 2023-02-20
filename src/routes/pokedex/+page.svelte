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

<div class="container m-auto">
      {#await promise}
        <h1>
          Loading
        </h1>
      {:then results}
        <div class="md:grid grid-cols-3 gap-4 mt-10 w-full">
          {#if results !== undefined}
            {#each results.results as pokemon }
            <Pokemon url = {pokemon.url}/>
            {/each}
          {/if}
        </div>
      {:catch error}
      <div>error.message</div>
      {/await}
</div>


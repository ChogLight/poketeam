
<script>
// @ts-nocheck
    export let pageCount
    export let currentPage
    export let pokemonQuery
    let pageArray = []
    for (let i = 1; i < pageCount; i++){
        pageArray = [...pageArray, i]
    }
</script>


<div class="flex gap-2 justify-end m-5 font-bold flex-wrap" dir="ltr">
    <input bind:value = {pokemonQuery} name="pokemon" type="text" class="border border-black" placeholder="Find your Pokemon"/>
    <select bind:value = {currentPage}>
            {#each pageArray as page}
                <option>{page}</option>
            {/each}
    </select>
</div>
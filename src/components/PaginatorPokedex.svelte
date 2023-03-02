
<script>
// @ts-nocheck
// Change paginator links and link with pages
    import usePagination, {DOTS} from "../hooks/UsePaginator";
    export let numberOfPages
    export let searchPokemon
    export let pokemonModule
    export let by
    export let card
    let paginator
    let currentPage = 1
    let arrayOfPages = []
    let pokemonSearch
    let pageCount = 9
    let amounts = [9,18,36,72]
    $:{
        paginator = usePagination(currentPage, numberOfPages);
        calculateArrayOfPages();
    };

    const calculateArrayOfPages = () => {
        arrayOfPages = []
        for (let i = numberOfPages; i > 0; i--){
            arrayOfPages = [i, ...arrayOfPages]
        }
    };

    const onNext = () => {
        currentPage = parseInt(currentPage) + 1;
     };

 
    const onPrevious = () => {
        currentPage = parseInt(currentPage) - 1;
    };  

    const isLast = (page) => {
        return page === numberOfPages
    };

     const isFirst = (page) => {
        return page === 1
    };

    console.log(numberOfPages)
    

</script>


<div class="flex gap-2 justify-end m-5 flex-wrap font-bold">
    <div>
        <label for="pokemonName">Name:</label>
        <input class="border-2 border-black" bind:value = {pokemonSearch} type="text"/>
        <button class="border-2 border-black font-bold bg-red-500 rounded-full text-white p-2" on:click={() => {pokemonModule = searchPokemon(pokemonSearch); card = true}}>Search</button>
    </div>
   <button class = "text-2xl mx-3" disabled = {isFirst(currentPage)} on:click={onPrevious}>{'<'}</button>
    {#each paginator as page}
        {#if page === DOTS}
            <h1>{page}</h1>
        {:else}
        <div class="flex gap-5 rounded-full bg-red-600 p-1 text-white">
            <a href={`/pokedex/${page}?by=${pageCount}`}>{page}</a>
        </div>
        {/if}
    {/each}
    <button class = "text-2xl mx-3" disabled = {isLast(currentPage)} on:click={onNext}>{'>'}</button>
    <select bind:value = {pageCount} on:change = {() => {currentPage = 1}}>
        {#each amounts as amount}
            <option value = {parseInt(amount)}>{amount} per page</option>
        {/each}
    </select>
    <div class="self-center">
        <lable for="pageNumber">Go to page:</lable>
            <select id="pageNumber" on:change={(e) => currentPage = e.target.value}>
                {#each arrayOfPages as page}
                    <option value = {parseInt(page)}>{page}</option>
                {/each}
            </select>
    </div>
    
</div>
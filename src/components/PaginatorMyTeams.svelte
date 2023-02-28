<script>
    // @ts-nocheck
        import usePagination, {DOTS} from "../hooks/UsePaginator";
        export let currentPage
        export let numberOfPages
        export let teamSearch
        let paginator
        let arrayOfPages = []
        
        $:{
            paginator = usePagination(currentPage + 1, numberOfPages);
            calculateArrayOfPages();
            console.log(numberOfPages);
            console.log(currentPage)
        };

        const changePage = (page) => {
            currentPage = page
        }
    
        const calculateArrayOfPages = () => {
            arrayOfPages = []
            for (let i = numberOfPages; i > 0; i--){
                arrayOfPages = [i, ...arrayOfPages]
            }
        };
    
        const onNext = () => {
            currentPage = parseInt(currentPage)+ 1;
         };
    
     
        const onPrevious = () => {
            currentPage = parseInt(currentPage) - 1;
        };  
    
        const isLast = (page) => {
            return page == numberOfPages -1
        };
    
         const isFirst = (page) => {
            return page == 0
        };
    
    
    </script>
    
    
    <div class="flex gap-2 justify-end m-5 flex-wrap font-bold">
        <div>
            <label class ="font-bold" for="pokemonName">Team Name:</label>
            <input class="border-2 border-black" bind:value = {teamSearch} type="text"/>
            <button class="border-2 border-black font-bold bg-red-500 rounded-full text-white p-2">Search</button>
        </div>
       <button class = "text-2xl mx-3" disabled = {isFirst(currentPage)} on:click={onPrevious}>{'<'}</button>
        {#each paginator as page}
            {#if page === DOTS}
                <h1>{page}</h1>
            {:else}
            <div class="flex gap-5 rounded-full bg-red-600 p-1 text-white">
                <button on:click={changePage(page-1)}>{page}</button>
            </div>
            {/if}
        {/each}
        <button class = "text-2xl mx-3" disabled = {isLast(currentPage)} on:click={onNext}>{'>'}</button>
        
    </div>
<script>
    // @ts-nocheck
        import usePagination, {DOTS} from "../hooks/UsePaginator";
        export let currentPage
        export let numberOfPages
        let paginator
        let arrayOfPages = []
        
        $:{
            paginator = usePagination(currentPage + 1, numberOfPages);
            calculateArrayOfPages();
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
    
    
    <div class="flex flex-col gap-2 justify-end m-5 flex-wrap font-bold items-center">

        <div class="flex gap-2">
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
       <div class="self-center">
        <lable for="pageNumber">Go to page:</lable>
            <select class="text-black" id="pageNumber" on:change={(e) => changePage(e.target.value -1)}>
                {#each arrayOfPages as page}
                    <option value = {parseInt(page)}>{page}</option>
                {/each}
            </select>
    </div>      
    </div>
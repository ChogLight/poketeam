
<script>
// @ts-nocheck
    import usePagination, {DOTS} from "../hooks/UsePaginator";
    export let counter
    export let pageCount
    export let currentPage
    export let numberOfPages
    let paginator
    let arrayOfPages = []
    $:{
        paginator = usePagination(currentPage, numberOfPages);
        calculateArrayOfPages();
    };

    
    let amounts = [9, 18, 36, 72 ]
    const changePage = (page)=>{
        counter = pageCount*page - pageCount
        currentPage = page
    };

    const calculateArrayOfPages = () => {
        arrayOfPages = []
        for (let i = numberOfPages; i > 0; i--){
            arrayOfPages = [i, ...arrayOfPages]
        }
    };

    const onNext = () => {
        changePage(parseInt(currentPage) + 1);
     };

 
    const onPrevious = () => {
        changePage(parseInt(currentPage) - 1);
    };  

    const isLast = (page) => {
        return page === numberOfPages
    };

     const isFirst = (page) => {
        return page === 1
    };


</script>


<div class="flex gap-2 justify-end m-5 flex-wrap font-bold">
   <button class = "text-2xl mx-3" disabled = {isFirst(currentPage)} on:click={onPrevious}>{'<'}</button>
    {#each paginator as page}
        {#if page === DOTS}
            <h1>{page}</h1>
        {:else}
        <div class="flex gap-5 rounded-full bg-red-600 p-1 text-white">
            <button on:click={changePage(page)}>{page}</button>
        </div>
        {/if}
    {/each}
    <button class = "text-2xl mx-3" disabled = {isLast(currentPage)} on:click={onNext}>{'>'}</button>
    <select bind:value = {pageCount} on:change = {() => {changePage(1)}}>
        {#each amounts as amount}
            <option value = {parseInt(amount)}>{amount} per page</option>
        {/each}
    </select>
    <div class="content-end">
        <lable for="pageNumber">Go to page:</lable>
            <select id="pageNumber" on:change={(e) => changePage(e.target.value)}>
                {#each arrayOfPages as page}
                    <option value = {parseInt(page)}>{page}</option>
                {/each}
            </select>
    </div>
    
</div>
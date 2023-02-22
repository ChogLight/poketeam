
<script>
// @ts-nocheck

    export let counter
    export let pageSize
    export let pageCount
    let pages = [1, 2 , '...', Math.round(parseInt(pageSize)/parseInt(pageCount))]
    let amounts = [9, 18, 36, 72 ]
    const changeValue = ()=>{
        counter = "21"
    }
</script>



<div class="flex gap-10">
   
    {#each pages as page}
        <div class="flex gap-5">
            <h1>{page}</h1>
        </div>
    {/each}

    <select bind:value = {pageCount}>
        {#each amounts as amount}
            <option value = {parseInt(amount)}>{amount} per page</option>
        {/each}
    </select>
    
</div>
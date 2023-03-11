<script>
// @ts-nocheck
    import { onMount } from 'svelte'
    import MediaQuery from '../components/MediaQuery.svelte';
  	import NavBarVertical from '../components/NavBarVertical.svelte';
    import NavBarHorizontal from '../components/NavBarHorizontal.svelte';
    import '../app.css';
    export let data
    let animation
	let navBarSize
	let pageSize
    let width
    let height
    let orientation
    const {user} = data
    console.log(user)
    const changeIconHoverIn = () => {
        if(window.innerWidth > 500){
            navBarSize = "basis-1/6"
		    pageSize = 'basis-5/6'
            width = '120px'
            height = '120px'
            animation = 'rotate-[720deg]'
        }
        else{
            animation = 'rotate-[720deg]'
        }
        
    }
    const changeIconHoverOut = () => {

        if(window.innerWidth > 500){
            navBarSize = "basis-1/12"
            width = '60px'
            height = '60px'
            animation = "rotate-[-720deg]"
            pageSize = 'basis-11/12'
        }
        else{
            navBarSize = "basis-1/12"
            width = '60px'
            height = '60px'
            animation = "rotate-[-720deg]"
            pageSize = 'basis-11/12'
        }
    }

    onMount(() => {
        if(window.innerWidth > 500){
	        navBarSize = 'basis-1/12'
	        pageSize = 'basis-11/12'
            width = '60px'
            height = '60px'
            orientation = ''
        }
        else{
            animation
	        pageSize = ''
            orientation = 'flex-col'
            navBarSize = 'basis-1/12'
            pageSize = 'basis-11/12'
            width = '60px'
            height = '60px'
        }
    })
</script>

<div class="app font-mono flex {orientation} h-screen">

    <MediaQuery query="(min-width: 1281px)" let:matches>
        {#if matches}
            <div on:mouseenter={changeIconHoverIn} on:mouseleave={changeIconHoverOut} class="{navBarSize} duration-300">
                <NavBarVertical user = {user} navBarSize = {navBarSize} width = {width} height = {height} animation = {animation}/>
            </div>
        {/if}
    </MediaQuery>

    <MediaQuery query = "(max-width: 428px)" let:matches>
        {#if matches}
            <div  on:mouseenter={changeIconHoverIn} on:mouseleave={changeIconHoverOut} class="{navBarSize} duration-300">
                <NavBarHorizontal user = {user} navBarSize={navBarSize} width = {width} height = {height} animation = {animation}/>
            </div>
        {/if}
    </MediaQuery>
	<main class= "{pageSize} duration-300 overflow-auto">
		<slot />
	</main>
</div>

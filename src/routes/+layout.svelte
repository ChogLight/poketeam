<script>
// @ts-nocheck

  	import NavBar from '../components/NavBar.svelte';
	import '../app.css'
	let navBarSize = 'basis-1/12'
	let animation
	let pageSize = 'basis-11/12'
    let width = '60px'
    let height = '60px'
    const changeIconHoverIn = () => {
        navBarSize = "basis-1/6"
		pageSize = 'basis-5/6'
        width = '120px'
        height = '120px'
        animation = 'rotate-[720deg]'
    }
    const changeIconHoverOut = () => {
        navBarSize = "basis-1/12"
        width = '60px'
        height = '60px'
        animation = "rotate-[-720deg]"
		pageSize = 'basis-11/12'
    }
</script>

<div class="app font-mono flex">
	<div on:mouseenter={changeIconHoverIn} on:mouseleave={changeIconHoverOut} class="{navBarSize} duration-300">
		<NavBar navBarSize = {navBarSize} width = {width} height = {height} animation = {animation}/>
	</div>
	<main class= "{pageSize} duration-300">
		<slot />
	</main>

</div>


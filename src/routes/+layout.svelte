<script>
  	import NavBar from '../components/NavBar.svelte';
	import '../app.css'
</script>

<div class="app font-mono flex">
	
	<NavBar/>
	<main class= "">
		<slot />
	</main>

</div>


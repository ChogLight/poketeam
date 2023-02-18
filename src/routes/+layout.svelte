<script>
  	import NavBar from '../components/NavBar.svelte';
	import '../app.css'
</script>

<div class="app font-mono flex">

	<NavBar/>
	<main class= "w-2/3">
		<slot />
	</main>

</div>


<script>
	import '../app.css';
  	import NavBar from '../components/NavBar.svelte';
</script>

<div class="app font-mono flex">

	<NavBar/>
	<main class= "w-2/3">
		<slot />
	</main>

</div>


<script lang="ts">
	import Tailwindcss from './Tailwindcss.svelte';
	import { Header, Button, TextInput }from './components';
	import Router from "svelte-spa-router";
	import { routes } from "./router";

</script>

<Tailwindcss />

<Header/>
<main>
	<Router {routes}/>
	<Button/>
	<TextInput/>
</main>

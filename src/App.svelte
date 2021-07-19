<script lang="ts">
import Router from './Router.svelte';
import Tailwindcss from './Tailwindcss.svelte';
import Style from './Style.svelte';
import { theme } from './store';
</script>

<Style />
<Tailwindcss />

<div data-theme={$theme} class="none sm:block bg-base-100">
  <Router />
</div>

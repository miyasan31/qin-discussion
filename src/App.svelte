<script lang="ts">
import Router from './Router.svelte';
import Tailwindcss from './Tailwindcss.svelte';
import Style from './Style.svelte';
</script>

<Style />
<Tailwindcss />

<div data-theme="root" class="none sm:block">
  <Router />
</div>

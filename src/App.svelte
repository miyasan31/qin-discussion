<script lang="ts">
import { Auth } from './pages';
import Router from './Router.svelte';
import Tailwindcss from './Tailwindcss.svelte';
import Style from './Style.svelte';
</script>

<Style />
<Tailwindcss />

<div data-theme="root" class="none sm:block">
  <Auth>
    <Router />
  </Auth>
</div>

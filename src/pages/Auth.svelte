<script type="ts">
import { navigate } from 'svelte-routing';
import { onMount } from 'svelte';
import { admin, name } from '../store';
import { Signin } from './index';

onMount(() => {
  if ($name === '' || !$admin) navigate('/');
});
</script>

{#if $name !== '' || $admin}
  <slot />
{:else}
  <Signin />
{/if}

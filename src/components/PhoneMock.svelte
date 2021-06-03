<script lang="ts">
import { fly } from 'svelte/transition';
</script>

<div in:fly={{ y: 300, duration: 1000 }}>
  <div class="mockup-phone">
    <div class="camera" />
    <div class="display">
      <div class="artboard phone-1 artboard-demo bg-gray-100">
        <slot />
      </div>
    </div>
  </div>
</div>

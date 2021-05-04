<script lang="ts">
export let value: string;
</script>

<textarea
  bind:value
  type="text"
  rows="3"
  placeholder="お題を入力"
  class="input input-primary input-bordered w-full h-60 resize-none" />

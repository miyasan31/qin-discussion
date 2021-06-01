<script lang="ts">
export let text_type: 'textarea' | 'input';
export let type: 'text' | 'password';
export let value: string;
export let placeholder: string;
export let error: boolean;

const typeAction = (node) => {
  node.type = type;
};
</script>

{#if text_type === 'textarea'}
  <textarea
    bind:value
    type="text"
    rows="3"
    {placeholder}
    class="input input-primary input-bordered w-full h-32 sm:h-40 resize-none mb-2.5"
    class:error-input={error} />
{:else if text_type === 'input'}
  <input
    use:typeAction
    bind:value
    {placeholder}
    class="input input-primary input-bordered w-full"
    class:bg-red-200={error} />
{/if}

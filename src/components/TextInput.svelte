<script lang="ts">
export let text_type: 'textarea' | 'input';
export let type: 'text' | 'password' | 'date';
export let color: 'primary' | 'secondary' | 'natural' | 'accent';
export let value: string;
export let placeholder: string;
export let error: true | false;

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
    class={`input input-${color} input-bordered w-full h-32 sm:h-40 bg-base-100 text-base-300 resize-none mb-2.5 shadow-sm`}
    class:bg-red-200={error} />
{:else if text_type === 'input'}
  <input
    use:typeAction
    bind:value
    {placeholder}
    class={`input input-${color} input-bordered w-full bg-base-100 text-base-300 shadow-sm`}
    class:bg-red-200={error} />
{/if}

<script lang="ts">
export let type: 'text' | 'name' | 'password';
export let value: string;
export let error: boolean;
</script>

{#if type === 'text'}
  <textarea
    bind:value
    type="text"
    rows="3"
    placeholder="お題を入力"
    class="input input-primary input-bordered w-full h-60 resize-none" />
{:else if type === 'name'}
  <input
    bind:value
    type="text"
    placeholder="匿名の場合は未入力"
    class="input input-primary input-bordered w-full mt-2" />
{:else if type === 'password'}
  <input
    bind:value
    type="password"
    placeholder="管理者パスワード"
    class={`input input-primary input-bordered w-full ${error && 'bg-red-200'}`} />
{/if}

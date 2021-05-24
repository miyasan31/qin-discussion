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
    class="input input-primary input-bordered w-full h-32 resize-none mb-2.5"
    class:error-input={error} />
{:else if type === 'name'}
  <input
    autofocus
    bind:value
    type="text"
    placeholder="お名前（未入力の場合は匿名参加）"
    class="input input-primary input-bordered w-full" />
{:else if type === 'password'}
  <input
    autofocus
    bind:value
    type="password"
    placeholder="管理者パスワード"
    class="input input-primary input-bordered w-full"
    class:error-input={error} />
{/if}

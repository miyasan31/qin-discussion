<script lang="ts">
import { link } from 'svelte-routing';
export let nav: 'delete' | 'event';
</script>

<div class="w-60 hidden md:block drawer-side border-l border-base-200">
  <ul class="menu p-2 ml-0 overflow-y-auto font-semibold text-base-300">
    <li>
      <a use:link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 -ml-3 mr-3 transform -rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
        <span class="text-sm md:text-lg">一覧へ戻る</span>
      </a>
    </li>
    <!-- <div class="border-t-1 my-1" /> -->
    <li class:text-primary={nav === 'delete'}>
      <a use:link href="/admin">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 -ml-3 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
        </svg>
        <span class="text-sm md:text-lg">お題削除</span>
      </a>
    </li>
    <li class:text-primary={nav === 'event'}>
      <a use:link href="/admin/event">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 -ml-3 mr-3 transform rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
        </svg><span class="text-sm md:text-lg">イベント追加</span>
      </a>
    </li>
  </ul>
</div>

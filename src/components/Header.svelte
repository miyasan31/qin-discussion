<script lang="ts">
import { onMount } from 'svelte';
import { Link } from 'svelte-routing';
import { admin, thread, modal, event, sort_asc } from '../store';

let disabled: boolean = false;
const handleModal = (): void => {
  modal.update((store_modal) => !store_modal);
};
const handleThread = (): void => {
  thread.update((store_thread) => !store_thread);
};
const handleSort = () => {
  sort_asc.update((store_sort_asc) => (store_sort_asc = !store_sort_asc));
};
onMount(() => {
  // 今後timestampと比較
  function formatDate(dt) {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return y + m + d;
  }
  const data = formatDate(new Date());
  if (parseInt($event, 10) < parseInt(data, 10)) {
    disabled = true;
  } else {
    disabled = false;
  }
});
</script>

<header
  class="relative z-50 body-font bg-gradient-to-r from-primary-focus to-primary py-2.5 px-2 md:py-3 md:px-5 shadow">
  <div class="flex justify-center items-center">
    <Link to="/">
      <span class="flex title-font items-center text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 md:h-7 md:w-7 text-secondary transform rotate-12"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clip-rule="evenodd" />
        </svg>
        <span class="ml-1 text-xl md:text-2xl font-bold">Qin Discussion</span>
      </span>
    </Link>

    <div class="flex-grow" />

    <div class="flex bg-white rounded-full px-1 md:px-1 pt-1.5 pb-1 md:py-1 shadow">
      <div class="px-0.5 md:px-1">
        <div data-tip="お題投稿" class="tooltip tooltip-bottom tooltip-primary">
          <button class="btn btn-primary btn-circle btn-xs md:btn-sm shadow" {disabled} on:click={handleModal}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="px-0.5 md:px-1">
        <div data-tip="スレッド" class="tooltip tooltip-bottom tooltip-natural">
          <button class="btn btn-natural btn-circle btn-xs md:btn-sm shadow" on:click={handleThread}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 md:h-5 md:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </button>
        </div>
      </div>

      <div class="px-0.5 md:px-1">
        <div data-tip={$sort_asc ? '新しい順' : '古い順'} class="tooltip tooltip-bottom tooltip-secondary">
          <button class="btn btn-secondary btn-circle btn-xs md:btn-sm shadow" on:click={handleSort}>
            {#if $sort_asc}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            {/if}
          </button>
        </div>
      </div>

      {#if $admin}
        <div class="px-0.5 md:px-1">
          <div data-tip="管理者ページ" class="tooltip tooltip-bottom tooltip-accent">
            <Link to="/admin">
              <button class="btn btn-accent btn-circle btn-xs md:btn-sm shadow"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 md:h-5 md:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      {/if}
    </div>
  </div>
</header>

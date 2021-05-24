<script lang="ts">
import { Link } from 'svelte-routing';
import { admin } from '../store';
</script>

<header class="text-gray-600 body-font bg-green-100 py-4 border-b-1">
  <div class="flex justify-center items-center">
    <div class="ml-5">
      <Link to="/">
        <span class="flex title-font items-center text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-primary rounded-full"
            viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span class="ml-3 text-xl font-bold">Qin Discussion</span>
        </span>
      </Link>
    </div>

    <div class="flex-grow" />
    {#if $admin}
      <Link to="/admin">
        <div class="pr-5">
          <button class="btn btn-primary btn-circle btn-sm"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </Link>
    {:else}
      <div class="pr-5">
        <button class="btn btn-circle btn-sm" disabled={$admin ? false : true}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    {/if}
  </div>
</header>

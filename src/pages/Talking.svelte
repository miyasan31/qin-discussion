<script lang="ts">
import { Link } from 'svelte-routing';
</script>

<div class="text-lg">話中のやつ</div>
<hr />

<div class="fixed right-10 bottom-10 mt-4">
  <Link to="/"
    ><label for="my-modal-2" class="btn btn-primary modal-button px-6 rounded-full"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 pr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>一覧へ戻る</label
    ></Link>
</div>

<script type="ts">
import { modal } from '../store';
const handleModal = (): void => {
  modal.update((store_modal) => !store_modal);
};
</script>

<div class="absolute right-10 bottom-10 mt-4">
  <button class="btn btn-secondary modal-button sm:btn-circle px-3 sm:px-5 rounded-full" on:click={handleModal}
    ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
    <span class="hidden sm:block pl-1">お題投稿</span>
  </button>
</div>

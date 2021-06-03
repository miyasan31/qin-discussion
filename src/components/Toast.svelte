<style>
.root {
  --toastBackground: rgba(223, 223, 223, 0.692);
  --toastColor: #424242;
  --toastProgressBackground: #38ccbd;
  --toastContainerTop: auto;
  --toastContainerBottom: 3rem;
  --toastContainerRight: 3rem;
  --toastContainerLeft: auto;
}
</style>

<script>
import { SvelteToast, toast } from '@zerodevx/svelte-toast';

const options = {
  duration: 2000, // duration of progress bar tween
  dismissable: false, // allow dismiss with close button
  initial: 1, // initial progress bar value
  progress: 0, // current progress
  reversed: true, // insert new toast to bottom of stack
  intro: { x: 100 },
};
</script>

<div class="root _toastContainer">
  <SvelteToast {options} />
</div>

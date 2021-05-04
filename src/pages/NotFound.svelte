<script lang="ts">
import { Link } from 'svelte-routing';
</script>

<div class="fixed z-10 w-full h-screen bg-gradient-to-r from-purple-300 to-blue-200">
  <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
    <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
      <div class="border-t border-gray-200 text-center pt-8">
        <h1 class="text-9xl font-bold text-purple-400">404</h1>
        <h1 class="text-6xl font-medium py-8">Googleでも見つけれないことあるから</h1>
        <Link to="/">
          <button
            class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
            ディスカッションへ戻る
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>

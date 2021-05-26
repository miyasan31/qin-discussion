<script lang="ts">
import { Link } from 'svelte-routing';
</script>

<div class="fixed z-50 top-0 w-full h-screen bg-gradient-to-r from-purple-300 to-blue-200">
  <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
    <div class="overflow-hidden pb-8">
      <div class="border-gray-200 text-center p-8">
        <h1 class="text-3xl md:text-7xl font-bold text-purple-500">404 Not Found</h1>
        <h1 class="text-2xl md:text-5xl font-bold py-2 md:py-8 text-white">ページが見つかりません</h1>
        <Link to="/">
          <button
            class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
            TOPへ戻る
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>

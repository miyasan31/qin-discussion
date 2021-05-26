<script lang="ts">
import { Router, Route } from 'svelte-routing';
import { Header, Thread, PostModal } from './components';
import { Discussion, Talking, Admin, NotFound } from './pages';
import { thread } from './store';
</script>

<Router>
  <div class="fixed w-full overflow-x-hidden">
    <div class="top-0 z-50">
      <Header />
    </div>
    <div class:flex={$thread}>
      <div class:flex-2={$thread}>
        <Route path="/"><Discussion /></Route>
        <Route path="/talking/:id"><Talking /></Route>
        <Route path="/admin"><Admin /></Route>
        <Route path="*"><NotFound /></Route>
      </div>
      {#if $thread}
        <div class:flex-1={$thread}>
          <Thread />
        </div>
      {/if}
    </div>
  </div>

  <PostModal />
</Router>

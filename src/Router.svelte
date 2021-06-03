<script lang="ts">
import { Router, Route } from 'svelte-routing';
import { Header, Thread, PostModal } from './components';
import { Discussion, Talking, AdminPostDelete, AdminEvent, NotFound, Auth } from './pages';
import { thread } from './store';
</script>

<Router>
  <Auth>
    <div class="fixed w-full overflow-x-hidden">
      <div class="top-0 z-50">
        <Header />
      </div>
      <div class={$thread ? 'flex' : ''}>
        <div class={$thread ? 'hidden md:block md:flex-2' : 'w-full'}>
          <Route path="/"><Discussion /></Route>
          <Route path="/talking/:id"><Talking /></Route>
          <Route path="/admin"><AdminPostDelete /></Route>
          <Route path="/admin/event"><AdminEvent /></Route>
          <Route path="*"><NotFound /></Route>
        </div>
        <div class={$thread ? 'w-full md:flex-1' : 'hidden'}>
          <Thread />
        </div>
      </div>
    </div>
    <PostModal />
  </Auth>
</Router>

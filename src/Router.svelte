<script lang="ts">
import { Router, Route } from 'svelte-routing';
import { Header, Thread } from './components';
import { Discussion, Talking, Admin, NotFound } from './pages';
</script>

<Router>
  <div class="fixed w-full overflow-x-hidden">
    <div class="top-0">
      <Header />
    </div>
    <div class="top-20 flex">
      <div class="flex-2">
        <Route path="/"><Discussion /></Route>
        <Route path="/talking/:id"><Talking /></Route>
        <Route path="/admin"><Admin /></Route>
        <Route path="*"><NotFound /></Route>
      </div>
      <div class="flex-1">
        <Thread />
      </div>
    </div>
  </div>
</Router>

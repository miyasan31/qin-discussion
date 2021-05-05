<script lang="ts">
import { Router, Route } from 'svelte-routing';
import { Header } from './components';
import { Discussion, Talking, Admin, Setting, NotFound } from './pages';
</script>

<Router>
  <div class="fixed w-full">
    <div class="top-0">
      <Header />
    </div>
    <div class="top-20">
      <Route path="/"><Discussion /></Route>
      <Route path="/talking/:id"><Talking /></Route>
      <Route path="/admin"><Admin /></Route>
      <Route path="/setting"><Setting /></Route>
      <Route path="*"><NotFound /></Route>
    </div>
  </div>
</Router>

<!-- <Router>
  <Header />
  <div>
    <Route path="/" component={Discussion} />
    <Route path="/talking/:id" component={Talking} />
    <Route path="/admin" component={Admin} />
    <Route path="/setting" component={Setting} />
    <Route path="*" component={NotFound} />
  </div>
</Router> -->

<style>
:root {
  --p: 174 59% 51%;
  --pf: 174 59% 41%;
  --pc: 0 0% 100%;
  --s: 35 100% 53%;
  --sf: 35 86% 44%;
  --sc: 0 0% 100%;
  --a: 0 100% 63%;
  --af: 0 60% 51%;
  --ac: 0 0% 100%;
}
</style>

<script lang="ts">
import { Router, Route } from 'svelte-routing';
import { Header } from './components';
import Discussion from './pages/Discussion.svelte';
import Talking from './pages/Talking.svelte';
import Admin from './pages/Admin.svelte';
import Setting from './pages/Setting.svelte';
import NotFound from './pages/NotFound.svelte';
</script>

<Router>
  <Header />
  <div>
    <Route path="/" component={Discussion} />
    <Route path="/talking/:id" component={Talking} />
    <Route path="/admin" component={Admin} />
    <Route path="/setting" component={Setting} />
    <Route path="*" component={NotFound} />
  </div>
</Router>

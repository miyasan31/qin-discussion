import Home from '../pages/Home.svelte'
import Form from '../pages/Form.svelte'
import NotFound from '../pages/NotFound.svelte'
// ルーティング
// Appで読み込む
export const routes = {
  '/': Home,
  '/form': Form,
  '*': NotFound,
}
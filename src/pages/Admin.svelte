<script lang="ts">
import { Link } from 'svelte-routing';
import { db } from '../firebase/firebase';
import { TextInput, Progress } from '../components';

type PostsType = {
  pid: string;
  title: string;
  create_time: Object;
  checked: boolean;
};

let error: boolean = false;
let modal: boolean = true;
let posts: PostsType[] = [];
let password: string = '';

const handleFetch = () => {
  db.collection('posts20210530')
    .orderBy('create_time', 'desc')
    .onSnapshot((snapshot) => {
      let docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      posts = [...docs];
    });
};

const handleAuth = async () => {
  if (password === 'miyasanismiya3') {
    modal = false;
    error = false;
    await handleFetch();
  } else {
    error = true;
  }
};

const handleDelete = (pid: string) => {
  db.collection('posts20210530').doc(pid).delete();
};
</script>

<section>
  <!-- 上のボタン類 -->
  <div class="absolute flex px-5 mt-3">
    <Link to="/">
      <button class="btn btn-primary btn rounded-lg btn-sm">一覧へ戻る</button></Link>
    <div class="flex-grow" />
  </div>

  <!-- main -->
  <div class="main-height mx-auto overflow-y-auto px-3  md:px-32 pb-60">
    {#each posts as post}
      <div class="flex items-center border-b-1 hover:bg-gray-50 hover:text-primary-focus">
        <div class="mx-2 py-5 pl-3　text-2xl font-bold ">
          {post.title}
        </div>
        <div class="flex-grow" />
        <button class="btn btn-accent btn-sm rounded-lg" on:click={() => handleDelete(post.pid)}>削除</button>
      </div>
    {/each}
  </div>
</section>

<!-- modal -->
<input type="checkbox" bind:checked={modal} id="my-modal-2" class="modal-toggle" />
<div class="modal bg-green-100">
  <div class="modal-box bg-gray-100">
    <TextInput bind:value={password} type="password" bind:error />
    <div class="flex">
      <div class="flex-grow" />
      <Link to="/">
        <button class="btn btn-outline btn-primary btn-sm modal-action"> キャンセル </button>
      </Link>
      <button class="btn btn-primary btn-sm modal-action ml-2" on:click={handleAuth}> 認証 </button>
    </div>
  </div>
</div>

<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { TextInput, Progress } from '../components';
import { name, admin } from '../store';

type PostsType = {
  pid: string;
  title: string;
  creater_name: string;
  create_time: Object;
  checked: boolean;
};
type CommetsType = {
  text: string;
  creater_name: string;
  create_time: Object;
};

let pid = '';
let handleType: number = 0;
let userName: string = '';
let password: string = '';
let error: boolean = false;
let toggle: boolean = false;
let modal: boolean = false;
let post: PostsType = {
  pid: '',
  title: '',
  creater_name: '',
  create_time: {},
  checked: false,
};
let message: CommetsType = {
  text: '',
  creater_name: '',
  create_time: {},
};
let comments: CommetsType[] = [];

const handleFetch = () => {
  db.collection('posts')
    .doc(pid)
    .onSnapshot((doc) => {
      post = doc.data() as PostsType;
    });
};

const handleFetchComments = () => {
  db.collection('posts')
    .doc(pid)
    .collection('comments')
    .orderBy('create_time', 'desc')
    .onSnapshot((snapshot) => {
      let cmt = [];
      snapshot.forEach((doc) => {
        cmt.push({ ...doc.data() });
      });
      comments = [...cmt];
    });
};

const handleToggle = () => {
  if ($name === '') {
    handleType = 2;
    modal = true;
  } else {
    toggle = !toggle;
  }
};

const handleChenge = () => {
  if (!$admin) {
    handleType = 1;
    modal = true;
  } else {
    let posts = {
      checked: !post.checked,
    };
    db.collection('posts').doc(pid).set(posts, { merge: true });
  }
};

const handleNameSet = () => {
  modal = false;
  if (userName === '') {
    $name = '匿名';
  } else {
    $name = userName;
  }
  toggle = true;
};

const handleDone = () => {
  if (handleType === 2) {
    handleNameSet();
  } else if (handleType === 1 && password === 'miyasanismiya3') {
    $admin = !$admin;
    modal = false;
    handleChenge();
  } else {
    error = true;
  }
};

const handleReset = () => {
  message = {
    text: '',
    creater_name: '',
    create_time: {},
  };
};

const handleModalClose = () => {
  modal = false;
};

const handleSend = () => {
  if (message.text !== '') {
    const timestamp = FirebaseTimestamp.now();
    message.create_time = timestamp;
    message.creater_name = $name;
    db.collection('posts').doc(pid).collection('comments').doc().set(message);
    handleReset();
  }
};

onMount(async () => {
  pid = await window.location.pathname.split('/talking/')[1];
  await handleFetch();
  await handleFetchComments();
});
</script>

<section class="flex w-full main-h">
  <div class={`flex-1 px-5 mt-3 ${toggle && 'hidden sm:block'} `}>
    <!-- 上のボタン類 -->
    <div class="flex">
      <Link to="/">
        <button class="btn btn-primary btn rounded-lg btn-sm">一覧へ戻る</button></Link>
      <div class="flex-grow" />
      {#if post.checked}
        <button class="btn btn-accent btn rounded-lg btn-sm  ml-2" on:click={handleChenge}>取消</button>
      {:else}
        <button class="btn btn-secondary btn rounded-lg btn-sm  ml-2" on:click={handleChenge}>終了</button>
      {/if}
      <button class="btn btn-neutral btn rounded-lg btn-sm ml-2" on:click={handleToggle}>スレッド</button>
    </div>

    {#if post.title !== ''}
      <div class="flex flex-col justify-center items-center h-96 mt-20 rounded-xl border-0 border-primary">
        <!-- 真ん中のカード -->
        <div class="relative text-6xl font-bold text-center my-5 pt-8">
          {post.title}
          <!-- checkedボタン -->
          {#if post.checked}
            <div class={`absolute -top-5 ${toggle ? '-right-5' : '-right-8'} `}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-20 w-20 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          {/if}
        </div>
        <div class="flex">
          <div class="flex-grow" />
          <div class="rounded-full text-lg font-bold text-white bg-primary py-2 px-5">
            {post.creater_name}
          </div>
        </div>
      </div>
    {:else}
      <Progress />
    {/if}
  </div>

  {#if toggle}
    <!-- 野次欄 -->
    <div class={`flex-1 flex flex-col sm:max-w-lg ${toggle ? 'w-full' : ''} main-height border-l-1`}>
      <div class="flex items-center border-b-1 p-1">
        <div>
          <p class="m-0 pl-2 pt-2.5 font-bold text-sm leading-none">ディスカッションに参加しよう！</p>
          <p class={`m-0 pl-3 pt-0.5 pb-2.5 text-gray-400 font-bold text-xs leading-none`}>
            #{post.title}
          </p>
        </div>
        <div class="flex-grow" />
        <button class="btn btn-ghost btn-sm mr-4" on:click={handleToggle}
          >閉じる<svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg></button>
      </div>
      <div class="flex-grow flex flex-col-reverse overflow-scroll">
        {#each comments as comment}
          {#if comment.text.lastIndexOf('？') === -1}
            <div class="mx-2 mb-2">
              <div class="chat-msg font-bold pl-1 text-sm">
                {comment.creater_name}
              </div>
              <div class="chat-msg bg-gray-100 px-3 py-1.5 text-md rounded-xl whitespace-pre-line">
                {comment.text}
              </div>
            </div>
          {:else}
            <div class="mx-2 mb-2">
              <div class="chat-msg font-bold pl-1 text-sm">
                {comment.creater_name}
              </div>
              <div class="chat-msg bg-green-100 px-3 py-1.5 text-md rounded-xl whitespace-pre-line">
                {comment.text}
              </div>
            </div>
          {/if}
        {/each}
      </div>
      <div class="flex space-x-2 border-t-1 p-1 bg-gray-50">
        <textarea
          type="text"
          bind:value={message.text}
          placeholder={`${$name}から野次を飛ばす`}
          multiple
          class="w-full pt-4 input input-primary input-bordered leading-tight resize-y resize-label" />
        <button class="btn btn-primary" on:click={handleSend}>飛</button>
      </div>
    </div>
  {/if}
</section>

<!-- modal -->
<input type="checkbox" bind:checked={modal} id="my-modal-2" class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-gray-100">
    {#if handleType === 1}
      <TextInput bind:value={password} type="password" bind:error />
    {:else if handleType === 2}
      <TextInput bind:value={userName} type="name" />
    {/if}
    <div class="flex">
      <div class="flex-grow" />
      <button class="btn btn-outline btn-primary btn-sm modal-action ml-2" on:click={handleModalClose}
        >キャンセル</button>
      <button class="btn btn-primary btn-sm modal-action ml-2" on:click={handleDone}>決定</button>
    </div>
  </div>
</div>

<script lang="ts">
import { Link } from 'svelte-routing';
import { onMount } from 'svelte';
import { db, FirebaseTimestamp } from '../firebase/firebase';
import { Progress } from '../components';

type PostsType = {
  pid: string;
  title: string;
  creater_name: string;
  create_time: Object;
  checked: boolean;
};
type CommetsType = {
  text: string;
  create_time: Object;
};

let toggle: boolean = false;
let pid = '';
let post: PostsType = {
  pid: '',
  title: '',
  creater_name: '',
  create_time: {},
  checked: false,
};
let message: CommetsType = {
  text: '',
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

const handleDone = () => {
  let formData = {
    checked: true,
  };
  db.collection('posts').doc(pid).set(formData, { merge: true });
};

const handleNone = () => {
  let formData = {
    checked: false,
  };
  db.collection('posts').doc(pid).set(formData, { merge: true });
};

const handleToggle = () => {
  toggle = !toggle;
};

const handleSend = () => {
  if (message.text !== '') {
    const timestamp = FirebaseTimestamp.now();
    message.create_time = timestamp;
    db.collection('posts').doc(pid).collection('comments').doc().set(message);
    handleReset();
  }
};

const handleReset = () => {
  message = {
    text: '',
    create_time: {},
  };
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
        <button class="btn btn-accent btn rounded-lg btn-sm  ml-2" on:click={handleNone}>取消</button>
      {:else}
        <button class="btn btn-secondary btn rounded-lg btn-sm  ml-2" on:click={handleDone}>終了</button>
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
            <div class="absolute -top-2 -right-10 ">
              <button class="btn btn-circle btn-ghost" on:click={handleNone}
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
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
        <button class="btn btn-ghost btn-circle btn-sm mr-4" on:click={handleToggle}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg></button>
      </div>
      <div class="flex-grow flex flex-col-reverse overflow-scroll">
        {#each comments as comment}
          {#if comment.text.lastIndexOf('？') === -1}
            <div class="chat-msg bg-gray-100 p-3 text-md mb-2 mx-2 rounded-xl whitespace-pre-line">
              {comment.text}
            </div>
          {:else}
            <div class="chat-msg bg-green-100 p-3 text-md mb-2 ml-2 rounded-xl">{comment.text}</div>
          {/if}
        {/each}
      </div>
      <div class="flex space-x-2 border-t-1 p-2 bg-gray-50">
        <textarea
          type="text"
          bind:value={message.text}
          placeholder="野次を飛ばす"
          multiple
          class="w-full input input-primary input-bordered input-sm resize-y resize-label" />
        <button class="btn btn-primary btn-sm" on:click={handleSend}>飛</button>
      </div>
    </div>
  {/if}
</section>

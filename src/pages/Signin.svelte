<script type="ts">
import { onMount } from 'svelte';
import { TextInput } from '../components';
import { admin, name, event } from '../store';
import { navigate } from 'svelte-routing';
import { db } from '../firebase/firebase';
import { fly } from 'svelte/transition';

let tab: boolean = false;
let error: boolean = false;
let userName: string = '';
let password: string = '';
let select_event: string = '';
let promise = [];

const handleTabYet = (): void => {
  tab = false;
};
const handleTabFin = (): void => {
  tab = true;
};

const handleSelect = (e): void => {
  select_event = e.target.value;
};

const handleJoin = (): void => {
  if (userName === '') {
    name.update((store_name) => (store_name = '匿名さん'));
  } else {
    name.update((store_name) => (store_name = userName));
  }
  event.update((store_event) => (store_event = select_event));
  navigate('/', { replace: true });
};

const handleAdmin = (): void => {
  if (password === 'miyasanismiya3') {
    if (userName === '') {
      name.update((store_name) => (store_name = 'しまぶー'));
    } else {
      name.update((store_name) => (store_name = userName));
    }
    admin.update((store_admin) => (store_admin = true));
    event.update((store_event) => (store_event = select_event));
    navigate('/', { replace: true });
  } else {
    error = true;
  }
};

const handleEvent = async () => {
  const result = await db
    .collection('qin-salon')
    .orderBy('eid', 'asc')
    .get()
    .then((docs) => {
      let event = [];
      docs.forEach((data) => {
        event.push(data.data());
      });
      return event;
    })
    .catch((error) => {
      return error;
    });

  if (result === error) {
    return;
  }
  return result;
};

onMount(async () => {
  promise = await handleEvent();
});
</script>

<div class="flex flex-col justify-center items-center h-screen w-full bg-primary bg-opacity-90">
  <div
    class="fixed z-0 font-bold text-max text-white opacity-5 transform rotate-45 sm:rotate-12 overflow-clip"
    style="font-size: 900px">
    Qin
  </div>

  <div class="fixed z-10 card w-10/12 sm:w-8/12 md:w-5/12 bg-gray-100 shadow-xl">
    <div class="w-full flex cursor-pointer bg-white shadow">
      <!-- 冗長クラス -->
      <div
        class={tab
          ? 'flex-1 py-1.5 md:py-2.5 box-border border-b-1 text-center text-base md:text-lg text-gray-400'
          : 'flex-1 py-1.5 md:py-2.5 box-border text-center md:text-lg font-bold border-b-2 border-primary-focus text-gray-700'}
        on:click={handleTabYet}>
        視聴者
      </div>
      <!-- 冗長クラス -->
      <div
        class={!tab
          ? 'flex-1 py-1.5 md:py-2.5 box-border border-b-1 text-center text-base md:text-lg text-gray-400'
          : 'flex-1 py-1.5 md:py-2.5 box-border text-center md:text-lg font-bold border-b-2 border-primary-focus text-gray-700'}
        on:click={handleTabFin}>
        管理者
      </div>
    </div>

    <div class="p-10 pb-5">
      {#await promise}
        <div class="p-3 pl-4 w-full rounded-lg bg-white text-primary animate-pulse">イベントを取得中...</div>
      {:then result}
        <select
          class="select select-bordered select-primary w-full shadow-sm"
          bind:value={select_event}
          on:select={handleSelect}
          autofocus>
          <option id="default" value="" disabled>イベントを選択してください</option>
          {#each result as r}
            <option id={r.eid} value={r.eid} selected={select_event === r.eid}>{r.event_title}</option>
          {/each}
        </select>
      {:catch error}
        <div class="p-3 pl-4 w-full rounded-lg bg-white text-red-400">エラーが起きました</div>
      {/await}
    </div>

    <div class="p-10 pt-0">
      <!-- {#if boolean} で切り替えパターン -->
      {#if !tab}
        <TextInput
          text_type="input"
          type="text"
          color="primary"
          bind:value={userName}
          bind:error
          placeholder="お名前（未入力の場合は匿名参加）" />
      {:else}
        <TextInput
          text_type="input"
          type="password"
          color="primary"
          bind:value={password}
          bind:error
          placeholder="管理者パスワード" />
        {#if password === 'miyasanismiya3'}
          <div class="pt-5" in:fly={{ y: 50, duration: 500 }}>
            <TextInput
              text_type="input"
              type="text"
              color="primary"
              bind:value={userName}
              bind:error
              placeholder="お名前（未入力の場合はしまぶー）" />
          </div>
        {/if}
      {/if}
      <!-- class:hidden={boolean}で切り替えパターン -->
      <div class="flex justify-end pt-5">
        <button
          class="btn btn-primary"
          class:hidden={tab}
          class:shadow={select_event === '' ? false : true}
          disabled={select_event !== '' ? false : true}
          on:click={handleJoin}>参加する</button>
        <button
          class="btn btn-primary"
          class:shadow={password !== 'miyasanismiya3' ? false : true}
          class:hidden={!tab}
          disabled={select_event !== '' && password === 'miyasanismiya3' ? false : true}
          on:click={handleAdmin}>主催する</button>
      </div>
    </div>
  </div>
</div>

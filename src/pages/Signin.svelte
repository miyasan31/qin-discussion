<script type="ts">
import { onMount } from 'svelte';
import { TextInput } from '../components';
import { admin, name, event, theme } from '../store';
import { navigate } from 'svelte-routing';
import { db } from '../firebase/firebase';
import { fly } from 'svelte/transition';
import type { SnapshotType } from '../firebase/firebase';

let tab: boolean = false;
let error: boolean = false;
let userName: string = '';
let password: string = '';
let select_event: string = '';
let promise = [];
const theme_data = [
  { icon: '🌞', theme: 'light' },
  { icon: '🌛', theme: 'dark' },
  { icon: '🎃', theme: 'halloween' },
  { icon: '🐝', theme: 'bumblebee' },
  { icon: '🧛‍♂️', theme: 'dracula' },
];

const handleToggleTab = (boolean: boolean) => (tab = boolean);

const handleSelectEvent = (e) => (select_event = e.target.value);

const handleChangeTheme = (theme_value: string) => theme.update(() => theme_value);

const handleSetIcon = (theme) => {
  switch (theme) {
    case 'light':
      return '🌞';
    case 'dark':
      return '🌛';
    case 'halloween':
      return '🎃';
    case 'bumblebee':
      return '🐝';
    case 'dracula':
      return '🧛‍♂️';
  }
};

const handleSignin = (adminAcc: boolean) => {
  name.update(() => {
    if (adminAcc && userName === '') return 'しまぶー';
    else if (!adminAcc && userName === '') return '匿名さん';
    else return userName;
  });
  if (adminAcc) admin.update(() => true);
  event.update(() => select_event);
  navigate('/', { replace: true });
};

const handleFetchEvent = async () => {
  const result = await db
    .collection('qin-salon')
    .orderBy('eid', 'asc')
    .get()
    .then((docs: SnapshotType) => {
      let event = [];
      docs.forEach((data) => {
        event.push(data.data());
      });
      return event;
    })
    .catch((error) => {
      return error;
    });

  return result;
};

onMount(async () => (promise = await handleFetchEvent()));
</script>

<div class="fixed z-30 top-5 right-6 md:top-8 md:right-10 dropdown dropdown-hover dropdown-end">
  <div
    tabindex="0"
    class="btn btn-circle bg-base-100 text-base-300 hover:bg-base-100 text-sm md:text-base btn-sm md:btn-md btn-ghost shadow pl-1">
    {handleSetIcon($theme)}
  </div>
  <ul class="shadow menu dropdown-content bg-base-200 rounded-box w-44 p-3">
    {#each theme_data as theme}
      <li data-theme={theme.theme}>
        <button
          class="inline btn btn-sm btn-primary text-white text-left rounded-full lowercase"
          on:click={() => handleChangeTheme(theme.theme)}>
          {theme.icon}
          {theme.theme}
        </button>
      </li>
    {/each}
  </ul>
</div>

<div class="flex flex-col justify-center items-center h-screen w-full bg-primary bg-opacity-80">
  <div
    class="fixed z-0 font-bold text-max text-primary opacity-20 transform rotate-45 sm:rotate-12 overflow-clip"
    style="font-size: 900px">
    Qin
  </div>

  <div class="fixed z-10 card w-10/12 sm:w-8/12 md:w-5/12 bg-base-content shadow-xl">
    <div class="w-full flex cursor-pointer bg-base-content">
      <div class={tab ? 'tab-base' : 'tab-active'} on:click={() => handleToggleTab(false)}>視聴者</div>
      <div class={!tab ? 'tab-base' : 'tab-active'} on:click={() => handleToggleTab(true)}>管理者</div>
    </div>

    <div class="p-10 pb-5">
      {#await promise}
        <div class="p-3 pl-4 w-full rounded-lg bg-base-100 text-primary animate-pulse">イベントを取得中...</div>
      {:then result}
        <select
          class="select select-bordered select-primary w-full shadow-sm text-base-300"
          bind:value={select_event}
          on:select={handleSelectEvent}>
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
          on:click={() => handleSignin(false)}>参加する</button>
        <button
          class="btn btn-primary"
          class:shadow={password !== 'miyasanismiya3' ? false : true}
          class:hidden={!tab}
          disabled={select_event !== '' && password === 'miyasanismiya3' ? false : true}
          on:click={() => handleSignin(true)}>主催する</button>
      </div>
    </div>
  </div>
</div>

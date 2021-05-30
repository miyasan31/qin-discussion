<script type="ts">
import { TextInput } from '../components';
import { admin, name, event_name } from '../store';

let tab: boolean = true;
let error: boolean = false;
let userName: string = '';
let password: string = '';
let select_event: string = '20210530';
const events = [
  { id: '0', title: 'イベントを選択してください', date: '' },
  { id: '1', title: 'しまぶー×じゃけぇ　起業家対談', date: '20210508' },
  { id: '2', title: 'エンジニア採用面接官の経験者によるパネルディスカッション', date: '20210530' },
];

const handleTabYet = () => {
  tab = true;
};
const handleTabFin = () => {
  tab = false;
};

const handleSelect = (e) => {
  select_event = e.target.value;
};

const handleJoin = () => {
  event_name.update((store_event_name) => (store_event_name = select_event));

  if (userName === '') {
    name.update((store_name) => (store_name = '匿名さん'));
  } else {
    name.update((store_name) => (store_name = userName));
  }
};
const handleAdmin = () => {
  event_name.update((store_event_name) => (store_event_name = select_event));

  if (password === 'miyasanismiya3') {
    name.update((store_name) => (store_name = '管理者'));
    admin.update((store_admin) => (store_admin = true));
  } else {
    error = true;
  }
};
</script>

{#if $name !== '' || $admin}
  <slot />
{:else}
  <div class="flex flex-col justify-center items-center h-screen w-full bg-primary bg-opacity-70">
    <div class="card w-10/12 sm:w-8/12 md:w-5/12 bg-gray-100 shadow-xl">
      <div class="w-full flex cursor-pointer bg-white">
        <div class="tab-base" class:tab-active={tab} on:click={handleTabYet}>視聴者</div>
        <div class="tab-base" class:tab-active={!tab} on:click={handleTabFin}>管理者</div>
      </div>

      <div class="p-10 pb-5">
        <select
          autofocus
          class="select select-bordered select-primary w-full"
          bind:value={select_event}
          on:select={handleSelect}>
          <!-- {#each events as event}
            <option id={event.id} value={event.date}>{event.title}</option>
            {/each} -->
          <!-- <option class="hidden" value="" disabled selected>イベントを選択してください</option> -->
          <option value="20210508">しまぶー×じゃけぇ　起業家対談</option>
          <option value="20210530" selected>エンジニア採用面接官の経験者によるパネルディスカッション</option>
        </select>
      </div>

      <div class="p-10 pt-0">
        {#if tab}
          <TextInput bind:value={userName} type="name" />
          <div class="flex">
            <div class="flex-grow" />
            <button class="btn btn-primary ml-2 mt-5" on:click={handleJoin}>参加する</button>
          </div>
        {:else}
          <TextInput bind:value={password} type="password" bind:error />
          <div class="flex">
            <div class="flex-grow" />
            <button
              class="btn btn-primary ml-2 mt-5"
              disabled={password === 'miyasanismiya3' ? false : true}
              on:click={handleAdmin}>主催する</button>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

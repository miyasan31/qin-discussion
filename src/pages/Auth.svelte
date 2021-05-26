<script type="ts">
import { TextInput } from '../components';
import { admin, name } from '../store';

let tab: boolean = true;
let error: boolean = false;
let userName: string = '';
let password: string = '';

const handleTabYet = () => {
  tab = true;
};
const handleTabFin = () => {
  tab = false;
};

const handleJoin = () => {
  if (userName === '') {
    $name = '匿名さん';
  } else {
    $name = userName;
  }
};
const handleAdmin = () => {
  if (password === 'miyasanismiya3') {
    $name = '管理者';
    $admin = true;
  } else {
    error = true;
  }
};
</script>

{#if $name !== '' || $admin}
  <slot />
{:else}
  <div class="flex justify-center items-center h-screen w-full bg-green-100">
    <div class="card w-10/12 sm:w-8/12 md:w-5/12 bg-gray-100 shadow-xl">
      <div class="w-full flex cursor-pointer bg-white">
        <div class="tab-base" class:tab-active={tab} on:click={handleTabYet}>視聴者</div>
        <div class="tab-base" class:tab-active={!tab} on:click={handleTabFin}>管理者</div>
      </div>
      <div class="p-10">
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

<script lang="ts">
import { onMount, beforeUpdate } from 'svelte';
import { Link } from 'svelte-routing';
import { toast } from '@zerodevx/svelte-toast';
import { fly } from 'svelte/transition';
import { NotFound } from '../pages';
import { AdminNav, TextInput, PhoneMock, Toast } from '../components';
import { admin, thread } from '../store';
import { db } from '../firebase/firebase';

let error: boolean = false;
let title: string = '';
let check_title: string = '';
let event_date: string = '';
let check_event_date: string = '';

const getNowYMD = (date) => {
  const newFormat = date.replace(/-/g, '');
  return newFormat;
};

const handleCheck = () => {
  check_title = title.trim();
  check_event_date = getNowYMD(event_date);
};

const handleAdd = async () => {
  await db
    .collection('qin-salon')
    .doc(check_event_date)
    .set({
      eid: check_event_date,
      event_title: check_title,
    })
    .then(() => {
      toast.push(`
        <div class="flex items-center justify-center">
          <div class="flex-auto flex items-center mr-2 text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="font-semibold">イベントを追加しました</div>
          </div>
        </div>
      `);
      handleAllClear();
    })
    .catch(() => {
      toast.push(`
        <div class="flex items-center justify-center">
          <div class="flex-auto flex items-center mr-2 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="font-semibold">エラーが起きました</div>
          </div>
        </div>
      `);
      handleAllClear();
    });
};

const handleClear1 = () => {
  title = '';
  event_date = '';
};
const handleClear2 = () => {
  check_title = '';
  check_event_date = '';
};
const handleAllClear = () => {
  title = '';
  event_date = '';
  check_title = '';
  check_event_date = '';
};

function formatDate(dt) {
  const y = dt.getFullYear();
  const m = ('00' + (dt.getMonth() + 1)).slice(-2);
  const d = ('00' + dt.getDate()).slice(-2);
  return parseInt(y + m + d, 10);
}
beforeUpdate(() => {
  if (event_date !== '') {
    const date_err = formatDate(new Date()) > getNowYMD(event_date);
    if (date_err) {
      error = true;
    } else {
      error = false;
    }
  }
});
onMount(
  async (): Promise<void> => {
    thread.update((store_thread) => (store_thread = false));
  }
);
</script>

{#if $admin}
  <section class="w-full bg-white">
    <div class="md:hidden absolute top-14 md:top-16 pt-3 pl-4">
      <Link to="/">
        <button class="btn btn-primary btn-sm mr-2">一覧へ戻る</button>
      </Link>
    </div>
    <div class="flex">
      <div class="flex justify-evenly items-center main-height w-full m-0">
        <PhoneMock>
          {#if check_title === ''}
            <div class="px-8" in:fly={{ y: 100, duration: 500 }}>
              <span class="flex justify-center items-center text-2xl font-semibold text-center"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7 mr-1 -ml-3 text-secondary"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clip-rule="evenodd" />
                </svg>Qin Salon</span>

              <div class="w-full mt-5">
                <TextInput
                  text_type="input"
                  type="text"
                  color="secondary"
                  placeholder="イベント名を入力"
                  bind:value={title}
                  error={false} />
              </div>

              <div class="w-full mt-3">
                <TextInput
                  text_type="input"
                  type="date"
                  color="secondary"
                  placeholder="イベント名を入力"
                  bind:value={event_date}
                  bind:error />
              </div>

              <div class="flex flex-col gap-3 mt-3">
                <button
                  class="btn btn-secondary btn-wide shadow"
                  disabled={!error && title.trim() !== '' && event_date !== '' ? false : true}
                  on:click={handleCheck}>確認</button>
                <button class="btn btn-natural btn-wide shadow" on:click={handleClear1}>クリア</button>
              </div>
            </div>
          {:else}
            <div class="px-8 py-10 w-full overflow-scroll overflow-x-hidden" in:fly={{ y: 100, duration: 500 }}>
              <span class="flex justify-center items-center text-2xl font-semibold text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7 mr-1 -ml-3 text-secondary"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clip-rule="evenodd" />
                </svg>Qin Salon
              </span>

              <div class="mt-5">
                <div class="text-accent text-lg font-semibold text-center pb-4">この内容で追加しますか？</div>

                <span class="text-gray-500 text-sm">イベント名</span>
                <p class="chat-msg pl-1 text-xl font-semibold whitespace-pre-line">{title}</p>

                <span class="text-gray-500 text-sm">開催日</span>
                <p class="pl-1 text-xl font-semibold">{event_date}</p>
              </div>

              <div class="flex flex-col gap-3">
                <button class="btn btn-primary btn-wide shadow" on:click={handleAdd}>追加</button>
                <button class="btn btn-natural btn-wide shadow" on:click={handleClear2}>取消</button>
              </div>
            </div>
          {/if}

          <Toast />
        </PhoneMock>
      </div>
      <AdminNav nav="event" />
    </div>
  </section>
{:else}
  <NotFound />
{/if}

<div class="flex">
  <div><strong>登録完了</strong></div>
  <div>
    <div>イベント名：${check_title}</div>
    <div>開催日：${check_event_date}</div>
  </div>
</div>

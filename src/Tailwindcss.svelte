<style global lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.tab-base {
  @apply flex-1 py-2 md:py-2.5 text-center text-base md:text-lg text-base-300 text-opacity-50 border-b border-base-200;
}
.tab-active {
  @apply flex-1 py-2 md:py-2.5 text-center md:text-lg font-bold border-b-2 border-primary text-base-300;
}
.title-list {
  @apply py-4 md:py-5 px-6 sm:px-8 md:px-10 lg:px-14 text-xl md:text-2xl font-bold text-base-300 bg-base-100 border-b border-base-200 hover:shadow-md  hover:bg-base-300 hover:bg-opacity-10 whitespace-pre-line;
}
.border-t-opacity-0 {
  border-top: 1px solid #00000000;
}
</style>

<!-- @applyがエラー起きるので仮置き -->

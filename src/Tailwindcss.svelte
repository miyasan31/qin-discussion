<style global lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.tab-base {
  @apply flex-1 py-2 md:py-2.5 text-center text-base md:text-lg text-gray-400;
  border-bottom: 1px solid #00000022;
}
.tab-active {
  @apply flex-1 py-2 md:py-2.5 text-center md:text-lg font-bold border-b-2 border-primary-focus text-gray-700;
}
.title-list {
  @apply py-4 md:py-5 px-6 sm:px-8 md:px-10 lg:px-14 text-xl md:text-2xl font-bold hover:shadow-md hover:bg-gray-100 whitespace-pre-line;
  border-bottom: 1px solid #00000022;
}
</style>

<!-- @applyがエラー起きるので仮置き -->

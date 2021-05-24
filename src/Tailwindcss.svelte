<style global lang="postcss">
@tailwind base;
@tailwind components;
.tab-base {
  @apply flex-1 py-2.5  box-border text-center text-lg text-gray-400;
  border-bottom: 1px solid #00000022;
}
.tab-active {
  @apply font-bold border-b-2 border-primary-focus text-gray-700;
}
.title-list {
  @apply py-5 px-10 text-2xl font-bold hover:bg-gray-100;
  border-bottom: 1px solid #00000022;
}
.error-input {
  @apply bg-red-200;
}
@tailwind utilities;
</style>

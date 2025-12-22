<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)

const isActive = (path: string) => route.path === path
const toggle = () => (isOpen.value = !isOpen.value)
const close = () => (isOpen.value = false)
</script>

<template>
  <div class="fixed top-0 z-40 flex h-10 w-full items-center justify-between md:h-[62px] md:px-3">
    <div class="mx-2.5 my-[5px] w-[65px] md:w-[95px]">
      <img src="/assets/images/local-election-logo.png" alt="" />
    </div>
    <!-- Desktop -->
    <div class="hidden md:flex">
      <NuxtLink
        to="/?restart=1"
        class="b7 px-2.5 underline-offset-4"
        :class="{ underline: isActive('/') }"
      >
        Home
      </NuxtLink>

      <NuxtLink
        to="/about"
        class="b7 px-2.5 underline-offset-4"
        :class="{ underline: isActive('/about') }"
      >
        About
      </NuxtLink>
    </div>

    <!-- Mobile -->
    <div class="md:hidden">
      <button
        :class="`flex h-10 w-8 items-center justify-center transition duration-200 ${isOpen ? 'bg-black' : 'bg-transparent'}`"
        @click="toggle"
      >
        <img v-if="!isOpen" src="/assets/images/hbg-menu.svg" alt="" />
        <img v-else src="/assets/images/white-close.svg" alt="" />
      </button>

      <!-- Dropdown -->
      <div v-if="isOpen" class="absolute right-0 w-[200px] bg-black text-white">
        <NuxtLink
          to="/?restart=1"
          class="b7 flex h-[60px] items-center justify-center"
          :class="{ underline: isActive('/') }"
          @click="close"
        >
          Home
        </NuxtLink>

        <NuxtLink
          to="/about"
          class="b7 flex h-[60px] items-center justify-center"
          :class="{ underline: isActive('/about') }"
          @click="close"
        >
          About
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

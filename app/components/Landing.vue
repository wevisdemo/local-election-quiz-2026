<script setup lang="ts">
import Button from './Button.vue'

const emit = defineEmits<{
  (e: 'start'): void
}>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <div class="leading-7 font-bold">
      <h6>เช็กความพร้อม</h6>
      <h3 class="relative z-20 -translate-y-0.5">ซ้อมความเป๊ะ</h3>
      <div class="flex items-center gap-2.5">
        <h6 class="relative z-20 md:mr-1">ก่อนออกไปเลือกตั้ง</h6>
        <div class="relative">
          <h4 class="relative z-20">อบต.</h4>
          <div
            class="absolute top-1/2 left-1/2 z-10 h-20 w-20 flex-none -translate-x-1/2 -translate-y-1/2 md:h-[120px] md:w-[120px]"
          >
            <img class="h-full w-full" src="/assets/images/yellow-circle.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[500px] py-10">
      <img src="/gifs/landing.gif" alt="" />
    </div>

    <p class="b5 pb-1.5 font-bold">
      11 มกรา เลือกตั้ง อบต. <br class="md:hidden" />
      คุณพร้อมแล้วแค่ไหน?
    </p>
    <p class="b6 pb-2 font-medium">
      มา Fit Check ✌️ ความพร้อมความเป๊ะ <br />
      ก่อนออกจากบ้านไปเข้าคูหากันหน่อย!
    </p>

    <Button text="เริ่มเล่น Quiz" @click="emit('start')" />
  </div>
</template>

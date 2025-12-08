<script setup lang="ts">
import Button from './Button.vue'

const emit = defineEmits<{
  (e: 'start'): void
}>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <div class="font-bold">
      <p class="h8">เช็กความพร้อม</p>
      <h5 class="relative z-20">ซ้อมความเป๊ะ</h5>
      <div class="flex items-center gap-2.5">
        <p class="h8 relative z-20">ก่อนออกไปเลือกตั้ง</p>
        <div class="relative">
          <h6 class="relative z-20">อบต.</h6>
          <div
            class="absolute top-1/2 left-1/2 z-10 h-[70px] w-[70px] flex-none -translate-x-1/2 -translate-y-1/2"
          >
            <img class="h-full w-full" src="/assets/images/yellow-circle.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="py-10">
      <img src="/assets/images/mock-landing-image.png" alt="" />
    </div>

    <p class="b5 pb-1.5 font-bold">
      11 มกรา เลือกตั้ง อบต. <br />
      คุณพร้อมแล้วแค่ไหน?
    </p>
    <p class="b6 pb-2 font-medium">
      มา Fit Check ✌️ ความพร้อมความเป๊ะ <br />
      ก่อนออกจากบ้านไปเข้าคูหากันหน่อย!
    </p>

    <Button text="เริ่มเล่น Quiz" @click="emit('start')" />
  </div>
</template>

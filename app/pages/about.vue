<script setup lang="ts">
import WvButton from '@wevisdemo/ui/vue/button'
import WvButtonGroup from '@wevisdemo/ui/vue/button-group'
import WvContainer from '@wevisdemo/ui/vue/container'
import WvParagraphGroup from '@wevisdemo/ui/vue/paragraph-group'
import WvSharer from '@wevisdemo/ui/vue/sharer'
import '@wevisdemo/ui/styles/button-group.css'
import '@wevisdemo/ui/styles/button.css'
import '@wevisdemo/ui/styles/container.css'
import '@wevisdemo/ui/styles/paragraph-group.css'
import '@wevisdemo/ui/styles/sharer.css'
</script>

<template>
  <div class="px-3">
    <WvContainer heading="เกี่ยวกับโครงการ">
      <WvParagraphGroup heading="เป้าหมาย">
        <p>
          11 มกรา 2569 เตรียมตบเท้าออกจากบ้านไปเลือกตั้ง อบต. แล้วคุณพร้อมแล้วแค่ไหน?
          <br /><br />
          ในเมื่อเราต้อง fit check ✌️ เพื่อให้แน่ใจว่าเรา 'เป๊ะ' พร้อมออกจากบ้าน
          สำหรับการเลือกตั้งที่จะมาถึง
          <span class="whitespace-nowrap">เราก็ต้อง check </span>ความเข้าใจเกี่ยวกับ
          <b>อบต. และการเลือกตั้ง อบต.</b> เพื่อให้แน่ใจว่าเรา 'เป๊ะ'
          <span class="whitespace-nowrap">พร้อมไปเข้าคูหาแล้ว!</span> <br /><br />
          WeVis ขอชวนทุกคนมา "เช็คความพร้อม" ด้วยเกมตอบคำถาม 10 ข้อว่าด้วยความรู้เบื้องต้นเกี่ยวกับ
          อบต. และการเลือกตั้ง อบต. เพื่อ "ซ้อมความเป๊ะ"
          ก่อนออกไปเลือกตั้งผู้แทนที่จะมาพัฒนาชุมชนของเราตลอดวาระ 4 ปีนับจากนี้
          <br /><br />
          🗳️ 11 มกรา กลับบ้านไปเลือกตั้ง อบต. ออกไปใช้สิทธิ เพื่อคุณภาพชีวิตที่ดีกว่าเดิม
        </p>
      </WvParagraphGroup>
      <WvParagraphGroup heading="ที่มาของข้อมูล">
        <ul class="list-disc pl-[2ch]">
          <li>
            <a
              href="https://gcc.go.th/2025/12/01/%E0%B9%80%E0%B8%A5%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%AD%E0%B8%9A%E0%B8%9511%E0%B8%A1%E0%B8%8469/"
              target="_blank"
              rel="noopener noreferrer"
              >ความรู้ทั่วไปเกี่ยวกับ อบต. และการเลือกตั้งอบต.</a
            >
            เรียบเรียงโดย ศูนย์บริการข้อมูลภาครัฐเพื่อประชาชน
          </li>
          <li>
            <a
              href="https://www.senate.go.th/assets/portals/28/fileups/146/files/%E0%B8%AA%E0%B8%A0%E0%B8%B2%E0%B8%95%E0%B8%B3%E0%B8%9A%E0%B8%A5.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              พ.ร.บ. สภาตำบลและองค์การบริหารส่วนตำบล พ.ศ. 2537</a
            >
          </li>
          <li>
            บทความ
            <a
              href="https://theactive.thaipbs.or.th/data/get-to-know-subdistrict-administrative-organization-and-municipal-district"
              target="_blank"
              rel="noopener noreferrer"
            >
              ความแตกต่างระหว่าง อบต. และเทศบาลตำบล
            </a>
            โดย The Active
          </li>
        </ul>
      </WvParagraphGroup>
      <WvParagraphGroup heading="นโยบายการนำข้อมูลไปใช้ต่อ">
        <p>
          ทางทีมมีความตั้งใจที่พัฒนาทุกโปรเจ็กต์ให้เป็น Open Source และเปิดข้อมูลเป็น Open Data
          <span class="whitespace-nowrap">ภายใต้เงื่อนไข</span> Creative Commons
          Attribution-ShareAlike License คือสามารถนำไปเผยแพร่และดัดแปลงได้ โดยต้องระบุที่มา
          แต่ห้ามนำไปใช้เพื่อการค้า และต้องเผยแพร่งานดัดแปลงโดยใช้สัญญาอนุญาตชนิดเดียวกัน
          หากมีข้อสงสัยต้องการสอบถามเพิ่มเติม
          ประสงค์แจ้งเปลี่ยนแปลงหรือเพิ่มเติมข้อมูลเพื่อความถูกต้อง หรือมีข้อเสนอแนะใดๆ
          สามารถติดต่อได้ที่
          <a href="mailto:team@wevis.info" target="_blank" rel="noopener noreferrer"
            >team@wevis.info</a
          > 
        </p>
      </WvParagraphGroup>
      <WvParagraphGroup heading="อาสาสมัครร่วมพัฒนา">
        <WvParagraphGroup small heading="เขียนโปรแกรม">
          <p>ณอนงค์ สำเร็จวิทย์</p>
        </WvParagraphGroup>
        <WvParagraphGroup small heading="ออกแบบ">
          <p>ชินธิป เอกก้านตรง</p>
        </WvParagraphGroup>
        <WvParagraphGroup small heading="สืบค้นและรวบรวมข้อมูล">
          <p>ณภัทร แต้เถา</p>
        </WvParagraphGroup>
        <WvParagraphGroup small heading="บรรณาธิการ">
          <p>ธนิสรา เรืองเดช</p>
        </WvParagraphGroup>
        <WvParagraphGroup small heading="ประสานงานและจัดการอื่น ๆ">
          <p>
            <a
              class="text-[#3904e9] hover:underline"
              href="https://wevis.info/"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              WeVis
            </a>
          </p>
        </WvParagraphGroup>
      </WvParagraphGroup>

      <WvParagraphGroup heading="หมายเหตุ">
        <p>
          WeVis ได้รับการสนับสนุนทุนในการดำเนินงานจาก 
          <a href="https://www.ned.org/" target="_blank" rel="noopener noreferrer">
            National Endowment for Democracy (NED) </a
          ><span class="whitespace-nowrap">ซึ่งนำมาใช้</span>เป็นต้นทุนในการรวมรวมข้อมูล ออกแบบ
          พัฒนาเว็บไซต์ ประสานงาน บริหารจัดการ
          <span class="whitespace-nowrap">ตลอดจนการจัดประชุม</span>เพื่อดำเนินโครงการ
        </p>
      </WvParagraphGroup>

      <WvButtonGroup center>
        <WvButton>
          <img
            width="30"
            src="data:image/png;base64,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"
            alt=""
          />
          <span>Feedback</span>
        </WvButton>
      </WvButtonGroup>
      <WvSharer center />
    </WvContainer>
  </div>
</template>

<style scoped>
a {
  text-decoration: underline;
}
</style>

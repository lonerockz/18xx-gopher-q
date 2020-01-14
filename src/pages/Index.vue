<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      myData: 'test'
    }
  },
  created () {
    console.log('this.myData :', this.myData)
  }
}
</script>

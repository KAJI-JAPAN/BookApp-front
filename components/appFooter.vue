<template>
  <v-footer
    dark
  >
        &copy; {{ copyRightYear }}
       <div> {{ appName }} </div>
  </v-footer>
</template>
<script>
export default {
  data ({ $config: { appName } }) {
    return {
      appName
    }
  },

  computed: {
    copyRightYear () {
      const beginningYear = 2020
      const thisYear = new Date().getFullYear()
      return (beginningYear < thisYear) ? `${beginningYear} - ${thisYear}` : beginningYear
    }
  }
}
</script>

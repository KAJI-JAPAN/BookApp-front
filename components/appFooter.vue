<template>
  <v-footer class="justify-center">
    <div class="text-center text-body-2">
      <v-card-text>
        <v-chip disabled>
          管理者
        </v-chip>
        <v-chip
          class="ma-2"
          color="primary"
          outlined
          pill
          href="https://twitter.com/home"
          target="_blank"
        >
          @HalationHm
          <v-icon right>
            mdi-twitter
          </v-icon>
        </v-chip>
      </v-card-text>
      &copy;{{ copyRightYear }}
      KOUDOKU
    </div>
  </v-footer>
</template>
<script>
export default {
  computed: {
    copyRightYear () {
      const beginningYear = 2021
      const thisYear = new Date().getFullYear()
      return (beginningYear < thisYear) ? `${beginningYear} - ${thisYear}` : beginningYear
    }
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        elevation="1"
        v-bind="attrs"
        class="ma-3"
        v-on="on"
      >
        削除する
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        本当に削除しますか?
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error"
          text
          @click="deleteBook"
        >
          削除する
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="dialog = false"
        >
          やめる
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
  },
  methods: {
    // 書籍を削除する
    deleteBook () {
      this.$store.dispatch('book/delete')
      this.dialog = false
      this.$router.push('/registeredBook')
    }
  }
}
</script>

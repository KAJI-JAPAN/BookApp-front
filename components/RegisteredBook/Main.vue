<template>
  <v-container class="back">
    <div
      v-if="books.length === 0"
      class="text-center"
    >
      <p> {{ "登録している書籍はありません" }} </p>
    </div>
  </v-container>
</template>
<script>
export default {
  computed: {
    books () {
      return this.$store.state.books
    }
  },

  methods: {
  }
}
</script>
<style scoped>
  .back {
    background-color: #E8F5E9;
  }
</style>

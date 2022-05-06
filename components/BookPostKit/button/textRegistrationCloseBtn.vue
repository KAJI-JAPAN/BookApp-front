<template>
  <div class="text-center">
    <v-btn
      small
      color="primary"
      outlined
      class="mt-10"
      @click="hiddenAction"
    >
      <v-icon dark>
        mdi-minus
      </v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  computed: {
    hidden () {
      return this.$store.state.todos.hidden
    }
  },

  methods: {
    hiddenAction () {
      this.$store.commit('todos/switching')
    }
  }
}
</script>

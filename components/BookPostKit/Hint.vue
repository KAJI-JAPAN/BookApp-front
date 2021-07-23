<template>
  <div class="text-right">
    <v-dialog
      v-model="dialog"
      max-width="700"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          icon
          small
          v-on="on"
        >
          <v-icon color="yellow darken-1">
            mdi-lightbulb-on-outline
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-toolbar
          dark
          color="success"
        >
          <v-toolbar-title>
            <v-icon
              color="yellow"
              class="pb-1"
            >
              mdi-lightbulb
            </v-icon>
            本を読んだ後のアクションを登録しましょう。
          </v-toolbar-title>
        </v-toolbar>

        <v-list-item
          v-for="(hintText, index) in hintTexts"
          :key="index"
          three-line
        >
          <v-list-item-content>
            <v-list-item-title class="ma-3">
              {{ hintText.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="pl-2">
              {{ hintText.text }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            OK!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      hintTexts: [
        {
          title: '1. 本から得られた知識を確認しましょう',
          text: '今回読んだ本からどんな知識が得られたでしょうか？具体的な行動に落とし込みましょう'
        },
        {
          title: '2. いつ行うか決めましょう',
          text: '習慣にするには週４日以上続けることが効果的とされています。毎日同じ時間に行うことが理想です'
        },
        {
          title: '3. 無理のない範囲で行動しよう',
          text: '一度に多くのことを行おうとすると失敗します。登録できるアクションは３つまでです。何を行動に移すかじっくりと考えましょう'
        }
      ]
    }
  }
}
</script>

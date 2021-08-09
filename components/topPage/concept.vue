<template>
  <div class="concept">
    <h1 class="text-center">
      {{ APP_NAME }}のコンセプト
    </h1>
    <div class="text-center ma-7">
      <p>{{ APP_NAME }}はユーザーのアクションリーディングをサポートするアプリです。</p>
      <p>アクションリーディングとは読書で得た知識を行動に移す、目的と行動を意識した読書の事です。</p>
      <p>本は読むだけではなく行動して初めて最大の効果が発揮されます。{{ APP_NAME }}は読書から行動への習慣化サポートを行います。</p>
    </div>
  </div>
</template>
<script>
export default {
  data ({ $config: { APP_NAME } }) {
    return {
      APP_NAME
    }
  }
}
</script>
<style lang="scss">
  .cncept {
    p {
      color: gray;
    }
  }
</style>

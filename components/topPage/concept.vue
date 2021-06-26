<template>
  <div class="concept">
    <h1 class="text-center ma-5">
      {{ APP_NAME }}のコンセプト
    </h1>
    <p class="text-center ma-7">
      {{ APP_NAME }}はユーザーのアクションリーディングをサポートするアプリです。<br>
      アクションリーディングとは読書で得た知識を行動に移す、目的と行動を意識した読書の事です。<br>
      本は読むだけではなく行動して初めて最大の効果が発揮されます。{{ APP_NAME }}は読書から行動への習慣化サポートを行います。
    </p>
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

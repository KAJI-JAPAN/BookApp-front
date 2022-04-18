<template>
  <v-app>
    <div class="back">
      <AlertSuccess>
        ログインしました
      </AlertSuccess>
      <div class="user-image-read">
        <v-img
          :src="require('@/assets/images/user-home.png')"
          width="250px"
        />
      </div>
      <div class="user-image-book">
        <v-img
          :src="require('@/assets/images/user-home-2.png')"
        />
      </div>
    </div>
    <div class="service">
      <h3 class="service-title">
        {{ APP_NAME }}のサービス
      </h3>
      <div class="service-content">
        <v-row>
          <v-col v-for="(item, index) in service" :key="index" class="ma-5">
            <nuxt-link :to="item.url" class="link">
              <v-card class="pa-2 ma-2 link">
                <v-card-title>{{ item.title }}</v-card-title>
                <v-icon
                  x-large
                  :color="item.color"
                  class="pa-3"
                >
                  {{ item.icon }}
                </v-icon>
              </v-card>
            </nuxt-link>
          </v-col>
        </v-row>
      </div>
      <v-divider class="mb-5" />
    </div>
    <div>
      <v-sheet
        class="rounded-xl pa-15 ma-auto"
        max-width="1200px"
      >
        <v-row justify="center" class="ma-10 pa-10">
          <h1 class="not-public">
            Coming Soon...
          </h1>
        </v-row>
      </v-sheet>
    </div>
  </v-app>
</template>
<script>
export default {
  data ({ $config: { APP_NAME } }) {
    return {
      APP_NAME,
      service: [
        { title: '書籍と行動を登録', icon: 'mdi-book-search-outline', color: 'orange darken-2', url: '/search' },
        { title: 'スケジュールを確認', icon: 'mdi-calendar', color: 'blue-grey', url: '/schedule' },
        { title: '書籍一覧', icon: 'mdi-bookshelf', color: 'green darken-2', url: '/registeredBook' }
      ]
    }
  },

  mounted () {
    const loginFlag = JSON.parse(localStorage.getItem('loginFlag'))
    if (loginFlag) {
      this.$store.commit('alertSwitchSuccess', true)
      setTimeout(() => {
        this.$store.commit('alertSwitchSuccess', false)
        localStorage.removeItem('loginFlag')
      }, 2000)
    }
  }
}
</script>
<style lang="scss" scoped>
  .back {
    background: rgb(145, 145, 253);
    height: 40%;
    position: relative;

    .user-image-read {
      top: 10%;
      position: absolute;
    }

    .user-image-book {
      left: 80%;
      top: 50%;
      width: 20%;
      position: absolute
    }
  }
  .service {
    position: absolute;
    width: 70%;
    margin: auto;
    transform: translate(-50%, -50%);
    top: 35%;
    left: 50%;
    .service-title {
      color: white;
      margin-bottom: 20px;
      letter-spacing: 3px;
    }
    .service-content {
      text-align: center;
      .link {
        .link:link, .link:visited, .link:active {
          text-decoration: none;
          color: rgb(56, 55, 55);
        }
        .link:hover {
          background: rgb(231, 229, 229);
        }
      }
    }
  }
    .not-public {
      color: rgb(197, 194, 194);
    }
</style>

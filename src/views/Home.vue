<template>
  <div class="home">
    <img alt="Logo" src="../assets/bangumi_logo.png">
    <h1>嵐にしやがれ美食地图</h1>
    <el-button type="primary" @click="goToMap">进入</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  methods: {
      goToMap() {
          this.$router.push('map')
      },
  }
}

</script>

<style scoped>
    .home {
        height: 100vh;
    }
    img {
        max-width: 95%;
    }
</style>

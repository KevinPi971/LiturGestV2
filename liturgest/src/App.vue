<template>
  <div class="allPageContainer">
    <ribbon-nav
      v-model="activeIndex"
      @select ="changeNav"
    >
    </ribbon-nav>
  
    <router-view />
  </div>
</template>

<script>
import RibbonNav from './components/Ribbon.vue'
export default {
  name: 'App',
  components: {
    RibbonNav
  },
  data() {
    return {
      activeIndex: "home",
      route:"/"
    }
  },
  methods:{
    changeNav(e){
      console.log(e)
      this.route = "/";
      if(e !== "home"){
        this.route += e;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bodyAllPage{
  margin: 0;
}
.allPageContainer{
}
</style>

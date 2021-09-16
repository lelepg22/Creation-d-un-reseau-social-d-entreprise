<template>
  
  
  
    <HelloWorld msg=""/>
    <router-view></router-view>
  


</template>

<script>
import logo from "./assets/logo/icon-left-font-monochrome-black.png"
import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    HelloWorld
  },
   mounted(){
    

            
            
        },
      data: function() {
        return{
           logo:logo
        }
      }
}
</script>

<style scoped lang="scss">
body{
    margin: 0;
}
li{
      line-height: 6rem;
    border: solid 2px;
    box-shadow: 5px 5px 15px 5px #000000;
    cursor: pointer;
    list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}




</style>

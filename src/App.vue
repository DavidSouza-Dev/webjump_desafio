<template>
  <div id="app">
    <cabecalho></cabecalho>
    <router-view></router-view>
    <rodape></rodape>
  </div>
</template>

<script>
import cabecalho from './components/header.components';
import rodape from './components/footer.components';
//import home from './pages/home.pages';
export default {
  name: 'app',
  components:{
    cabecalho,
    rodape
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1100px;
  margin: auto ;
  //margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  text-decoration: none;
  margin: 0 10px;
}

a {
  color: white;
  text-decoration: none;
  
}
</style>

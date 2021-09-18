<template>
  <header>
    {{ isItConnected() }}
    <div class="header">
      <router-link to="/login"
        ><img
          class="login_logo"
          alt="Logo Groupomania"
          src="../assets/logo/icon-left-font-monochrome-black.svg"
      /></router-link>
      <div class="header-right">
        <router-link to="/profile"
          ><button class="active">Mon Profil</button></router-link
        >
        <a tabindex="-1" href="http://localhost:8080/"
          ><button v-on:keyup.enter="disconnect" @click="disconnect">Déconnecter</button></a
        >
      </div>
    </div>
  </header>
  
  <h2 class="login_accueil">
    Bienvenue <span class="utili_nom"> {{ utili }} </span> sur le Forum
    Groupomania
  </h2>
  <Mod />

  <Forum />

  <Post />
  
</template>
<script>
import { mapState } from "vuex";
import Forum from "@/components/Forum.vue";
import Post from "@/components/Post.vue";
import Mod from "@/components/Mod.vue"

export default {
  name: "Login",
  data() {
    return { utilisateurLogged: localStorage.utilisateur };
  },
  components: {
    Forum,
    Post,
    Mod
  },
  computed: {
    ...mapState({
      utili: "utilisateur",
      mail: "email",
    }),
  },
  methods: {
    isItConnected() {     
      if (localStorage.connected == "true") {
        return console.log("User connected");
      }
      alert("Vous n'êtes pas connecté ");
      return this.$router.go(-1);
    },
    disconnect() {
      localStorage.clear();
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 720px) and (max-width: 1367px) {
} //tablet media screen
@media screen and (min-width: 320px) and (max-width: 719px) {
  .header-right {
    display: flex;
    justify-content: space-around;
    float: unset !important;
  }
  .login_logo {
    width: 56% !important;
    top: 1.5% !important;
  }
  .login_accueil {
    display: none !important;
  }
  .header {
    margin-top: 0.7% !important;
  }
}
</style>
<style scoped lang="scss">
#mod {
  display: none;
}

// cellphone media
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  margin: 0;
}
#app {
  margin: 0;
}
.login_logo {
  width: 10%;
  position: absolute;
  left: 2%;
  top: 3.5%;
}
.login_accueil {
  margin-top: 1%;
  margin-bottom: 1.5%;
  font-size: 1.4rem;
  text-align: center;
}
li {
  line-height: 6rem;
  border: solid 2px;
  box-shadow: 5px 5px 15px 5px #000000;
  cursor: pointer;
  list-style: none;
}
.utili_nom {
  color: #6b0200;
  text-decoration: underline;
  text-transform: capitalize;
  font-size: 1.7rem;
}
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
  margin-top: -3.3%;
}

.header button {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

.header button.logo {
  font-size: 25px;
  font-weight: bold;
}

.header button:hover {
  transition: background-color 400ms, box-shadow 350ms;
  &:hover {
    background-color: black;
    color: white;
  }
}

/* Style the active/current link*/
.header button.active {
  background-color: #6b0200;
  color: white;
}

/* Float the link section to the right */
.header-right {
  float: right;
}

/* Add media queries for responsiveness - when the screen is 500px wide or less, stack the links on top of each other */
@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
  .header-right {
    float: none;
  }
}
</style>

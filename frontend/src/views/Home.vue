<template>
  <div id="tout2">
    {{ routerGo() }}
    <a href="http://localhost:8080/">
      <img
        id="logoentree2"
        alt="Logo Groupomania"
        src="../assets/logo/icon-left-font-monochrome-black.svg"
      />
    </a>
    <h1>Social Network</h1>
    <div class="hello2">
      <p>
        <a tabindex="0" class="linkci" id="linkconnexion" v-on:keyup.enter="animation()" @click="animation()">Connexion</a>
      </p>

      <p>
        <router-link
          to="/form"
          class="linkci"
          id="linkinscription"
          rel="noopener"
          >Inscription</router-link
        >
      </p>
      <div id="formConnect">
        <i class="fas fa-envelope"></i>
        <input
          type="text"
          aria-label="Email"
          name="Email"
          id="email"
          placeholder="Email"
          required
          v-model="email"
        />

        <br />
        <i class="fas fa-unlock-alt"></i>
        <input
          aria-label="password"
          type="password"
          name="Mot de Passe"
          id="motdepasse"
          placeholder="Mot de passe"
          required
          v-model="password"
        />
        <br />
        <button id="connectButton" @click="getConnect()">Connecter</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  components: {},
  methods: {
    animation() {
      document.getElementById("linkconnexion").className = "animatedButton";

      setTimeout(
        "document.getElementById('linkinscription').style.display = 'none'",
        10
      );
      setTimeout(
        "document.getElementById('formConnect').style.display = 'block'",
        100
      );
      document.getElementById("formConnect").className = "appearIt";
    },
    routerGo() {
      if (localStorage.hardReset == 1) {
        localStorage.hardReset = 0;
        window.location.href = "http://localhost:8080/";
      }
      if (localStorage.connected == "true") this.$router.push("/login");
    },

    getConnect() {
      axios
        .post("http://127.0.0.1:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data.message);
          console.log("rep data", response.data);
          if (response.data.erreur) {
            alert(response.data.erreur);
            console.log("err", response.data.erreur);
            this.error = response.data.erreur;
          }
          if (response.data.userId) {
            if (response.data.moderateur == 1) {
              localStorage.moderateur = 1;
            }

            localStorage.connected = true;
            localStorage.token = response.data.token;
            localStorage.userId = response.data.userId;
            localStorage.utilisateur = response.data.utilisateur;
            localStorage.email = response.data.email;
            this.$store.dispatch("loginAccount", {
              connected: true,
              token: response.data.token,
              userId: response.data.userId,
              utilisateur: response.data.utilisateur,
              email: response.data.email,
            });
            this.$router.push("/login");
          }
        })

        .catch((error) => {
          console.log("LOGIN", error);
        });
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 720px) and (max-width: 1367px) {
} //tablet media screen
@media screen and (min-width: 280px) and (max-width: 830px) {
  #app {
    margin-top: 0% !important;
  }

  .hello2 {
    position: unset !important;
    margin-left: unset !important;
    margin: auto !important;
  }
  .main-block {
    position: absolute;
    top: 21%;
    min-height: 434px;
  }
  #logoentree {
    margin-top: -13%;
    width: 86%;
    position: absolute;
    margin-left: -15%;
  }
  #logoentree2 {
    width: 60% !important;
    left: 0% !important;
  }

  h1 {
    margin-bottom: 15% !important;
  }
} // cellphone media
</style>
<style lang="scss">
* :focus-visible  {
  outline:#4648e0 auto  2px !important;
  outline-color: #4648e0        !important;
    outline-style: auto !important;        
    outline-width: 2px !important;
    border:dashed 4px #d1e046  !important ;
    opacity: 1 !important;
}

.modBien {
  text-align: center;
  font-size: 2rem;
  background-color: black;
  color: white;
  width: 50%;
  line-height: 80px;
  margin: auto;
  border-radius: 25px;
}
.modControl {
  width: 80%;
  min-height: 80%;
  background-color: white;
}
</style>
<style scoped lang="scss">
.main-block {
  margin-top: 11%;
}
body {
  margin: 0;
}
li {
  
  line-height: 2rem !important;
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
#logoentree2 {
  width: 500px;
}
.hello2 {
  border: solid;
  width: 311px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 13px;
  margin-top: 6%;
  padding-bottom: 3%;
  margin-left: 41%;
  box-shadow: 5px 5px 15px 5px #000000;
}
.appearIt {
  animation-name: appeara;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes appeara {
  from {
    transform: scale(0);
    display: block;
  }
  to {
    transform: scale(1);
    display: block;
  }
}
i {
  color: hsl(236, 53%, 41%);
}
input {
  font-size: 1.1rem;
  line-height: 1.8rem;
  margin-top: 5%;
  margin-left: 4%;
  width: 79%;
}
#motdepasse {
  padding-right: 4px;
}
img {
  position: relative;
  left: 34%;
}
h1 {
  text-align: center;
}
#connectButton {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 20px;
  border-radius: 35px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin-top: 39px;
  position: relative;
  left: 27.5%;
  transition: background-color 400ms, box-shadow 350ms;
  &:hover {
    background-color: black;
  }
}
#formConnect {
  display: none;
  transform: scale(0);
  font-size: 1.7rem;

  & > input {
    margin-bottom: 1%;
  }
  & > label {
    position: relative;
    top: 4px;
  }
}
.linkci {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin-top: 39px;
  transition: background-color 400ms, box-shadow 350ms;
  &:hover {
    background-color: black;
  }
}


.animatedButton {
  position: relative;
  top: 13px;
  animation-name: connectIt;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes connectIt {
  from {
    margin-top: 5%;
    background: #6b0200 !important;
    border-radius: 5px;
    border: none;
    padding: 5px;
    text-transform: uppercase;

    // opacity: 1;
    color: white;
    // transform: rotateX(90deg);
  }

  to {
    background-color: #6b0200;
    padding: 17px;
    color: white;
    border-radius: 5px;
    text-transform: uppercase;
    position: relative;
    top: 13px;
    // opacity: 0;
    // transform: rotateX(90deg);
  }
}
</style>

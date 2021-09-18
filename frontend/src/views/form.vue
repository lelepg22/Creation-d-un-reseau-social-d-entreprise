<template>
  <head>
    <title>Simple registration form</title>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"
      integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz"
      crossorigin="anonymous"
    />
  </head>
 <body> 
    <div class="form">
      <a href="http://localhost:8080/"
        ><img
          id="logoentree"
          alt="Logo Groupomania"
          src="../assets/logo/icon-left-font-monochrome-black.svg"
      /></a>
      <HelloWorld msg="Social Network" />
    </div>
    <div class="main-block">
      <h1>Inscription</h1>
      <form action="/">
        <hr />

        <label class="icon" for="name"><i class="fas fa-envelope"></i></label>
        <input
          aria-label="Email"
          type="text"
          name="Email"
          id="email"
          placeholder="Email"
          required
          v-model="email"
        />
        <label class="icon" for="name"><i class="fas fa-user"></i></label>
        <input
          aria-label="Nom-Prenom"
          type="text"
          name="name"
          id="name"
          placeholder="Nom-Prenom"
          required
          v-model="utilisateur"
        />
        <label class="icon" for="name"><i class="fas fa-unlock-alt"></i></label>
        <input
          aria-label="Mot-de-passe"
          type="password"
          name="Mot de Passe"
          id="motdepasse"
          placeholder="Mot de passe"
          required
          v-model="password"
        />
        <hr />
        <div class="btn-block">
          <button @click.prevent="form()" type="submit" href="/">
            Envoyer
          </button>
        </div>
      </form>
    </div>
 </body>
  
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

const axios = require("axios").default;

export default {
  name: "Form",
  data() {
    return {
      utilisateur: "",
      email: "",
      password: "",
      msg: "",
      error: "",
    };
  },
  components: {
    HelloWorld,
  },
  methods: {
    form() {
      this.error = "";
         if( document
          .getElementById("motdepasse")
          .value == ('')) { return alert('Votre champ Mot-de-passe est vide.')}
      if( document
          .getElementById("name")
          .value == ('')) { return alert('Votre champ utilisateur est vide.')}
      if (
        document
          .getElementById("email")
          .value.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
          )
      ) {
        if (
          this.ustilisateur != "" &&
          this.email != "" &&
          this.password != ""
        ) {
          // Post envoie vers le backend
          axios
            .post("http://127.0.0.1:3000/api/auth/signup", {
              email: this.email,
              utilisateur: this.utilisateur,
              password: this.password,
            })
            .then((response) => {
              console.log(response.data);
              if (response.data.erreur) {
                alert("Cette adresse e-mail est déjà utilisée");
                this.error = response.data.erreur;
              }

              if (response.data.message == "OK") {
                localStorage.utilisateur = this.utilisateur;               
                localStorage.entree = 1;
                this.$router.push("/");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        alert("données invalides");
      }
    },
  },
};
</script>
<style lang="scss">
@media screen and (min-width: 720px) and (max-width: 1367px) {
  .main-block {
    margin-top: 17% !important ;
  }
} //tablet media screen
@media screen and (min-width: 320px) and (max-width: 800px) {
  .main-block {
    margin-top: 10% !important;
  }
} // cellphone media
</style>
<style scoped lang="scss">
li {
  line-height: 6rem;
  border: solid 2px;
  box-shadow: 5px 5px 15px 5px #000000;
  cursor: pointer;
  list-style: none;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: absolute;
}
html,
body {
  display: flex;
  justify-content: center;
  height: 100%;
}
body,
div,
h1,
form,
input,
p {
  padding: 0;
  margin: 0;
  outline: none;
  font-family: Roboto, Arial, sans-serif;
  font-size: 16px;
  color: #666;
}
h1 {
  padding: 10px 0;
  font-size: 32px;
  font-weight: 300;
  text-align: center;
}
p {
  font-size: 12px;
}
hr {
  color: #a9a9a9;
  opacity: 0.3;
}
.main-block {
  max-width: 340px;
  min-height: 460px;
  padding: 10px 0;
  margin: auto;
  margin-top: 13%;
  border-radius: 5px;
  border: solid 1px #ccc;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.31);
  background: #ebebeb;
}
form {
  margin: 0 30px;
}
.account-type,
.gender {
  margin: 15px 0;
}
input[type="radio"] {
  display: none;
}
label#icon {
  margin: 0;
  border-radius: 5px 0 0 5px;
}
label.radio {
  position: relative;
  display: inline-block;
  padding-top: 4px;
  margin-right: 20px;
  text-indent: 30px;
  overflow: visible;
  cursor: pointer;
}
label.radio:before {
  content: "";
  position: absolute;
  top: 2px;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ed3330;
}
label.radio:after {
  content: "";
  position: absolute;
  width: 9px;
  height: 4px;
  top: 8px;
  left: 4px;
  border: 3px solid #fff;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
  opacity: 0;
}
input[type="radio"]:checked + label:after {
  opacity: 1;
}
input[type="text"],
input[type="password"] {
  width: calc(100% - 57px);
  height: 36px;
  margin: 13px 0 0 -5px;
  padding-left: 10px;
  border-radius: 0 5px 5px 0;
  border: solid 1px #cbc9c9;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.09);
  background: #fff;
}
input[type="password"] {
  margin-bottom: 15px;
}
.icon {
  display: inline-block;
  padding: 9.3px 15px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.09);
  background: #ed3330;
  color: #fff;
  text-align: center;
}
.btn-block {
  margin-top: 10px;
  text-align: center;
}
button {
  width: 100%;
  padding: 10px 0;
  margin: 10px auto;
  border-radius: 5px;
  border: none;
  background: #ed3330;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  transition: background-color 400ms, box-shadow 350ms;
}
button:hover {
  background-color: black;
}
</style>

<template> 
  <header> 
    {{ resetL() }}  
    {{ isItConnected() }}
    <div class="headerProf">
      <a href="http://localhost:8080/profile"
        ><img
          class="login_logoProf"
          alt="Logo Groupomania"
          src="../assets/logo/icon-left-font-monochrome-black.svg"
      /></a>
      <div class="header-right"></div>
    </div>
  </header>
  <div id="mePosts">
    <button id="postCloseMe" @click="closePosts">X</button>
    <h2 id="h2posts">Mes Articles</h2>
    <p id="indexPoTitle">Title</p>
    <p id="indexPoArticle">Article</p>
    <div id="poThePostOpen">
      <button id="buttonPoThe" @click="goToCommented">OUVRIR ARTICLE</button>
      <button id="closeArtButton" @click="closePop">X</button>
    </div>
  </div>

  <div id="postOpened">
    <button id="closeArticleProf" @click="closeArticleProf">X</button>
    <h2 id="poTitle">{x.postTitle}</h2>
    <p id="poUsrPost"></p>
    <p id="poMsgPost"></p>
    <p id="poTimeStampPost"></p>

    <button id="voirCommentaires" @click="poVoirCommentaire">
      Voir Commentaires
    </button>
    <div id="commentaires">
      <button id="closeButton" @click="close()">X</button>
      <h2>COMMENTAIRES</h2>
    </div>
  </div>
  <div id="cardUserProf">
    <h2 id="titleProfile">Mon Profil</h2>
    <div id="liProf">
      <button id="changerUtil" @click="changeUtil">
        Changer de Utilisateur
      </button>
      <ul>
        <li id="liUtil">Utilisateur:{{ this.utilisateur }}</li>

        <li id="liEmail">Email: {{ this.email }}</li>
      </ul>

      <button id="changerMdp" @click="changeMdp">
        Changer de mot de passe!
      </button>
      <button id="deleteProfile" @click="deleteProfile">
        Supprimer Profil
      </button>
      <button id="voirMePosts" @click="voirMePosts">Voir mes articles</button>
      <button id="voirMeCommentaires" @click="voirMeCommentaire">
        Voir commentaires
      </button>
      <div id="confirmDelete">
        <input
          id="suprimmerInput"
          aria-label="Mot-de-passe pour supprimer compte"
          type="password"
          placeholder="Mot-de-passe"
        /><i class="fas fa-unlock-alt profIcon"></i>
        <button id="goDelete" @click="goDelete">OUI JE CONFIRME</button>
        <button id="deleteClose" @click="deleteClose">
          NON JE NE VEUX PAS
        </button>
      </div>
    </div>
    <div id="formChangeUtil">
      <p>
        Nouveau utilisateur:
        <input
          id="newUtil"
          aria-label="Changer Utilisateur"
          type="text"
          label="nouveau Utilisateur"
          placeholder='"nouveau utilisateur"'
        />
      </p>
      <button id="confirmUtil" @click="confirmeUtil">CONFIRME</button>
    </div>
    <div id="formChangeMdp">
      <p>
        Ancien mot-de-pass:
        <input
          id="vieuxMdp"
          type="password"
          aria-label="ancien mot de passe"
          placeholder='"ancien mot-de-passe"'
        />
      </p>
      <br />
      <p>
        Nouveau mot-de-pass:
        <input
          id="newMdp"
          type="password"
          aria-label="nouveau mot de passe"
          placeholder='"nouveau mot-de-passe"'
        />
      </p>
      <button id="confirmMdp" @click="confirmeMdp">CONFIRME</button>
    </div>
    <div id="meCommentaires">
      <h3>Commentaires</h3>
      <div id="buttonOpenComment">
        <button id="ouvrirCommentProf" @click="goToCommented">
          OUVRIR ARTICLE
        </button>
        <button id="fermerCommentProf" @click="closeConfirmProfComment">
          X
        </button>
      </div>
      <button id="closeProfComment" @click="closeProfComments">X</button>
    </div>
  </div>

  <a href="http://localhost:8080/" id="retournerForum">Retourner au Forum </a>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Profile",

  computed: {
    ...mapState(["utilisateur", "email", "connected", "token", "userId"]),
  },

  methods: {
    isItConnected() {
      if (localStorage.connected == "true") {
        return console.log("User connected");
      }
      alert("Vous n'êtes pas connecté ");
      return this.$router.go(-1);
    },
    goDelete() {
      confirm("Attention, cette action est irréversible!");
     
      axios
        .post("http://127.0.0.1:3000/api/deleteAcc/", {
          userId: localStorage.userId,
          password: document.getElementById("suprimmerInput").value,
        })
        .then((response) => {
          if(response.data.erreur) { return alert ('Mot-de-passe invalide!')}
          alert("Astalavista!");
          console.log('response delete',response.data);
          localStorage.clear();
          localStorage.hardReset = 1;
          this.$router.push("/");
        });
    },
    close() {
      document.getElementById("commentaires").style.display = "none";
    },
    closePosts() {
      document.getElementById("mePosts").style.display = "none";
      document.getElementById("cardUserProf").style.display = "block";
    },
    deleteClose() {
      document.getElementById("confirmDelete").style.display = "none";
    },
    deleteProfile() {
      document.getElementById("confirmDelete").style.display = "block";
      document.getElementById("formChangeUtil").style.display = "none";
      document.getElementById("formChangeMdp").style.display = "none";
      document.getElementById("meCommentaires").style.display = "none";
    },
    closeArticleProf() {
      document.getElementById("postOpened").style.display = "none";
      document.getElementById("cardUserProf").style.display = "block";
      this.$router.go(0);
    },
    resetL() { //Attributs qu’empêche l’injection des html infinie
      a = 0;
      delta = 0;
    },
    closePop() {
      document.getElementById("poThePostOpen").style.display = "none";
    },

    voirMePosts() {
      console.log("delta aqui", delta);
      a = 0;
      document.getElementById("retournerForum").style.display = "none";
      document.getElementById("mePosts").style.display = "block";
      document.getElementById("cardUserProf").style.display = "none";

      axios
        .post("http://127.0.0.1:3000/api/getMePosts", {
          userId: localStorage.userId,
        })
        .then((response) => {
          function goback() {
            alert("Vous n'avez pas des articles/commentaires en ligne");
            document.getElementById("mePosts").style.display = "none";
            document.getElementById("cardUserProf").style.display = "block";
          }
          if (delta == 0) {
            console.log(response.data + " aqui data");
            console.log(response.data.length + "aqui lenght");
            if (response.data.length == 0) {
              goback();
            }
            console.log(response.data);
            response.data.forEach(function(x) {
              if (x.thePostLink != null) {
                localStorage.link = x.thePostLink;
              }
              document.getElementById("mePosts").insertAdjacentHTML(
                "beforeend",
                `<ul>
                        <li data-id="${
                          x.thePostId
                        }" onclick="function poOpenPost(){  
                        document.getElementById('poThePostOpen').style.display ='block';
                        }
                        function getDataId(d){
                        localStorage.thisPostId = d.getAttribute('data-id');
                        }
                        getDataId(this);
                        
                        ; poOpenPost()" >                         
                        <span class="poTimeStamp">${
                          x.timeStampOnPost
                        }</span></span>
                        <span class="poPostTitles">'"${x.thePostTitle}"'</span>
                        <span class="poPostContent">${x.thePostArticle}</span>
                        <span class="poLinked">${poLinkHere()}</span>
                        </span> </li>
                    </ul> `
              );
            });
            delta = 1;
          }
        });
    },
    poVoirCommentaire() {
      document.getElementById("commentaires").style.display = "block";

      if (a < 1) {
        axios
          .post("http://127.0.0.1:3000/api/getComments", {
            postId: localStorage.thisPostId,
          })
          .then((response) => {
            console.log(response.data + " aqui data");
            response.data.forEach(function(beta) {
              localStorage.timeStampComment = beta.timeStampOnPost;
              localStorage.commentaireId = beta.commentaireId;

              if (beta.userInPost != null) {
                localStorage.userInfo = beta.utilisateur;
              }
              if (beta.commentedPost != null) {
                localStorage.commented = beta.commentedPost;
              }

              document.getElementById("commentaires").insertAdjacentHTML(
                "beforeend",
                `<div data-id="${localStorage.commentaireId}" class="unCommentaire">
                    <p class="commentUser" >${localStorage.userInfo} a commenté:</p>
                     <p class="commentMsg">"${localStorage.commented}"</p><div>
                     <p class="timeStampComment"> ${localStorage.timeStampComment}</p>`
              );
            });
          });
        ++a;
        console.log(a);
      }
    },
    closeConfirmProfComment() {
      document.getElementById("buttonOpenComment").style.display = "none";
    },
    goToCommented() {
      document.getElementById("mePosts").style.display = "none";
      document.getElementById("cardUserProf").style.display = "none";
      document.getElementById("postOpened").style.display = "block";

      axios
        .post("http://127.0.0.1:3000/api/openPost", {
          thePostId: localStorage.thisPostId,
        })
        .then((response) => {
          console.log(response.data);

          document.getElementById("poTitle").innerHTML =
            '" ' + response.data[0].thePostTitle + ' "';
          document.getElementById("poUsrPost").innerHTML =
            "article créé par " + response.data[0].utilisateur;
          document.getElementById("poMsgPost").innerHTML =
            response.data[0].thePostArticle;
          document.getElementById("poTimeStampPost").innerHTML =
            response.data[0].timeStampOnPost;
          if (response.data[0].thePostLink != null) {
            document
              .getElementById("postOpened")
              .insertAdjacentHTML(
                "beforeend",
                `<a href="${response.data[0].thePostLink}" target="_blank" id="poLienInside"> ${response.data[0].utilisateur} voulait partage ce lien avec vous ${response.data[0].thePostLink} </a>`
              );

            document
              .getElementById("postOpened")
              .insertAdjacentHTML(
                "afterbegin",
                `<a href="${response.data[0].thePostLink}" target="_blank"><img src="https://i.ibb.co/3dgTpk9/9gagfun.png" alt="9gagfun" border="0" class="poGagLienPost"></a>`
              );
          }
        });
    },
    voirMeCommentaire() {
      document.getElementById("formChangeMdp").style.display = "none";
      document.getElementById("formChangeUtil").style.display = "none";
      document.getElementById("meCommentaires").style.display = "block";

      if (z == 0) {
        axios
          .post("http://127.0.0.1:3000/api/getCommented", {
            userId: localStorage.userId,
          })
          .then((response) => {
            console.log(response.data.length + "aqui lenght");
            if (response.data.length == 0) {
              return alert("Vous n'avez pas des commentaires en ligne");
            }
            console.log(response.data);
            response.data.forEach(function(y) {
              document.getElementById("meCommentaires").insertAdjacentHTML(
                "beforeend",
                `<ul>
                <li data-id="${y.thePostId}" onclick="function openComment(){ document.getElementById('buttonOpenComment').style.display = 'block'};
                 function getCommentId(d){
                 localStorage.thisPostId = d.getAttribute('data-id');
                 }
                 getCommentId(this);   openComment();">
                <span class="postIdcom">POST ID: ${y.thePostId}</span> <span class="commenteds"> ${y.commentedPost}</span> </li>
                </ul>
               `
              );
            });

            z = 1;
          });
      }
    },
    closeProfComments() {
      document.getElementById("meCommentaires").style.display = "none";
    },
    changeUtil() {
      document.getElementById("formChangeUtil").style.display = "block";
      document.getElementById("formChangeMdp").style.display = "none";
      document.getElementById("meCommentaires").style.display = "none";
      document.getElementById("confirmDelete").style.display = "none";
    },
    changeMdp() {
      document.getElementById("formChangeMdp").style.display = "block";
      document.getElementById("formChangeUtil").style.display = "none";
      document.getElementById("meCommentaires").style.display = "none";
      document.getElementById("confirmDelete").style.display = "none";
    },
    confirmeMdp() {
      if (document.getElementById("newMdp").value == "") {
        return alert("Oops ! Champ nouveau mot-de-passe vide.");
      }
      axios
        .post("http://127.0.0.1:3000/api/changeMdp", {
          userId: localStorage.userId,
          password: document.getElementById("newMdp").value,
        })
        .then((response) => {
          console.log(response.data);
          alert("Changement Effectué");
        });
      document.getElementById("formChangeMdp").style.display = "none";
    },
    confirmeUtil() {
      if (document.getElementById("newUtil").value == "") {
        return alert("Oops ! Champ utilisateur vide.");
      }
      axios
        .post("http://127.0.0.1:3000/api/changeUtil", {
          userId: localStorage.userId,
          utilisateur: document.getElementById("newUtil").value,
        })
        .then((response) => {
          console.log(response.data);
          alert("Changement Effectué");
        });
      document.getElementById("formChangeUtil").style.display = "none";
      this.$store.dispatch("loginAccount", {
        connected: true,
        token: localStorage.token,
        userId: localStorage.userId,
        utilisateur: document.getElementById("newUtil").value,
        email: localStorage.email,
      });
    },
  },
};

let delta = 0;
let z = 0;
let a = 0;
function poLinkHere() {
  if (localStorage.link == "" || undefined) {
    return "";
  }
  if (localStorage.link != undefined) {
    localStorage.linkGo = localStorage.link;
    localStorage.link = "";
    return `<a href="${localStorage.linkGo}" target="_blank"><img src="https://i.ibb.co/3dgTpk9/9gagfun.png" alt="9gagfun" border="0" class="poImgLien9gag"></a>
    `;
  } else {
    return "";
  }
}
</script>

<style lang="scss">
@media screen and (max-width: 351px) {
  #userArticles{
    margin-top: 9% !important;
  }
  #cardUserProf {
    position: relative;
    top: 11px;
  }
  ul {
    display: block;
    position: relative;
    top: 11px;
  }
  #retournerForum {
    padding: 5px !important;
    position: relative !important;
    bottom: 79px !important;
    right: 3px !important;
  }
  #deleteProfile {
    position: relative !important;
    top: 109px !important;
    left: 12px !important;
  }
  #voirMePosts {
    position: relative !important;

    left: 11px !important;
    bottom: 333px !important;
  }
  #voirMeCommentaires {
    position: relative !important;
    left: 11px !important;
    bottom: 334px !important;
  }

  .login_logoProf {
    width: 63% !important;
    position: unset !important;
    margin-top: -8%;
  }
  .headerProf {
    height: 0px !important;
  }
  #titleProfile {
    width: unset !important;
  }
  #liProf {
    width: unset !important;
    position: absolute;
    top: 36px;
    right: 10px;
    margin-top: 16% !important;
  }
  #changerUtil {
    position: relative !important;
    left: 18px !important;
    top: 272px !important;
  }
  li {
    height: 48px !important;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 21px;
    margin-left: -7%;
  }
  #changerMdp {
    position: relative !important;
    top: 9px !important;
  }
}
@media screen and (min-width: 720px) and (max-width: 1365px) {
  .poTimeStamp {
    margin-top: 7% !important;
    background-color: white;
    border: solid 1px !important;
    border-radius: 10px;
    left: 0% !important;
  }
  #newUtil {
    font-size: 1.2rem;
  }
  #formChangeUtil {
    position: relative;
    bottom: 247px;
    width: 32% !important;
  }
  #formChangeMdp {
    position: relative !important;
    bottom: 333px !important;
    width: 32% !important;
  }
  #newMdp {
    font-size: 1.2rem;
  }
  #vieuxMdp {
    font-size: 1.2rem;
    margin-left: 0 !important;
  }
  .profIcon {
    display: none !important;
  }
  #suprimmerInput {
    position: relative !important;
    bottom: 208px !important;
    left: 512px !important;
    right: unset !important;
    width: 177px !important;
  }
  #goDelete {
    position: relative !important;
    top: unset !important;
    right: unset !important;
    bottom: 305px !important;
    left: 502px !important;
  }
  #deleteClose {
    position: relative !important;
    bottom: 374px !important;
    left: 278px !important;
  }
  ul {
    margin-right: 3% !important;
    margin-top: 3px !important;
    margin-bottom: 23px !important;
  }
  #deleteProfile {
    position: relative !important;
    bottom: 126px !important;
    left: 287px !important;
  }
  #retournerForum {
    display: none !important;
  }
  #changerMdp {
    position: relative !important;
    bottom: 14px !important;
    left: 14px !important;
    padding: 2% !important;
    top: unset !important;
  }
  li {
    min-height: 3rem !important;
  }
  #voirMeCommentaires {
    position: relative !important;
    left: 400px !important;
    bottom: 310px !important;
  }
  #voirMePosts {
    position: relative !important;
    left: 600px !important;
    bottom: 267px !important;
  }
  .login_logoProf {
    width: 29% !important;
  }
  #changerUtil {
    position: relative !important;
    left: 16px !important;
    bottom: 23ipx !important;
    padding: 8px !important;
  }
  #liProf {
    margin-left: unset !important;
    margin-right: 1% !important;
    width: 25% !important;
    margin-top: 24px !important;
  }
} //tablet media screen
@media screen and (min-width: 352px) and (max-width: 719px) {
  .postIdcom {
    width: 12% !important;
    margin-right: 6%;
    margin-left: 1%;
  }
  i {
    right: 60% !important;
    width: 50% !important ;
    top: 4% !important;
  }
  #suprimmerInput {
    right: 14% !important;
    width: 74% !important;
    top: 4%;
  }
  #confirmDelete {
    border-radius: 30px;
    border: solid;
    background-color: white;
    width: 95%;
    height: 80%;
    position: absolute;
    top: 0%;
    left: 3%;
  }
  #textAnswer {
    right: 23% !important;
    width: unset !important;
  }
  #commentItbutton {
    top: 100% !important;
    right: 66% !important;
    bottom: unset !important;
  }
  #deleteClose {
    top: 41% !important;
    left: 43% !important;
    height: 101px;
    width: 179px;
  }
  #goDelete {
    top: 25% !important;
    right: 65% !important;
    width: 105px;
  }
  #formChangeUtil {
    position: absolute !important;
    margin-top: 15% !important ;
    width: unset !important;
  }
  #newMdp {
    margin-top: 3% !important;
  }
  input {
    font-size: 1.4rem !important;
  }
  #formChangeMdp {
    width: unset !important;
    z-index: 2 !important;
    position: absolute !important;
    margin-left: 1% !important;
  }
  #poLienInside {
    border: 0 !important;
    background-color: unset !important;
  }
  .poGagLienPost {
    position: unset !important;
  }
  #ouvrirCommentProf {
    right: 21% !important;
  }
  #buttonOpenComment {
    width: 78% !important;
    right: 11% !important;
  }
  #meCommentaires {
    margin-right: -23% !important;
    width: 96% !important;
  }
  #liUtil {
    margin-left: 1%;
    margin-right: -3%;
  }
  #liEmail {
    margin-left: 1%;
    margin-right: -3%;
  }
  #poTitle {
    margin-top: 1%;
  }
  h2 {
    margin-top: -3%;
  }
  #closeButton {
    padding: 15px !important;
  }
  .unCommentaire {
    margin: unset !important;
    margin-right: -20% !important;
    margin-left: -20% !important;
  }
  #commentaires {
    width: unset !important;
    right: 1% !important;
  }
  .commentUser {
    min-width: unset !important;
    max-width: unset !important;
  }
  #closeArticleProf {
    top: 15% !important;
    padding: 15px !important;
  }
  #buttonPoThe {
    right: 24% !important;
  }
  #voirCommentaires {
    right: 25% !important;
    bottom: 16% !important;
  }

  #poThePostOpen {
    width: 80% !important;
    right: 10% !important;
  }
  .poPostTitles {
    left: 40% !important;
    border-right: 0 !important;
  }
  .poTimeStamp {
    position: unset !important;
    color: #6b0200;
    margin-left: -69px !important;
    font-weight: 700 !important;
    font-size: 0.8rem !important;
  }
  .poPostContent {
    display: none !important;
  }
  .poImgLien9gag {
    display: none !important;
  }
  ul {
    margin-right: 0% !important;
    margin-left: -11% !important;
  }
  #h2posts {
    padding-bottom: 19px !important;
    margin-left: 46px;
    margin-top: 2% !important;
  }
  #postCloseMe {
    position: unset !important;
    float: right !important;
    padding: 12px !important;
  }
  #indexPoTitle {
    position: unset !important;
  }
  #indexPoArticle {
    display: none;
  }
  #mePosts {
    margin-top: 6% !important;
    width: 98% !important;
  }
  #cardUserProf {
    position: relative;
    top: 11px;
  }
  #retournerForum {
    padding: 5px !important;
    position: relative !important;
    bottom: 79px !important;
    right: 3px !important;
    display: none !important;
  }
  #deleteProfile {
    position: relative !important;
    top: 105px !important;
    left: 100px !important;
  }
  #voirMePosts {
    position: relative !important;

    right: 77px !important;
    bottom: 296px !important;
  }
  #voirMeCommentaires {
    position: relative !important;
    left: 13px !important;
    bottom: 303px !important;
  }

  .login_logoProf {
    width: 63% !important;
    position: unset !important;
    margin-top: -8%;
  }
  .headerProf {
    height: 0px !important;
  }
  #titleProfile {
    width: unset !important;
  }
  #liProf {
    width: unset !important;
    position: absolute;
    top: 36px;
    right: 10px;
    margin-top: 16% !important;
  }
  #changerUtil {
    position: relative !important;
    left: 18px !important;
    top: 262px !important;
  }
  li {
    line-height: unset !important;
    min-height: 60px !important;
    height: unset !important;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  #changerMdp {
    position: relative !important;
  }
} // cellphone media
i {
  position: absolute;
  right: 59%;
  width: 13%;
  text-align: center;
  line-height: 2rem;
  font-size: 2rem;
}
#suprimmerInput {
  position: absolute;
  right: 51%;
  width: 13%;
  text-align: center;
  line-height: 2rem;
  font-size: 1.2rem;
}

#deleteProfile {
  position: absolute;
  top: 60%;
  right: 82.5%;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 20px;
  border-radius: 29px;

  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;

  &:hover {
    background-color: black;
  }
}
#confirmDelete {
  display: none;
}
#goDelete {
  position: absolute;
  top: 39%;
  right: 53%;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 20px;
  border-radius: 29px;

  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;

  &:hover {
    background-color: black;
  }
}
#deleteClose {
  position: absolute;
  top: 38%;
  right: 37%;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 31px;
  border-radius: 29px;

  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;

  &:hover {
    background-color: black;
  }
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
#postCloseMe {
  position: absolute;
  right: 9%;
  top: 10%;
  padding: 6px;
}
#closeArtButton {
  position: absolute;
  right: 5%;
  top: 9%;
}
#poThePostOpen {
  display: none;
  position: absolute;
  width: 30%;
  background-color: #f1f1f1;
  height: 20%;
  z-index: 1;
  right: 36%;
  bottom: 45%;
  -webkit-box-shadow: 5px -10px 9px 0px rgba(0, 0, 0, 0.87);
  box-shadow: 5px -10px 9px 0px rgba(0, 0, 0, 0.87);
  border-radius: 20px;
}
#buttonPoThe {
  position: absolute;
  top: 30%;
  right: 35%;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 20px;
  border-radius: 29px;

  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;
  position: absolute;

  &:hover {
    background-color: black;
  }
}
#h2posts {
  padding-bottom: 25px;
}
#indexPoTitle {
  position: absolute;
  top: 15%;
  left: 13%;
  background-color: #6b0200;
  color: white;
  padding: 6px;
  padding-right: 9px;
  padding-left: 9px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  -webkit-box-shadow: 5px -10px 9px 0px rgba(0, 0, 0, 0.87);
  box-shadow: 5px -10px 9px 0px rgba(0, 0, 0, 0.87);
  border-bottom: solid black;
}
#indexPoArticle {
  position: absolute;
  top: 15%;
  left: 25%;
  background-color: #6b0200;
  color: white;
  padding: 6px;
  padding-right: 9px;
  padding-left: 9px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  -webkit-box-shadow: 5px -10px 9px 0px rgba(0, 0, 0, 0.87);
  box-shadow: 5px -10px 9px 0px rgba(0, 0, 0, 0.87);
  border-bottom: solid black;
}
.poPostTitles {
  /* border-right: solid 1px; */
  padding-right: 27px;
  /* border-left: solid 1px; */
  /* padding-left: 24px; */
  min-width: 15%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: initial;
  margin-left: 1%;
}
.poImgLien9gag {
  position: absolute;
  right: 11%;
  width: 3%;
  margin-top: 1%;
  display: none;
}
.poPostContent {
  line-height: 2.4rem;
  padding-top: 1%;
  padding-bottom: 1%;
  text-align: initial;
}
.poTimeStamp {
  width: 200px;
  white-space: pre;
  color: #6b0200;
  /* position: relative; */
  /* left: 0%; */
  position: absolute;
  /* display: block; */
  margin-top: 4%;
}

li {
  border: solid 2px;
  box-shadow: 5px 5px 15px 5px #000000;
  cursor: pointer;
  list-style: none;
  min-height: 6rem;
  display: flex;
  margin-left: 4%;

  align-items: center;
}
#mePosts {
  display: none;
  width: 85%;
  margin: auto;
  border: solid;
}
ul {
  margin-right: 3%;
}
#closeArticleProf {
  position: absolute;
  right: 2%;
  top: 13%;
}
#poMsgPost {
  border: solid;
  width: 80%;
  margin: auto;
  height: 88px;
  border-radius: 22px;
}

.poGagLienPost {
  position: absolute;
  right: 16%;
  top: 13%;
}
#postOpened {
  display: block;
  border: solid;
  padding-bottom: 22px;
}
#poLienInside {
  border: solid;
  z-index: 1;
  padding: 8px;

  background: white;
  border-radius: 22px;
}
#commentaires {
  display: none;
  min-width: 200px;
  border: solid 1px;
  min-height: 198px;
  bottom: 58%;
  width: 96%;
  margin: auto;
  border-radius: 14px;
  padding: 50px;
  z-index: 1;
  position: absolute;
  background-color: #f1f1f1;
  right: 3%;
  max-width: 88%;
  top: 55%;
  left: 0%;
  max-height: -webkit-fit-content;
  max-height: -moz-fit-content;
  max-height: fit-content;
}
.unCommentaire {
  border: solid 2px #3d30ed;
  border-radius: 12px;
  min-width: 150px;
  min-height: 150px;
  margin: 20px;
  background-color: white;
}
.commentUser {
  border: solid 3px black;
  line-height: 2.2rem;
  min-width: 30%;
  margin: auto;
  max-width: 45%;
  margin-top: 1%;
  border-radius: 12px;
}

.commentMsg {
  padding-top: 6px;
}
.timeStampComment {
  position: absolute;
  right: 8%;
  color: #6b0200;
}
#voirCommentaires {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #3d30ed;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  position: absolute;
  right: 45%;
  bottom: 50%;
  transition: background-color 400ms, box-shadow 350ms;

  &:hover {
    background-color: black;
  }
}
#closeButton {
  position: absolute;
  right: 3%;
  top: 4%;
  padding: 5px;
  padding-right: 8px;
  padding-left: 8px;
}
#postOpened {
  display: none;
}
#fermerCommentProf {
  position: absolute;
  top: 7%;
  right: 4%;
}
#buttonOpenComment {
  display: none;
  position: absolute;
  width: 50%;
  background-color: #f1f1f1;
  min-height: 43%;
  top: 27%;
  right: 25%;
  border-radius: 20px;
  box-shadow: 5px 5px 15px 5px #000000;
}

#ouvrirCommentProf {
  right: 31%;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 20px;
  border-radius: 29px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;
  position: absolute;
  top: 36%;
  &:hover {
    background-color: black;
  }
}
#closeProfComment {
  right: 2%;
  position: absolute;
  top: 2%;
  padding: 5px;
}
#meCommentaires {
  display: none;
  border: solid;
  background-color: white;
  width: 50%;
  min-height: 428px;
  position: absolute;
  z-index: 1;
  top: 28%;
  right: 24%;
  border-radius: 10px;
}
#confirmUtil {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;
  &:hover {
    background-color: black;
  }
}
#confirmMdp {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;
  &:hover {
    background-color: black;
  }
}
#formChangeUtil {
  display: none;
  border: solid;
  background-color: white;
  width: 29%;
  margin: auto;
  margin-top: -6%;
  border-radius: 25px;
}
#formChangeMdp {
  display: none;
  border: solid;
  background-color: white;
  width: 29%;
  margin: auto;
  margin-top: -6%;
  border-radius: 25px;
}
#vieuxMdp {
  text-align: center;
  margin-bottom: -1%;
  margin-top: 3%;
  margin-left: 10px;
}
#newMdp {
  text-align: center;
  margin-top: -1%;
  margin-bottom: 1%;
}
#voirMePosts {
  position: absolute;
  right: 17%;
  top: 18%;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;
  &:hover {
    background-color: black;
  }
}
#voirMeCommentaires {
  position: absolute;
  right: 5%;
  top: 18%;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;
  &:hover {
    background-color: black;
  }
}
#retournerForum {
  position: absolute;
  right: 43%;
  bottom: 7%;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;
  &:hover {
    background-color: black;
  }
}
#changerUtil {
  position: absolute;
  left: 5.5%;
  top: 17%;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;
  &:hover {
    background-color: black;
    border: solid yellow;
    border-radius: 35px;
  }
}
#changerMdp {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  transition: background-color 400ms, box-shadow 350ms;
  position: absolute;
  top: 47%;
  left: 5.5%;
  &:hover {
    background-color: black;
    border: solid yellow;

    border-radius: 35px;
  }
}
#liProf {
  margin-left: -1%;
  margin-right: 1%;
  width: 25%;
  margin-top: 5%;
}

#titleProfile {
  border-bottom: solid;
  border: solid 2px #6b0200;
  line-height: 2rem;
  width: 23%;
  margin: auto;
  text-align: center;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-top: 10px;
  border-radius: 35px;
  box-shadow: -12px 5px 15px 5px #000000;
}
#cardUser {
  border: solid;
  width: 90%;
  height: 760px;
  margin: auto;
  margin-top: 66px;
}
body {
  margin: 0;
}
.headerProf {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 45px 10px;
}
#app {
  margin: 0;
}
h1 {
  display: none;
}
.login_logoProf {
  width: 10%;
  position: absolute;
  left: 2%;
  top: 3.5%;
}
</style>

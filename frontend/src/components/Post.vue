<template>
  {{ resetA() }}
  <button id="thePostButton" @click="triggerOpenPost">OUVRIR ARTICLE</button>
  <div id="thePost">
    <button id="closePost" @click="closePost">X</button>
    <div id="mod">
      <button id="modSupprimerPost" @click="modSupprimerPost">
        Supprimer Article
      </button>
    </div>
    <h2 id="titlePost">{x.postTitle}</h2>
    <p id="usrPost"></p>
    <p id="msgPost"></p>
    <p id="timeStampPost"></p>

    <button id="voirCommentaires" @click="voirCommentaire">
      Voir Commentaires
    </button>
    <button id="commentItbutton" @click="commenter">COMMENTER</button>
    <div id="answerPost">
      <input id="textAnswer" type="text" aria-label="Votre Commentaire" />
      <button id="sendComment" @click="envoyerCommentaire">ENVOYER</button>
    </div>
    <div id="commentaires">
      <button id="closeButton" @click="close()">X</button>
      <h2 id="h2comment">COMMENTAIRES</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Post",
  methods: {
    triggerOpenPost() {
      a = 0;
      axios
        .post("http://127.0.0.1:3000/api/openPost", {
          thePostId: localStorage.postId,
        })
        .then((response) => {
          console.log('openpost', response.data)
          if (localStorage.moderateur == "1") {
            alert('Post ID: ' + response.data[0].thePostId + '  UserID :' + response.data[0].createur )
            // alert("MOD on");
            document.getElementById("mod").style.display = "block";
          }
          console.log(response.data);
          response.data;
          document.getElementById("thePost").style.display = "block";
          document.getElementById("titlePost").innerHTML =
            '" ' + response.data[0].thePostTitle + ' "';
          document.getElementById("usrPost").innerHTML =
            "article créé par " + response.data[0].utilisateur;
          document.getElementById("msgPost").innerHTML =
            response.data[0].thePostArticle;
          document.getElementById("timeStampPost").innerHTML =
            response.data[0].timeStampOnPost;
          if (response.data[0].thePostLink != null) {
            document
              .getElementById("msgPost")
              .insertAdjacentHTML(
                "afterbegin",
                `<a href="${response.data[0].thePostLink}" target="_blank" id="lienInside"> ${response.data[0].utilisateur} voulait partage ce lien avec vous ${response.data[0].thePostLink} </a>`
              );

            document
              .getElementById("thePost")
              .insertAdjacentHTML(
                "afterbegin",
                `<a href="${response.data[0].thePostLink}" target="_blank"><img src="https://i.ibb.co/3dgTpk9/9gagfun.png" alt="9gagfun" border="0" class="gagLienPost"></a>`
              );
          }
        });
    },
    commenter() {
      document.getElementById("answerPost").style.display = "block";
      document.getElementById("buttonPost").style.display = "none";
    },
    modSupprimerPost() {
      axios
        .post("http://127.0.0.1:3000/api/deleteThisPost", {
          thePostId: localStorage.postId,
          userId: localStorage.userId,
          moderateur: localStorage.moderateur,
        })
        .then((response) => {
          console.log(response.data);
          alert('Post Supprime!')
          this.$router.go(0);
        });
    },
    resetA() {
      a = 0;
    },
    close() {
      document.getElementById("commentaires").style.display = "none";
      document.getElementById("commentItbutton").style.display = "block";
    },
    closePost() {
      document.getElementById("thePost").style.display = "none";
      document.getElementById("placePost").style.display = "block";
      document.getElementById("thePostButton").style.display = "none";
      this.$router.go(0);
    },
    voirCommentaire() {
      document.getElementById("commentaires").style.display = "block";
      document.getElementById("commentItbutton").style.display = "none";
      if (a < 1) {
        axios
          .post("http://127.0.0.1:3000/api/getComments", {
            postId: localStorage.postId,
          })
          .then((response) => {
            console.log(response.data);
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
    envoyerCommentaire() {
      document.getElementById("answerPost").style.display = "none";

      if (document.getElementById("textAnswer").value != "") {
        axios
          .post("http://127.0.0.1:3000/api/commenterPost", {
            userId: localStorage.userId,
            commentaire: document.getElementById("textAnswer").value,
            postId: localStorage.postId,
          })
          .then((response) => {
            console.log(response.data);
          });
        document.getElementById("buttonPost").style.display = "block";
      } else {
        alert("Oops ! Champ commentaire vide.");
      }
    },
  },
};
let a = 0;
console.log(a);
</script>

<style lang="scss">
#mod {
  display: none;
}
#modSupprimerPost {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6a27a8fb;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  position: relative;
  right: 16px;
  top: 7%;
  transition: background-color 400ms, box-shadow 350ms;

  &:hover {
    background-color: black;
  }
}
@media screen and (min-width: 721px) and (max-width: 1367px) {
  #myPopup {
    width: 52% !important;
    height: 240px !important;
  }
  #lienInside {
    line-height: 1rem !important;
    bottom: 14% !important;
    left: 2% !important;
    position: unset !important;
    float: left;
    inline-size: 100%;

    padding-bottom: 15px;
    padding-top: 15px;
    text-align: center;
  }
  #thePostButton {
    top: 27% !important;
    right: 43% !important;
  }
  #msgPost {
    padding-right: 15px !important;
    padding-left: 15px !important;
  }
} //tablet media screen
@media screen and (min-width: 360px) and (max-width: 720px) {
  #commentItbutton {
    top: 100% !important;
    bottom: unset !important;
    right: 65% !important;
  }
  #msgPost {
    line-height: 26px !important;
    font-weight: bold;
    padding-bottom: 15%;
    padding-left: unset !important;
    padding-right: unset !important;
    text-align: center !important;
  }
  #titlePost {
    line-break: anywhere;
    width: 95%;
    text-align: center;
  }

  #modSupprimerPost {
    left: 0% !important;
    bottom: 100% !important;
    top: unset !important;
  }
  .inputGagLink {
    left: 1%;
  }
  #icon9gagLogo {
    width: 12% !important;
    margin-top: 3px !important;
  }
  #buttonCrea_form {
    bottom: 2% !important;
    right: 3% !important;
  }
  #myPopup {
    width: unset !important;
    top: 43% !important;
    left: 0% !important;
    height: 271px !important;
  }
  .timeStampComment {
    right: 26% !important;
  }
  .unCommentaire {
    margin: unset !important;
    margin-right: -20% !important;
    margin-left: -20% !important;
  }
  .commentUser {
    max-width: unset !important;
  }
  #thePostButton {
    top: 50% !important;
    right: 27% !important;
  }
  #thePost {
    width: 99% !important;
    left: 0% !important;
    min-height: 45% !important;
    height: unset !important;
  }
  #voirCommentaires {
    right: 17px !important;
    top: 100% !important;
    bottom: unset !important;
  }
  #timeStampPost {
    right: 24% !important;
    bottom: 0% !important;
    top: unset !important;
    background-color: #f1f1f1 ;
  }
  #lienInside {
    line-height: 1rem !important;
    bottom: 14% !important;
    left: 2% !important;
    position: unset !important;
    float: left;
    inline-size: 100%;

    padding-bottom: 15px;
    padding-top: 15px;
  }
  .gagLienPost {
    top: 20% !important;
    margin-left: 2%;
  }
  #commentaires {
    width: 71% !important;
  }
  #h2comment {
    margin-top: -5%;
  }

  #closePost {
    left: unset !important;
    right: 1% !important;
    top: 64px !important;
    padding: 9px !important;
  }
} // cellphone media
#sendComment {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #228f3afb;
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  position: absolute;
  right: 43%;
  bottom: 17%;
  transition: background-color 400ms, box-shadow 350ms;

  &:hover {
    background-color: black;
  }
}
#commentItbutton {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: rgba(219, 144, 5, 0.986);
  padding: 12px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  margin: 1%;
  position: absolute;
  left: 10%;
  bottom: -5px;
  transition: background-color 400ms, box-shadow 350ms;

  &:hover {
    background-color: black;
  }
}
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
#closePost {
  position: absolute;
  left: 1%;
  top: 12px;
  padding: 5px;
  padding-right: 8px;
  padding-left: 8px;
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
  position: relative;
  right: 0%;
  color: red;
  top: 0%;
}

#closeButton {
  position: absolute;
  top: 28px;
  right: 3%;
  padding: 5px;
}
.unCommentaire {
  border: solid 2px #3d30ed;
  border-radius: 12px;
  min-width: 150px;
  min-height: 150px;
  margin: 20px;
  background-color: white;
}
#commentaires {
  display: none;
  min-width: 200px;
  border: solid 1px;
  min-height: 198px;
  position: relative;
  bottom: 58%;
  background-color: #f1f1f1;
  width: 96%;
  margin: auto;
  border-radius: 14px;
  padding: 50px;
}
#textAnswer {
  width: 450px;
  height: 197px;
  display: block;
  position: absolute;
  top: 38%;
  right: 31%;
  box-shadow: 0px -6px 17px -6px #000000;
  border-radius: 10px;
  text-align: center;
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
  right: 6%;
  bottom: -5px;
  transition: background-color 400ms, box-shadow 350ms;

  &:hover {
    background-color: black;
  }
}
#envoyerComment {
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
#answerPost {
  display: none;
}
#lienInside {
  position: absolute;
  bottom: 0%;
  left: 32%;
}
.gagLienPost {
  position: relative;
  top: 78px;
  left: 38%;
  border: solid 1px black;
  padding: 2px;
  background-color: white;
  border-radius: 4px;
}
#timeStampPost {
  border: solid 1px #6b0200;
  right: 2%;
  position: absolute;
  top: 14px;
  padding: 3px;
  border-radius: 5px;
}
#msgPost {
  min-width: 93%;
  min-height: 69%;
  border: solid;
  max-width: -webkit-fit-content;
  max-width: -moz-fit-content;
  max-width: fit-content;
  margin: auto;
  text-align: start;
  line-height: 3rem;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 45px;
}
#thePostButton {
  display: none;
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 32px;
  border-radius: 39px;
  border: none;
  transition: all 0.4s ease 0s;
  margin-top: 39px;
  transition: background-color 400ms, box-shadow 350ms;
  position: absolute;
  top: 38%;
  right: 45%;
  box-shadow: 5px 5px 50px 50px rgba(0, 0, 0, 0.76);
  &:hover {
    background-color: black;
  }
}
#thePost {
  display: none;
  border: solid 1px;
  position: absolute;
  width: 72%;
  min-height: 64%;
  top: 28%;
  left: 14%;
  background-color: #f1f1f1;
  border-radius: 15px;
  box-shadow: 5px 6px 15px 5px #000000;
}
#buttonPost {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 13px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  transition: all 0.4s ease 0s;
  /* margin-top: 39px; */
  transition: background-color 400ms, box-shadow 350ms;
  position: absolute;
  bottom: 3%;
  left: 47%;
  &:hover {
    background-color: black;
  }
}
</style>

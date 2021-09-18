<template>
  <div id="every">
    {{ getPosts() }}
    
    <div class="forumTable">
      <button
        id="buttonCrea"
        class="forumTable_buttomCreatePost popup"
        @click="popIt()"
      >
        Création d'un nouveau article
      </button>
      <div id="modBar">
        <i class="fas fa-gavel"></i>
      <button id="modSearchPost" @click="modSearchPost"> CHERCHER ARTICLES  </button>
      </div>
      <div id="myPopup">
        <span class="popuptext">
          <label for="story">Nouveau Article:</label>
          <br />
          <input
            id="postTitle"
            name="articleTitle"
            placeHolder="Title Article"
            aria-label="Titre Article"
          />
          <br />
          <input
            id="postTxt"
            name="article"
            placeHolder="Message à partager!"
            aria-label="Contenue Article"
          />

          <button id="buttonCrea_form" @click="createPost()">Creer</button>
          <br />
          <button id="buttonCrea_gagLink" @click="setGagLink()">
            Attache un lien 9gag
          </button>

          <a href="https://9gag.com" target="_blank"
            ><img
              id="icon9gagLogo"
              src="../assets/logo/9gag-old.svg"
              alt="9 lagLogo"
          /></a>
          <input
            id="inputGagLink"
            placeholder='"Lien Ici!"'
            aria-label="Lien 9 gag a inserer"
          />
        </span>
      </div>
      <router-link
        to="/login"
        class="forumTable_buttomAfficher"
        @click="refreshIt"
        >Nouveaux articles
      </router-link>
      <div class="forumTable_posts" id="placePost">
        <div id="indexForum">
          <p>
            <span id="indexUti">UTILISATEUR</span>
            <span id="indexTitre">Titre</span>
            <span id="indexArticle">Article</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Forum",

  props: {
    msg: String,
  },
  methods: {
    setGagLink() {
      (document.getElementById("inputGagLink").style.display = "block"), 10;
    },
    modSearchPost(){
      document.getElementById("chercherArticle").style.display = "block"
         document.getElementById("indexArticle").style.display = "none"
               document.getElementById("indexUti").style.display = "none"
               document.getElementById("indexTitre").style.display = "none"
               
    },

    refreshIt() {
      this.$router.go(0);
    },

    createPost() {
      if (document.getElementById("inputGagLink").value != "") {
        localStorage.link = document.getElementById("inputGagLink").value;
      }
      if (document.getElementById("postTitle").value == "") {
        return alert(" Oops ! Title article vide.");
      }
      if (document.getElementById("postTxt").value == "") {
        return alert(" Oops ! Champ message vide.");
      }

      axios
        .post(
          "http://127.0.0.1:3000/api/createPost",
          {
            commentaires: document.getElementById("postTxt").value,
            postTitle: document.getElementById("postTitle").value,
            createurId: localStorage.userId,
            link: localStorage.link,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.token,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          if (response.data.erreur) {
            this.error = response.data.erreur;
          }
          if (response.data.message == "OK") {
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Erreur");
        });

      document.getElementById("myPopup").style.display = "none";
      document.getElementById("buttonCrea").style.display = "inline-block";
      document.getElementById("placePost").style.display = "block";
      this.$router.go(0);
    },
    openPost() {
      document.getElementById("placePost").style.display = "none";
    },
    popIt() {
      localStorage.removeItem("link");

      document.getElementById("myPopup").className = "show";
      (document.getElementById("myPopup").style.display = "flex"), 10;
      (document.getElementById("buttonCrea").style.display = "none"), 10;
      document.getElementById("placePost").style.display = "none";
    },

    getPosts() {
      axios.get("http://127.0.0.1:3000/api/posts").then((response) => {
        console.log(response.data);
         if(localStorage.moderateur == '1') { 
          document.getElementById("buttonCrea").style.display = "none" 
          document.getElementById("modBar").style.display = "block"        
          }
        response.data.forEach(function(x) {
          if (x.link != null) {
            localStorage.link = x.link;
          }
          if (
            document.getElementById("placePost").insertAdjacentHTML == undefined
          ) {
            alert("yay");
            this.$router.go(0);
          }
          document.getElementById("placePost").insertAdjacentHTML(
            "afterbegin",
            `<ul>
                <li class="classli" data-id="${
                  x.postId
                }" onclick="function openPost(){  document.getElementById('placePost').style.display ='none'; 
                document.getElementById('thePostButton').style.display ='block';
                }
                 function getDataId(d){
                 localStorage.postId = d.getAttribute('data-id');
                 }
                 getDataId(this);
                
                 ; openPost()" >
                <button class="forumBut" tabindex="0"  data-id="${
                  x.postId
                }" onclick="function openPost(){  document.getElementById('placePost').style.display ='none'; 
                document.getElementById('thePostButton').style.display ='block';
                }
                 function getDataId(d){
                 localStorage.postId = d.getAttribute('data-id');
                 }
                 getDataId(this);
                
                 ; openPost()" ></button>
                 <span class="forumTable_crea"><span class="userTxt">${getUser(
                   x,
                   0
                 )} <span class="forumTable_crea_text"> créé à </span>  
                 <span class="timeStamp">${x.timeStamp}</span></span>
                <span class="postTitles">${x.postTitle}</span>
                <span class="postContent">${x.commentaires}</span>
                <span class="linked">${linkHere()}</span>
                </span>  </li>
              </ul> `
          );
        });
      });
    },
  },
};

function getUser(k, b, n) {
  
  if(localStorage.myUserList == undefined) { console.log('refreshin getUser'); window.location.assign("http://localhost:8080/login")
    }
  while (myUsersList[0][b].id != k.createurId) {
    //
    if (myUsersList[0][b].id != undefined) {
      ++b;
    }

    if (myUsersList[0][b].id == k.createurId) {
      n = myUsersList[0][b].utilisateur;

      return n;
    }

    n = myUsersList[0][b].utilisateur;
  }
}
function linkHere() {
  if (localStorage.link == "" || undefined) {
    return "";
  }
  if (localStorage.link != undefined) {
    localStorage.linkGo = localStorage.link;
    localStorage.link = "";
    return `<a class="lienAcces9" href="${localStorage.linkGo}" target="_blank"><img src="https://i.ibb.co/3dgTpk9/9gagfun.png" alt="9gagfun" border="0" class="imgLien9gag"></a>
    `;
  } else {
    return "";
  }
}

function getUsers() {
  localStorage.myUserList = 'notEmpty'
  axios.get("http://127.0.0.1:3000/api/users").then((response) => {
    console.log(response.data);
    myUsersList.push(response.data);
  });
}
localStorage.myUserList = 'notEmpty'
let myUsersList = [];
getUsers();
</script>

<style lang="scss">
#modBar{ 
  display:none;
  float:right;
  margin-top: 12px;
  }
#modSearchPost{
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #07006b;
  padding: 5px;
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
@media screen and (min-width: 720px) and (max-width: 1367px) {
  .imgLien9gag {
    height: 47px !important;
    margin-top: -1px !important;
  }
  .userTxt {
    height: 5rem !important;
    width: 19% !important;
  }
  #indexArticle {
    display: none;
  }
  #indexTitre {
    top: 28.9% !important;
    left: 43.4% !important;
    display: none;
  }
  #indexUti {
    top: 28.9% !important;
    left: 18.7% !important;
    display: none;
  }
  .postTitles {
    border-right: 0 !important;
    left: 36% !important;
  }
  .postContent {
    display: none !important;
  }
  .classli {
    line-height: 5rem !important;
    height: 5rem !important;
  }

  .login_logo {
    width: 27% !important;
    top: 1.5% !important;
    /* left: unset !important; */
    left: 35% !important;
  }
  .forumTable_buttomAfficher {
    bottom: 0px !important;
  }
  .timeStamp {
    margin-top: -62px !important;
  }
} //tablet media screen
@media screen and (min-width: 320px) and (max-width: 719px) {
  #sendComment {
    right: 40% !important;
    top: 341px !important;
    bottom: unset !important;
  }
  #textAnswer {
    width: 98% !important;
    right: 0% !important;
  }
  .postTitles {
    border-right: 0 !important;
    background-color: white;
  }
  .forumTable_buttomAfficher {
    bottom: 20px !important;
  }
  #buttonCrea {
    position: relative !important;
    bottom: 21px !important;
  }
  .imgLien9gag {
    margin-top: -59px !important;
    height: unset !important;
    padding: unset !important;
    display: none !important;
  }
  .postContent {
    width: auto !important;
    left: unset !important;
    display: none !important;
  }
  .postTitles {
    width: 52% !important;
    left: 45% !important;
  }
  .timeStamp {
    margin-top: -47px !important;
  }
  .classli {
    line-height: 4rem !important;
    margin-left: -19%;
    margin-right: -6%;
    height: 68px;
  }
  .userTxt {
    height: 4rem !important;
    width: 37% !important;
    padding-bottom: 1%;
    margin-top: -1%;
    margin-left: 30px !important ;
    background-color: white;
  }
  .forumTable {
    margin-top: 11% !important;
    width: 100% !important;
    padding-top: 23px;
  }
  .forumTable_posts {
    margin-top: 7% !important;
  }
  #indexUti {
    left: unset !important;
    right: 57px !important;
    top: unset !important;
    // position: relative !important;
    bottom: 284px;
    display: none;
  }
  #indexTitre {
    left: 14px !important;
    bottom: 284px !important;
    top: unset !important;
    // position: relative !important;
    padding-left: 25px !important;
    padding-right: 25px !important;
    display: none;
  }
  #indexArticle {
    left: 65.4% !important;
    display: none !important;
  }
} // cellphone media
.forumBut{
  position: absolute;
    
    width: 31px;
    height: 28px;
    border: 0;
    background-color: black;
    opacity: 0;
}

body {
  margin: 0;
}
.classli {
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
.timeStamp {
  font-size: 0.8rem;
  display: block;
  margin-top: -73px;
}
#indexUti {
  position: absolute;
  top: 27.9%;
  left: 16.4%;
  background-color: #6b0200;
  color: white;
  padding: 2px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  box-shadow: 0px -6px 17px -6px #000000;
  border-bottom: solid black 1px;
}
#indexTitre {
  position: absolute;
  top: 27.9%;
  left: 33.4%;
  background-color: #6b0200;
  color: white;
  padding: 2px;
  padding-left: 35px;
  padding-right: 43px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  box-shadow: 0px -6px 17px -6px #000000;
  border-bottom: solid black 1px;
}
#indexArticle {
  position: absolute;
  top: 27.9%;
  left: 59.4%;
  background-color: #6b0200;
  color: white;
  padding: 2px;
  padding-left: 35px;
  padding-right: 43px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  box-shadow: 0px -6px 17px -6px #000000;
  border-bottom: solid black 1px;
}
.postContent {
  position: relative;
  left: 49%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 497px;
  display: block;
}
.postTitles {
  position: absolute;
  left: 28%;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: 291px;
  border-right: 2px solid;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  text-decoration: underline;
}
ul {
  margin-left: -29px;
}
li {
  line-height: 6rem;
  border: solid 2px;
  box-shadow: 5px 5px 15px 5px #000000;
  cursor: pointer;
  list-style: none;
}
.userTxt {
  border: solid 2px;
  height: 6rem;
  display: block;
  width: 10%;
  position: absolute;
  box-shadow: -12px 5px 15px 5px #000000;
  margin-top: -2px;
  margin-left: -2px;
  white-space: nowrap;
  overflow: hidden;
}
.imgLien9gag {
  height: 65px;
  position: relative;
  border: solid 1px;
  display: block;
  float: right;
  padding: 1rem;
  box-shadow: 5px 5px 15px 5px #000000;
  margin-top: -98px;
  /* width: 65px; */
  background-color: white; 
  
}

.lienAcces9:focus-visible{
  
      border: solid 4px black !important;    
}
#inputGagLink {
  display: none;
  position: absolute;
  top: 102%;
  text-align: center;
}
#icon9gagLogo {
  width: 6%;
  margin-top: 4px;
}
.forumTable_buttomAfficher {
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #6b0200;
  padding: 10px;
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
#buttonCrea {
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
  &_gagLink {
    position: absolute;
    right: 67%;
    bottom: 1%;
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #6b0200;
    padding: 13px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;
    margin: 1%;
    position: absolute;
    transition: background-color 400ms, box-shadow 350ms;
    &:hover {
      background-color: black;
    }
  }
  &_form {
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #6b0200;
    padding: 22px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;
    margin: 1%;
    position: absolute;
    transition: background-color 400ms, box-shadow 350ms;
    &:hover {
      background-color: black;
    }
  }
}
input {
  font-size: 1.2rem;
  text-align: justify;
}

#myPopup {
  height: 34%;
  width: 40%;
  display: none;
  visibility: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 1%;
  position: absolute;
  top: 25%;
  left: 30%;
  background-color: rgba(238, 235, 235, 0.966);
  border-radius: 20px;
  z-index: 1;
}
.popuptext {
  margin-top: 3%;
}

#postTxt {
  margin-top: 5px;
  margin-bottom: 3px;
  height: 88%;
  width: 58%;
  text-align: center;
}
#postTitle {
  margin-top: 2%;
  height: 25%;
  width: 42%;
  text-align: center;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.show {
  animation-name: fadeIn;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}
.dissapear {
  animation-name: disappearIt;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes disappearIt {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {
    visibility: hidden;
    display: none;
  }
  to {
    visibility: visible;
    display: flex;
  }
}

@keyframes fadeIn {
  from {
    visibility: hidden;
    display: none;
  }
  to {
    visibility: visible;
    display: block;
  }
}
#every {
  display: flex;
  justify-content: center;
}

.forumTable {
  border: solid black 1px;
  border-radius: 12px;
  box-shadow: 5px 5px 15px 5px #000000;
  width: 80%;
  height: fit-content;

  & > button {
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
  &_buttomAfficher {
    position: relative;
  }
  &_buttomCreatePost {
  }
  &_posts {
    border: solid #f1f1f1 2px;
    border-radius: 12px;
    width: 90%;
    height: fit-content;
    min-height: 400px;
    margin: auto;
    margin-top: 2%;
  }
  &_crea {
    &_text {
      font-size: 0.8rem;
    }
  }
}
</style>

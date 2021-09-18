<template>
 <div id="chercherArticle"> 
     Rechercher avec: <input class="inputChercheArticle" id="cherchArticleId" type="text" aria-label="Chercher Articles par Post Id" placeholder="POST Id"> 
     Rechercher avec: <input class="inputChercheArticle" id="cherchArticleUser" type="text" aria-label="Chercher Articles par User Id" placeholder="USER Id"> 
     <button @click="modCherchArticle"><i class="fas fa-gavel modGo"></i></button>
     <div id="userArticles"> 
          <i id="closethis" @click="closethis" class="fas fa-window-close"></i> 
         
     </div>
 </div>

 
</template>

<script>
import axios from "axios";
export default {
  name: "Mod",

  methods: {
      closethis(){
           document.getElementById("userArticles").style.display = "none"
           this.$router.go(0)

      },
      modCherchArticle(){

          if(localStorage.moderateur != '1') {return alert('Acces interdit')}

          if( document.getElementById("cherchArticleId").value != ''){            
              localStorage.postId = document.getElementById("cherchArticleId").value;
          axios.post("http://127.0.0.1:3000/api/openPost", {
          thePostId: document.getElementById("cherchArticleId").value,
        })
        .then((response) => {
            document.getElementById("mod").style.display = "block";
            console.log('ICI MOD ART', response.data)
            document.getElementById("thePost").style.display = "block"
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
            

        })
        }
          if( document.getElementById("cherchArticleUser").value != '') {
              document.getElementById("userArticles").style.display = "block"

               axios.post("http://127.0.0.1:3000/api/ByUser", {
          userId: document.getElementById("cherchArticleUser").value,
        })
        .then((response) => {
            console.log('Cherch USER', response.data)
            response.data.forEach(function(j){
                document.getElementById("userArticles").insertAdjacentHTML(
            "afterbegin",
            `
                <p class="bord2" data-id="${
                  j.thePostId
                }" onclick="function openPost(){  document.getElementById('userArticles').style.display ='none';
                document.getElementById('every').style.display ='none'
                document.getElementById('placePost').style.display ='none' 
                document.getElementById('thePostButton').style.display ='block';
                }
                 function getDataId(d){
                 localStorage.postId = d.getAttribute('data-id');
                 }
                 getDataId(this);
                
                 ; openPost()" >
                <button class="forumBut" tabindex="0"  data-id="${
                  j.thePostId
                }" onclick="function openPost(){  document.getElementById('placePost').style.display ='none'; 
                document.getElementById('thePostButton').style.display ='block';
                }
                 function getDataId(d){
                 localStorage.postId = d.getAttribute('data-id');
                 }
                 getDataId(this);
                
                 ; openPost()" ></button>
                <span class="postIdCherch">Post ID : ${j.thePostId}</span>         
                <span class="postTitlesCherch">${j.thePostTitle}</span>
              
                </p>
                 `
                )
                
            })
        })

              

          }
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
#closethis{
        position: absolute;
    font-size: 2rem;
    color: crimson;
    top: -41px;
    left: 85%;
    /* bottom: 131px; */
    cursor: pointer;
}

.bord2{
    min-height: 2rem;
    border: solid 2px black;
    max-width: 80%;
    margin: auto;
    margin-top: 20px;
    text-align: center;
    padding-top: 4px;
    display: flex;
        align-items: center;
}
.postIdCherch{
    padding: 5px;
    border-bottom: solid 2px blue;
    font-weight: bolder;
    width: 20%;
    margin-right: 7px;
}
</style>
<style scoped lang="scss">

#chercherArticle{ 
    display: none;
    margin-bottom: 1%;}
.inputChercheArticle {
    width: 120px;
    margin: 20px;
}   
.modGo{
    font-size: 1rem;
    padding: 7px;
    color: #b10202;
}
#userArticles
{
    display: none;
        width: 100%;
    height: 100%;
    position: absolute;
    background-color: white;
    z-index: 1;
}


</style>


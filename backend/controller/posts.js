var mysql = require('mysql');
const env = require('dotenv').config();
const bcrypt = require('bcrypt');

var mysqlLogin = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'gaglianone_projet7',
  multipleStatements: true
}




exports.headers = (req, res, next)=>{
    console.log('requete Auth Post');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
}
exports.deleteAcc = (req, res, next) => {
  
   console.log('Trying to Delete Acc')
  var con = mysql.createConnection(mysqlLogin);

  con.connect((err) => {
    if (err){
        return res.status(401).json({message: 'impossible de se connecter à la BDD'})
    }
    console.log("Connecté à la base de donnée");
    
  }); 
  
  
  con.query(`SELECT * FROM users WHERE users.id = ${req.body.userId}; ` , (err,result) =>{
    
    bcrypt.compare(req.body.password,result[0].password, (err2,resultat2) =>{
      console.log('resultat2 ', resultat2)
      if(!resultat2){
          console.log("mdp non valide")
          return res.status(200).json({erreur: 'mot de passe non valide'});
      }
      if(err2){
          console.log(err2)
          con.end()
          return res.status(401).json({message: err2})
      }
         const deleteIt = `DELETE users
         FROM users
         WHERE users.id = ${req.body.userId};  
         DELETE FROM postsDetails 
         WHERE postsDetails.createur = ${req.body.userId}; 
         DELETE FROM posts
         WHERE posts.createurId = ${req.body.userId};`
  con.query(deleteIt, (err3,result3) =>{ 
    console.log('result 3', result3)
    console.log('ID ',req.body.userId)
    con.end()
    return res.status(200).json(result3)
    
  }) //end query deleteIt
}) //end b crypt
})// end query select
}// end deleteAcc

  


exports.openPost = (req, res, next) => {

  console.log('Open dem Post')
  var con = mysql.createConnection(mysqlLogin);

  con.connect((err) => {
    if (err){
        return res.status(401).json({message: 'impossible de se connecter à la BDD'})
    }
    console.log("Connecté à la base de donnée");
    
  });

  con.query(`SELECT users.utilisateur, postsDetails.userInPost, postsDetails.commentedPost,postsDetails.thePostId, postsDetails.thePostTitle, postsDetails.thePostArticle, postsDetails.thePostLink, DATE_FORMAT(timeStampOnPost, '%d-%m-%Y à %T') AS timeStampOnPost  FROM postsDetails INNER JOIN users WHERE ${req.body.thePostId} = postsDetails.thePostId AND postsDetails.createur = users.Id ` , (err,result) =>{
    if(err){
        console.log(err)
        con.end()
        return res.status(401).json({message: err})
    }
    console.log(result)
    con.end()
    return res.status(200).json(result)
  })
}
exports.getMePosts = (req, res, next)=> { 
  console.log('getting me posts')
  
  var con = mysql.createConnection(mysqlLogin);

    con.connect((err) => {
      if (err){
          return res.status(401).json({message: 'impossible de se connecter à la BDD'})
      }
      console.log("Connecté à la base de donnée");
      
    });

    con.query(`SELECT thePostId, thePostTitle, thePostArticle, thePostLink,DATE_FORMAT(timeStampOnPost, '%d-%m-%Y à %T') AS timeStampOnPost FROM postsDetails WHERE createur = ${mysql.escape(req.body.userId)}`, (err,result) =>{
      if(err){
          console.log(err)
          con.end()
          return res.status(401).json({message: err})
      }
      console.log(result)
      
      con.end()
      return res.status(200).json(result)
    })

}
exports.getComments = (req, res, next)=> {
  console.log(req.body.postId)
  console.log('getting Comments')
  console.log(req.body)
  var con = mysql.createConnection(mysqlLogin);

    con.connect((err) => {
      if (err){
          return res.status(401).json({message: 'impossible de se connecter à la BDD'})
      }
      console.log("Connecté à la base de donnée");
      
    });

    con.query(`SELECT  users.utilisateur, postsDetails.commentaireId, DATE_FORMAT(postsDetails.timeStampOnPost, '%d-%m-%Y à %T') AS timeStampOnPost,postsDetails.userInPost, postsDetails.commentedPost, postsDetails.createur FROM postsDetails INNER JOIN users WHERE postsDetails.thePostId = ${req.body.postId} AND postsDetails.userInPost = users.Id `, (err,result) =>{
      if(err){
          console.log(err)
          con.end()
          return res.status(401).json({message: err})
      }
      console.log(result)
      console.log('comun fini')
      con.end()
      return res.status(200).json(result)
    })
}
exports.changeMdp = (req, res, next)=> {
  console.log('Change MDP')
  bcrypt.hash(req.body.password, 10, (err,hash)=>{
  var con = mysql.createConnection(mysqlLogin);

    con.connect((err) => {
      if (err){
          return res.status(401).json({message: 'impossible de se connecter à la BDD'})
      }
      console.log("Connecté à la base de donnée");
      
    });
    con.query(`UPDATE users SET password = ${mysql.escape(hash)} WHERE ${mysql.escape(req.body.userId)} = users.Id` , (err,result) =>{
      if(err){
          console.log(err)
          con.end()
          return res.status(401).json({message: err})
      }
   
    console.log(result)
    con.end()
    return res.status(200).json(result) 
  })
  });
}
exports.postById = (req, res, next)=> { 
  var con = mysql.createConnection(mysqlLogin);

    con.connect((err) => {
      if (err){
          return res.status(401).json({message: 'impossible de se connecter à la BDD'})
      }
      console.log("Connecté à la base de donnée");
      
    });
    con.query(`SELECT * from postsDetails WHERE thePostId = ${mysql.escape(req.body.postId)}`  , (err,result) =>{
      if(err){
          console.log(err)
          con.end()
          return res.status(401).json({message: err})
      }
   
    console.log(result)
    con.end()
    return res.status(200).json(result) 
  })
  
}
exports.getCommented  = (req, res, next)=> {
  console.log('Search Commenteds')
  var con = mysql.createConnection(mysqlLogin);

  con.connect((err) => {
    if (err){
        return res.status(401).json({message: 'impossible de se connecter à la BDD'})
    }
    console.log("Connecté à la base de donnée");
    
  });
  con.query(`SELECT thePostId, commentedPost,timeStampOnPost,thePostTitle,thePostArticle,commentaireId, createur FROM postsDetails WHERE userInPost=${mysql.escape(req.body.userId) }` , (err,result) =>{
    if(err){
        console.log(err)
        con.end()
        return res.status(401).json({message: err})
    }
 
  console.log(result)
  con.end()
  return res.status(200).json(result) 
})

}

exports.changeUtilisateur = (req, res, next)=> {
  console.log('Change Utilisateur')
 
  var con = mysql.createConnection(mysqlLogin);

    con.connect((err) => {
      if (err){
          return res.status(401).json({message: 'impossible de se connecter à la BDD'})
      }
      console.log("Connecté à la base de donnée");
      
    });
    con.query(`UPDATE users SET utilisateur = ${mysql.escape(req.body.utilisateur)} WHERE ${mysql.escape(req.body.userId)} = users.Id`  , (err,result) =>{
      if(err){
          console.log(err)
          con.end()
          return res.status(401).json({message: err})
      }
   
    console.log(result)
    con.end()
    return res.status(200).json(result) 
  })
  
}

exports.commenterPost = (req, res, next)=> {
  console.log('COMMENT IT')
  var con = mysql.createConnection(mysqlLogin);

    con.connect((err) => {
      if (err){
          return res.status(401).json({message: 'impossible de se connecter à la BDD'})
      }
      console.log("Connecté à la base de donnée");
      
    });

    con.query(`INSERT INTO postsDetails(thePostId, userInPost,commentedPost) VALUES(${mysql.escape(req.body.postId)}, ${mysql.escape(req.body.userId)},${mysql.escape(req.body.commentaire)} )`, (err,result) =>{
      if(err){
          console.log(err)
          con.end()
          return res.status(401).json({message: err})
      }
      console.log(result)
      con.end()
      return res.status(200).json(result)
    })
}

exports.deleteThisPost = (req, res, next)=>{
  console.log("Deleting this post")
  var con = mysql.createConnection(mysqlLogin);

  con.connect((err) => {
    if (err){
        return res.status(401).json({message: 'impossible de se connecter à la BDD'})
    }
    console.log("Connecté à la base de donnée");
    
  });

  con.query(`DELETE FROM posts WHERE posts.postID = ${req.body.thePostId}; DELETE FROM postsDetails WHERE postsDetails.thePostId = ${req.body.thePostId}` , (err,result) =>{
    if(err){
        console.log(err)
        con.end()
        return res.status(401).json({message: err})
    }
    console.log(result)
    con.end()
    return res.status(200).json(result)
  })
}
 

exports.getPosts = (req,res,next) =>{
    console.log('GET posts')

    var con = mysql.createConnection(mysqlLogin);

      con.connect((err) => {
        if (err){
            return res.status(401).json({message: 'impossible de se connecter à la BDD'})
        }
        console.log("Connecté à la base de donnée");
        
      });

      con.query("SELECT posts.postId, posts.postTitle, posts.commentaires, posts.userId, posts.link, posts.createurId, DATE_FORMAT(timeStamp, '%d-%m-%Y à %T') AS timeStamp FROM posts;", (err,result) =>{
        if(err){
            console.log(err)
            con.end()
            return res.status(401).json({message: err})
        }
        console.log(result)
        con.end()
        return res.status(200).json(result)
      })
    
}


exports.getUsers = (req,res,next) =>{
  console.log('GET users')

  var con = mysql.createConnection(mysqlLogin);

  con.connect((err) => {
    if (err){
        return res.status(401).json({message: 'impossible de se connecter à la BDD'})
    }
    console.log("Connecté à la base de donnée");
    
  });

  con.query("SELECT * FROM `users`", (err,result) =>{
    if(err){
        console.log(err)
        con.end()
        return res.status(401).json({message: err})
    }
    console.log(result)
    con.end()
    return res.status(200).json(result)
  })
}

exports.createPost = (req,res,next) =>{
  console.log('POST createPost')

  var con = mysql.createConnection(mysqlLogin);

  con.connect((err) => {
    if (err){
        return res.status(401).json({message: 'impossible de se connecter à la BDD'})
    }
    console.log("Connecté à la base de donnée");
    
  });
  console.log(req.body.title, req.body.content, req.body.user, req.body.cat)
  con.query(`INSERT INTO posts(postTitle, commentaires, createurId,link) VALUES (${mysql.escape(req.body.postTitle)}, ${mysql.escape(req.body.commentaires)}, ${mysql.escape(req.body.createurId)}, ${mysql.escape(req.body.link)})`, (err, result) =>{
    if(err){
      console.log(err)
      con.end()
      return res.status(401).json({message: err})
    }

    con.end()
    return res.status(200).json({message: 'ok'})

  })
}


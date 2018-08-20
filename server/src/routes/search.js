const express = require('express')
const router = express.Router()
const Bookmark= require('../models/bookmark')
const mongoose= require('mongoose')
const checkAuth = require("../middleware/auth-check");
const axios= require('axios')




// root get route
router.get('/allbookmarks',checkAuth, async (req, res, next) => {
  try {
    
   
    let docs= await Bookmark.find().select("name repoId _id  userId repo_url")
    
      
          if(docs.length<1){
             res
               .status(200)
               .json({ message: "no bookmark found" });
          }
      else {  res.status(200).json({ docs});}
       
  
    }
    catch(err) {
      res.status(500).send({ message: err });
    }


})

// root post route
router.get('/repositories/:searchTerm', async(req, res, next) => {

  try{
    const searchTerm = req.params.searchTerm;
   
    const {data}= await axios.get(`https://api.github.com/search/repositories?q=${searchTerm}`)
      
     if(data.items[0]){
      let response=data.items.slice(0,16).map(item=>{
        return {
          name:item.name,
          bookmark:false,
          id:item.id,
          url:item.html_url,
          forks:item.forks?item.forks:"not available"
        }})
      
       return  res.status(200).send(response)
    }
   else { res.status(500).send({message:'no repositories found'})}

  }
    catch(err) {
      res.status(500).send({ message: err });
    }

});


router.post("/", checkAuth, async (req, res, next) => {
  try {
    
    const bookmark = await new Bookmark({
      _id: new mongoose.Types.ObjectId(),
      userId: req.userData.userId,
      name: req.body.name,
      repoId:req.body.id,
      repo_url:req.body.url
    });
    await bookmark.save();
    res.status(201).json({
      message: "new bookmark added"
    });
  } 
  catch (err) {
    res.status(500).send({ message: err });
  }
});



//  delete route
router.delete("/:Id",checkAuth, async(req, res, next) => {
  
  const id = req.params.Id;
  const repo = await Bookmark.findById(id)
    .select("name repoId _id  userId repo_url")
    .exec();

    Bookmark.remove({ _id: id })
    .exec()
    .then(() => {
     res.status(200).json({ message: repo.name + " is deleted" });

    })
    .catch(err => {
      res.status(500).send({ message: err });
    });

});


module.exports= router;

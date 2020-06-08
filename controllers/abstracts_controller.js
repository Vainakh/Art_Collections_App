const express = require('express');
const abstracts = express.Router();
const {
  Abstract 
} = require('../models/paintings');


abstracts.put('/:id/edit', (req, res) => {
 
  Abstract.findByIdAndUpdate(req.params.id, req.body, (err, painting) => {
    console.log(err)
      //  res.redirect('/abstracts')
      res.redirect("/abstracts")
   })
 });

 abstracts.get("/:id/edit", (req, res) => {
  
  const id = req.params.id
  console.log(id)
  res.render("editAbstracts.ejs",
    {
      abstract: id
    }
  );
});

//2 index/show route abstracts
abstracts.get("/", (req, res) => {
  Abstract.find((error, data) => {
    
    if(error){
      console.log(error)
    } else {
      res.render(
        "abstracts.ejs",
        {
          abstracts:data
        }
      )
    }
  })
});

//4 new route abstracts
abstracts.get("/new", (req, res) => {
  res.render("new.ejs");
});

abstracts.get("/:id", (req, res) => {
  Abstract.findById(req.params.id, (err, data) => {
      res.render(
        "showAbstracts.ejs",
        {
          abstract: data
        }
      )
  });
});



module.exports = abstracts;

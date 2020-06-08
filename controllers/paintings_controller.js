const express = require('express');
const paintings = express.Router();

const {
  Painting 
} = require('../models/paintings');

paintings.get("/:id/edit", (req, res) => {
  console.log("Goodbuy!")
  const id = req.params.id
  console.log(id)
  res.render("editPaintings.ejs",
    {
      painting: id
    }
  );
});

paintings.put('/:id/edit', (req, res) => {
  console.log("Hello World")
  Painting.findByIdAndUpdate(req.params.id, req.body, (err, painting) => {
    console.log(err)
      //  res.redirect('/paintings')
      res.redirect("/paintings")
   })
 });

 // 2 index/show route paintings
paintings.get("/", (req, res) => {
  Painting.find((error, data) => {
    
    if(error){
      console.log(error)
    } else {
      res.render(
        "paintings.ejs",
        {
          paintings:data
        }
      )
    }
  })
});

paintings.get("/new", (req, res) => {
  res.render("newPainting.ejs")
});

//3 new route paintings
// paintings.get("/new", (req, res) => {
//   res.render("new.ejs");
// });

paintings.get("/:id", (req, res) => {
  Painting.findById(req.params.id, (err, data) => {
      res.render(
        "showPaintings.ejs",
        {
          painting: data
        }
      )
  });
});

// 4 create painting route


paintings.post("/new/create", (req, res) => {
  // console.log(req.body)
  Painting.create(req.body, (error, data) => {
    console.log(error)
    
    res.redirect("/paintings")
  })
});

//5 delete painting route
paintings.post("/delete/:id", (req, res) => {
  console.log(req.params.id)
  Painting.findByIdAndRemove( req.params.id, (err, painting) => {
    if(err){
      console.log(err)
    } 
    res.redirect("/paintings");
  })
});


module.exports = paintings;


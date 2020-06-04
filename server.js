//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require("dotenv").config()
const Painting = require("./models/paintings");
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes

//1 home route

app.get("/", (req, res) => {
  res.render("home.ejs")
  // res.redirect("/paintings");
});

//6 edit route
// app.get('/logs/edit/:id', (req, res) => {
//   Log.findById(req.params.id, (err, data) => { 

//       res.render(
//       'edit.ejs',
//       {
//         log: data 
//       }
//     );
//   });
// });

// 2 index/show route
app.get("/paintings", (req, res) => {
  Painting.find((error, data) => {
    
    if(error){
      console.painting(error)
    } else {
      res.render(
        "index.ejs",
        {
          paintings:data
        }
      )
    }
  })
});

//3 new route
app.get("/paintings/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/paintings/:id", (req, res) => {
  Painting.findById(req.params.id, (err, data) => {
      res.render(
        "show.ejs",
        {
          painting: data
        }
      )
  });
});

//7 put route
// app.put('/logs/:id', (req, res) => {
  
//  Log.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
//       res.redirect('/logs')
//   })
// });



//4 create route
// app.post("/logs/new/create", (req, res) => {
//   // console.log(req.body)
//   if (req.body.shipIsBroken === "on") {
//     req.body.shipIsBroken = true
//   } else {
//     req.body.shipIsBroken = false
//   }
//   Log.create(req.body, (error, data) => {
//     console.log(error)
//     res.redirect("/logs/")
//   })
// });

//5 delete route
// app.post("/logs/delete/:id", (req, res) => {
//   console.log(req.params.id)
//   Log.findByIdAndRemove( req.params.id, (err, log) => {
//     if(err){
//       console.log(err)
//     } 
//     res.redirect("/logs");
//   })
// });

// seed many

// app.get('/seed', async (req, res) => {
//   const newPaintings =
//     [
//       {
//        title: "Flowers",
//        author: "Andy Warhol",
//        year: 1964,
//        imageURL: "https://learnodo-newtonic.com/wp-content/uploads/2014/09/Flowers-1964-Andy-Warhol.jpg",
//        body: "Pop Art was an influential 20th century art movement in which artists focused on modern popular culture and the mass media. Andy Warhol was an American artist who is known as the Pope of Pop Art. At a time when he was concentrating on consumerism, celebrity, death and disasters, the Flower series of Andy Warhol was a complete departure for the artist as it depicted a completely different subject. This is one of seven monumental-scale paintings of flowers by him. Even through the Flower series is not Pop Art, it remains one of the most famous works of Warhol. The source image for the series was a photograph published in the 1964 issue of Modern Photography taken by the nature photographer Patricia Caulfield. Ironically for an artist known for his images of brands, Warhol was sued by Caulfield for unauthorized use of her image of flowers."
//       },
//{
  //        title: “Sunflowers”,
  //        author: "Vincent Van Gogh",
  //        year: 1888,
  //        imageURL: "https://learnodo-newtonic.com/wp-content/uploads/2014/11/Vase-with-Fifteen-Sunflowers-1888-Vincent-Van-Gogh.jpg",
  //        body: "Vincent Van Gogh is considered a master of still life paintings and his series of paintings on “sunflowers“ rank among the most famous still life paintings ever created. The paintings are well known for depicting the natural beauty of the flowers and for their vibrant colors. They show the sunflowers in all stages of life, from full bloom to withering. The above painting, which is titled Vase with Fifteen Sunflowers, was sold to a Japanese investor for almost $40 million in March 1987. This was, at the time, a record-setting amount for a work of art. The price was over three times the previous record of about $12 million. Van Gogh’s Sunflowers series is not only one of his best known works but also one of the most renowned portrayal of flowers."
  //       } 
//     ]

//   try {
//     const seedPaintings = await Painting.create(newPaintings)
//     res.send(seedPaintings)
//   } catch (err) {
//     res.send(err.message)
//   }
// })

//seed one 

// app.get('/seed', async (req, res) => {
//   const newPaintings =
//     [
//         {
//           title: "Water Lillies",
//           author: "Claude Monet",
//           year: 1896,
//           imageURL: "https://learnodo-newtonic.com/wp-content/uploads/2013/07/Water-Lilies-Nympheas.5-by-Claude-Monet.jpg",
//           body: "Impressionism was one of the most influential movements in modern art. Its artists focused on capturing the momentary effect of a scene rather than accurately depicting it. The “Nympheas” or Water Lilies series of Claude Monet has been described as “The Sistine Chapel of Impressionism”. It consists of approximately 250 oil paintings which were created by Monet during the last 30 years of his life. They are now on display in museums all around the world. The dazzling complexity of color and light in the panels opens the viewer’s eyes to the incredible diversity of nature and to the depth and mystery of the life it sustains. An amazing thing about these works is that Monet’s eyesight was badly deteriorating due to cataract while he painted most of these masterpieces. Claude Monet’s water-lily paintings are among the most recognized and celebrated works of 20th Century art and they perhaps the most famous flower paintings of all time."
//         } 
//     ]

//   try {
//     const seedPaintings = await Painting.create(newPaintings)
//     res.send(seedPaintings)
//   } catch (err) {
//     res.send(err.message)
//   }
// })


//schema
// {
    //  title: { type: String },
    //  author: { type: String },
    //  year: { type: Number}
    //  imageURL: { type: String },
    //  body: { type: String}
// }









//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
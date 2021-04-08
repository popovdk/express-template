const { Router } = require('express')
var pdf = require("pdf-creator-node");
var fs = require("fs");

const router = Router()

var html = fs.readFileSync("api/routes/template.html", "utf8");

 var options = {
        width: '3508px',
        height: '2480px',
    };

var users = [
  {
    name: "Shyam",
    age: "26",
  },
  {
    name: "Navjot",
    age: "26",
  },
  {
    name: "Vitthal",
    age: "26",
  },
];
var document = {
  html: html,
  data: {
    users: users,
  },
  path: "./output.pdf",
  type: "stream",
};


// Test route
router.use('/test', async (req, res) => {
  const file = await pdf.create(document, options)
  res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'inline; filename=quote.pdf');
file.pipe(res);

  // res.end('Test API!')
})

module.exports = router

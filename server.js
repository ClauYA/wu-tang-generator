const path = require('path');
const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
const server = http.createServer(function(req, res) {
const page = url.parse(req.url).pathname;
const params = querystring.parse(url.parse(req.url).query);

// create an object to use as name and last name bank to sort and randomize 
const names = {
  a : {
    first : ['Sal ','Sally','Seymour','Slim', 'Sol'],
    last : ['Vate','Mander','Kleerly','Kleerly','Tood']
  },
  b : {
    first : ['Theo','Ty','Val','Vern', 'Willy'
    ],
    last : ['Retical','Tannic','Ubull','Ackuler ','Nilly']
  },
  c : {
    first : ['Paige','Anita','Art', 'Story','Cliff'],
    last : ['Turner','Bath','Major','Teller','Hanger']
  }
}
//Create a new list of array
function listRandom(list){
  //randomize a number out of this list
  return list[Math.floor(Math.random() * list.length)] 
}
//count how many times a,b,c show up and return how many times and return the highest count wins
function mostPicked(answered){
  const counts = {
    a:0,
    b:0,
    c:0
  };
  //wait
  answered.forEach(function(answer){
    if(counts[answer] !== undefined){
      //count how many times each a,b,c comes in
      counts[answer] += 1;
    }
  });
  let winner = 'a';
  //refer to the key and know when it counted
  if(counts.b > counts[winner]) winner = 'b';
  if(counts.c > counts[winner]) winner = 'c';
  return winner;
}

console.log(page);
      if (page == '/') {
        fs.readFile('index.html', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(data);
          res.end();
        });
      }else if (page == '/api') {
        const answers = [params.name1,params.name2,params.name3, params.name4]
        //most picked in the radio
        const letter = mostPicked(answers)
        //the most picked letter is going to be object used to get the random firs and last
        const group = names[letter]
        const name =listRandom(group.first) + ` ` + listRandom(group.last)
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({sendingValue : name}));


      }
       
      else if (page == '/css/style.css'){
        fs.readFile('css/style.css', function(err, data) {
          res.write(data);
          res.end();
        });
      }else if (page == '/js/main.js'){
        fs.readFile('js/main.js', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/javascript'});
          res.write(data);
          res.end();
        });
      }else if (page.startsWith('/img')){
        const imagePath = '.' + page;
        const ext = path.extname(imagePath).toLowerCase();
        const mimeTypes = {
          '.gif': 'image/gif',
          '.png': 'image/png',
          '.jpg': 'image/jpeg'
        }
        fs.readFile(imagePath, function(err, data) {
          res.writeHead(200, {'Content-Type': mimeTypes[ext] || 'application/octet-stream'});
          res.write(data);
          res.end();
        });
      }else{
        figlet('404!!', function(err, data) {
          if (err) {
              console.log('Something went wrong...');
              console.dir(err);
              return;
          }
          res.write(data);
          res.end();
        });
      }
    });
    
    server.listen(8000);

var application_root = __dirname,
  express = require("express"),
  path = require("path"),
  port = process.env.PORT || 3000,
  api = '/api',
  resource = api + '/contacts',
  app = express();

/* Config */

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get(api, function (req, res) {
  res.send('The Service is running');
});

/* CRUD Operations */

var Contacts = {
  "1": {firstName:"Abel", lastName:  "Able", telephone: "7141112222", email: "aable@gmail.com"},
  "2": {firstName:"Betty", lastName : "Baker", telephone : "7141112222", email : "bbaker@gmail.com"},
  "3": {firstName:"Charles", lastName : "Charlie", telephone : "7141112222", email : "ccharlie@gmail.com"},
  "4": {firstName:"Dan", lastName : "Delta", telephone : "7141112222", email : "ddelta@gmail.com"},
  "5": {firstName:"Eric", lastName : "Echo", telephone : "7141112222", email : "eecho@gmail.com"},
  "6": {firstName:"Frank", lastName : "Foxtrot", telephone : "7141112222", email : "ffoxtrot@gmail.com"},
  "7": {firstName:"George", lastName : "Golf", telephone : "7141112222", email : "ggolf@gmail.com"},
  "8": {firstName:"Herbert", lastName : "Hotel", telephone : "7141112222", email : "hhotel@gmail.com"},
  "9": {firstName:"Ivan", lastName : "India", telephone : "7141112222", email : "iindia@gmail.com"},
  "10": {firstName:"Julie", lastName : "Juliet", telephone : "7141112222", email : "jjuliet@yahoo.com"}
};

app.get(resource, function (req, res){
  /* do something */
  return res.send(Contacts);
});

app.get(resource + '/:id', function (req, res){
  var id = req.params.id;
  if(Contacts[id]) {
    return res.send(Contacts[id]);
  } else {
    console.log('contact not found: ' + id);
    return res.send('error');
  }
});

app.post(resource, function (req, res){
  var contact = {
    firstName: req.body.firstName,
    lastName:  req.body.lastName,
    telephone: req.body.telephone,
    email: req.body.email
    },
    id = findNextId(Contacts);
  console.log("Next id = " + id);
  console.log(req.body);
  Contacts[id] = contact;
  return res.send(contact);
});

app.put(resource + '/:id', function (req, res){
  var contact = {
      firstName: req.body.firstName,
      lastName:  req.body.lastName,
      telephone: req.body.telephone,
      email: req.body.email
    },
    id = req.params.id;
  if(Contacts[id]) {
    Contacts[id] = contact;
    return res.send(contact);
  } else {
    console.log('contact not found: ' + id);
    return res.send('error');
  }
});

app.delete(resource + '/:id', function (req, res){
  var id = req.params.id;
  if(Contacts[id]) {
    delete Contacts[id];
    return res.send('deleted');
  } else {
    console.log('contact not found: ' + id);
    return res.send('error');
  }
});

var findNextId = function (con) {
  var id=0;
  do {
    id++;
  } while (con[id]);
  return id;
}

app.listen(port);
const FS = require('fs');
const PATH = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


// Jquery extraction from page

extractFromPage = (file) => {
  const dom = new JSDOM(file);

  function extractEmails(text) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  };

  function extractPattern(text) {
    return text.match(/([a-zA-Z0-9{}._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  };

  function extractDomain(text) {
    return text.match(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/);
  };


  var pattern = extractPattern(file);
  var emails = extractEmails(file);
  // //link extraction
  var linkExtract = dom.window.document.querySelector(".company-intro-container");
  if (linkExtract) {
    // var link = extractDomain(linkExtract.textContent);
    var link = linkExtract.getElementsByTagName('a');

  } else {
    link = [];
  };

  // // pattern extraction 
  // var patternExtract = dom.window.document.querySelector(".search-pattern");
  // var pattern = [];
  // if (!patternExtract) {
  //   pattern = extractPattern(dom.window.document.querySelector(".search-pattern").textContent);
  // };

  //results extraction
  //var result = extractEmails(dom.window.document.querySelector(".result").textContent);
  // console.log("------", pattern);
  // console.log("******", emails);


  //   var link = dom.window.document.querySelector(".company-intro-container").find('a').attr('href');
  //   var pattern = extractPattern(dom.window.document.querySelector(".search-pattern").text());
  //   var result = extractEmails(dom.window.document.querySelector(".result").text());

  var data = { link, pattern, emails };

  return data;
};


// READ FILES

function readFiles(dirPath, processFile) {
  // read directory
  FS.readdir(dirPath, (err, fileNames) => {
    if (err) throw err;
    // loop through files
    fileNames.forEach((fileName) => {
      // get current file name
      let name = PATH.parse(fileName).name;
      // get current file extension
      let ext = PATH.parse(fileName).ext;
      // get current file path
      let path = PATH.resolve(dirPath, fileName);
      // callback, do something with the file
      let file = FS.readFileSync(path, "utf8");
      let data = extractFromPage(file);
      processFile(name, ext, path, file, data);
    });
  });
};

readFiles('./pages/', (name, ext, path, file, data) => {
  // console.log(`file name is: ${name}`);
  // console.log(`file extension is: ${ext}`);
  // console.log(`file path is: ${path}`);
  // console.log(`file content is: ${file}`);
  console.log(`extracted data is: ${data}`);
  var text = JSON.stringify(data) + '\r\n';
  FS.appendFile("alldata.txt", text, function (err) {
    if (err) return console.log(err);
    console.log('successfully appended "' + text + '"');
  });

});
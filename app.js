const FS = require('fs');
const PATH = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

 
// Jquery extraction from page

extractFromPage = (file) => {
    const dom = new JSDOM(file);

    function extractEmails (text)
  {
      return text//.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  };
  
  function extractPattern (text)
  {
      return text.match(/([a-zA-Z0-9{}._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  };
  
  var link = [];
  if (!dom.window.document.querySelector(".company-intro-container")) {
    var link = dom.window.document.querySelector(".company-intro-container").textContent;
  };

//   var patternExtract = dom.window.document.querySelector(".search-pattern");
  var pattern = [];
  if (!patternExtract) {
     pattern = extractPattern(dom.window.document.querySelector(".search-pattern").textContent);
  };
  //var result = extractEmails(dom.window.document.querySelector(".result").textContent);
  console.log("------", pattern);
  
  
//   var link = dom.window.document.querySelector(".company-intro-container").find('a').attr('href');
//   var pattern = extractPattern(dom.window.document.querySelector(".search-pattern").text());
//   var result = extractEmails(dom.window.document.querySelector(".result").text());

  var data = {link, pattern, result};
      
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

  });
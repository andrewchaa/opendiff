const monacoLoader = require('monaco-loader');

monacoLoader().then((monaco) => {
  var diffEditor = monaco.editor.createDiffEditor(document.getElementById("container"));
  
  monaco.Promise.join([xhr('original.txt'), xhr('modified.txt')]).then((r) => {
    var originalTxt = r[0].responseText;
    var modifiedTxt = r[1].responseText;

    diffEditor.setModel({
      original: monaco.editor.createModel(originalTxt, 'text/plain'),
      modified: monaco.editor.createModel(modifiedTxt, 'text/plain')
    }); 
  })

}) 

function xhr(url) {
  var req = null;
  return new monaco.Promise(function(c,e,p) {
    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req._canceled) { return; }
      if (req.readyState === 4) {
        if ((req.status >= 200 && req.status < 300) || req.status === 1223) {
          c(req);
        } else {
          e(req);
        }
        req.onreadystatechange = function () { };
      } else {
        p(req);
      }
    };
    req.open("GET", url, true );
    req.responseType = "";
    req.send(null);
  }, function () {
    req._canceled = true;
    req.abort();
  });
}


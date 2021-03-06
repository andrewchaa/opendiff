const monacoLoader = require('monaco-loader');
const { remote } = require('electron');
const Mousetrap = require('mousetrap')

monacoLoader().then((monaco) => {
  console.log(remote.process.argv)
  console.log(remote.process.cwd())

  const argvPresent = remote.process.argv.length >= 3;
  const originalText = argvPresent ? remote.process.argv[1] : './original.txt';
  const modifiedText = argvPresent ? remote.process.cwd() + '/' + remote.process.argv[2] : './modified.txt';

  const diffEditor = monaco.editor.createDiffEditor(document.getElementById("container"), {
    automaticLayout: true
  })
  
  monaco.Promise.join([xhr(originalText), xhr(modifiedText)]).then((r) => {
    var originalTxt = r[0].responseText;
    var modifiedTxt = r[1].responseText;

    diffEditor.setModel({
      original: monaco.editor.createModel(originalTxt, 'text/plain'),
      modified: monaco.editor.createModel(modifiedTxt, 'text/plain')
    }); 
  })

  const navigator = monaco.editor.createDiffNavigator(diffEditor, 
    { followsCaret: true, ignoreCharChanges: true 
  })
  navigator.next();

  Mousetrap.bind('esc', () => remote.getCurrentWindow().close())
  Mousetrap.bind('up', () => navigator.previous())
  Mousetrap.bind('down', () => navigator.next())

  var myBinding = diffEditor.addCommand(monaco.KeyCode.Escape, () => remote.getCurrentWindow().close())
  var myBinding = diffEditor.addCommand(monaco.KeyCode.DownArrow, () => navigator.next())
  var myBinding = diffEditor.addCommand(monaco.KeyCode.UpArrow, () => navigator.previous())


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


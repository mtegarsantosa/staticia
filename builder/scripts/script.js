'use strict'
const compiled_template = Handlebars.compile(document.getElementById('template').innerHTML),
      content = document.querySelector("#content"),
      folder = [],
      file = []

const readdir = (d) => {
  for (var key in d) {
    if (key === 'file') {
      key = d[key]
      for (var i = 0; i < key.length; i++) {
        file.push(key[i])
      }
    }
    else {
      folder.push(key)
    }
  }
}

const urlParams = new URLSearchParams(window.location.search)
const f = urlParams.get('f')
var fs = f ? f.split(",") : false, fsa = ""
for (var i = 0; i < fs.length; i++) {
  fsa += `["${fs[i]}"]`
}

readdir(eval(`data${fsa}`))

var rendered = compiled_template({
  folder:folder, file:file
})
content.innerHTML = rendered

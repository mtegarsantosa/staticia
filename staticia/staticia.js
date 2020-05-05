/*Staticia Client JS by arsan [ID] (https://arsan.dev)*/
"use strict";
Handlebars.registerHelper({
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
});
const readdir = {
    file: [],
    folder: [],
    run: (e, r) => {
      for (var n in e)
        if ("file" === n) {
          n = e[n];
          for (var t = 0; t < n.length; t++) {
            let e = r ? `main/${r}/${n[t].name}` : `main/${n[t].name}`;
            readdir.file.push({
              name: n[t].name,
              extension: n[t].ext,
              url: e
            })
          }
        } else {
          let e = r ? `${r}/${n}` : n;
          readdir.folder.push({
            name: n,
            url: e
          })
        }
    }
  },
  routing = {
    fsa: "",
    url: "",
    run: () => {
      const e = new URLSearchParams(window.location.search).get("f");
      for (var r = !!e && e.split("/"), n = 0; n < r.length; n++) routing.fsa += `["${r[n]}"]`, routing.url += `/${r[n]}`;
      routing.url = routing.url.substring(1)
    }
  };
routing.run(), readdir.run(eval(`data${routing.fsa}`), routing.url);

window.addEventListener('load',
  function() {
    const compiled_template = Handlebars.compile(document.getElementById("template").innerHTML),
      content = document.querySelector("body");
    var rendered = compiled_template({
      dest: routing.url.split('/'),
      folder: readdir.folder,
      file: readdir.file
    });
    content.innerHTML = rendered;
  }, false);

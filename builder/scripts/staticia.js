/*Staticia Client JS by arsan [ID] (https://arsan.dev)*/"use strict";const readdir={file:[],folder:[],run:(e,r)=>{for(var n in e)if("file"===n){n=e[n];for(var t=0;t<n.length;t++){let e=r?`main/${r}/${n[t].name}`:`main/${n[t].name}`;readdir.file.push({name:n[t].name,ext:n[t].ext,url:e})}}else{let e=r?`${r}/${n}`:n;readdir.folder.push({name:n,url:e})}}},routing={fsa:"",url:"",run:()=>{const e=new URLSearchParams(window.location.search).get("f");for(var r=!!e&&e.split("/"),n=0;n<r.length;n++)routing.fsa+=`["${r[n]}"]`,routing.url+=`/${r[n]}`;routing.url=routing.url.substring(1)}};routing.run(),readdir.run(eval(`data${routing.fsa}`),routing.url);const compiled_template=Handlebars.compile(document.getElementById("template").innerHTML),content=document.querySelector("body");var rendered=compiled_template({dest:routing.url,folder:readdir.folder,file:readdir.file});content.innerHTML=rendered;

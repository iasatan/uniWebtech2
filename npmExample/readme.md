NPM, NodeJS alapok

sudo apt install npm
sudo apt install nodejs

Windowson Nodejs telepítése, npm jön vele.

NPM egy package manager

npmjs.com
jquery
0 dependency, 10000 dependants

npm -v
node -v

webstorm projket
npmTestProjekt empty
new file, index.html
index futtattása
test az indexbe
index.js készítése
js az indexbe

webstorm terminál 
npm init
npm install jquery@3.3.0 --save
dependency hell
npm install jquery@3.3.1 --save
^3.3.1 jelentése: minor version változhat
https://docs.npmjs.com/files/package.json

npm jquery hozzáadása az index.htmlhez

$(function(){
    $("#test").click(function () {
        alert("asd");
    })
});

$ = require('jquery');

sudo npm install -g browserify --save
browserify --help
browserify js/index.js -o bundle.js

sudo npm install -g yarn
yarn install
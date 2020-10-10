document.addEventListener('DOMContentLoaded', function () {

  var someVarName = window.localStorage.getItem("varKey");

  document.getElementById("gnomes").addEventListener("change", rollup, false); 
  document.querySelector('button').addEventListener('click', onclick, false)

  function rollup(){
    var e = document.getElementById("gnomes");
    var gnome = e.options[e.selectedIndex].value;
    var varName = gnome;
    window.localStorage.setItem("varKey", varName);
  }


  function onclick () {

    var e = document.getElementById("gnomes");
    var gnome = e.options[e.selectedIndex].value;
    var varName = gnome;
    window.localStorage.setItem("varKey", varName);
 
      chrome.tabs.query({currentWindow: true, active: true}, 
     function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, gnome)
    })
   }
   
}, false)
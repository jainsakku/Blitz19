!function(e){var t={};function n(a){if(t[a])return t[a].exports;var i=t[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(a,i,function(t){return e[t]}.bind(null,i));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=72)}({6:function(e){e.exports=JSON.parse('{"Literary":{"PenItDown":{"isTeam":false},"VersesVsVerses":{"isTeam":false},"JustAMinute":{"isTeam":false},"Puzzleria":{"isTeam":true},"Litwit":{"isTeam":true},"Kaavyanjali":{"isTeam":false},"Bhaavankur":{"isTeam":false}},"Dramatics":{"Tamasha":{"isTeam":true},"Rangbhoomi":{"isTeam":true},"Advitiya":{"isTeam":true},"Spoof":{"isTeam":true}},"MusicAndSpicMacay":{"Breakfree":{"isTeam":true},"RambaSamba":{"isTeam":true},"Dhun":{"isTeam":false},"HitTheStreet":{"isTeam":true},"Nrityanjali":{"isTeam":false},"TheVoiceChoice":{"isTeam":false},"CelebNight":{"isTeam":false},"BattleOfBands":{"isTeam":false},"EDMNight":{"isTeam":false}},"FineArts":{"ClayMiti":{"isTeam":true},"Contrasto":{"isTeam":true},"SkyWar":{"isTeam":true},"TreasureHunt":{"isTeam":true},"SymphonyOfColours":{"isTeam":true},"DesignMe":{"isTeam":true},"Trashion":{"isTeam":true},"DribbleTheMarble":{"isTeam":true},"RibbionArt":{"isTeam":true},"HouseIt":{"isTeam":true},"Panache":{"isTeam":true}},"FilmAndPhotography":{"VineOMania":{"isTeam":true},"ShortFilmMaking":{"isTeam":true},"SelfieContest":{"isTeam":true},"Moments":{"isTeam":false},"Animate":{"isTeam":false},"BlitzMoments":{"isTeam":false},"MobileDSLR":{"isTeam":false}},"EDcell":{"Aspire":{"isTeam":true},"StartupNivesh":{"isTeam":true}}}')},72:function(e,t,n){"use strict";n.r(t);n(8);var a=n(6);n(73),n(74),n(75),n(76),n(77),n(78),n(79);let i;function o(e,t,n,a){document.getElementById("teamLead").innerHTML="",document.getElementById("muted").innerHTML="";let i=document.getElementById("eventNameContainer");i.innerHTML="";let o=document.createTextNode(e);i.appendChild(o),"form"===a?(document.getElementById("modalContainer").classList.remove("modal__pdf"),document.getElementById("modalContainer").classList.add("modal__form"),l(e,n,t)):"pdf"===a&&(document.getElementById("modalContainer").classList.remove("modal__form"),document.getElementById("modalContainer").classList.add("modal__pdf"),function(e){document.querySelector("body").classList.add("pdf-modal");const t=document.getElementById("pdfContainer"),n=`https://docs.google.com/gview?url=blitzschlag.org/pdf/${e.split(" ").join("")}&embedded=true`;console.log(n),t.src=n}(e)),document.querySelector(".skw-pages").classList.add("blur-back"),document.getElementById("modalContainer").classList.add("active")}function l(e,t,n){document.querySelector("body").classList.add("form-modal");let a=document.getElementById("eventRegistration");a.innerHTML="";let i=document.createElement("input");i.required="true",i.name="blitzID",i.placeholder="blitzID@1234";let o=document.createElement("label"),l=document.createElement("p");l.appendChild(document.createTextNode("Blitz ID ")),o.appendChild(l),o.appendChild(i);let d=document.createElement("label"),r=document.createElement("p");r.appendChild(document.createTextNode("PIN ")),d.appendChild(r);let c=document.createElement("input");if(c.type="number",c.required="true",c.name="blitzPIN",c.placeholder="****",d.appendChild(c),t){let e=document.createTextNode("Team Lead:");teamLead.appendChild(e),muted.appendChild(document.createTextNode("Note: All members should have a blitz ID,")),muted.appendChild(document.createTextNode("team registrations will be done on spot.")),muted.classList.add("muted");let t=document.createElement("label"),n=document.createElement("p");n.appendChild(document.createTextNode("Team Name ")),t.appendChild(n);let i=document.createElement("input");i.required=!0,i.name="teamName",i.placeholder="Team Awesome",t.appendChild(i);let o=document.createElement("label"),l=document.createElement("p");l.appendChild(document.createTextNode("Team Size ")),o.appendChild(l);let d=document.createElement("input");d.type="number",d.required=!0,d.name="teamSize",d.placeholder="5",o.appendChild(d),a.appendChild(t),a.appendChild(o)}let s=document.createElement("input");s.hidden=!0,s.disabled=!0,s.value=e.split(" ").join(""),s.name="event";let m=document.createElement("input");m.hidden=!0,m.disabled=!0,m.value=n.split(" ").join(""),m.name="society",a.appendChild(o),a.appendChild(d),a.appendChild(s),a.appendChild(m)}function d(){let e,t,n,a,o,l,d;if(e=document.getElementById("eventRegistration"),i?(t=e[0].value,n=e[1].value,a=e[2].value,o=e[3].value,l=e[4].value,d=e[5].value):(a=e[0].value,o=e[1].value,l=e[2].value,d=e[3].value,t=null,n=null),e.reportValidity()&&a.match(/^blitz@\d{4,}/im)){e[2].classList.remove("wrong"),document.querySelector(".modal").classList.add("submitting-modal"),e.innerHTML="";let i=document.createElement("p");i.appendChild(document.createTextNode("Hold on while we register you for the event")),e.appendChild(i);const c={blitzID:a,blitzPIN:o,_event:l,society:d,teamName:t,teamSize:n};fetch("/register/events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)}).then(t=>{let n,a;t.ok?(n=document.createTextNode("Thanks for registering for the event!"),a=document.createTextNode("See you soon at BLITZSCHLAG'19!")):(n=document.createTextNode("There was an error in registration."),a=document.createTextNode("please try again")),e.innerHTML="";let i=document.createTextNode("keep BLITZING!"),o=document.createElement("p");o.appendChild(n);let l=document.createElement("p");l.appendChild(a);let d=document.createElement("p");d.appendChild(i),e.appendChild(o),e.appendChild(l),e.appendChild(d),window.setTimeout(r,4e3)})}else e[2].classList.add("wrong")}function r(){document.querySelector("body").classList.remove("form-modal"),document.querySelector("body").classList.remove("pdf-modal"),document.getElementById("modalContainer").classList.remove("active"),document.querySelector(".skw-pages").classList.remove("blur-back"),document.querySelector(".modal").classList.remove("submitting-modal")}document.querySelectorAll(".registration__button").forEach(e=>{e.addEventListener("click",(function(e){var t;o(e.target.getAttribute("data-name"),e.target.getAttribute("data-society"),a[e.target.getAttribute("data-society").split(" ").join("")][e.target.getAttribute("data-name").split(" ").join("")].isTeam,"form"),t=a[e.target.getAttribute("data-society").split(" ").join("")][e.target.getAttribute("data-name").split(" ").join("")].isTeam,i=t}))}),document.querySelectorAll(".rules__button").forEach(e=>{e.addEventListener("click",(function(e){o(e.target.getAttribute("data-name"),null,e.target.getAttribute("data-society"),"pdf")}))}),document.querySelectorAll(".modal__close").forEach(e=>{e.addEventListener("click",r)}),document.getElementById("modalSubmit").addEventListener("click",d),document.addEventListener("keyup",e=>{27===e.keyCode?r():13===e.keyCode&&d()})},73:function(e,t,n){e.exports=n.p+"files/events/Dramatics.pc.html"},74:function(e,t,n){e.exports=n.p+"files/events/Film.pc.html"},75:function(e,t,n){e.exports=n.p+"files/events/Literary.pc.html"},76:function(e,t,n){e.exports=n.p+"files/events/Music.pc.html"},77:function(e,t,n){e.exports=n.p+"files/events/Vyaktiva.pc.html"},78:function(e,t,n){e.exports=n.p+"files/events/FineArts.pc.html"},79:function(e,t,n){e.exports=n.p+"files/events/EDcell.pc.html"},8:function(e,t){$(document).ready((function(){var e=1,t=$(".skw-page").length,n=!1,a=$("body");function i(){n=!0,$(".skw-page-"+e).removeClass("inactive").addClass("active"),$(".skw-page-"+(e-1)).addClass("inactive"),$(".skw-page-"+(e+1)).removeClass("active"),setTimeout((function(){n=!1}),1e3),a.removeClass().addClass("page-"+e)}function o(){1!==e&&(e--,i())}function l(){e!==t&&(e++,i())}a.removeClass().addClass("page-1"),$(document).on("mousewheel DOMMouseScroll",(function(e){n||(e.originalEvent.wheelDelta>0||e.originalEvent.detail<0?o():l())})),$(document).on("keydown",(function(e){n||(38===e.which?o():40===e.which&&l())})),$("#page1").click((function(){e=1,i()})),$("#page2").click((function(){e=2,i()})),$("#page3").click((function(){e=3,i()})),$("#page4").click((function(){e=4,i()})),$("#page5").click((function(){e=5,i()})),$("#page6").click((function(){e=6,i()})),$("#page7").click((function(){e=7,i()})),$("#page8").click((function(){e=8,i()})),$("#page9").click((function(){e=9,i()})),$("#page10").click((function(){e=10,i()})),$("#page11").click((function(){e=11,i()})),$("#page12").click((function(){e=12,i()})),$("#page13").click((function(){e=13,i()}))}))}});
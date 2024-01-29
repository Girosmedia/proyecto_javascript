(()=>{"use strict";var e=["second","minute","hour","day","week","month","year"],t=["秒","分钟","小时","天","周","个月","年"],o={},n=function(e,t){o[e]=t},r=[60,60,24,7,365/7/12,12];function a(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}n("en_US",(function(t,o){if(0===o)return["just now","right now"];var n=e[Math.floor(o/2)];return t>1&&(n+="s"),[t+" "+n+" ago","in "+t+" "+n]})),n("zh_CN",(function(e,o){if(0===o)return["刚刚","片刻后"];var n=t[~~(o/2)];return[e+" "+n+"前",e+" "+n+"后"]}));const s=new class{constructor(){this.URI="http://localhost:3000/api/books"}async getBooks(){try{const e=await fetch(this.URI);return await e.json()}catch(e){console.error("Se Produjo un error al obtener el libro: ",e)}}async postBook(e){try{const t=await fetch(this.URI,{method:"POST",body:e}),o=await t.json();console.log(o)}catch(e){console.error("Se Produjo un error al grabar el libro: ",e)}}async deleteBook(e){try{const t=await fetch(`${this.URI}/${e}`,{headers:{"Content-Type":"application/json"},method:"DELETE"}),o=await t.json();console.log(o)}catch(e){return console.error(e)}}},c=class{async renderBooks(){const e=await s.getBooks(),t=document.getElementById("books-cards");t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");var s,c,d;n.className="",n.innerHTML=`\n        <div class="card m-2">\n            <div class="row">\n                <div class="col-md-4">\n                    <img src="http://localhost:3000/${e.imagePath}" alt="" class="img-fluid" />\n                </div>\n                <div class="col-md-8">\n                    <div class="card-block px-2">\n                        <h4 class="card-title">${e.title}</h4>\n                        <p class="card-text">${e.author}</p>\n                        <a href="#" class="btn btn-danger delete" _id="${e._id}">X</a>\n                    </div>\n                </div>\n            </div>\n            <div class="card-footer">\n                ${s=e.created_at,function(e,t){for(var o=e<0?1:0,n=e=Math.abs(e),a=0;e>=r[a]&&a<r.length;a++)e/=r[a];return(e=Math.floor(e))>(0==(a*=2)?9:1)&&(a+=1),t(e,a,n)[o].replace("%s",e.toString())}(function(e,t){return(+(t?a(t):new Date)-+a(e))/1e3}(s,d&&d.relativeDate),function(e){return o[e]||o.en_US}(c))}\n        </div>\n        `,t.appendChild(n)}))}async addANewBook(e){await s.postBook(e),this.clearBookForm(),this.renderBooks()}async deleteBook(e){await s.deleteBook(e),this.renderBooks()}clearBookForm(){document.getElementById("book-form").reset()}renderMessage(e,t,o){const n=document.createElement("div");n.className=`alert alert-${t} message`,n.appendChild(document.createTextNode(e));const r=document.querySelector(".col-md-4"),a=document.querySelector("#book-form");r.insertBefore(n,a),setTimeout((()=>{document.querySelector(".message").remove()}),o)}};document.addEventListener("DOMContentLoaded",(()=>{(new c).renderBooks()})),document.getElementById("book-form").addEventListener("submit",(e=>{e.preventDefault();const t=document.getElementById("title").value,o=document.getElementById("author").value,n=document.getElementById("isbn").value,r=document.getElementById("image").files;if(!(t&&o&&n&&r[0]))return console.log("Complete Fields"),(new c).renderMessage("Complete Fields","danger",3e3);const a=new FormData;a.append("image",r[0]),a.append("title",t),a.append("author",o),a.append("isbn",n);const s=new c;s.addANewBook(a),s.renderMessage("New Book Added","success",3e3)})),document.getElementById("books-cards").addEventListener("click",(e=>{if(e.target.classList.contains("delete")){const t=new c;t.deleteBook(e.target.getAttribute("_id")),t.renderMessage("Book Deleted","danger",3e3)}e.preventDefault()}))})();
//# sourceMappingURL=bundle.js.map
import{a as h,S as g,i as p}from"./assets/vendor-CIHNlBeg.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=r(o);fetch(o.href,n)}})();const u=15,v="49409178-3b63951a4472504068603616d",L="https://pixabay.com/api/";async function b(e,t){try{return(await h.get(L,{params:{key:v,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:u,page:t,q:e}})).data}catch(r){console.log("error",r)}}const S=new g(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function d(e="Sorry, there are no images matching your search query. Please try again!"){p.error({message:e,position:"topRight",timeout:3e3})}function I(){document.querySelector(".form").reset()}function q(e){const t=document.querySelector(".gallery"),r=e.map(s=>x(s)).join("");t.insertAdjacentHTML("beforeend",r),S.refresh(),setTimeout(()=>{$()},100)}function l(e){const r=document.querySelector(".loadMoreButton").classList;e?r.remove("hidden"):r.add("hidden")}function w(){document.querySelector(".loader").classList.remove("hidden")}function P(){document.querySelector(".loader").classList.add("hidden")}function H(){document.querySelector(".gallery").textContent=""}function $(){const e=document.querySelector(".galleryItem").getBoundingClientRect().height*2;console.log("galleryCardHeight",e),scrollBy({top:e,behavior:"smooth"})}function x(e){return`
    <li class="galleryItem">
        <a href="${e.largeImageURL}" disabled="true">
          <img src="${e.webformatURL}" alt="${e.tags}"/>
        </a>
        <div class="imageInfoContainer">
            <div class="imageInfo">
                Likes 
                <div>
                    ${e.likes}
                </div>
            </div>
            <div class="imageInfo">
                Views 
                <div>
                    ${e.views}
                </div>
            </div>
            <div class="imageInfo">
                Comments 
                <div>
                    ${e.comments}
                </div>
            </div>
            <div class="imageInfo">
                Downloads
                <div>
                ${e.downloads}
                </div>
            </div>
        </div>
    </li>`}const f=document.querySelector("[type='text']"),B=document.querySelector(".form"),C=document.querySelector(".loadMoreButton");let m,c=1,i="";const E=e=>e.trim()!=="",M=async(e,t)=>{if(e.preventDefault(),!E(t)||t===i){f.value="";return}t!==i&&(c=1),i=t,w(),H(),y(t,c)},y=async(e,t)=>{try{const r=await b(e,t),s=r.hits;if(s.length===0){d(),l(!1);return}const o=r.totalHits;if(t*u>=o){d("We're sorry, but you've reached the end of search results."),l(!1);return}l(!0),q(s)}catch(r){console.log("error",r)}finally{P(),I()}},O=async(e,t)=>{e.preventDefault(),c++,y(t,c)};B.addEventListener("submit",e=>M(e,m));C.addEventListener("click",e=>O(e,i));f.addEventListener("input",e=>{m=e.target.value});
//# sourceMappingURL=index.js.map

const CONFIG={TRAILER_URL:'https://drive.google.com/file/d/1VvPaxQQSkBHWCSpsGzYvu6iKo_fBoqou/preview',EMAIL:'mawya1214@gmail.com'};
const menuBtn=document.getElementById('menuBtn'),nav=document.getElementById('nav');
if(menuBtn&&nav){menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
const langBtn=document.getElementById('langBtn');
function setLanguage(lang){document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.querySelectorAll('[data-en][data-ar]').forEach(el=>el.innerHTML=lang==='ar'?el.dataset.ar:el.dataset.en);if(langBtn)langBtn.textContent=lang==='ar'?'English':'العربية';try{localStorage.setItem('miram-language',lang)}catch(e){}}
let saved='en';try{saved=localStorage.getItem('miram-language')||'en'}catch(e){} setLanguage(saved);if(langBtn)langBtn.addEventListener('click',()=>setLanguage(document.documentElement.lang==='en'?'ar':'en'));
const iframe=document.getElementById('trailerFrame');if(iframe){iframe.src=CONFIG.TRAILER_URL}
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('broken');if(img.nextElementSibling?.classList.contains('img-fallback'))img.nextElementSibling.style.display='flex'}));

// Language: the visitor's own language if the site has it (or ?lang=xx), English otherwise; the menu switches and is remembered.
(function(){
  var h=document.documentElement,sel=document.getElementById('lang'),have=[];
  if(sel)for(var i=0;i<sel.options.length;i++)have.push(sel.options[i].value);
  var pick=function(x){x=String(x||'').toLowerCase().slice(0,2);return have.indexOf(x)>=0?x:''};
  var q=pick((location.search.match(/[?&]lang=([a-z]{2})/i)||[])[1]),saved='';
  try{saved=pick(localStorage.getItem('fs-lang'))}catch(e){}
  var nav='';var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en'];
  for(var j=0;j<ls.length&&!nav;j++){var c=String(ls[j]).toLowerCase();nav=pick(c.indexOf('in')===0?'id':c)}
  var rtl={ar:1,ur:1,fa:1},t=document.querySelector('title');
  function set(l){h.setAttribute('data-lang',l);h.lang=l;h.dir=rtl[l]?'rtl':'ltr';if(sel)sel.value=l;
    if(t&&t.getAttribute('data-t-'+l))t.textContent=t.getAttribute('data-t-'+l)}
  set(q||saved||nav||'en');
  if(sel)sel.addEventListener('change',function(){set(sel.value);try{localStorage.setItem('fs-lang',sel.value)}catch(e){}});
})();

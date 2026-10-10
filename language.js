(() => {
 const translations = window.ALICIA_TRANSLATIONS;
 const nodes = [];
 const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
 while (walker.nextNode()) {
  const node = walker.currentNode;
  if (node.parentElement.closest('script,style,#language')) continue;
  const key = node.textContent.trim();
  if (translations[key]) nodes.push({node,key,original:node.textContent});
 }
 const attrs = [];
 document.querySelectorAll('[placeholder],[alt],[aria-label]').forEach(el => {
  ['placeholder','alt','aria-label'].forEach(attr => {const key=el.getAttribute(attr);if(translations[key])attrs.push({el,attr,key});});
 });
 window.setAliciaLanguage = lang => {
  if (!['en','es','uk'].includes(lang)) lang='en';
  window.ALICIA_LANGUAGE=lang;
  document.documentElement.lang=lang;
  document.querySelector('#language').value=lang;
  for (const {node,key,original} of nodes) node.textContent=original.replace(key,lang==='en'?key:translations[key][lang]);
  for (const {el,attr,key} of attrs) el.setAttribute(attr,lang==='en'?key:translations[key][lang]);
  document.title={en:'Alicia Mortgage | A home in Spain A person on your side',es:'Alicia Mortgage | Un hogar en España Alguien a tu lado',uk:'Alicia Mortgage | Дім в Іспанії Людина на вашому боці'}[lang];
  document.querySelector('meta[name="description"]').content={en:'Personal mortgage guidance for your home in Spain. Meet Olesia and plan your next chapter with clarity.',es:'Acompañamiento hipotecario personal para tu hogar en España. Conoce a Olesia y planifica tu nueva etapa con claridad.',uk:'Особистий іпотечний супровід для вашого дому в Іспанії. Познайомтеся з Олесею та впевнено плануйте нову сторінку життя.'}[lang];
  try{localStorage.setItem('alicia-language',lang);}catch{}
  window.dispatchEvent(new Event('alicia-language-change'));
 };
 document.querySelector('#language').addEventListener('change',e=>window.setAliciaLanguage(e.target.value));
 let saved='en';try{saved=localStorage.getItem('alicia-language')||'en';}catch{}
 window.setAliciaLanguage(saved);
})();

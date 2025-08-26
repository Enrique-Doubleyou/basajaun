// Basajaun → kleine UX-Erweiterungen (neutral, ohne Upload-Änderungen)
(function(){
  function run(){
    // --- FABs (Galerie/Fazit), nur wenn Ziele existieren und noch kein Stack da ist
    if(!document.querySelector('.fab-stack')){
      var targets = [];
      if(document.getElementById('galerie'))  targets.push({href:'#galerie',  label:'Galerie', icon:'↘', aria:'Zur Galerie springen'});
      if(document.getElementById('abschluss')) targets.push({href:'#abschluss', label:'Fazit',   icon:'↙', aria:'Zum Fazit springen'});
      if(targets.length){
        var stack = document.createElement('div');
        stack.className = 'fab-stack';
        targets.forEach(function(t){
          var a = document.createElement('a');
          a.className = 'fab-pill';
          a.href = t.href;
          a.setAttribute('aria-label', t.aria || t.label);
          a.innerHTML = (t.icon||'') + ' <span>'+t.label+'</span>';
          stack.appendChild(a);
        });
        document.body.appendChild(stack);
      }
    }

    // --- Link-Card Effekt für verlinkte Überschriften (h1/h2 > a)
    Array.prototype.forEach.call(document.querySelectorAll('h1 > a, h2 > a'), function(a){
      a.classList.add('link-card');
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run, {once:true});
  }else{
    run();
  }
})();
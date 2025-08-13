// Beginner-friendly JS – no frameworks, no minification.
(function(){
  const riddleForm = document.getElementById('riddleForm');
  const tokenForm  = document.getElementById('tokenForm');
  const riddleStatus = document.getElementById('riddleStatus');
  const tokenStatus  = document.getElementById('tokenStatus');
  const portStatus   = document.getElementById('portStatus');
  const flagBox = document.getElementById('flagBox');

  // Simple helpers
  function setStatus(el, ok){
    el.classList.remove('ok','bad');
    el.classList.add(ok ? 'ok':'bad');
    el.querySelector('span').textContent = ok ? 'complete' : 'incomplete';
  }

  // Check 1: Riddle
  let riddleOK = false;
  riddleForm.addEventListener('submit', function(e){
    e.preventDefault();
    const ans = (document.getElementById('riddleAnswer').value || '').trim().toLowerCase();
    // Accepted answers
    if(ans === 'echo'){
      riddleOK = true;
      setStatus(riddleStatus, true);
      maybeReveal();
    }else{
      riddleOK = false;
      setStatus(riddleStatus, false);
      alert('Not quite. Think of sound bouncing back.');
    }
  });

  // Check 2: Token from file (player inputs it)
  let tokenOK = false;
  tokenForm.addEventListener('submit', function(e){
    e.preventDefault();
    const token = (document.getElementById('tokenInput').value || '').trim().toUpperCase();
    // The keeper's actual token lives at /vault/key.txt
    if(token === 'REEF42'){
      tokenOK = true;
      setStatus(tokenStatus, true);
      maybeReveal();
    }else{
      tokenOK = false;
      setStatus(tokenStatus, false);
      alert('That token is not correct. Keep exploring the site.');
    }
  });

  // Check 3: URL parameter ?port=1337
  let portOK = false;
  const params = new URLSearchParams(location.search);
  if(params.get('port') === '1337'){
    portOK = true;
  }
  setStatus(portStatus, portOK);

  function maybeReveal(){
    if(riddleOK && tokenOK && portOK){
      // Compose the flag from the solved parts for clarity:
      const part1 = 'echo';
      const part2 = 'REEF42';
      const part3 = '1337';
      const flag = `BCT{${part1}-${part2}-${part3}}`;
      flagBox.textContent = flag;
    }
  }

  // In case the page loads with correct params and user already solved inputs earlier
  // (not persisted here), the reveal will occur after both forms are resubmitted.
})();
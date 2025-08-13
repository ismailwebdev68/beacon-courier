(function () {
  const riddleForm = document.getElementById('riddleForm');
  const tokenForm  = document.getElementById('tokenForm');
  const riddleStatus = document.getElementById('riddleStatus');
  const tokenStatus  = document.getElementById('tokenStatus');
  const portStatus   = document.getElementById('portStatus');
  const flagBox = document.getElementById('flagBox');

  function unmix(arr, step, delta) {
    return arr
      .filter((_, i) => i % step === 0)
      .map(n => String.fromCharCode(n - delta))
      .join('');
  }

  function deKey(nums, keyXor, keyShift) {
    return nums.map(n => String.fromCharCode((n ^ keyXor) - keyShift)).join('');
  }

  function pick(arr, indices) {
    return indices.map(i => arr[i]);
  }
  function toDigits(nums, salt, factor) {
    return nums.map(n => String.fromCharCode(Math.floor((n - salt) / factor))).join('');
  }

  const expectedRiddle = unmix(
    
    [104, 200, 102, 201, 107, 199, 114, 198],
    2, 
    3  
  ); 

  const expectedToken = deKey(
    [64, 93, 93, 92, 46, 32], 
    23, 
    5   
  );

  const portPool = [
    154, 255, 160, 42, 160, 99, 172, 77 
  ];
  const portDigits = pick(portPool, [0, 2, 4, 6]); 
  const expectedPort = toDigits(portDigits, 7, 3); 

  function setStatus(el, ok) {
    el.classList.remove('ok', 'bad');
    el.classList.add(ok ? 'ok' : 'bad');
    el.querySelector('span').textContent = ok ? 'complete' : 'incomplete';
  }

  let riddleOK = false;
  riddleForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const ans = (document.getElementById('riddleAnswer').value || '').trim().toLowerCase();
    if (ans === expectedRiddle) {
      riddleOK = true;
      setStatus(riddleStatus, true);
      maybeReveal();
    } else {
      riddleOK = false;
      setStatus(riddleStatus, false);
      alert('Not quite. Think of sound bouncing back.');
    }
  });

  let tokenOK = false;
  tokenForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const token = (document.getElementById('tokenInput').value || '').trim().toUpperCase();
    if (token === expectedToken) {
      tokenOK = true;
      setStatus(tokenStatus, true);
      maybeReveal();
    } else {
      tokenOK = false;
      setStatus(tokenStatus, false);
      alert('That token isn’t right. Keep exploring the site.');
    }
  });

  let portOK = false;
  const params = new URLSearchParams(location.search);
  if ((params.get('port') || '') === expectedPort) {
    portOK = true;
  }
  setStatus(portStatus, portOK);

  function maybeReveal() {
    if (riddleOK && tokenOK && portOK) {
     
      const part1 = expectedRiddle; 
      const part2 = expectedToken;  
      const part3 = expectedPort;   
      const flag = `BCT{${part1}-${part2}-${part3}}`;
      flagBox.textContent = flag; 
    }
  }
})();

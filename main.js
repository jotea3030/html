// main.js — minimal game logic for the static site (uses global allBirds)

(() => {
  const state = {
    round: 1, score: 0, streak: 0, maxRounds: 10,
    difficulty: 'medium', roundBirds: [], currentBird: null,
    answered: false, audioCache: {}, currentAudio: null
  };

  const el = {
    round: document.getElementById('round'),
    score: document.getElementById('score'),
    streak: document.getElementById('streak'),
    playButton: document.getElementById('playButton'),
    replayButton: document.getElementById('replayButton'),
    nextButton: document.getElementById('nextButton'),
    birdGrid: document.getElementById('birdGrid'),
    result: document.getElementById('result'),
    attribution: document.getElementById('attribution'),
    difficulty: document.getElementById('difficulty'),
    debug: document.getElementById('debug'),
    toggleDebug: document.getElementById('toggleDebug')
  };

  function debugLog(msg, obj) {
    const t = new Date().toISOString();
    console.log(`[${t}] ${msg}`, obj);
    if (el.debug) {
      el.debug.style.display = 'block';
      el.debug.setAttribute('aria-hidden','false');
      el.debug.textContent = `[${t}] ${msg}${obj ? ' - ' + JSON.stringify(obj) : ''}\n\n` + el.debug.textContent;
    }
  }

  function updateStats() {
    el.round.textContent = state.round;
    el.score.textContent = state.score;
    el.streak.textContent = state.streak;
  }

  async function preloadAudio() {
    if (!Array.isArray(allBirds)) {
      debugLog('allBirds missing or invalid');
      return;
    }
    for (const b of allBirds) {
      try {
        const a = new Audio(); a.preload = 'auto'; a.src = b.audioUrl;
        a.addEventListener('error', e => debugLog('audio.error for ' + b.name, e?.target?.error || e));
        a.addEventListener('canplaythrough', () => debugLog('canplaythrough ' + b.name));
        try { a.load(); } catch(e) { debugLog('audio.load error', e); }
        state.audioCache[b.name] = a;
      } catch (err) {
        debugLog('preload exception for ' + b.name, err);
      }
    }
  }

  function pickRound() {
    const count = state.difficulty === 'easy' ? 4 : state.difficulty === 'medium' ? 6 : 8;
    const shuffled = [...allBirds].sort(() => Math.random() - 0.5);
    state.roundBirds = shuffled.slice(0, count);
    state.currentBird = state.roundBirds[Math.floor(Math.random() * count)];
    debugLog('picked round', { round: state.round, current: state.currentBird?.name });
  }

  function renderCards() {
    el.birdGrid.innerHTML = '';
    for (const b of state.roundBirds) {
      const card = document.createElement('div'); card.className = 'card';
      card.innerHTML = `<div style="font-weight:700">${b.name}</div><div style="font-style:italic;color:#718096">${b.scientific}</div><div style="color:#4a5568">${b.info}</div>`;
      card.addEventListener('click', () => selectBird(b, card));
      el.birdGrid.appendChild(card);
    }
  }

  function resetUI() {
    state.answered = false;
    el.result.textContent = ''; el.result.className = '';
    el.nextButton.style.display = 'none';
    el.playButton.disabled = false; el.replayButton.disabled = false;
    el.attribution.textContent = '';
    el.birdGrid.querySelectorAll('.card').forEach(c => c.className = 'card');
  }

  async function startRound() {
    if (state.currentAudio) try { state.currentAudio.pause(); state.currentAudio.currentTime = 0; } catch(e){}
    pickRound(); renderCards(); resetUI(); updateStats();
  }

  async function playSong() {
    if (!state.currentBird) { await startRound(); await new Promise(r=>setTimeout(r,50)); }
    if (state.currentAudio && !state.currentAudio.paused) { try { state.currentAudio.pause(); state.currentAudio.currentTime = 0; } catch(e){} el.playButton.textContent = '▶ Play'; return; }
    let audio = state.audioCache[state.currentBird.name];
    if (!audio) { audio = new Audio(state.currentBird.audioUrl); state.audioCache[state.currentBird.name] = audio; }
    state.currentAudio = audio;
    try { audio.currentTime = 0; } catch(e){}
    const p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(()=>{ el.playButton.textContent = '⏸ Pause'; }).catch(err => { debugLog('play failed', err); alert('Playback failed. See debug log.'); });
    } else el.playButton.textContent = '⏸ Pause';
    el.attribution.innerHTML = `Recording by ${state.currentBird.recordist} — <a href="https://xeno-canto.org/${state.currentBird.xcId}" target="_blank" rel="noopener">Xeno-canto</a>`;
    audio.onended = ()=>{ el.playButton.textContent = '▶ Play'; state.currentAudio = null; };
  }

  function selectBird(bird, cardEl) {
    if (state.answered) return; state.answered = true;
    if (state.currentAudio) try { state.currentAudio.pause(); } catch(e){}
    el.birdGrid.querySelectorAll('.card').forEach(c=>c.classList.add('disabled'));
    const correct = bird === state.currentBird;
    if (correct) {
      cardEl.classList.remove('disabled'); cardEl.classList.add('correct');
      const gain = 10 + (state.streak * 2); state.score += gain; state.streak++;
      el.result.textContent = `🎉 Correct! That was a ${bird.name}. +${gain} pts`; el.result.className = 'result show correct';
    } else {
      el.birdGrid.querySelectorAll('.card').forEach(c=>{
        if (c.querySelector('div').textContent === state.currentBird.name) { c.classList.remove('disabled'); c.classList.add('correct'); }
      });
      cardEl.classList.remove('disabled'); cardEl.classList.add('incorrect');
      state.streak = 0;
      el.result.textContent = `❌ Not quite. That was a ${state.currentBird.name}.`; el.result.className = 'result show incorrect';
    }
    updateStats();
    if (state.round >= state.maxRounds) setTimeout(()=>alert(`Game complete! Score: ${state.score}`),300);
    else el.nextButton.style.display = 'inline-block';
    el.playButton.disabled = true; el.replayButton.disabled = true;
  }

  // bindings
  el.playButton.addEventListener('click', playSong);
  el.replayButton.addEventListener('click', playSong);
  el.nextButton.addEventListener('click', ()=>{ state.round++; startRound(); });
  el.difficulty.addEventListener('change', ()=>{ if (confirm('Change difficulty and restart?')) { state.difficulty = el.difficulty.value; state.round = 1; state.score = 0; state.streak = 0; startRound(); } else el.difficulty.value = state.difficulty; });
  el.toggleDebug.addEventListener('click', ()=>{ if (el.debug.style.display === 'none' || el.debug.style.display === '') { el.debug.style.display='block'; el.debug.setAttribute('aria-hidden','false'); el.toggleDebug.textContent='Hide debug'; } else { el.debug.style.display='none'; el.debug.setAttribute('aria-hidden','true'); el.toggleDebug.textContent='Show debug'; } });

  // init
  async function init() { updateStats(); debugLog('init: preload audio'); await preloadAudio(); setTimeout(()=>startRound(), 120); }
  window.addEventListener('DOMContentLoaded', init);
})();

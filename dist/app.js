(() => {
  'use strict';
  const config = window.SITE_CONFIG;
  if (!config) return;
  document.querySelectorAll('[data-copy]').forEach(el => {
    if (typeof config[el.dataset.copy] === 'string') el.textContent = config[el.dataset.copy];
  });
  document.querySelectorAll('[data-note]').forEach(el => { el.textContent = config.notes[Number(el.dataset.note)] || ''; });
  const letter = document.getElementById('honest-copy');
  letter.replaceChildren(...config.letter.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
  const grid = document.getElementById('photo-grid');
  const photos = config.photos;
  const dialog = document.getElementById('lightbox');
  const fullImage = document.getElementById('lightbox-image');
  let currentIndex = 0;
  let returnFocus = null;
  const imagePath = (photo, full) => full ? (photo.original || `assets/originals/${photo.id}.jpg`) : (photo.src || `assets/photos/${photo.id}.webp`);
  photos.forEach((photo, index) => {
    const figure = document.createElement('figure');
    figure.className = 'polaroid memory-card';
    figure.style.setProperty('--tilt', `${[-2.2, 2, -1.4, 1.8, -2, 2.1, -1.5, 1.2, -1.8][index % 9]}deg`);
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'photo-button';
    button.setAttribute('aria-label', `Ampliar foto ${index + 1}: ${photo.alt}`);
    const img = document.createElement('img');
    img.src = imagePath(photo, false); img.alt = photo.alt; img.loading = 'lazy'; img.decoding = 'async'; img.width = 900; img.height = 1100;
    img.style.objectPosition = photo.position || 'center';
    if (photo.airport) img.classList.add('airport-photo');
    const zoom = document.createElement('span'); zoom.className = 'photo-zoom'; zoom.setAttribute('aria-hidden', 'true'); zoom.textContent = '+';
    button.append(img, zoom);
    button.addEventListener('click', () => {
      returnFocus = button; currentIndex = index; showPhoto(); dialog.showModal(); document.body.classList.add('modal-open');
      document.getElementById('close-lightbox').focus();
    });
    const caption = document.createElement('figcaption'); caption.className = 'handwritten'; caption.textContent = photo.caption;
    const number = document.createElement('span'); number.className = 'photo-number'; number.textContent = String(index + 1).padStart(2, '0'); number.setAttribute('aria-hidden', 'true');
    figure.append(button, caption, number); grid.append(figure);
  });
  function showPhoto() {
    const photo = photos[currentIndex];
    fullImage.src = imagePath(photo, true); fullImage.alt = photo.alt;
    document.getElementById('lightbox-caption').textContent = photo.caption;
    document.getElementById('lightbox-count').textContent = `NOSSO ÁLBUM · ${String(currentIndex + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    document.getElementById('lightbox-status').textContent = `Foto ${currentIndex + 1} de ${photos.length}`;
  }
  function stepPhoto(step) { currentIndex = (currentIndex + step + photos.length) % photos.length; showPhoto(); }
  document.getElementById('previous-photo').addEventListener('click', () => stepPhoto(-1));
  document.getElementById('next-photo').addEventListener('click', () => stepPhoto(1));
  document.getElementById('close-lightbox').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); stepPhoto(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); stepPhoto(-1); }
    if (e.key === 'Tab') {
      const buttons = Array.from(dialog.querySelectorAll('button'));
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); returnFocus?.focus({preventScroll: true}); });
  let touchStart = null;
  fullImage.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, {passive:true});
  fullImage.addEventListener('touchend', e => { if (touchStart === null) return; const delta = e.changedTouches[0].clientX - touchStart; if (Math.abs(delta) > 60) stepPhoto(delta < 0 ? 1 : -1); touchStart = null; }, {passive:true});
  const envelopeButton = document.getElementById('open-letter');
  const message = document.getElementById('surprise-message');
  const envelope = document.getElementById('envelope');
  envelopeButton.addEventListener('click', () => {
    const opening = envelopeButton.getAttribute('aria-expanded') !== 'true';
    envelopeButton.setAttribute('aria-expanded', String(opening));
    envelopeButton.textContent = opening ? 'Guardar a cartinha' : 'Abre, é pra você';
    message.hidden = !opening; envelope.classList.toggle('is-open', opening);
    document.getElementById('heart-burst').replaceChildren();
    if (opening && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (let i = 0; i < 16; i++) {
        const heart = document.createElement('span'); heart.textContent = '♥';
        heart.style.setProperty('--x', `${(Math.random() - .5) * 320}px`);
        heart.style.setProperty('--spin', `${(Math.random() - .5) * 90}deg`);
        heart.style.setProperty('--delay', `${Math.random() * .35}s`);
        heart.style.color = ['var(--pink)','var(--lilac)','var(--mint)'][i % 3];
        document.getElementById('heart-burst').append(heart);
        heart.addEventListener('animationend', () => heart.remove(), {once:true});
      }
    }
  });
  if (config.video?.src) {
    const video = document.getElementById('memory-video');
    video.src = config.video.src;
    if (config.video.poster) video.poster = config.video.poster;
    if (config.video.captions) { const track = document.createElement('track'); track.kind = 'captions'; track.label = 'Português'; track.srclang = 'pt-BR'; track.src = config.video.captions; track.default = true; video.append(track); }
    video.addEventListener('loadedmetadata', () => { document.getElementById('nosso-video').hidden = false; }, {once:true});
    video.addEventListener('error', () => { document.getElementById('nosso-video').hidden = true; });
  }
})();

// ====== AJUSTE O NÚMERO DO WHATSAPP AQUI ======
// Formato: apenas números com DDD. Ex: 5569992131686
const WHATSAPP_NUMBER = "5569992131686";

function waLink(text){
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

const defaultMessage = "Olá! Quero um orçamento para montagem de móveis. Pode me atender?";

// Whats links
const btnWhats = document.getElementById('btnWhats');
const heroWhats = document.getElementById('heroWhats');
const waBig = document.getElementById('waBig');
const waFloat = document.getElementById('waFloat');
const btnWhatsForm = document.getElementById('btnWhatsForm');

[btnWhats, heroWhats, waBig, waFloat, btnWhatsForm].filter(Boolean).forEach(a => {
  a.href = waLink(defaultMessage);
});

// Whats label
const whatsLabel = document.getElementById('whatsLabel');
if(whatsLabel){
  const n = WHATSAPP_NUMBER;
  const ddd = n.slice(0,2);
  const p1 = n.slice(2,7);
  const p2 = n.slice(7,11);
  whatsLabel.textContent = `(${ddd}) ${p1}-${p2}`;
}

// Gallery tabs
const tabs = Array.from(document.querySelectorAll('.tab'));
function setTab(tab){
  const fotos = document.getElementById('tab-fotos');
  const videos = document.getElementById('tab-videos');
  const isFotos = tab === 'fotos';
  fotos.style.display = isFotos ? 'grid' : 'none';
  videos.style.display = isFotos ? 'none' : 'grid';

  tabs.forEach(t => {
    const active = t.dataset.tab === tab;
    t.classList.toggle('tabActive', active);
    t.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

tabs.forEach(t => t.addEventListener('click', () => setTab(t.dataset.tab)));

// Image modal
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

// Somente fotos do tab-fotos
const fotosThumbs = Array.from(document.querySelectorAll('#tab-fotos .thumb'));
let modalIndex = -1;

function closeModal(){
  modal.classList.remove('open');
  modalIndex = -1;
}

function showByIndex(i){
  if(!fotosThumbs.length) return;
  const max = fotosThumbs.length;
  modalIndex = (i + max) % max; // wrap

  const a = fotosThumbs[modalIndex];
  const img = a.querySelector('img');
  const title = (a.dataset.title && a.dataset.title.trim()) ? a.dataset.title.trim() : '';


  if(img){
    modalImg.src = img.src;
    modalImg.alt = title;
    modalTitle.textContent = title;
  }
}

function openModalFromThumb(thumb){
  const idx = fotosThumbs.indexOf(thumb);
  if(idx === -1) return;
  showByIndex(idx);
  modal.classList.add('open');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

// Click nas thumbs (todas), mas navega somente dentro do tab-fotos
document.querySelectorAll('.thumb').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();

    // Se clicar fora do tab-fotos, não abrimos com navegação.
    // (Hoje só existem .thumb no tab-fotos.)
    openModalFromThumb(a);
  });
});

// Botões prev/next
if(modalPrev && modalNext){
  modalPrev.addEventListener('click', () => {
    if(modalIndex >= 0) showByIndex(modalIndex - 1);
  });

  modalNext.addEventListener('click', () => {
    if(modalIndex >= 0) showByIndex(modalIndex + 1);
  });
}

// Teclado: seta esquerda/direita
document.addEventListener('keydown', (e) => {
  if(!modal.classList.contains('open')) return;
  if(e.key === 'ArrowLeft'){ e.preventDefault(); if(modalIndex >= 0) showByIndex(modalIndex - 1); }
  if(e.key === 'ArrowRight'){ e.preventDefault(); if(modalIndex >= 0) showByIndex(modalIndex + 1); }
});

// Form -> WhatsApp message
const form = document.getElementById('leadForm');
if(form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    const msg = `Olá! Meu nome é ${nome}. Telefone: ${telefone}.\n\nQuero: ${servico}.\n\nDetalhes: ${mensagem}`;
    window.open(waLink(msg), '_blank', 'noopener');
  });
}

// Year
const year = document.getElementById('year');
if(year) year.textContent = new Date().getFullYear();


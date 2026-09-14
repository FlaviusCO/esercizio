document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. GESTIONE TEMA (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Ripristina tema salvato
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
  }

  /* ==========================================================================
     2. EFFETTO TILT 3D INTERATTIVO (HERO SECTION)
     ========================================================================== */
  const tiltCard = document.getElementById('tiltCard');

  if (tiltCard) {
    document.addEventListener('mousemove', (e) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Solo su schermi medio-grandi per evitare glitch touch
      if (windowWidth > 768) {
        const mouseX = (e.clientX / windowWidth) - 0.5;
        const mouseY = (e.clientY / windowHeight) - 0.5;

        const rotateX = mouseY * -20; // Gradi rotazione X
        const rotateY = mouseX * 20;  // Gradi rotazione Y

        tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
  }

  /* ==========================================================================
     3. FILTRAGGIO E RICERCA CARD (GRID SECTION)
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.cards-grid .card');

  function filterCards() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category;
      const titleText = card.querySelector('h3').textContent.toLowerCase();
      const bodyText = card.querySelector('p').textContent.toLowerCase();

      const matchesCategory = (activeFilter === 'all' || category === activeFilter);
      const matchesSearch = titleText.includes(searchTerm) || bodyText.includes(searchTerm);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCards();
    });
  });

  searchInput.addEventListener('input', filterCards);

  /* ==========================================================================
     4. ACCORDION / SHOWCASE TABS
     ========================================================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');
  const displayCards = document.querySelectorAll('.display-card');

  accordionItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.target;

      // Disattiva precedenti
      accordionItems.forEach(i => i.classList.remove('active'));
      displayCards.forEach(c => c.classList.remove('active'));

      // Attiva corrente
      item.classList.add('active');
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     5. MODAL & DRAWER SYSTEM
     ========================================================================== */
  const modal = document.getElementById('modal');
  const closeModalBtn = document.getElementById('closeModal');
  const drawer = document.getElementById('drawer');
  const openDrawerBtn = document.getElementById('openDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawer');
  const colorPicker = document.getElementById('colorPicker');

  // Funzione globale per aprire la modale
  window.openModal = function(title, text) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').textContent = text;
    modal.classList.add('open');
  };

  window.closeModal = function() {
    modal.classList.remove('open');
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  // Gestione Drawer
  openDrawerBtn.addEventListener('click', () => drawer.classList.add('open'));
  closeDrawerBtn.addEventListener('click', () => drawer.classList.remove('open'));

  // Chiudi overlay al click all'esterno
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
    if (e.target === drawer) drawer.classList.remove('open');
  });

  // Color picker personalizzato per cambiare il colore Accent
  colorPicker.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary', e.target.value);
  });
});
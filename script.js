if (window.AOS) {
  AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
}

if (window.Swiper) {
  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });
}

const galleryItems = [
  { title: 'Rock Garden Mosaic', location: 'Sector 1, Chandigarh', category: 'monuments', img: 'images/hero-1.png' },
  { title: 'Capitol Complex Pavilion', location: 'Sector 1, Chandigarh', category: 'monuments', img: 'images/hero-2.png' },
  { title: 'Open Hand Monument', location: 'Sector 1, Chandigarh', category: 'monuments', img: 'images/hero-3.png' },
  { title: 'Pinjore Garden Terrace', location: 'Pinjore, Haryana', category: 'monuments', img: 'images/hero-4.png' },
  { title: 'Government Museum Gallery', location: 'Sector 10, Chandigarh', category: 'museums', img: 'images/hero-5.png' },
  { title: 'Sukhna Lake Heritage Walk', location: 'Sukhna Lake', category: 'events', img: 'images/hero-1.png' },
  { title: 'Excavation at Pinjore', location: 'Pinjore Gardens', category: 'excavations', img: 'images/hero-4.png' },
  { title: 'Museum Conservation Lab', location: 'Sector 10, Chandigarh', category: 'museums', img: 'images/hero-5.png' },
  { title: 'Archaeological Findings', location: 'Chandigarh Circle', category: 'excavations', img: 'images/hero-2.png' },
  { title: 'Stone Conservation Workshop', location: 'Sector 18, Chandigarh', category: 'restoration', img: 'images/hero-3.png' },
  { title: 'Public Outreach Programme', location: 'Rock Garden', category: 'events', img: 'images/hero-1.png' },
  { title: 'Restoration of Heritage Gate', location: 'Sector 15, Chandigarh', category: 'restoration', img: 'images/hero-5.png' }
];

const galleryFallbacks = [
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80'
];

const galleryGrid = document.getElementById('photo-gallery');
const filterButtons = document.querySelectorAll('.filter-btn');
const pageNumbers = document.querySelector('.page-numbers');
const pageButtons = document.querySelectorAll('.page-btn');

let currentFilter = 'all';
let currentPage = 1;
const perPage = 6;

function renderGallery() {
  const filtered = galleryItems.filter(item => currentFilter === 'all' || item.category === currentFilter);
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  currentPage = Math.min(currentPage, totalPages);

  const start = (currentPage - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  galleryGrid.innerHTML = '';

  pageItems.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = 'gallery-item';
    card.innerHTML = `
      <a href="${item.img}" data-lg-size="1600-1200" data-src="${item.img}">
        <img src="${item.img}" alt="${item.title}" onerror="this.onerror=null;this.src='${galleryFallbacks[(start + index) % galleryFallbacks.length]}'" />
      </a>
      <div class="gallery-caption">
        <h5>${item.title}</h5>
        <p>${item.location}</p>
      </div>
    `;
    galleryGrid.appendChild(card);
  });

  if (window.lightGallery) {
    lightGallery(galleryGrid, {
      selector: 'a',
      download: false,
      speed: 400,
      counter: false
    });
  }

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pageNumbers.innerHTML = '';
  for (let i = 1; i <= totalPages; i += 1) {
    const btn = document.createElement('button');
    btn.className = `page-number ${i === currentPage ? 'active' : ''}`;
    btn.textContent = i;
    btn.addEventListener('click', () => {
      currentPage = i;
      renderGallery();
    });
    pageNumbers.appendChild(btn);
  }
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    currentPage = 1;
    renderGallery();
  });
});

pageButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const totalPages = Math.ceil(galleryItems.filter(item => currentFilter === 'all' || item.category === currentFilter).length / perPage);
    if (btn.dataset.page === 'prev' && currentPage > 1) {
      currentPage -= 1;
    }
    if (btn.dataset.page === 'next' && currentPage < totalPages) {
      currentPage += 1;
    }
    renderGallery();
  });
});

if (galleryGrid) {
  renderGallery();
}

// Dropdown toggle for touch / narrow screens
document.querySelectorAll('.nav-links .dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth < 992) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.classList.toggle('open');
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-links')) {
    document.querySelectorAll('.nav-links .dropdown').forEach(d => d.classList.remove('open'));
  }
});

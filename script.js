document.addEventListener("DOMContentLoaded", () => {
  // === Menu burger (mobile) ===
  const burger = document.getElementById('burger');
  const main = document.querySelector('main');

  if (burger && main) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      main.classList.toggle('show');
    });
  }

  // === Animation texte "à propos" ===
  const typedText = "Entre la précision du fraisage CN et l’expression libre de la danse, j’ai toujours cherché à allier rigueur et créativité dans ce que je fais.";
  const typedElement = document.getElementById("typed-text");
  let hasTyped = false;

  function typeLetterByLetter(text, element, delay = 30) {
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, delay);
      }
    }
    type();
  }

  const headers = document.querySelectorAll(".toggle-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.classList.toggle("show");

      if (header.parentElement.id === "apropos" && !hasTyped) {
        typedElement.textContent = "";
        typeLetterByLetter(typedText, typedElement);
        hasTyped = true;
      }
    });
  });

  // === Galerie FRAISAGE CN ===
  const openGalleryFraisage = document.getElementById('open-gallery-fraisage');
  const galleryModalFraisage = document.getElementById('gallery-modal-fraisage');
  const closeGalleryFraisage = document.getElementById('close-gallery-fraisage');

  if (openGalleryFraisage && galleryModalFraisage && closeGalleryFraisage) {
    openGalleryFraisage.addEventListener('click', (e) => {
  e.preventDefault();
  galleryModalFraisage.classList.add('show');

  // ➕ Ajout dynamique de fade-zoom + visible à l'ouverture
  const media = galleryModalFraisage.querySelectorAll('img, video');
  media.forEach(el => {
    el.classList.add('fade-zoom', 'visible');
  });
});

    closeGalleryFraisage.addEventListener('click', () => {
      galleryModalFraisage.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
      if (e.target === galleryModalFraisage) {
        galleryModalFraisage.classList.remove('show');
      }
    });
  }

  // === Galerie BREAKDANCE ===
  const openGalleryBreakdance = document.getElementById('open-gallery-breakdance');
  const galleryModalBreakdance = document.getElementById('gallery-modal-breakdance');
  const closeGalleryBreakdance = document.getElementById('close-gallery-breakdance');

  if (openGalleryBreakdance && galleryModalBreakdance && closeGalleryBreakdance) {
    openGalleryBreakdance.addEventListener('click', (e) => {
  e.preventDefault();
  galleryModalBreakdance.classList.add('show');

  // ➕ Ajout dynamique de fade-zoom + visible à l'ouverture
  const videos = galleryModalBreakdance.querySelectorAll('video');
  videos.forEach(video => {
    video.classList.add('fade-zoom', 'visible');
  });
});

    closeGalleryBreakdance.addEventListener('click', () => {
      galleryModalBreakdance.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
      if (e.target === galleryModalBreakdance) {
        galleryModalBreakdance.classList.remove('show');
      }
    });
  }

  // === Image modal ===
  const imageModal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeImageModal = document.getElementById('close-image-modal');
  const prevImage = document.getElementById('prev-image');
  const nextImage = document.getElementById('next-image');
  const galleryImages = Array.from(document.querySelectorAll('.gallery img'));
  let currentImageIndex = 0;

  function showImage(index) {
    currentImageIndex = index;
    modalImg.src = galleryImages[currentImageIndex].src;
    imageModal.classList.add('show');
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => showImage(index));
  });

  if (prevImage && nextImage) {
    prevImage.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentImageIndex);
    });
    nextImage.addEventListener('click', () => {
      currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
      showImage(currentImageIndex);
    });
  }

  if (closeImageModal) {
    closeImageModal.addEventListener('click', () => imageModal.classList.remove('show'));
    window.addEventListener('click', (e) => {
      if (e.target === imageModal) imageModal.classList.remove('show');
    });
  }

  // === Vidéo modal ===
  const videoModal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const closeVideoModal = document.getElementById('close-video-modal');
  const prevVideo = document.getElementById('prev-video');
  const nextVideo = document.getElementById('next-video');
  const galleryVideos = Array.from(document.querySelectorAll('.gallery video'));
  let currentVideoIndex = 0;

  function showVideo(index) {
    currentVideoIndex = index;
    const source = galleryVideos[currentVideoIndex].querySelector('source');
    const modalSource = modalVideo.querySelector('source');
    modalSource.src = source.src;
    modalVideo.load();
    modalVideo.play();
    videoModal.classList.add('show');
  }

  galleryVideos.forEach((video, index) => {
    video.addEventListener('click', () => showVideo(index));
  });

  if (prevVideo && nextVideo) {
    prevVideo.addEventListener('click', () => {
      currentVideoIndex = (currentVideoIndex - 1 + galleryVideos.length) % galleryVideos.length;
      showVideo(currentVideoIndex);
    });
    nextVideo.addEventListener('click', () => {
      currentVideoIndex = (currentVideoIndex + 1) % galleryVideos.length;
      showVideo(currentVideoIndex);
    });
  }

  if (closeVideoModal) {
    closeVideoModal.addEventListener('click', () => {
      videoModal.classList.remove('show');
      modalVideo.pause();
    });
    window.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('show');
        modalVideo.pause();
      }
    });
  }

  // === Navigation clavier ===
  window.addEventListener('keydown', (e) => {
    if (imageModal.classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
      } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
      } else if (e.key === 'Escape') {
        imageModal.classList.remove('show');
      }
    }

    if (videoModal.classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        currentVideoIndex = (currentVideoIndex - 1 + galleryVideos.length) % galleryVideos.length;
        showVideo(currentVideoIndex);
      } else if (e.key === 'ArrowRight') {
        currentVideoIndex = (currentVideoIndex + 1) % galleryVideos.length;
        showVideo(currentVideoIndex);
      } else if (e.key === 'Escape') {
        videoModal.classList.remove('show');
        modalVideo.pause();
      }
    }
  });

  // === DARK MODE ===
  const toggleBtn = document.getElementById('dark-toggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
      toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });

   // === FADE-IN des sections au scroll ===
  const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // une seule fois
      }
    });
  }, {
    threshold: 0.2
  });

  faders.forEach(section => observer.observe(section));

  // === FADE-ZOOM pour les images/vidéos ===
  const zoomElements = document.querySelectorAll('.fade-zoom');

  const zoomObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  zoomElements.forEach(el => zoomObserver.observe(el));

});


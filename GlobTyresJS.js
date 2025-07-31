document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Background Slider ---
    const sliderContainer = document.getElementById('hero-background-slider');
    const images = [
        'Images/TyreBackground1.jpg', 
        'Images/Tyre-Background-2.jpg',
        'Images/TyreBackground3.jpg',
        'Images/TyreBackground4.jpg'
    ];
    let currentImageIndex = 0;

    // Preload images for smoother transitions
    function preloadImages() {
        for (const src of images) {
            const img = new Image();
            img.src = src;
        }
    }

    function createSlides() {
        images.forEach((src, index) => {
            const slide = document.createElement('div');
            slide.className = 'hero-bg-slide';
            slide.style.backgroundImage = `url('${src}')`;
            if (index === 0) {
                slide.classList.add('active'); // Make first slide visible initially
            }
            sliderContainer.appendChild(slide);
        });
    }

    function changeSlide() {
        const slides = document.querySelectorAll('.hero-bg-slide');
        
        // Remove active class from current slide
        slides[currentImageIndex].classList.remove('active');

        // Update index to the next image
        currentImageIndex = (currentImageIndex + 1) % images.length;

        // Add active class to the new slide
        slides[currentImageIndex].classList.add('active');
    }

    // Initialize slider
    if (sliderContainer) {
        preloadImages();
        createSlides();
        // Change slide every 4 seconds (4000 milliseconds)
        setInterval(changeSlide, 4000);
    }


    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Active Navigation Link Highlight ---
    const currentPage = window.location.pathname.split("/").pop() || 'GlobTyres.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href').endsWith(currentPage)) {
            link.classList.add('active');
            link.style.color = 'var(--color-text-black)'; 
        }
    });

    // --- Intersection Observer for On-Scroll Animations ---
    const animatedParents = document.querySelectorAll('.animated-parent');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        root: null, 
        threshold: 0.2
    });

    animatedParents.forEach(el => {
        observer.observe(el);
    });

    
 const revealElements = document.querySelectorAll('.reveal-up');
 const Secobserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => Secobserver.observe(el));



   // --- Services Modal Logic ---
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModal = document.getElementById('serviceModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');

    // Data for detailed services
    const serviceDetails = {
          'wheel-balancing': {
            title: 'High-Speed Digital Wheel Balancing',
            image: 'Images/wheel-balancing.jpg',
            description: 'Eliminate irritating vibrations and prevent premature, uneven tyre wear with our high-speed digital wheel balancing service. Unbalanced wheels can lead to a bumpy ride and costly tyre replacements. Our precision equipment detects even the slightest imbalances, allowing us to add corrective weights for a perfectly balanced wheel, ensuring a smooth and comfortable journey every time.'
        },
       'Wheel-Alignment': {
            title: 'Advanced 3D Wheel Alignment',
            image: 'Images/wheel-alignment.jpg',
            description: 'Experience the difference with our computerized 3D wheel alignment system. This cutting-edge technology accurately measures and adjusts the angles of your wheels to the manufacturer’s specifications. Proper alignment ensures even tyre wear, dramatically improves fuel efficiency, and provides a smoother, more stable driving experience, reducing steering effort and enhancing vehicle handling.'
        },
        'Tyre-Rotation': {
            title: 'Tyre Rotation Service',
            image: 'Images/tyre-rotation.jpg',
            description: 'Regular tyre rotation helps ensure even wear and prolongs the life of your tyres. Our experts rotate your tyres using industry best practices based on your vehicle’s drive type (FWD, RWD, AWD) to optimize safety and performance.'
        },
        'Tyre-Fitting': {
            title: 'Precision Tyre Fitting',
            image: 'Images/Services/Tyres-Fitting.jpg',
            description: 'Our expert technicians use advanced, state-of-the-art machinery to precisely fit new tyres onto your vehicle. This meticulous process ensures not only a perfect and secure fit but also optimizes the road grip, enhancing your safety and significantly extending the lifespan of your tyres. We handle all types of vehicles and tyre specifications with utmost care.'
        },
        'Puncture-Repair': {
            title: 'Quick & Reliable Puncture Repair',
            image: 'Images/puncture-repair.jpg',
            description: 'Got a flat? Our fast, affordable, and reliable tyre puncture repair service gets you back on the road in no time. We assess the damage carefully and use industry-approved techniques to safely and effectively repair punctures, ensuring the integrity and longevity of your tyre. Don\'t let a small puncture derail your plans – we\'re here to help quickly and efficiently.'
        },
        'Nitrogen-Inflation': {
            title: 'Optimized Tyre Performance with Nitrogen Inflation',
            image: 'Images/nitrogen.jpg',
            description: 'Upgrade to nitrogen inflation for superior tyre performance. Unlike compressed air, nitrogen helps maintain more consistent tyre pressure regardless of temperature fluctuations, leading to enhanced fuel efficiency and a significantly extended tyre life. Nitrogen also reduces tyre oxidation, preserving the internal components and ensuring your tyres perform optimally for longer.'
        }

    };

    serviceCards.forEach(card => {
            card.addEventListener('click', () => {
            const serviceType = card.dataset.service;
            const details = serviceDetails[serviceType];

            if (details) {
                modalTitle.textContent = details.title;
                modalImage.src = details.image;
                modalImage.alt = details.title;
                modalDescription.textContent = details.description;
                serviceModal.classList.remove('hidden');
            }
        });

    });

    closeModalBtn.addEventListener('click', () => {
        serviceModal.classList.add('hidden');
    });

    // Close modal if user clicks outside of it
    // serviceModal.addEventListener('click', (e) => {
    //     if (e.target === serviceModal) {
    //         serviceModal.classList.add('hidden');
    //     }
    // });


//Services
  AOS.init({
    duration: 800,
    once: true,
  });

});

function showProduct(type) {
    document.getElementById('products').classList.add('hidden');
    document.getElementById('product-' + type).classList.remove('hidden');
    document.getElementById('product-main').classList.remove('hidden')
  }

  function goBack() {
    document.getElementById('Glob-Products').classList.remove('hidden');
    document.getElementById('products').classList.remove('hidden');
    ['product-alloy', 'product-tyres', 'product-batteries'].forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
  }
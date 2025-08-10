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

 showOfferPopup(); 

    const track = document.getElementById('testimonial-slider-track');
    
    if (track) {
        const cards = document.querySelectorAll('#testimonial-slider-track .testimonial-card');
        const totalCards = cards.length;
        let currentIndex = 0;
        const intervalTime = 5000; // Change slide every 5 seconds
        
        function updateSlider() {
            const offset = -currentIndex * cards[0].offsetWidth;
            track.style.transform = `translateX(${offset}px)`;
        }

        setInterval(() => {
            currentIndex++;
            
            // Loop logic: if we are at the end, transition back to the beginning
            if (currentIndex >= totalCards) {
                // Remove the smooth transition temporarily
                track.classList.add('reset-transform');
                
                // Reset the slider to the first card's position (index 0)
                currentIndex = 0;
                updateSlider();
                
                // After a tiny delay, remove the reset class to re-enable the transition
                // This makes the transition back to the start appear instantaneous and then the next slide is smooth
                setTimeout(() => {
                    track.classList.remove('reset-transform');
                }, 50); // A small delay is needed for the browser to register the class change
                
            } else {
                // If not at the end, just slide to the next card as usual
                updateSlider();
            }
        }, intervalTime);
        
        // Optional: Update slider position on window resize
        window.addEventListener('resize', updateSlider);
    }



    
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
        },
        'Pickup-Drop': {
        title: "Pick-Up & Drop Service",
        image: "Images/Services/Pickup-Drop-icon.jpg",
        description: "Enjoy hassle-free tyre and vehicle servicing with our Pick-Up & Drop facility. We collect your vehicle from your location, service it, and return it to your doorstep — saving you time and effort."
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

    // const mobileMenuButton = document.getElementById('mobile-menu-button');
    // const mobileMenu = document.getElementById('mobile-menu');

    // mobileMenuButton.addEventListener('click', () => {
    //     mobileMenu.classList.toggle('hidden');
    // });

    // Google Apps Script submission handling
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const closeModalButton = document.getElementById('closeModal');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            form.reset(); // Clear the form
            modal.style.display = 'flex'; // Show the modal
        } else {
            // You can add an error message here if needed
            alert('Oops! There was a problem with your submission. Please try again later.');
        }
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

    // Hide the modal if the user clicks outside of it
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

});

function showProduct(type) {
    document.getElementById('products').classList.add('hidden');
    document.getElementById('product-' + type).classList.remove('hidden');
    document.getElementById('product-main').classList.remove('hidden')
        window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    document.getElementById('Glob-Products').classList.remove('hidden');
    document.getElementById('products').classList.remove('hidden');
    ['product-alloy', 'product-tyres', 'product-batteries'].forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
         window.scrollTo({ top: 0, behavior: 'smooth' });
  }

    function toggleAlloyGallery() {
        const extra = document.getElementById('extra-alloy-images');
        const button = document.getElementById('alloyShowMoreBtn');

        if (extra.classList.contains('hidden')) {
            extra.classList.remove('hidden');
            button.textContent = 'Show Less';
        } else {
            extra.classList.add('hidden');
            button.textContent = 'Show More';
        }
    }

    // Function to close the popup
function closePopup() {
  const popupContainer = document.getElementById('offerPopup');
  popupContainer.style.display = 'none';
}

// Function to fetch the offer data and display the popup
function showOfferPopup() {
  const popupContainer = document.getElementById('offerPopup');
  const popupTitle = document.getElementById('popup-title');
  const popupDescription = document.getElementById('popup-description');
  const popupCta = document.getElementById('popup-cta');
  const API_URL =  'https://raw.githubusercontent.com/autidnyanesh/offers/main/Offers.Json';

  // Check localStorage to avoid showing the popup multiple times
//   if (localStorage.getItem('popupShown') === 'true') {
//     return;
//   }

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const now = new Date();
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      // Check if the offer is active and within the valid date range
      if (data.active && now >= startDate && now <= endDate) {
        popupTitle.textContent = data.title;
        popupDescription.textContent = data.description;
        popupCta.textContent = data.ctaText;
        popupCta.href = data.ctaLink;
        
        popupContainer.style.display = 'flex'; // Show the popup
        
        // Store in localStorage that the popup has been shown
        localStorage.setItem('popupShown', 'true');
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}



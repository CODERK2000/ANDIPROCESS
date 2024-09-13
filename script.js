// Inicialización del Swiper para la primera instancia
var swiper1 = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 3000, // Autoplay de 3 segundos
        disableOnInteraction: false,
    },
});

// Inicialización del Swiper para la segunda instancia
var swiper2 = new Swiper(".mySwiper-2", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        }
    },
    autoplay: {
        delay: 4000, // Autoplay de 4 segundos para la segunda instancia
        disableOnInteraction: false,
    },
});

// Función para actualizar el Swiper según la pestaña seleccionada
function updateSwiper(swiperInstance) {
    swiperInstance.update(); // Actualiza la instancia del Swiper
}

// Interactividad para las pestañas con animaciones suaves
let tabInputs = document.querySelectorAll(".tabInput");
tabInputs.forEach(function(input) {
    input.addEventListener('change', function() {
        // Obtener el id de la pestaña seleccionada
        let id = this.getAttribute('aria-controls');

        // Forzar el reflujo para aplicar la animación la primera vez
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active'); // Elimina la clase activa
            void content.offsetWidth; // Forzar reflujo
            if (content.id === id) {
                content.classList.add('active');  // Añadir clase activa para mostrar
            }
        });

        // Actualizar el Swiper asociado si existe
        let swiperContainer = document.querySelector('.swiper-container-' + id);
        if (swiperContainer) {
            let swiperInstance = swiperContainer.swiper;
            if (swiperInstance) {
                updateSwiper(swiperInstance);
            }
        }
    });

    // Simular un clic en el primer input para mostrar la primera pestaña por defecto
    if (input.checked) {
        input.dispatchEvent(new Event('change'));
    }
});

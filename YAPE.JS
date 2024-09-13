document.addEventListener('DOMContentLoaded', function() {
    const paymentMethodSelect = document.getElementById('payment-method');
    const cardPayment = document.getElementById('card-payment');
    const bankPayment = document.getElementById('bank-payment');
    const yapePayment = document.getElementById('yape-payment');
    const payButton = document.getElementById('pay-button');
    const paymentForm = document.getElementById('payment-form');

    function showPaymentDetails() {
        // Limpiar animaciones previas
        cardPayment.classList.remove('animate__fadeIn');
        bankPayment.classList.remove('animate__fadeIn');
        yapePayment.classList.remove('animate__fadeIn');

        // Mostrar detalles de pago basados en la selección
        switch (paymentMethodSelect.value) {
            case 'card':
                cardPayment.style.display = 'block';
                bankPayment.style.display = 'none';
                yapePayment.style.display = 'none';
                cardPayment.classList.add('animate__animated', 'animate__fadeIn');
                break;
            case 'bank':
                cardPayment.style.display = 'none';
                bankPayment.style.display = 'block';
                yapePayment.style.display = 'none';
                bankPayment.classList.add('animate__animated', 'animate__fadeIn');
                break;
            case 'yape':
                cardPayment.style.display = 'none';
                bankPayment.style.display = 'none';
                yapePayment.style.display = 'block';
                yapePayment.classList.add('animate__animated', 'animate__fadeIn');
                break;
            default:
                cardPayment.style.display = 'none';
                bankPayment.style.display = 'none';
                yapePayment.style.display = 'none';
                break;
        }
        validateForm();
    }

    function validateForm() {
        let isValid = true;

        // Limpiar errores previos
        paymentForm.querySelectorAll('input').forEach(input => {
            input.classList.remove('error');
            const errorElement = document.getElementById(`${input.id}-error`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        });

        // Validar campos según el método de pago
        if (paymentMethodSelect.value === 'card') {
            ['card-number', 'expiry-date', 'cvv'].forEach(id => {
                const input = document.getElementById(id);
                if (input && input.value.trim() === '') {
                    input.classList.add('error');
                    document.getElementById(`${id}-error`).textContent = 'Este campo es obligatorio.';
                    isValid = false;
                }
            });
        } else if (paymentMethodSelect.value === 'bank') {
            ['bank-account', 'bank-name', 'iban', 'swift'].forEach(id => {
                const input = document.getElementById(id);
                if (input && input.value.trim() === '') {
                    input.classList.add('error');
                    document.getElementById(`${id}-error`).textContent = 'Este campo es obligatorio.';
                    isValid = false;
                }
            });
        } else if (paymentMethodSelect.value === 'yape') {
            const amountInput = document.getElementById('amount');
            if (amountInput && amountInput.value.trim() === '') {
                amountInput.classList.add('error');
                document.getElementById('amount-error').textContent = 'Este campo es obligatorio.';
                isValid = false;
            }
        }

        // Habilitar o deshabilitar el botón de pago
        payButton.disabled = !isValid;
    }

    paymentMethodSelect.addEventListener('change', function() {
        showPaymentDetails();
    });

    paymentForm.addEventListener('input', function() {
        validateForm();
    });

    payButton.addEventListener('click', function() {
        if (!payButton.disabled) {
            const paymentMethod = paymentMethodSelect.value;
            if (paymentMethod === 'yape') {
                this.classList.add('animate__animated', 'animate__rubberBand'); // Efecto de animación para el botón
                setTimeout(function() {
                    window.location.href = 'https://play.google.com/store/apps/details?id=com.bcp.innovacxion.yapeapp&hl=es_US&pli=1';
                }, 500); // Retraso para mostrar la animación
            } else {
                alert('El método de pago seleccionado no está soportado aún.');
            }
        }
    });
});

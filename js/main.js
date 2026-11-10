// JavaScript del portafolio JUMATEK.

// CONFIGURACIÓN WHATSAPP: coloca entre comillas tu número con código de país.
// Solo dígitos, sin +, espacios ni guiones. Vacío desactiva la apertura de WhatsApp.
const WHATSAPP_NUMBER = '19146587128';

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-navigation');
const mobileViewport = window.matchMedia('(max-width: 760px)');

if (menuToggle && navigation) {
  const menuLabel = menuToggle.querySelector('.menu-label');

  const setMenuOpen = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuLabel.textContent = open ? 'Cerrar menú' : 'Abrir menú';
    navigation.hidden = mobileViewport.matches && !open;
  };

  const syncViewport = () => {
    const focusedElement = document.activeElement;
    menuToggle.hidden = !mobileViewport.matches;
    setMenuOpen(false);
    if (mobileViewport.matches && navigation.contains(focusedElement)) {
      menuToggle.focus();
    } else if (!mobileViewport.matches && focusedElement === menuToggle) {
      navigation.querySelector('a').focus();
    }
  };

  menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileViewport.matches && menuToggle.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !mobileViewport.matches) return;
    setMenuOpen(false);
    const destination = document.querySelector(link.getAttribute('href'));
    if (destination) destination.focus({ preventScroll: true });
  });

  document.addEventListener('click', (event) => {
    if (mobileViewport.matches && !navigation.contains(event.target) && !menuToggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  mobileViewport.addEventListener('change', syncViewport);
  syncViewport();
}

// Compatibilidad para navegadores sin agrupación nativa de details por name.
document.querySelectorAll('.faq-list').forEach((faqList) => {
  const items = faqList.querySelectorAll('.faq-item');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
});

const quoteForm = document.querySelector('#quote-form');

if (quoteForm) {
  const fields = document.querySelector('#quote-fields');
  const status = document.querySelector('#quote-status');
  const copyArea = document.querySelector('#quote-copy-area');
  const preview = document.querySelector('#quote-preview');
  const copyButton = document.querySelector('#quote-copy');
  const requiredFields = [...fields.querySelectorAll('[required]')];

  const validateField = (field) => {
    field.setCustomValidity('');
    if (!field.value.trim()) {
      const messages = {
        fullName: 'Escribe tu nombre completo.',
        service: 'Selecciona el servicio que necesitas.',
        description: 'Describe brevemente tu proyecto.'
      };
      field.setCustomValidity(messages[field.name]);
    }
    field.setAttribute('aria-invalid', String(!field.validity.valid));
  };

  requiredFields.forEach((field) => {
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('change', () => validateField(field));
    field.addEventListener('invalid', () => validateField(field));
  });

  const prepareMessage = () => {
    const data = new FormData(quoteForm);
    return [
      'Hola JUMATEK, quisiera solicitar una cotización.',
      '',
      `Nombre completo: ${data.get('fullName').trim()}`,
      `Negocio: ${data.get('business').trim() || 'No indicado'}`,
      `Servicio solicitado: ${data.get('service')}`,
      '',
      'Descripción del proyecto:',
      data.get('description').trim()
    ].join('\n');
  };

  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    requiredFields.forEach(validateField);
    if (!quoteForm.reportValidity()) return;

    const message = prepareMessage();
    const number = WHATSAPP_NUMBER;
    preview.value = message;
    if (!/^[1-9]\d{6,14}$/.test(number)) {
      status.textContent = 'WhatsApp no está configurado con un número internacional válido. Puedes copiar tu solicitud con el botón de abajo. No se ha enviado ningún dato.';
      return;
    }

    status.textContent = 'Se abrirá WhatsApp con tu solicitud preparada. Revisa el destinatario y confirma el envío allí.';
    // Una navegación en la misma pestaña desde la acción del usuario, sin ventanas nuevas.
    window.location.assign(`https://wa.me/${number}?text=${encodeURIComponent(message)}`);
  });

  quoteForm.addEventListener('input', () => {
    preview.value = prepareMessage();
  });

  copyButton.addEventListener('click', async () => {
    requiredFields.forEach(validateField);
    if (!quoteForm.reportValidity()) return;
    preview.value = prepareMessage();
    try {
      await navigator.clipboard.writeText(preview.value);
      status.textContent = 'Solicitud copiada al portapapeles. No se ha enviado ningún dato.';
    } catch {
      preview.focus();
      preview.select();
      status.textContent = 'No se pudo copiar automáticamente. El texto está seleccionado: usa la opción Copiar de tu dispositivo o Ctrl+C (Cmd+C en Mac).';
    }
  });

  // Sin JavaScript, los campos permanecen deshabilitados para evitar envíos nativos.
  fields.disabled = false;
  // La copia está disponible tanto con WhatsApp configurado como sin configurar.
  copyArea.hidden = false;
  if (!/^[1-9]\d{6,14}$/.test(WHATSAPP_NUMBER)) {
    status.textContent = 'El envío por WhatsApp aún no está disponible. Completa los campos obligatorios y usa Copiar solicitud. No se ha enviado ningún dato.';
  }
}

const footerYear = document.querySelector('#footer-year');
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}

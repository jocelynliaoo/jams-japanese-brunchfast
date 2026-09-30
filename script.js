const tabs = [...document.querySelectorAll('.nav-tab')];
const pages = [...document.querySelectorAll('.page')];

function showPage(target) {
  pages.forEach((page) => {
    const active = page.id === target;
    page.hidden = !active;
    page.classList.toggle('active', active);
  });

  tabs.forEach((tab) => {
    const active = tab.dataset.target === target;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${target}`);
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => showPage(tab.dataset.target));
});

const initial = ['details', 'menu', 'rsvp'].includes(location.hash.slice(1))
  ? location.hash.slice(1)
  : 'details';
showPage(initial);

const form = document.querySelector('#rsvp-form');
const status = document.querySelector('#form-status');

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyoxEZZlqyz7ubz2Zdou3LtWoryL70aa-1ZvWhd6gfyDglQI7KCr1VRKVrznKHh1fUi/exec';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  submitButton.textContent = 'sending...';
  status.textContent = '';

  const formData = new FormData(form);

  const data = {
    name: formData.get('name'),
    attendance: formData.get('attendance'),
    guest_count: formData.get('guest_count'),
    dietary_notes: formData.get('order'),
    message: formData.get('message')
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(data)
    });

    form.reset();
    status.textContent = 'yay!! see you there ♡';
    submitButton.textContent = 'sent ♡';

  } catch (error) {
    console.error(error);
    status.textContent = 'hmm, that did not send — try again!';
    submitButton.textContent = 'RSVP ♡';
  } finally {
    submitButton.disabled = false;
  }
});
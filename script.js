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
  'https://script.google.com/macros/s/AKfycbxwtWtSGVY_kUsYC07WAAtARvdHqrqkpgm5DZilk8e2Hq6h07lGa2tKG7i9VRsEtB4X/exec';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  submitButton.textContent = 'sending...';
  status.textContent = '';

  const formData = new FormData(form);

  const data = new URLSearchParams();

  data.append('name', formData.get('name'));
  data.append('attendance', formData.get('attendance'));
  data.append('guest_count', formData.get('guest_count'));
  data.append('order', formData.get('order'));
  data.append('message', formData.get('message'));

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: data
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
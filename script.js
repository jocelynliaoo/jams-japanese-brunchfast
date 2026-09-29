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

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (form.action.includes('YOUR_FORM_ID')) {
    status.textContent = 'RSVP setup is almost done — add your Formspree form ID first ♡';
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'sending...';
  status.textContent = '';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Submission failed');

    form.reset();
    status.textContent = 'yay!! see you there ♡';
    submitButton.textContent = 'sent ♡';
  } catch (error) {
    status.textContent = 'hmm, that did not send — try again in a sec!';
    submitButton.textContent = 'RSVP ♡';
  } finally {
    submitButton.disabled = false;
  }
});

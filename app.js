const dialog = document.querySelector('#trip-dialog');
const toast = document.querySelector('#toast');
let toastTimer;

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

document.querySelector('#new-trip').addEventListener('click', () => dialog.showModal());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.querySelector('form').addEventListener('submit', event => {
  if (event.submitter?.value === 'create') {
    const destination = document.querySelector('#destination').value.trim();
    if (!destination) { event.preventDefault(); return; }
    setTimeout(() => notify(`Your ${destination} trip is ready to plan ✨`), 50);
    document.querySelector('#destination').value = '';
  }
});

document.querySelectorAll('.nav-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.nav-tab').forEach(item => item.classList.remove('active'));
  tab.classList.add('active');
  notify(`${tab.dataset.view} view selected`);
  document.querySelector('.nav-tabs').classList.remove('mobile-open');
}));

document.querySelectorAll('[data-trip]').forEach(card => card.addEventListener('click', () => {
  notify(`${card.dataset.trip} · View trip details`);
}));

document.querySelector('#see-all').addEventListener('click', () => notify('Showing all your past adventures'));
document.querySelector('#country-select').addEventListener('click', event => {
  const button = event.currentTarget;
  const options = ['All countries', 'Planned', 'Visited'];
  const current = options.indexOf(button.childNodes[0].textContent.trim());
  button.childNodes[0].textContent = options[(current + 1) % options.length] + ' ';
});
document.querySelector('#year-select').addEventListener('click', event => {
  const button = event.currentTarget;
  button.firstChild.textContent = button.firstChild.textContent.trim() === '2025' ? '2026 ' : '2025 ';
});
document.querySelectorAll('.zoom button').forEach((button, index) => button.addEventListener('click', () => {
  const map = document.querySelector('.map-art svg');
  const scale = Number(map.dataset.zoom || 1) + (index === 0 ? .12 : -.12);
  map.dataset.zoom = Math.max(.85, Math.min(1.6, scale));
  map.style.transform = `scale(${map.dataset.zoom})`;
}));
document.querySelector('.mobile-menu').addEventListener('click', () => document.querySelector('.nav-tabs').classList.toggle('mobile-open'));

const themeToggle = document.getElementById('theme-toggle');
const gallery = document.getElementById('gallery');
const imageUpload = document.getElementById('image-upload');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});

(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
  else setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
})();

imageUpload.addEventListener('change', handleFiles);
function handleFiles(event) {
  const files = event.target.files;
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.loading = 'lazy';
      img.alt = file.name;
      img.title = file.name;
      img.addEventListener('click', () => {
        img.style.maxWidth = img.style.maxWidth === '100%' ? '100%' : '100%';
        img.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
      });
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}

document.addEventListener('DOMContentLoaded', function () {  
  const drawerToggle = document.getElementById('drawerToggle');
  const drawerClose = document.getElementById('drawerClose');
  const drawer = document.getElementById('drawer');
  const dropdownButton = document.getElementById('hs-dropdown-hover-event');
const dropdownMenu = document.querySelector('.hs-dropdown-menu');

dropdownButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('opacity-100');
  dropdownMenu.classList.toggle('hidden');
});

dropdownMenu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    const selectedOption = event.target.textContent.trim();
    dropdownButton.querySelector('span').textContent = selectedOption;
    dropdownMenu.classList.remove('opacity-100');
    dropdownMenu.classList.add('hidden');
  }
});



const HSThemeAppearance = {
  init() {
      const defaultTheme = 'default'
      let theme = localStorage.getItem('hs_theme') || defaultTheme

      if (document.querySelector('html').classList.contains('dark')) return
      this.setAppearance(theme)
  },
  _resetStylesOnLoad() {
      const $resetStyles = document.createElement('style')
      $resetStyles.innerText = `*{transition: unset !important;}`
      $resetStyles.setAttribute('data-hs-appearance-onload-styles', '')
      document.head.appendChild($resetStyles)
      return $resetStyles
  },
  setAppearance(theme, saveInStore = true, dispatchEvent = true) {
      const $resetStylesEl = this._resetStylesOnLoad()

      if (saveInStore) {
          localStorage.setItem('hs_theme', theme)
      }

      if (theme === 'auto') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
      }

      document.querySelector('html').classList.remove('dark')
      document.querySelector('html').classList.remove('default')
      document.querySelector('html').classList.remove('auto')

      document.querySelector('html').classList.add(this.getOriginalAppearance())

      setTimeout(() => {
          $resetStylesEl.remove()
      })

      if (dispatchEvent) {
          window.dispatchEvent(new CustomEvent('on-hs-appearance-change', {detail: theme}))
      }
  },
  getAppearance() {
      let theme = this.getOriginalAppearance()
      if (theme === 'auto') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
      }
      return theme
  },
  getOriginalAppearance() {
      const defaultTheme = 'default'
      return localStorage.getItem('hs_theme') || defaultTheme
  }
}
HSThemeAppearance.init()

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (HSThemeAppearance.getOriginalAppearance() === 'auto') {
      HSThemeAppearance.setAppearance('auto', false)
  }
})

window.addEventListener('load', () => {
  const $clickableThemes = document.querySelectorAll('[data-hs-theme-click-value]')
  const $switchableThemes = document.querySelectorAll('[data-hs-theme-switch]')

  $clickableThemes.forEach($item => {
      $item.addEventListener('click', () => HSThemeAppearance.setAppearance($item.getAttribute('data-hs-theme-click-value'), true, $item))
  })

  $switchableThemes.forEach($item => {
      $item.addEventListener('change', (e) => {
          HSThemeAppearance.setAppearance(e.target.checked ? 'dark' : 'default')
      })

      $item.checked = HSThemeAppearance.getAppearance() === 'dark'
  })

  window.addEventListener('on-hs-appearance-change', e => {
      $switchableThemes.forEach($item => {
          $item.checked = e.detail === 'dark'
      })
  })
})


  drawerToggle.addEventListener('click', () => {
    drawer.classList.toggle('hidden');
  });

  drawerClose.addEventListener('click', () => {
    drawer.classList.add('hidden');
  });
  loadPage('gridlnews.html');
});

function checkLogin() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  if (username === 'abdallh' && password === '123456') {
    window.location.href = 'https://www.ynet.co.il/home/0,7340,L-8,00.html';
  } else {
    alert('Incorrect username or password');
  }
}

function loadPage(page) {
  $.ajax({
    url: page,
    type: 'GET',
    success: function(data) {
      $('#content-container').html(data);

      const drawer = document.getElementById('drawer');
      drawer.classList.add('hidden');
    },
    error: function() {
      alert('Error loading page.');
    }
  });
}
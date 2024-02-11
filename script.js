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
  document.addEventListener('click', (event) => {
    const isDropdownButton = dropdownButton.contains(event.target);
    const isDropdownMenu = dropdownMenu.contains(event.target);
  
    if (!isDropdownButton && !isDropdownMenu) {
      dropdownMenu.classList.toggle('opacity-100');
    dropdownMenu.classList.toggle('hidden');
    }
  });

// // darkmode start youtube

// const sunIcon = document.querySelector(".sun");
// const moonIcon = document.querySelector(".moon");

// const userTheme = localStorage.getItem("theme");
// const systemTheme = window.matchMedia(("prefer-color-scheme: dark")).matches;


// const iconToggle = ()=>{
//     moonIcon.classList.toggle("display-none");
//     sunIcon.classList.toggle("display-none");
// };


// const themCheck = () => {
//     if(userTheme ==="dark" || (!userTheme && systemTheme)){
//         document.documentElement.classList.add("dark");
//         moonIcon.classList.add("display-none");
//         return;
//     }
//     sunIcon.classList.add("display-none");
// };

// const themSwitch = () =>{
//     if (document.documentElement.classList.contains("dark")){
//         document.documentElement.classList.remove("dark");
//         localStorage.setItem("theme","light");
//         iconToggle();
//         return;
//     }
//     document.documentElement.classList.add("dark");
//     localStorage.setItem("theme","dark");
//     iconToggle();
// };

// sunIcon.addEventListener("click",()=>{
//     themSwitch();
// });

// moonIcon.addEventListener("click",()=>{
//     themSwitch();
// });

// themCheck();

// // darkmode end youtube


// start dark mode

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


// end dark mode

  

  // // Close the dropdown when clicking outside of it
  // document.addEventListener('click', (event) => {
  //   if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
  //     dropdownMenu.classList.add('hidden');
  //   }
  // });

  drawerToggle.addEventListener('click', () => {
    drawer.classList.toggle('hidden');
  });

  drawerClose.addEventListener('click', () => {
    drawer.classList.add('hidden');
  });

  // Assuming you have a button with an ID of 'darkModeToggle'
  // const darkModeToggle = document.getElementById('darkModeToggle');
  // const body = document.body;
  // darkModeToggle.addEventListener('click', () => {
  //   body.classList.toggle('dark');
  // });

  // Load 'gridlnews.html' by default
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
  // Use AJAX to load the content of the specified HTML page
  $.ajax({
    url: page,
    type: 'GET',
    success: function(data) {
      // Replace the content of the 'content' div with the loaded HTML
      $('#content-container').html(data);

      // Hide the drawer after loading the new page
      const drawer = document.getElementById('drawer');
      drawer.classList.add('hidden');
    },
    error: function() {
      // Handle errors if necessary
      alert('Error loading page.');
    }
  });
}







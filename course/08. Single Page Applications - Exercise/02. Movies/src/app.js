import { showNav, updateNav } from './views/nav.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { page } from './libs.js';
import { logout } from './data/auth.js';

showNav();
updateNav();
showHome();

page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/:id', showDetails);
page('/edit/:id', showEdit);
page();

document.querySelector('a[href="/logout"]').addEventListener('click', (e) => {
  e.preventDefault();

  logout();

  updateNav();
  page.redirect('/');
});
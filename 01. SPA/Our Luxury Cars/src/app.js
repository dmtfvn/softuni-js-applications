import { page } from './libs.js';

import { renderRoot } from './midwares/render.js';
import { validateUser } from './midwares/session.js';
import { showNav } from './views/nav.js';

import { showHome } from './views/home.js';
import { showRegister } from './views/register.js';
import { showLogin } from './views/login.js';
import { logout } from './data/auth.js';
import { showCars } from './views/catalog.js';
import { showAdd } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showSearch } from './views/search.js';

page(renderRoot(document.querySelector('main')));
page(validateUser());
page(showNav);

page('/', showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/logout', signOut);
page('/cars', showCars);
page('/add', showAdd);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch);

page();

function signOut() {
  logout();

  page.redirect('/');
}
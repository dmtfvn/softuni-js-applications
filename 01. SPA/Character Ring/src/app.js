import { page } from './libs.js';

import { renderRoot } from './midwares/render.js';
import { validateUser } from './midwares/session.js';
import { showNav } from './views/nav.js';

import { showHome } from './views/home.js';
import { showRegister } from './views/register.js';
import { showLogin } from './views/login.js';
import { logout } from './data/auth.js';
import { showAdd } from './views/create.js';
import { showCharacters } from './views/characters.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';

page(renderRoot(document.querySelector('main')));
page(validateUser());
page(showNav);

page('/', showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/logout', signOut);
page('/add', showAdd);
page('/characters', showCharacters);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page();

function signOut() {
  logout();

  page.redirect('/');
}
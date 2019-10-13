'use strict';

import './assets/css/keditor.css';
import './assets/css/keditor-contents.css';

import plugins from './plugins';
import keditor from './keditor';

window.KEDITOR = keditor.init({
    plugins: plugins
});
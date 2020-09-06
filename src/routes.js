import home from './pages/home.pages.vue';
import camisetas from './pages/categories/camisetas.pages.vue';
import sapatos from './pages/categories/sapatos.pages.vue';
import calcas from './pages/categories/calcas.pages.vue';

export const routes = [
    {path: '', component: home},
    {path: '/camisetas', component:camisetas},
    {path: '/sapatos', component: sapatos},
    {path: '/calcas', component: calcas}
    
];
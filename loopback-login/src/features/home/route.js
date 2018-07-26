import {
  DefaultPage,
  Staff,
  Home,
  Login,
} from './';

export default {
  path: '/',
  name: 'Home',
  component: DefaultPage,
  childRoutes: [
    
    { path: '', name: 'Home', component: Home },
    { path: '/staff', name: 'Staff', component: Staff },
    { path: '/login', name: 'Login', component: Login },
  ],
};

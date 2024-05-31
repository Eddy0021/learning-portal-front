import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import JoinUsView from '../views/JoinUsView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import RegisterVerificationView from '../views/RegisterVerificationView.vue';
import MyAccountView from '../views/MyAccountView.vue';
import AddTrainerView from '../views/AddTrainerView.vue';
import TrainingsView from '../views/TrainingsView.vue';
import AddTrainingView from '../views/AddTrainingView.vue';
import ChangePasswordView from '../views/ChangePasswordView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/my-account',
      name: 'My Account',
      component: MyAccountView,
    },
    {
      path: '/trainings',
      name: 'Trainings',
      component: TrainingsView,
      meta: {
        breadcrumb: [
          { name: 'My Account', link: '/my-account'},
          { name: 'Trainings', link: '/trainings'}
        ]
      }
    },
    {
      path: '/trainings/add-training',
      name: 'Add training',
      component: AddTrainingView,
      meta: {
        breadcrumb: [
          { name: 'My Account', link: '/my-account'},
          { name: 'Trainings', link: '/trainings'},
          { name: 'Add training', link: '/trainings/add-training'}
        ]
      }
    },
    {
      path: '/add-trainer',
      name: 'Add trainer',
      component: AddTrainerView,
      meta: {
        breadcrumb: [
          { name: 'My Account', link: '/my-account'},
          { name: 'Add trainer', link: '/add-trainer'}
        ]
      }
    },
    {
      path: '/join-us',
      name: 'Join us',
      component: JoinUsView,
    },
    {
      path: '/change-password',
      name: 'Change password',
      component: ChangePasswordView,
    },
    {
      path: '/registration/:type',
      name: 'Registration',
      component: RegistrationView,
    },
    {
      path: '/registration-verification',
      name: 'Registration verification',
      component: RegisterVerificationView,
    },
    {
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    },
  ]
})

router.beforeEach((to, from, next) => {
  // const userStore = useUserStore();
  // const user = userStore.getUser;

  // if (user) { 
  //   var lastTheme = localStorage.getItem('theme');

  //   if(lastTheme === 'lara-dark-purple') localStorage.setItem('theme', 'lara-light-purple');
    
  //   userStore.setToggleTheme( lastTheme === 'lara-dark-purple' ? true : false); 
  // }

  next(); 
});

export default router
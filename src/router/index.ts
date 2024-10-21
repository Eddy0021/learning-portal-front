import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from "../stores/userStore";

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
      props: true
    },
    {
      path: '/registration-verification',
      name: 'Registration verification',
      component: RegisterVerificationView,
      props: true
    },
    {
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    },
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const token = localStorage.getItem('token');
  const protectedRoutes = [
    '/change-password', 
    '/add-trainer', 
    '/trainings/add-training', 
    '/trainings', 
    '/my-account'
  ];

  if (protectedRoutes.includes(to.path)) {
    if (token !== null && userStore.getIsUserNotEmpty) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
  // Getting error: 'from' is declared but its value is never read.
  if(false) from
});

export default router
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import AddTrainingView from '../views/AddTrainingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ]
 })

describe('Bradcrumbers', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  })

  it('renders breadcrumb items correctly', async () => {
    await router.push('/trainings/add-training')
    await router.isReady()
    const wrapper = mount(AddTrainingView, {
    global: {
      plugins: [router]
    }
    })

    // Asserting that breadcrumb items are rendered correctly
    const breadcrumbItems = wrapper.findAll('.bradcrumbers-item');
    expect(breadcrumbItems).toHaveLength(3);
  });

  it('navigates to correct routes on click', async () => {
    await router.push('/trainings/add-training')
    await router.isReady()
    const wrapper = mount(AddTrainingView, {
    global: {
      plugins: [router]
    }
    })

    // Spy on $router.push method
    const pushSpy = vi.spyOn(wrapper.vm.$router, 'push');

    // Simulate click on breadcrumb item
    await wrapper.find('.bradcrumbers-item-link').trigger('click');

    // Assert that $router.push was called with the correct link
    expect(pushSpy).toHaveBeenCalledWith('/my-account');
  });
});

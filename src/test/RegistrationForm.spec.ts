import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import RegistrationForm from '../components/RegistrationForm.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Button from '../components/Button.vue';

// Mock

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('RegistrationForm.vue', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    setActivePinia(createPinia());
  });

  it('renders registration form for Trainer', async () => {
    const wrapper = mount(RegistrationForm, {
      props: {
        type: 'Trainer',
      },
      global: {
        components: {
          'Button': Button,
        },
      },
    });

    // Check if the form title is rendered correctly
    expect(wrapper.find('#form-title').text()).toBe('Trainer');

    // Check if the input fields are rendered correctly
    expect(wrapper.find('input[type="text"][placeholder="Enter first name"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"][placeholder="Enter last name"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"][placeholder="Enter email"]').exists()).toBe(true);
    expect(wrapper.find('select').exists()).toBe(true); // Check for the specialization select field

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Check if the router push function is called with the correct route
    expect(wrapper.vm.router.push).toHaveBeenCalledWith('/registration-verification');

    // Check if the user object is populated correctly
    expect(wrapper.vm.user.firstName).toBe('');
    expect(wrapper.vm.user.lastName).toBe('');
    expect(wrapper.vm.user.email).toBe('');
    expect(wrapper.vm.user.specialization).toBe('');
  });

  it('renders registration form for Student', async () => {
    const wrapper = mount(RegistrationForm, {
      props: {
        type: 'Student',
      },
      global: {
        components: {
          'Button': Button,
        },
      },
    });

    // Check if the form title is rendered correctly
    expect(wrapper.find('#form-title').text()).toBe('Student');

    // Check if the input fields are rendered correctly
    expect(wrapper.find('input[type="text"][placeholder="Enter first name"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"][placeholder="Enter last name"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"][placeholder="Enter email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"][placeholder="Enter date of birth"]').exists()).toBe(true);
    expect(wrapper.find('input[type="text"][placeholder="Enter address"]').exists()).toBe(true);

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Check if the router push function is called with the correct route
    expect(wrapper.vm.router.push).toHaveBeenCalledWith('/registration-verification');

    // Check if the user object is populated correctly
    expect(wrapper.vm.user.firstName).toBe('');
    expect(wrapper.vm.user.lastName).toBe('');
    expect(wrapper.vm.user.email).toBe('');
    expect(wrapper.vm.user.dateOfBirth).toBe('');
    expect(wrapper.vm.user.address).toBe('');
  });
});

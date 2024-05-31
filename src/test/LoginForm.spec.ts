import { mount } from '@vue/test-utils';
import LoginForm from '../components/LoginForm.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Password from 'primevue/password';
import Button from '../components/Button.vue';
import Spinner from '../components/Spinner.vue';

// Mock

vi.mock('primevue/usetoast', () => ({
  useToast: () => ({
    add: vi.fn(),
  }),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('../stores/userStore', () => ({
  useUserStore: () => ({
    setUser: vi.fn(),
  }),
}));

describe('LoginForm.vue', () => {
  let localStorageMock;

  beforeEach(() => {
    vi.resetAllMocks();

    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn()
    };

    globalThis.localStorage = localStorageMock;
  });

  const globalComponents = {
    'p-toast': Toast,
    'p-password': Password,
    'Button': Button,
    'Spinner': Spinner,
  };

  it('renders login form', () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [PrimeVue, ToastService],
        components: globalComponents,
      },
    });
  
    expect(wrapper.find('h3').text()).toBe('Sign In');
    expect(wrapper.find('input[placeholder="Enter username"]').exists()).toBe(true);
    expect(wrapper.find('password[placeholder="Enter password"]').exists()).toBe(true);
    expect(wrapper.findComponent(Button).text()).toBe('Sign In');
  });

  it('displays an error when recaptcha is not marked', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [PrimeVue, ToastService],
        components: globalComponents,
      },
    });
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.vm.toast.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Recaptcha',
      detail: 'Please mark that you aren`t a robot.',
      life: 5000,
    });
  });

  it('calls login method and redirects on success', async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [PrimeVue, ToastService],
        components: globalComponents,
      },
    });
    wrapper.vm.tokenkey = 'dummy-token';
    await wrapper.find('form').trigger('submit.prevent');
    expect(localStorage.setItem).toHaveBeenCalledWith('token', '123');
    expect(wrapper.vm.userStore.setUser).toHaveBeenCalled();
    expect(wrapper.vm.router.push).toHaveBeenCalledWith('/my-account');
  });
});

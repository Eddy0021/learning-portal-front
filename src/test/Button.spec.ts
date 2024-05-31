import { mount } from '@vue/test-utils';
import Button from '../components/Button.vue';
import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('Button', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders button correctly with default props', () => {
    const wrapper = mount(Button, {
        props: {
          to: ''
        }
      });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('type')).toBe('prime');
    expect(wrapper.props('disabled')).toBe(false);
    expect(wrapper.props('to')).toBe('');
  });

  it('renders button correctly with custom props', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'secondary',
        disabled: true,
        to: '/some-route'
      }
    });

    expect(wrapper.props('type')).toBe('secondary');
    expect(wrapper.props('disabled')).toBe(true);
    expect(wrapper.props('to')).toBe('/some-route');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('adds button-pressed class when mouse down and removes on mouse up', async () => {
    const wrapper = mount(Button);
    const button = wrapper.find('button');

    await button.trigger('mousedown');
    expect(button.classes()).toContain('button-pressed');

    await button.trigger('mouseup');
    expect(button.classes()).not.toContain('button-pressed');
  });

  it('adds button-pressed class when mouse down and removes on mouse leave', async () => {
    const wrapper = mount(Button);
    const button = wrapper.find('button');

    await button.trigger('mousedown');
    expect(button.classes()).toContain('button-pressed');

    await button.trigger('mouseleave');
    expect(button.classes()).not.toContain('button-pressed');
  });
});

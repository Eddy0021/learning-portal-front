// src/directives/LazyLoadDirective.ts
import type { Directive } from 'vue';

const LazyLoadDirective: Directive = {
  mounted(el, binding) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (el as HTMLImageElement).src = binding.value;
          observer.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    observer.observe(el);
  },
};

export default LazyLoadDirective;
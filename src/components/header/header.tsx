import { component$, useStyles$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import styles from './header.css?inline';

export default component$(() => {
  useStyles$(styles);

  const pathname = useLocation().pathname;

  return (
    <header>
      <div class="header-inner">
        <section class="logo">
          <a href="/">Sarah Schwartz</a>
        </section>
        <nav>
          <a href="#code" class={{ active: pathname.startsWith('/code') }}>
            Code
          </a>
          <a href="#blog" class={{ active: pathname.startsWith('/blog') }}>
            Blog
          </a>
        </nav>
      </div>
    </header>
  );
});

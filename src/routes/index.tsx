import { component$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Blog from '~/components/blog/blog';
import Code from '~/components/code/code';
import styles from './index.css'

export default component$(() => {
  useStyles$(styles)
  return (
    <div>
      <h1>Hi 👋 I&apos;m Sarah Schwartz</h1>
      
      <div>
          <p class="about">
            {"I’m a full-stack web developer who’s passionate about web3. "}
            {"In my free time I contribute as a core team member to WomenBuildWeb3. During the day, I support developers building with Builder.io. When I’m not at my computer, I like riding my bike, playing games, and 3d printing. "}
          </p>
      </div>
      <Code/>
      <Blog/>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Sarah Schwartz',
};

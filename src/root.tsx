import { component$ } from '@builder.io/qwik';
import { QwikCity, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
// import { Head } from './components/head/head';

import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCity> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  return (
    <QwikCity>
      <head>
        <meta charSet="utf-8" />
        {/* <Head /> */}
        <meta charSet="utf-8" />

      <title>Sarah Schwartz</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon"type="image/x-icon" href="/favicon.ico"/>
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCity>
  );
});

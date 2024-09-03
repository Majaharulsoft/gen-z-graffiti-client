import React from 'react';
import Copyright from './Copyright';

const FooterComponent = () => {
  return (
    <footer
      className='  mb-0 mx-auto w-full max-w-container  '
      aria-labelledby='footer-heading'>
      <h2
        id='footer-heading'
        className='sr-only'>
        © 2024 Artlit.
      </h2>

      <Copyright />
    </footer>
  );
};

export default FooterComponent;

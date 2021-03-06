import React from "react";

const ColorsHelpPage = () => {
  return (
    <>
      <h1 className="font-sans-2xl">Color and accessibility</h1>
      <div className="usa-prose">
        <p>
          Contrast and color use are vital to accessibility. Users, including
          users with visual disabilities, must be able to perceive content on
          the page. In order to keep this tool accessible to users, we recommend
          following the Web Content Accessibility Guidelines (WCAG) 2.0 color
          contrast requirements for Level AA.
        </p>
      </div>
      <h2>Color format</h2>
      <div className="usa-prose">
        <p>
          On the web, colors can be defined in a few ways. We use the
          hexadecimal, or HEX color, for customizing colors. In this format the
          red/green/blue values are presented as a combination of six letters or
          numbers. If you have your brand’s color in a different format, there
          are many free online tools to convert the color from one format into a
          HEX value.
        </p>
      </div>
      <h2>Contrast</h2>
      <div className="usa-prose">
        <p>
          In WCAG 2, contrast is a measure of the difference in perceived
          "luminance" or brightness between two colors. This brightness
          difference is expressed as a ratio ranging from 1:1 (e.g. white on
          white) to 21:1 (e.g., black on a white). To give a frame of reference,
          on a white background:
        </p>
        <ul>
          <li>Pure red (#FF0000) has a ratio of 4:1.</li>
          <li>Pure green (#00FF00) has a very low ratio of 1.4:1.</li>
          <li>Pure blue (#0000FF) has a contrast ratio of 8.6:1.</li>
        </ul>
        <p>
          If you received a warning about your primary color, it is because the
          color is not at least 4.5:1 contrast on a white background. You may
          continue, but your website will not meet most accessibility standards.
          We recommend that you choose another color that is part of your brand
          to use as the primary color.
        </p>
        <p>
          There are also many free “color contrast checker” tools that you can
          find to check if your colors meet WCAG 2.0 Level AA color contrast
          requirements.
        </p>
      </div>
    </>
  );
};

export default ColorsHelpPage;

/**
 * Created by qxqs1 on 2017/2/6.
 */

const configOverrides = {
  rules: {
    'rscss/class-format': [
      true,
      {
        // a-z0-9 - #{$()}
        component: /^[a-z0-9\-#${}()]+$/,
        element: /^[a-z0-9\-#${}()]+$/,
        componentWhitelist: [
          // These are Bootstrap classes that are typically extended as RSCSS components.
          // These exceptions would be useful in projects that use RSCSS in Bootstrap sites.
          'btn',
          'container',
          'checkbox',
          'radio',
        ],
      },
    ],
  },
};

module.exports = {
  scss: {
    syntax: 'scss',
    configOverrides,
  },
};

const techHtml = require('./tech.html');

const tech = {
  template: techHtml,
  bindings: {
    tech: '<',
  },
};

export { tech as default };

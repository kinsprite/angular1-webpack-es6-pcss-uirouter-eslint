const context = require.context('./test-demo', true, /\.(js|ts|tsx)$/);
context.keys().forEach(context);

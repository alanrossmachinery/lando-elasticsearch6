'use strict';

module.exports = lando => {
  lando.events.setMaxListeners(lando.events.getMaxListeners() + 1);
  
  lando.events.on('post-bootstrap', lando => {
    lando.services.add('elasticsearch6', require('./elasticsearch6')(lando));
  });
};

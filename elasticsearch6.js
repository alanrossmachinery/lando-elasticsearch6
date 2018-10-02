'use strict';

module.exports = lando => {
  // Modules
  const _ = lando.node._;
  const fs = lando.node.fs;
  const addConfig = lando.utils.services.addConfig;
  const buildVolume = lando.utils.services.buildVolume;
  const path = require('path');

  /*
   * Supported versions for elasticsearch
   */
  const versions = [
    'geoip-6',
    '6',
    '6.4',
    '6.3',
    '6.2',
    '6.1',
    '6.0',
    'latest',
    'custom',
  ];

  /*
   * Return the networks needed
   */
  const networks = () => ({});

  /*
   * Build out elasticsearch
   */
  const services = (name, config) => {
    // Start a services collector
    const services = {};

    // Default elasticsearch service
    const elastic = {
      image: 'blacktop/elasticsearch:' + config.version,
      command: '/elastic-entrypoint.sh elasticsearch',
      environment: {},
      volumes: ['data_' + name + ':/usr/share/elasticsearch/data'],
    };
    
    const dockerfile = path.join(__dirname, config.version, 'Dockerfile');
    
    if(fs.existsSync(dockerfile)) {
      elastic.image = 'alanross/elasticsearch:' + config.version + '-custom';
      elastic.build = path.dirname(dockerfile);
    }
    
    // Handle custom config file
    if (_.has(config, 'config')) {
      const local = config.config;
      const remote = '/usr/share/elasticsearch/conf/elasticsearch.yml';
      const customConfig = buildVolume(local, remote, '$LANDO_APP_ROOT_BIND');
      elastic.volumes = addConfig(customConfig, elastic.volumes);
    }

    // Handle port forwarding
    if (config.portforward) {
      // If true assign a port automatically
      if (config.portforward === true) {
        elastic.ports = ['9200', '9300'];
      } else {
        const newPort = config.portforward + 100;
        elastic.ports = [config.portforward + ':9200', newPort + ':9300'];
      }
    }

    // Put it all together
    services[name] = elastic;

    // Return our service
    return services;
  };

  /*
   * Return the volumes needed
   */
  const volumes = name => {
    const vols = {};
    vols['data_' + name] = {};
    return vols;
  };

  /*
   * Metadata about our service
   */
  const info = (name, config) => {
    // Add in generic info
    const info = {
      internal_connection: {
        host: name,
        port: config.port || 9200,
      },
      external_connection: {
        host: 'localhost',
        port: config.portforward || 'not forwarded',
      },
    };

    // Surfaces the config file if specified
    if (_.has(config, 'config')) {
      info.config = config.config;
    }

    // Return the collected info
    return info;
  };

  return {
    defaultVersion: '6.4',
    info: info,
    networks: networks,
    services: services,
    versions: versions,
    volumes: volumes,
    configDir: __dirname,
  };
};

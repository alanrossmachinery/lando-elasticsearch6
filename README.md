# Quick and dirty Elasticsearch 6 support for Lando

## Installation

1. Download and extract (or `git clone`) this repository to `~/.lando/plugins/lando-elasticsearch6`
1. Add the following to `~/.lando/config.yml`:
   ```
   plugins:
     - lando-elasticsearch6
   ```

## Usage

In your project's `.lando.yml` file:

```
services:
  elasticsearch: "elasticsearch6:<version>"
```

This plugin supports all of the same options that the [built in Elasticsearch plugin](https://docs.devwithlando.io/services/elasticsearch.html) supports.

## Supported versions

* [6](https://hub.docker.com/r/blacktop/elasticsearch/)
* [geoip-6](https://hub.docker.com/r/blacktop/elasticsearch/)
* [6.4](https://hub.docker.com/r/blacktop/elasticsearch/) **(default)**
* [6.3](https://hub.docker.com/r/blacktop/elasticsearch/)
* [6.2](https://hub.docker.com/r/blacktop/elasticsearch/)
* [6.1](https://hub.docker.com/r/blacktop/elasticsearch/)
* [6.0](https://hub.docker.com/r/blacktop/elasticsearch/)
* custom

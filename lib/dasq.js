  var bluebird = require('bluebird');
  var request = bluebird.promisify(require('request'));
  bluebird.promisifyAll(request);
  var oauth = require('oauth');

  function dasq(clientId, secret) {
      if (!(this instanceof dasq)) return new dasq(clientId, secret);
      this.token = '';
      this.version = '1.0';
      this.auth = {};
      this.oauth = new oauth.OAuth2(clientId,
          secret,
          'http://q.daskeyboard.com/',
          null,
          'oauth/1.2/token',
          null);
  }

  module.exports = dasq;

  dasq.prototype.makeRequest = function(resource, method, data) {
      var that = this;
      return auth(that).then(function(result) {
          var requestFunc = method + 'Async';
          that.token = result;
          var opts = {
              url: 'http://q.daskeyboard.com/api/' + that.version + '/' + resource,
              headers: {
                  'Authorization': 'Bearer ' + that.token
              },
              json: data
          };
          return request[requestFunc](opts).then(function(result) {
              return result.body;
          });
      });
  };

  function auth(obj) {
      return new Promise(function(resolve, reject) {
          if (!obj.token) {
              obj.oauth.getOAuthAccessToken(
                  '', {
                      'grant_type': 'client_credentials'
                  },
                  function(e, access_token, refresh_token, results) {
                      if (!e)
                          resolve(access_token);
                      else reject(e);
                  });
          } else {
              resolve(obj.token);
          }
      });
  }

  dasq.prototype.clients = function() {
      return this.makeRequest('users/authorized_clients', 'get');
  };

  dasq.prototype.colors = function() {
      return this.makeRequest('colors', 'get');
  };

  dasq.prototype.createSignal = function(name, pid, zoneId, color) {
      return this.makeRequest('signals', 'post', {
          name: name,
          pid: pid,
          zoneId: zoneId,
          color: color
      });
  };

  dasq.prototype.devices = function() {
      return this.makeRequest('devices', 'get');
  };

  dasq.prototype.deviceDefinitions = function() {
      return this.makeRequest('device_definitions', 'get');
  };

  dasq.prototype.effects = function(pid) {
      return this.makeRequest(pid + '/effects', 'get');
  };

  dasq.prototype.removeSignal = function(id) {
      return this.makeRequest('signals/' + id, 'delete');
  };

  dasq.prototype.revokeClient = function(name) {
      return this.makeRequest('users/revoke_client', 'post', {
          name: name
      });
  };

  dasq.prototype.signals = function() {
      return this.makeRequest('signals', 'get');
  };

  dasq.prototype.zones = function(pid) {
      return this.makeRequest(pid + '/zones', 'get');
  };
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var fs = require('fs');
module.exports = function(app) {
    var passportConfigurator = new PassportConfigurator(app);
    var ttl = 60 * 60;
    var options = require('../../providers.json')['ldap'];
    var tlsOptions = {
        ca: [
            fs.readFileSync('/etc/ssl/cert_ldap/DigiCertCA.crt')
        ]
    }
    option.server.assign(tlsOptions);
    options.createAccessToken = function(user, cb) {
        user.accessToken.create({
            created: new Date(),
            ttl: ttl
        }, cb);
    }

    passportConfigurator.init(true);
    passportConfigurator.setupModels({
        userModel: app.models.user,
        userIdentity: app.models.userIdentity,
        userCredential: app.models.userCredential
    });
    passportConfigurator.configureProvider('ldap', options);
}
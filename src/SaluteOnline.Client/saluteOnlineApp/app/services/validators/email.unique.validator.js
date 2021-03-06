"use strict";
var http_1 = require("@angular/http");
var EmailUniqueValidator = (function () {
    function EmailUniqueValidator(_http, _urls) {
        this._http = _http;
        this._urls = _urls;
    }
    EmailUniqueValidator.prototype.validate = function (c) {
        var _this = this;
        return new Promise(function (resolve) {
            var params = new http_1.URLSearchParams();
            params.set('email', c.value);
            return _this._http.get(_this._urls.checkEmailUniquity, { search: params })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                return data
                    ? resolve({
                        emailUnique: {
                            valid: false
                        }
                    }) : resolve(null);
            }, function () {
                return resolve({
                    emailUnique: {
                        valid: false
                    }
                });
            });
        });
    };
    return EmailUniqueValidator;
}());
exports.EmailUniqueValidator = EmailUniqueValidator;
//# sourceMappingURL=email.unique.validator.js.map
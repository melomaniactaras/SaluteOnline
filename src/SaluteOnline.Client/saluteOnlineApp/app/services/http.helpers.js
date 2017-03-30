"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var HttpHelpers = (function () {
    function HttpHelpers() {
    }
    HttpHelpers.prototype.createFormEncodedRequest = function (params) {
        var requestParams = new http_1.URLSearchParams();
        params.forEach(function (item) {
            requestParams.set(item.key, item.value);
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_1.RequestOptions({ headers: headers });
        return { params: requestParams, options: options };
    };
    HttpHelpers.prototype.createJsonRequest = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return new http_1.RequestOptions({ headers: headers });
    };
    return HttpHelpers;
}());
HttpHelpers = __decorate([
    core_1.Injectable()
], HttpHelpers);
exports.HttpHelpers = HttpHelpers;
//# sourceMappingURL=http.helpers.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var login_component_1 = require("./login.component");
var login_routing_1 = require("./login.routing");
var angular2_jwt_1 = require("angular2-jwt");
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, material_1.MdInputModule, material_1.MdButtonModule, material_1.MdProgressSpinnerModule, login_routing_1.routing],
        declarations: [login_component_1.SoLogin],
        providers: [
            angular2_jwt_1.AuthHttp,
            angular2_jwt_1.provideAuth({
                headerName: 'Authorization',
                headerPrefix: 'bearer',
                tokenName: 'token',
                tokenGetter: (function () { return localStorage.getItem('token'); }),
                globalHeaders: [{ 'Content-Type': 'application/x-www-form-urlencoded' }],
                noJwtError: true
            })
        ]
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map
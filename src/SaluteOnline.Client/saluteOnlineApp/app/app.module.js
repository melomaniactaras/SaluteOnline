"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var pages_module_1 = require("./pages/pages.module");
var material_1 = require("@angular/material");
var ng2_page_scroll_1 = require("ng2-page-scroll");
var dialog_component_1 = require("./components/so-dialog/dialog.component");
var appRoutes = [
    { path: '', redirectTo: 'pages', pathMatch: 'full' }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, pages_module_1.PagesModule, material_1.MaterialModule.forRoot(), ng2_page_scroll_1.Ng2PageScrollModule.forRoot(), router_1.RouterModule.forRoot(appRoutes, { useHash: true })],
        declarations: [app_component_1.AppComponent, dialog_component_1.SoDialog],
        bootstrap: [app_component_1.AppComponent],
        entryComponents: [dialog_component_1.SoDialog]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
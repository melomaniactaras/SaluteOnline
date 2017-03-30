"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var SoMenuService = (function () {
    function SoMenuService(router) {
        this.router = router;
        this.currentMenuItem = {};
    }
    SoMenuService.prototype.convertRoutesToMenus = function (routes) {
        var items = this.convertArrayToItems(routes);
        return this.skipEmpty(items);
    };
    SoMenuService.prototype.getCurrentItem = function () {
        return this.currentMenuItem;
    };
    SoMenuService.prototype.selectMenuItem = function (menuItems) {
        var _this = this;
        var items = [];
        menuItems.forEach(function (item) {
            _this.selectItem(item);
            if (item && item.selected) {
                _this.currentMenuItem = item;
            }
            if (item.children && item.children.length > 0) {
                item.children = _this.selectMenuItem(item.children);
            }
            items.push(item);
        });
        return items;
    };
    SoMenuService.prototype.skipEmpty = function (items) {
        var menu = [];
        items.forEach(function (item) {
            var menuItem;
            if (item && item.skip) {
                if (item.children && item.children.length > 0) {
                    menuItem = item.children;
                }
            }
            else {
                menuItem = item;
            }
            if (menuItem) {
                menu.push(menuItem);
            }
        });
        return [].concat.apply([], menu);
    };
    SoMenuService.prototype.convertArrayToItems = function (routes, parent) {
        var _this = this;
        var items = [];
        routes.forEach(function (route) {
            items.push(_this.convertObjectToItem(route, parent));
        });
        return items;
    };
    SoMenuService.prototype.convertObjectToItem = function (object, parent) {
        var item = {};
        if (object.data && object.data.menu) {
            item = object.data.menu;
            item.route = object;
            delete item.route.data.menu;
        }
        else {
            item.route = object;
            item.skip = true;
        }
        if (Array.isArray(item.route.path)) {
            item.route.paths = item.route.path;
        }
        else {
            item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
            if (!!item.route.path)
                item.route.paths.push(item.route.path);
        }
        if (object.children && object.children.length > 0) {
            item.children = this.convertArrayToItems(object.children, item);
        }
        var prepared = this.prepareItem(item);
        if ((prepared.selected || prepared.expanded) && parent) {
            parent.expanded = true;
        }
        return prepared;
    };
    SoMenuService.prototype.prepareItem = function (object) {
        if (!object.skip) {
            object.target = object.target || '';
            object.pathMatch = object.pathMatch || 'full';
            return this.selectItem(object);
        }
        return object;
    };
    SoMenuService.prototype.selectItem = function (object) {
        object.selected = this.router.isActive(this.router.createUrlTree(object.route.paths), object.pathMatch === 'full');
        return object;
    };
    return SoMenuService;
}());
SoMenuService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], SoMenuService);
exports.SoMenuService = SoMenuService;
//# sourceMappingURL=so-menu.service.js.map
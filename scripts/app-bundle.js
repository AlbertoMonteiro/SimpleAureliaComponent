define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.telefone = 'Hello World!';
        }
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
        config.globalResources(["./elements/phone-input"]);
    }
    exports.configure = configure;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('resources/elements/phone-input',["require", "exports", 'aurelia-framework'], function (require, exports, aurelia_framework_1) {
    "use strict";
    var padrao = /(\d{2})(\d{4,5})(\d{4})/;
    var PhoneInput = (function () {
        function PhoneInput() {
        }
        PhoneInput.prototype.attached = function () {
            this.applyMask();
        };
        PhoneInput.prototype.valueChanged = function () {
            this.validate();
            this.applyMask();
        };
        PhoneInput.prototype.hasFocusChanged = function () {
            if (this.hasFocus)
                this.displayValue = this.value;
            else {
                this.value = this.displayValue;
                this.valueChanged();
            }
        };
        PhoneInput.prototype.applyMask = function () {
            if (padrao.test(this.value))
                this.displayValue = this.value.replace(padrao, "($1) $2-$3");
            else
                this.displayValue = this.value;
        };
        PhoneInput.prototype.validate = function () {
            this.isInvalid = this.value && !padrao.test(this.value);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', String)
        ], PhoneInput.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Boolean)
        ], PhoneInput.prototype, "hasFocus", void 0);
        return PhoneInput;
    }());
    exports.PhoneInput = PhoneInput;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <phone-input value.bind=\"telefone\"></phone-input>\n  <br>\n  <p>${telefone}</p>\n</template>\n"; });
define('text!resources/elements/phone-input.html', ['module'], function(module) { module.exports = "<template>\n  <input type=\"text\" placeholder=\"phone here\" value.bind=\"displayValue\" focus.bind=\"hasFocus\" style=\"${isInvalid ? 'border: 1px solid red;' : ''}\" ref=\"inputElement\">\n  <span if.bind=\"isInvalid\" style=\"color: red\">Incorrect phone</span>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map
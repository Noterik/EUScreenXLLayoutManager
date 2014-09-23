define(['./layout-item'], function(LayoutItem){
    var Layout = function(options){
        var self = this;
        jQuery.extend(this, options);
        jQuery(window).on('resize', function(){
            self.afterResize.call(self);
        })

        this.beforeCreateCallbacks = [];
        this.afterCreateCallbacks = [];
        this.afterResizeCallbacks = [];
        this.destroyCallbacks = [];

        for(var i = 0; i < this.mixins.length; i++){
            var mixin = this.mixins[i];
            mixin.call(this);
        };

        this.create();
    };

    Layout.prototype.element = null;
    Layout.prototype.htmlClass = "ntk-layout";
    Layout.prototype.noLayout = null;
    Layout.prototype.setElement = function(element){
        if(!(element instanceof jQuery))
            element = $(element);

        this.element = element;
    };
    Layout.prototype.afterResize = function(){
        for(var i = 0; i < this.afterResizeCallbacks.length; i++){
            var callback = this.afterResizeCallbacks[i];
            callback.call(this);
        }
    };
    Layout.prototype.beforeCreate = function(){
        console.log("Layout.prototype.beforeCreate()");
        console.log(this);
        for(var i = 0; i < this.beforeCreateCallbacks.length; i++){
            var callback = this.beforeCreateCallbacks[i];
            callback.call(this);
        }
    };
    Layout.prototype.afterCreate = function(){
        for(var i = 0; i < this.afterCreateCallbacks.length; i++){
            var callback = this.afterCreateCallbacks[i];
            callback.call(this);
        }
    };
    Layout.prototype.create = function(){
        this.beforeCreate();
        this.element.data('layout', this);
        this.afterCreate();
    };
    Layout.prototype.destroy = function(){
        var self = this;
        for(var i = 0; i < this.destroyCallbacks.length; i++){
            var callback = this.destroyCallbacks[i];
            callback.call(self);
        }
    };
    Layout.prototype.itemClass = LayoutItem;

    return Layout;
});
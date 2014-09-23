define([
    './layout',
    './mix-ins/scroller',
    './mix-ins/tiled'
], function(
    Layout,
    Scroller,
    Tiled
){
    var FixedLayout = function(options){
        this.mixins = [
            Scroller,
            Tiled
        ]
        Layout.apply(this, arguments);
    };

    FixedLayout.prototype = Object.create(Layout.prototype);
    FixedLayout.prototype.htmlClass = "ntk-layout-fixed";
    FixedLayout.prototype.scrollingCallback = function(){
        console.log(this);
    };
    FixedLayout.prototype.create = function(){
        Layout.prototype.create.apply(this);
    };

    return FixedLayout;
});
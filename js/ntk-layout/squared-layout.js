define([
    './layout',
    './mix-ins/scroller',
    './mix-ins/squared'
], function(
    Layout,
    Scroller,
    Squared
){
    var SquaredLayout = function(options){
        this.mixins = [
            Scroller,
            Squared
        ]
        Layout.apply(this, arguments);

        this.element.data('layout', this);
        this.columns = (this.element.data('ntk-columns')) ? this.element.data('ntk-columns') : this.columns;
        this.aspectRatio = (this.element.data('ntk-aspect-ratio')) ? this.element.data('ntk-aspect-ratio') : this.aspectRatio;
        this.gutter = (this.element.data('ntk-gutter')) ? this.element.data('ntk-gutter') : this.gutter;
    };
    SquaredLayout.prototype = Object.create(Layout.prototype);
    SquaredLayout.prototype.htmlClass = "ntk-layout-squared";
    SquaredLayout.prototype.gutter = 5;
    SquaredLayout.prototype.columns = 4;
    SquaredLayout.prototype.aspectRatio = 4 / 3;
    SquaredLayout.prototype.scrollingCallback = function(){
        console.log("SquaredLayout.scrollingCallback()");
    };
    SquaredLayout.prototype.create = function(){
        Layout.prototype.create.apply(this);
    };

    return SquaredLayout;
});
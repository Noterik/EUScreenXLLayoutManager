define([], function(){
    var LayoutItem = function(){

    };
    LayoutItem.prototype.element = null;
    LayoutItem.prototype.htmlClass = 'ntk-layout-item';
    LayoutItem.prototype.create = function(){
        this.element.addClass(this.htmlClass);
    }
    LayoutItem.prototype.destroy = function(){
        this.element.removeClass(this.htmlClass);
    }
});
define([], function(){
    var Tiled = function(options){
        console.log("TILED");
        console.log(this);
        this.afterCreateCallbacks.push(function(){
            this.element.append('<div class="grid-sizer">&nbsp;</div>');
            this.element.freetile();
            this.element.find('.grid-sizer').remove();
        });

        this.destroyCallbacks.push(function(){
            this.element.find('.tiled').removeClass('tiled');
        });
        return this;
    };

    return Tiled;
})

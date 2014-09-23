define([], function(){
    var Scroller = function(options){
        var self = this;
        this.boundaryBottom = 50
        this.bottomReachedTriggered = false;

        this.beforeCreateCallbacks.push(function(){
            $(window).on('scroll', function(){
                self.scrollingCallback.apply(self, arguments);
            });
        });

        this.destroyCallbacks.push(function(){
            $(window).off('scroll');
        });
        return this;
    };

    return Scroller;
})

define(['./layout', './fixed-layout', './squared-layout'], function(Layout, FixedLayout, SquaredLayout){
    var layouts = [
        Layout,
        FixedLayout,
        SquaredLayout
    ]

    var LayoutCreator = function(){
        for(var i = 0; i < layouts.length; i++){
            var layout = layouts[i];

            $("." + layout.prototype.htmlClass).each(function(){
                new layout({
                    element: $(this)
                })
            });
        }
    };

    LayoutCreator();
});
/**
 * Created by david_ammeraal on 5/1/2012.
 */
requirejs.config({
    //By default load any module IDs from js/lib
    appDir: '.'
});

requirejs(['squared-layout'], function(SquaredLayout){
    var element = jQuery(".items");

    var chunkTemplate = jQuery('<div class="item-chunk" data-ntk-columns="8"></div>');
    var template = jQuery('<div class="ntk-layout-item" style="width: 1000px"><div class="contents"></div></div>');
    var loadMoreButton = jQuery(".controller .loadmore");

    loadMoreButton.on('click', function(){
        var chunk = chunkTemplate.clone();
        var layout = new SquaredLayout({element: chunk});
        var grid = layout.createGrid(4);
        var amount = 0;
        for(var r = 0; r < grid.length; r++){
            var row = grid[r];
            amount += row.length;
        }

        for(var c = 0; c < 15; c++){
            var item = template.clone();
            item.find(".contents").text("" + c);
            chunk.append(item);
        }

        element.append(chunk);

        layout.create(grid);
    });
});

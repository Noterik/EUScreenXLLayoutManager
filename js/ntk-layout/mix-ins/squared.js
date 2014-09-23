define([], function(){
    var Squared = function(options){
        var self = this;

        var children;

        var row = 0;

        var parseChildren = function(){
            self.noLayout ? children = self.element.children().not(self.noLayout) : children = self.element.children();
        };

        var getNonPositionedChildren = function(){
            parseChildren();
            return children.not('.positioned');
        };

        this.reset = function(){
            children.removeClass('.positioned');
            offset = 0;
        };

        this.createGrid = function(rows){
            var grid = [];
            var row = 0;

            while(row < rows){
                var rowObject = [];
                var spaceLeftOnRow = self.columns;
                var column = 0;
                var subrow = 0;
                var spaceLeftOnColumn = 2;

                while(spaceLeftOnRow > 0){
                    var size;
                    if(spaceLeftOnRow >= 2 && spaceLeftOnColumn == 2){
                        size = Math.round(Math.random()) + 1;
                    }else if(spaceLeftOnRow == 1 || spaceLeftOnColumn == 1){
                        size = 1;
                    }

                    rowObject.push(size);
                    if(size == 1 && subrow == 0){
                        subrow = 1;
                        spaceLeftOnColumn = 1;
                    }else{
                        subrow = 0;
                        spaceLeftOnRow -= size;
                        spaceLeftOnColumn = 2;
                        column += size;
                    }

                    if(column + 1 > self.columns){
                        row++;
                        spaceLeftOnRow = 0;
                        column = 0;
                    }
                }

                grid.push(rowObject);
            }

            return grid;
        };

        var createFromItems = function(){
            var children = getNonPositionedChildren();

            var spaceLeftOnRow = self.columns;
            var spaceLeftOnColumn = 2;

            children.each(function(){
                var $this = $(this);
                var size;

                if(spaceLeftOnRow >= 2 && spaceLeftOnColumn == 2){
                    size = Math.round(Math.random()) + 1;
                }else if(spaceLeftOnRow == 1 || spaceLeftOnColumn == 1){
                    size = 1;
                }

                $this.data('column', column);
                $this.data('row', row);
                $this.data('subrow', subrow);
                $this.data('weight', size);

                if(size == 1 && subrow == 0){
                    subrow = 1;
                    spaceLeftOnColumn = 1;
                }else if(size == 2){
                    subrow = 0;
                    spaceLeftOnRow -= size;
                    spaceLeftOnColumn = 2;
                    column += size;
                }

                if(column + 1 > self.columns){
                    row++;
                    spaceLeftOnRow = self.columns;
                    column = 0;
                }

                $this.addClass('positioned');
            });
        };

        var createFromGrid = function(grid){
            var children = getNonPositionedChildren();
            var itemCounter = 0;

            var rowNo;
            var columnNo;
            var subrowNo;

            for(rowNo = 0; rowNo < grid.length; rowNo++){
                columnNo = 0;
                subrowNo = 0;
                var rowObject = grid[rowNo];
                for(var itemNo = 0; itemNo < rowObject.length; itemNo++){
                    var itemSize = rowObject[itemNo];
                    var item = jQuery(children.get(itemCounter));

                    item.data('row', row);
                    item.data('column', columnNo);
                    item.data('subrow', subrowNo);
                    item.data('weight', itemSize);

                    if(itemSize == 1 && subrowNo == 0){
                        subrowNo++;
                    }else{
                        columnNo += itemSize;
                        subrowNo = 0;
                    }

                    itemCounter++;
                }
                row++;
            }
        };

        this.create = function(grid){
            if(grid){
                createFromGrid(grid);
            }else{
                createFromItems();
            }

            resize();
        };

        var resize = function(){
            parseChildren();
            var width = self.element.width();
            var itemWidth = width / self.columns;
            var itemHeight = itemWidth / self.aspectRatio;

            children.each(function(){
                var $this = $(this);
                var size = $this.data('weight');

                if(size > 1){
                    $this.addClass('media-big');
                }

                var row = $this.data('row');
                column = $this.data('column');
                subrow = $this.data('subrow');

                var widthToSet = size * itemWidth;
                var heightToSet = size * itemHeight;
                var leftToSet = Math.floor(itemWidth * column);
                var topToSet = Math.floor(((itemHeight * 2) * row) + subrow * itemHeight);

                widthToSet -= self.gutter;
                leftToSet += self.gutter / 2;

                heightToSet -= self.gutter;
                topToSet += self.gutter / 2;

                $this.css('left', leftToSet);
                $this.css('top', topToSet);

                $this.width(widthToSet);
                $this.height(heightToSet);
            });

            self.element.height(row * itemHeight * 2);

        };

        this.afterResizeCallbacks.push(resize);
        this.beforeCreateCallbacks.push(this.apply);

        return this;
    };

    return Squared;
});

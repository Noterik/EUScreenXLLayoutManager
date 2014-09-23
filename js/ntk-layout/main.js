requirejs.config({
    //By default load any module IDs from js/lib
    appDir: '.'
});

requirejs(['squared-layout'], function(SquaredLayout){
    if(!window.noterik)
        window.noterik = {};

    if(!window.noterik.layout)
        noterik.layout = {};

    noterik.layout.squared = SquaredLayout;
});
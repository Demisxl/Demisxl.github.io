// ZIM Foundation for Creative Coding icon
    function createIcon(x, y, callback, frame) {
        if (zot(x)) x = 30;
        if (zot(y)) y = 30;
        if (zot(frame)) frame = zimDefaultFrame;
        var iconLoad = frame.loadAssets("icon10.png", "https://zimjs.org/cdn/assets/");
        iconLoad.on("complete", ()=>{
            const icon = frame.asset("icon10.png").centerReg({add:false});
            // make button - or add a mouseover and mouseout event to icon
            const button = new Button({
                label:"",
                width:icon.width,
                height:icon.height,
                backing:icon.alp(.8), // chainable short method to set alpha
                rollBacking:icon.clone().alp(1),
                style:false
            }).sca(.5).pos(x, y, true, true).alp(0).animate({alpha:1}, 700).tap(()=>{zgo("https://zimjs.com", "_blank")});
            if (callback) callback(button);
            frame.stage.update();
        });
    }

    function createGreet(x, y, frame) {
        if (zot(frame)) frame = zimDefaultFrame;
        if (zot(x)) x = 80;
        if (zot(y)) y = 40;
        const greet = new Button({
            width:400,
            label:"VIEW GREETING",
            backgroundColor:blue,
            rollBackgroundColor:green,
            corner:0
        }).centerReg({add:false}).sca(.5).pos(x,y,false,true).tap(go);
        const greetRings = greet.rings = frame.makeCircles(30, true).loc(greet).mov(-greet.width/2-20);
        greetRings.getChildAt(0).sha().tap(go);
        function go() {
            zgo("https://codepen.io/zimjs/details/QPeVRX", "_blank");
        }
        frame.stage.update();
        return greet;
    }

    function createCode(x, y, frame, wait) {
        if (zot(frame)) frame = zimDefaultFrame;
        if (zot(x)) x = 120;
        if (zot(y)) y = 110;
        if (zot(wait)) wait = 1000;
        const creative = new Container(100,70)
            .pos(x,y,LEFT,BOTTOM)
            .animate({props:{alpha:0}, from:true, wait:wait})
            .tap(()=>{
                zgo("https://www.youtube.com/watch?v=S6x0OgTEY5Q&list=PLCIzupgRt1pbzqc_M6kyajQ1XawfyaMq9", "_blank")
            });
        const rect = new Rectangle(65,40,"red",null,null,8)
            .pos(0,0,CENTER,TOP,creative)
            .sha("rgba(0,0,0,.2)",3,3,3)
            .alp(.6)
            .hov(1);
        new Triangle(20,20,20,white).rot(90).center(rect).mov(3).addTo(creative);
        new Label("CREATIVE CODING", 14, null, white).alp(.8).pos(0,0,CENTER,BOTTOM,creative)
        return creative;
    }

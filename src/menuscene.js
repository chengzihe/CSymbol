
var MenuLayer = cc.Layer.extend({
	sprite:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();

		/////////////////////////////
		// 2. add a menu item with "X" image, which is clicked to quit the program
		//    you may modify it.
		// ask the window size
		var size = cc.winSize;

		
		//add first background
		var MenuBg = new cc.Sprite(res.MenuBg_png);
		MenuBg.attr({
			x: size.width / 2,
			y: size.height / 2
			//scale: 0.5,
		});
		this.addChild(MenuBg,0);
		
		//Add Btns
		var beginBtn = new cc.MenuItemImage(
				res.BtnNormal_png,
				res.BtnSelect_png,
				function() {
					cc.log("Play the Game~");
					cc.director.runScene(new MainScene());
				},
				this);
		
		var menu = cc.Menu.create(beginBtn);  //7. create the menu
		menu.setPosition(size.width / 2, size.height / 2);
		this.addChild(menu);
		//add label
		var beginBtnTxt = new cc.LabelTTF("开始");
		beginBtnTxt.setPosition(size.width / 2, size.height / 2);
		this.addChild(beginBtnTxt)
		
		// add a "close" icon to exit the progress. it's an autorelease object
		var closeItem = new cc.MenuItemImage(
				res.CloseNormal_png,
				res.CloseSelected_png,
				function () {
					cc.log("Menu is clicked!");
				}, this);
		closeItem.attr({
			x: size.width - 20,
			y: 20,
			anchorX: 0.5,
			anchorY: 0.5
		});

		var menu = new cc.Menu(closeItem);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 1);
	}
});

var MenuScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new MenuLayer();
		this.addChild(layer);
	}
});


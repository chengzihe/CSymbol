var MainLayer = cc.Layer.extend({
	sprite:null,
	space:null,
	//以下这行在定义地区的初始成员变量中运行
	shapesToRemove :[],
	ctor:function(){
		this._super();
		this.init();
	},
	
	init:function(){
		this._super();
		
		this.InitBtn();

//		//add bgLayer
//		var bgLayer = new BgLayer();
//		this.addChild(bgLayer, 0);
//		
//		//add antLayer
//		var antLayer = new AntLayer();
//		this.addChild(antLayer, 1);
//		
//		//add statelayer
//		var staLayer = new StaLayer();
//		this.addChild(staLayer, 2);
		
		//Init Btns
		
	},
	
	onEnter : function() {
		this._super();
		//以下这行在*onEnter* 函数开头运行.
		this.shapesToRemove = [];
		
		this.initPhysics();		

		this.gameLayer = new cc.Layer();
		
		this.gameLayer.addChild(new BgLayer(this.space), 0, TagOfLayer.bgroud);
		this.gameLayer.addChild(new AntLayer(this.space), 0, TagOfLayer.animation);
		this.addChild(this.gameLayer);
		this.addChild(new StaLayer(), 0, TagOfLayer.status);

		cc.audioEngine.playMusic(res.bgmusic_mp3, true);
		
		this.scheduleUpdate();
	},
	// init space of chipmunk
	initPhysics:function() {
		//1. new space object 
		this.space = new cp.Space();
		//2. setup the  Gravity
		this.space.gravity = cp.v(0, -350);

		// 3. set up Walls
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHight),// start point
				cp.v(4294967295, g_groundHight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
		
		// 设置小花栗鼠CollisionHandler
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.coin,
				this.collisionCoinBegin.bind(this), null, null, null);
		this.space.addCollisionHandler(SpriteTag.runner, SpriteTag.rock,
				this.collisionRockBegin.bind(this), null, null, null);
	},
	update:function (dt) {
		// chipmunk step
		this.space.step(dt);
		
		var antlayer = this.gameLayer.getChildByTag(TagOfLayer.animation);
		var eyeX = antlayer.getEyeX();
		this.gameLayer.setPosition(-eyeX, 0);
		//更新距离
		statusLayer = this.getChildByTag(TagOfLayer.status);
		statusLayer.updateMeter(eyeX);
		
		// 模拟cpSpaceAddPostStepCallback
		for(var i = 0; i < this.shapesToRemove.length; i++) {
			var shape = this.shapesToRemove[i];
			this.gameLayer.getChildByTag(TagOfLayer.bgroud).removeObjectByShape(shape);
		}
		this.shapesToRemove = [];
	},
	
	collisionCoinBegin:function (arbiter, space) {
		var shapes = arbiter.getShapes();
		// shapes[0] is runner
		this.shapesToRemove.push(shapes[1]);
		cc.log("==get coin");		
		statusLayer = this.getChildByTag(TagOfLayer.status);
		statusLayer.addCoins(1);
		cc.audioEngine.playMusic(res.pickupmusic_mp3);
	},

	collisionRockBegin:function (arbiter, space) {
		cc.log("==game over");
		cc.audioEngine.stopMusic();
		cc.director.pause();
		this.addChild(new GameOverLayer());
	},
	
	InitBtn : function(){
		size = cc.director.getWinSize();
		
		var beginBtn = new cc.MenuItemImage(
				res.BtnNormal_png,
				res.BtnSelect_png,
				function() {
					cc.log("返回");
					cc.director.runScene(new MenuScene());
				},
				this);
		var menu = cc.Menu.create(beginBtn);  //7. create the menu
		menu.setPosition(size.width / 5, size.height / 5);
		this.addChild(menu, 1);

		//lable
		var TipLabel = new cc.LabelTTF("返回");
		TipLabel.setPosition(size.width / 5, size.height /5);
		this.addChild(TipLabel, 2, 2);
		
		var jumpBtn = new cc.MenuItemImage(
				res.BtnNormal_png,
				res.BtnSelect_png,
				function() {
					cc.log("JUMP");
					animLayer = this.gameLayer.getChildByTag(TagOfLayer.animation);
					if(animLayer){
						animLayer.jump();
					}
					else{
						log("animLayer is NULL")
					}
					
				},
				this);
		var menu = cc.Menu.create(jumpBtn);  //7. create the menu
		menu.setPosition(size.width / 2, size.height /8-10);
		this.addChild(menu, 10);
	}

});

var MainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();		
		var layer = new MainLayer();
		this.addChild(layer);
	}
});
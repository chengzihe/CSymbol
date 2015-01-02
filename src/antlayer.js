/*
 * 状态层
 * create time ：2014-11-24 1:58
 * create by chengzi
 * */

//define enum for runner status, 跑酷者状态
if(typeof RunnerStat == "undefined") {
	var RunnerStat = {};
	RunnerStat.running = 0;
	RunnerStat.jumpUp = 1;
	RunnerStat.jumpDown = 2;
};


var AntLayer = cc.Layer.extend({
	runningAction : null,
	spriteSheet : null,
	sprite : null,
	space : null,
	body:null,
	shape:null,
	jumpUpAction:null,
	jumpDownAction:null,
	recognizer:null,
	stat:RunnerStat.running,
	
	ctor : function(space){
		this._super();		
		this.space = space;
		this.init();
		
		this._debugNode = new cc.PhysicsDebugNode(this.space);
		this._debugNode.setVisible(false);
		// Parallax ratio and offset
		this.addChild(this._debugNode, 10);
	},

	init:function(){
		this._super();		
		
		//create sprite sheet
		cc.spriteFrameCache.addSpriteFrames(res.AntRunner_plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.SptRunner_png);
		this.addChild(this.spriteSheet);
		
		//new 手势识别器
		this.recognizer = new SimpleRecognizer();
		//初始化running action
		this.initAction();
		
//		this.sprite = new cc.Sprite("#runner0.png");
		//1. create PhysicsSprite with a sprite frame name
		this.sprite = cc.PhysicsSprite.create("#runner0.png");
		var contentSize = this.sprite.getContentSize();
		// 2. init the runner physic body
		this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		//3. set the position of the runner
		this.body.p = cc.p(g_runnerStartX, g_groundHight + contentSize.height / 2);
		//4. apply impulse to the body
		this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
		//5. add the created body to space
		this.space.addBody(this.body);
		//6. create the shape for the body
		this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
		//7. add shape to space
		this.space.addShape(this.shape);
		//8. set body to the physic sprite
		this.sprite.setBody(this.body);
		
		this.sprite.runAction(this.runningAction);
		this.spriteSheet.addChild(this.sprite);
		
		//增加事件监控
		cc.eventManager.addListener({
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches : true,
			onTouchBegan : this.onTouchBegan,
			onTouchMoved : this.onTouchMoved,
			onTouchEnded : this.onTouchEnded
		}, this);

		//增加JumpButton
//		this.initBtn();
		
		this.scheduleUpdate();		
		
//		cc.log(this.sprite.getPosition());
	},
	
	initAction:function(){
		var animFrames = [];
		for(i = 0; i < 8; i++){
			var str = "runner" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animAction = new cc.Animation(animFrames, 0.1);
		this.runningAction = new cc.RepeatForever(new cc.Animate(animAction));
		this.runningAction.retain();
		
		// init jumpUpAction
		animFrames = [];
		for (var i = 0; i < 4; i++) {
			var str = "runnerJumpUp" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new cc.Animation(animFrames, 0.2);
		this.jumpUpAction = new cc.Animate(animation);
		this.jumpUpAction.retain();

		// init jumpDownAction
		animFrames = [];
		for (var i = 0; i < 2; i++) {
			var str = "runnerJumpDown" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			animFrames.push(frame);
		}

		animation = new cc.Animation(animFrames, 0.3);
		this.jumpDownAction = new cc.Animate(animation);
		this.jumpDownAction.retain();
	},
	
	getEyeX : function(){
		return this.sprite.getPositionX() - g_runnerStartX;
	},
	
	onTouchBegan:function(touch, event) {
		cc.log("==onTouchBegin");
		var pos = touch.getLocation();
		event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
		return true;
	},

	onTouchMoved:function(touch, event) {
		cc.log("==onTouchMoved");
		var pos = touch.getLocation();
		event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
	},

	onTouchEnded:function(touch, event) {
		cc.log("==onTouchEnded");
		var rtn = event.getCurrentTarget().recognizer.endPoint();
		cc.log("rnt = " + rtn);
		switch (rtn) {
		case "up":
			event.getCurrentTarget().jump();
			break;
		default:
			break;
		}
	},
	
	jump:function () {
		cc.log("jump");
		cc.audioEngine.playMusic(res.jumpmusic_mp3);
		if (this.stat == RunnerStat.running) {
			this.body.applyImpulse(cp.v(0, 250), cp.v(0, 0));
			this.stat = RunnerStat.jumpUp;
			this.sprite.stopAllActions();
			this.sprite.runAction(this.jumpUpAction);
		}
	},
	
//	initBtn : function() {
//		var jumpBtn = new cc.MenuItemImage(
//				res.BtnNormal_png,
//				res.BtnSelect_png,
//				function() {
//					cc.log("JUMP");
////					animLayer = this.getChildByTag(TagOfLayer.animation);
//					this.jump();
//				},
//				this);
//		var size = cc.winSize;
//		var menu = cc.Menu.create(jumpBtn);  //7. create the menu
//		menu.setPosition(size.width / 2, size.height /2);
//		this.addChild(menu, 10);
//	},
	
	update:function(dt){
		var vel = this.body.getVel();
		if (this.stat == RunnerStat.jumpUp) {
			if (vel.y < 0.1) {
				this.stat = RunnerStat.jumpDown;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.jumpDownAction);
			}
		} else if (this.stat == RunnerStat.jumpDown) {
			if (vel.y == 0) {
				this.stat = RunnerStat.running;
				this.sprite.stopAllActions();
				this.sprite.runAction(this.runningAction);
			}
		}
	},

	onExit:function() {
		this.runningAction.release();
		this.jumpUpAction.release();
		this.jumpDownAction.release();
		this._super();
	},
});
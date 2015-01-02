/*
 * 状态层
 * create time ：2014-12-12 21:51
 * create by chengzi
 * */

var Coin = cc.Class.extend({
	space : null,
	sprite : null,
	shape : null,
	_mapIndex : 0,//
	get mapIndex(){
		return this._mapIndex;
	},
	
	set mapIndex(index){
		this._mapIndex;
	},
	
	//构造器
	ctor : function(spriteSheet, space, pos){
		this.space = space;
		
		var aniFrames = [];
		for(var i = 0; i < 8; i++){
			var str = "coin" + i +".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(str);
			aniFrames.push(frame);
		}
		
		var animation = cc.Animation.create(aniFrames, 0.2);
		var action = cc.RepeatForever.create(cc.Animate.create(animation));
		this.sprite = cc.PhysicsSprite.create("#coin0.png");
		// 初始化physics
		var radius = 0.95 * this.sprite.getContentSize().width / 2;
		
//		var body = new cp.StaticBody();
		var body = new cp.Body(Infinity, Infinity);
		body.nodeIdleTime = Infinity;
		
		body.setPos(pos);
		this.sprite.setBody(body);
		this.shape = new cp.CircleShape(body, radius, cp.vzero);
		this.shape.setCollisionType(SpriteTag.coin);
		//Sensors 只是调用碰撞机回调函数,并且永远不生成真实的碰撞机
		this.shape.setSensor(true);
		this.space.addStaticShape(this.shape);
		
		// 添加sprite 到sprite sheet
		this.sprite.runAction(action);
		spriteSheet.addChild(this.sprite, 1);
	},
	
	removeFromParent:function () {
		this.space.removeStaticShape(this.shape);
		this.shape = null;
		this.sprite.removeFromParent();
		this.sprite = null;
	},

	getShape:function () {
		return this.shape;
	}
});
/*
 * 状态层
 * create time ：2014-11-24 1:58
 * create by chengzi
 * */
var StaLayer = cc.Layer.extend({
	
	labelCoin:null,
	labelMeter:null,
	nCoins : 0,
	nMeter : 0,
	ctor : function(){
		this._super();
		this.init();
	},

	init:function(){
		this._super();
		
		var wsize = cc.director.getWinSize();
		
		//add point label
		this.labelCoin = new cc.LabelTTF("Coins：0");
		this.labelCoin.setColor(255, 0, 0);
		this.labelCoin.setPosition(wsize.width / 5, wsize.height - 100);
		this.addChild(this.labelCoin, 1);
		
		//add point label
		this.labelMeter = new cc.LabelTTF("0 M");
		this.labelMeter.setColor(255, 0, 0);
		this.labelMeter.setPosition(wsize.width / 2, wsize.height - 100);
		this.addChild(this.labelMeter, 1);
		
		//add menu
//		var btnItemStart = new cc.MenuItemImage(
//				res.BtnStartNormal_png,
//				res.BtnStartSelect_png,
//				function() {
//			cc.log("开始");
//			//cc.director.runScene(new MenuScene());
//		},
//		this);
//		
//		var btnMenu = new cc.Menu(btnItemStart);
//		btnMenu.setPosition(wsize.width/2, wsize.height/2);
//		this.addChild(btnMenu);
		
	},
	
	addCoins:function(num){
		this.nCoins += num;
		this.labelCoin.setString("Coins: " + this.nCoins);
	},
	
	updateMeter:function(px){
		this.labelMeter.setString(parseInt(px/10) + " M");
	}
});
/*
 * 状态层
 * create time ：2014-12-1 20:49
 * create by chengzi
 * */

var g_groundHight = 120
var g_runnerStartX = 180

if(typeof TagOfLayer == "undefined"){
	var TagOfLayer = {};
	TagOfLayer.bgroud = 0;
	TagOfLayer.animation = 1;
	TagOfLayer.status = 2;
};

//小花栗鼠的碰撞类型
if(typeof SpriteTag == "undefined") {
	var SpriteTag = {};
	SpriteTag.runner = 0;
	SpriteTag.coin = 1;
	SpriteTag.rock = 2;
};
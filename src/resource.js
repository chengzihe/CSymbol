var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    BtnNormal_png : "res/BtnNormal.png",
    BtnSelect_png : "res/BtnSelected.png",
    MenuBg_png : "res/MenuBackground.png",
    PlayBg_png : "res/PlayBG.png",
    BtnStartNormal_png : "res/start_n.png",
    BtnStartSelect_png : "res/start_s.png",
    SptRunner_png : "res/running.png",
    AntRunner_plist : "res/running.plist",
    map_png : "res/map.png",
    map00_tmx : "res/map00.tmx",
    map01_tmx : "res/map01.tmx",
    background_png : "res/background.png",
    background_plist : "res/background.plist",
    bgmusic_mp3 : "res/background.mp3",
    bgmusic_ogg : "res/background.ogg",
    jumpmusic_mp3 : "res/jump.mp3",
    jumpmusic_ogg : "res/jump.ogg",
    pickupmusic_mp3 : "res/pickup_coin.mp3",
    pickupmusic_ogg : "res/pickup_coin.ogg"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
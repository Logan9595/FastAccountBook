mui.init({
	swipeBack: false
});

mui("#Login")[0].addEventListener('tap', function() {
	mui.toast("暂未开放登录功能哦");
});

mui("#TuBiao")[0].addEventListener('tap', function() {
	mui.openWindow({
		url: 'chart.html',
		id: 'chart'
	})
});

mui("#PaiHang")[0].addEventListener('tap', function() {
	mui.openWindow({
		url: 'RankingList.html',
		id: 'RankingList'
	})
});

mui("#MiMa")[0].addEventListener('tap', function() {
	mui.toast("暂未开放该功能哦");
});

mui("#HuanCun")[0].addEventListener('tap', function() {
	mui.plusReady(function(){
		plus.cache.clear(function(){
			mui.toast('清除缓存成功');
		})
	})
});

mui("#JiLu")[0].addEventListener('tap', function() {
	var btnArray = ['否', '是'];
	mui.confirm('清除的数据将无法找回哦', '是否确认清除所有记录', btnArray, function(e) {
		if(e.index == 1) {
			plus.storage.clear();
			var list = plus.webview.currentWebview().opener();
			mui.fire(list, 'resetdata');
		}
	})
});

mui("#BangZhu")[0].addEventListener('tap', function() {
		mui.openWindow({
		url: 'help.html',
		id: 'help'
	})
});

mui("#HaoPing")[0].addEventListener('tap', function() {
	mui.toast("暂未上架应用市场呢");
});

mui("#WoMen")[0].addEventListener('tap', function() {
	mui.openWindow({
		url:'about.html',
		id:'about'
	})
});
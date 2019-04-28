(function() {
	mui.init({
		swipeBack: true //启用右滑关闭功能
	});

	mui('.mui-scroll-wrapper').scroll();
	
	
	mui.plusReady(function() {
		var myDate = new Date();
		var hy = myDate.getFullYear();
		var hm = myDate.getMonth() + 1;
		var sz_data = new Vue({
			el: '#onedays',
			data: read(hy, hm),
			methods: {
				opendate: function() {
					var dtPicker = new mui.DtPicker({
						type: 'month',
						beginDate: new Date(2010, 0, 01), //设置开始日期 
						endDate: new Date(2050, 11, 31), //设置结束日期 
					});
					var yy = dtPicker.show(function(selectItems) {
						var y = selectItems.y.text; //获取选择的年
						var m = selectItems.m.text; //获取选择的月
						m = parseInt(m);
						Object.assign(sz_data, getDefaultread());
						Object.assign(sz_data, read(y, m));

					});
				},
				readdata: function() {
					Object.assign(this.$data, getDefaultread());
					Object.assign(this.$data, read(hy, hm));
				},
				resetdata: function() {
					Object.assign(this.$data, getDefaultread())
				},
				deletedata: function(oneday, i) {
					var btnArray = ['否', '是'];
					mui.confirm('是否确认清除这条记录', '', btnArray, function(e) {
						if(e.index == 1) {
							//console.log(JSON.stringify(oneday));
							//console.log(JSON.stringify(i));
							var key = oneday.ac_year + "-" + oneday.ac_month + "-" + oneday.ac_date;
							var delte = i.ac_shouzhi + "-" + i.ac_name + "-" + parseFloat(i.ac_money) + "-" + i.ac_mm;
							var value = plus.storage.getItem(key);
							var valuearr = value.split('/')
							var delteindex;
							for(var j = 0; j < valuearr.length; j++) {
								if(valuearr[j] == delte) {
									delteindex = j;
								}
							}
							valuearr.splice(delteindex, 1);
							var newvalue = valuearr.join('/');
							//console.log(newvalue);
							if(newvalue == "") {
								plus.storage.removeItem(key);
							} else {
								plus.storage.setItem(key, newvalue);
							}
							Object.assign(sz_data, getDefaultread());
							Object.assign(sz_data, read(oneday.ac_year, oneday.ac_month));
						}
					})
				}
			}
		});

		window.addEventListener('resetdata', function(e) { //执行刷新
			sz_data.resetdata();
		}, false);

		window.addEventListener('readdata', function(e) { //执行刷新
			sz_data.readdata();
		}, false);
		
		
		function getDefaultread() {
			var myDate = new Date();
			return {
				oneday: [],
				monthshou: 0,
				monthzhi: 0,
				a_year: myDate.getFullYear(),
				a_month: myDate.getMonth() + 1
			}
		}

		function read(hy, hm) {
			//console.log(hm);
			var monthshou = 0;
			var monthzhi = 0;
			var readkey;
			var readkeyarr = [];
			var readvalue;
			var oneday = [];
			var convert = {};
			var readvaluearr = [];
			for(var i = 0; i < plus.storage.getLength(); i++) {
				var onedaytmp = {};
				var ac_shou = 0;
				var ac_zhi = 0;
				var ac_day = [];
				readkey = plus.storage.key(i);
				readvalue = plus.storage.getItem(readkey);
				//console.log(readkey);
				//console.log(readvalue);

				readkeyarr = readkey.split('-');
				if(readkeyarr[0] == hy && readkeyarr[1] == hm) {
					onedaytmp['ac_year'] = readkeyarr[0];
					onedaytmp['ac_month'] = readkeyarr[1];
					onedaytmp['ac_date'] = readkeyarr[2];
					readvaluearr = readvalue.split('/');

					for(var j = 0; j < readvaluearr.length; j++) {
						var ac_daytmp = {};
						var tmp = [];
						tmp = readvaluearr[j].split('-');
						if(tmp[0] == "1") {
							ac_zhi = ac_zhi + parseFloat(tmp[2]);
						} else {
							ac_shou = ac_shou + parseFloat(tmp[2]);
						}
						ac_daytmp['ac_shouzhi'] = tmp[0];
						ac_daytmp['ac_name'] = tmp[1];
						ac_daytmp['ac_money'] = parseFloat(tmp[2]).toFixed(2);
						ac_daytmp['ac_mm'] = tmp[3];
						if(tmp[1] == "餐饮") {
							ac_daytmp['ac_icon'] = "icon-canyin";
						} else if(tmp[1] == "工资") {
							ac_daytmp['ac_icon'] = "icon-gongzi";
						} else if(tmp[1] == "交通") {
							ac_daytmp['ac_icon'] = "icon-traffic";
						} else if(tmp[1] == "奖金") {
							ac_daytmp['ac_icon'] = "icon-jixiaojiangjin";
						} else if(tmp[1] == "购物") {
							ac_daytmp['ac_icon'] = "icon-gouwu";
						} else if(tmp[1] == "兼职") {
							ac_daytmp['ac_icon'] = "icon-jianzhi";
						} else if(tmp[1] == "娱乐") {
							ac_daytmp['ac_icon'] = "icon-yule";
						} else if(tmp[1] == "红包") {
							ac_daytmp['ac_icon'] = "icon-hongbao";
						} else if(tmp[1] == "居住") {
							ac_daytmp['ac_icon'] = "icon-house";
						} else if(tmp[1] == "投资") {
							ac_daytmp['ac_icon'] = "icon-touzi";
						} else if(tmp[1] == "医疗") {
							ac_daytmp['ac_icon'] = "icon-yiliao";
						} else if(tmp[1] == "理财") {
							ac_daytmp['ac_icon'] = "icon-iconsd";
						} else if(tmp[1] == "教育") {
							ac_daytmp['ac_icon'] = "icon-study";
						} else if(tmp[1] == "收款") {
							ac_daytmp['ac_icon'] = "icon-shoukuan";
						} else if(tmp[1] == "其他") {
							ac_daytmp['ac_icon'] = "icon-qita";
						}
						ac_day.push(ac_daytmp);
					}
					onedaytmp['ac_zhi'] = ac_zhi.toFixed(2);
					onedaytmp['ac_day'] = ac_day;
					onedaytmp['ac_shou'] = ac_shou.toFixed(2);

					oneday.push(onedaytmp);
				}

			}
			for(var i = 0; i < oneday.length; i++) {
				monthshou += parseFloat(oneday[i].ac_shou);
				monthzhi += parseFloat(oneday[i].ac_zhi);
			}

			convert['oneday'] = oneday;
			convert['monthshou'] = monthshou.toFixed(2);
			convert['monthzhi'] = monthzhi.toFixed(2);
			convert['a_year'] = hy;
			convert['a_month'] = hm;
			convert.oneday.sort(function(a, b) {
				if(a.ac_year === b.ac_year && a.ac_month === b.ac_month) {
					return b.ac_date - a.ac_date;
				} else if(a.ac_year === b.ac_year) {
					return b.ac_month - a.ac_month;
				} else {
					return b.ac_year - a.ac_year;
				}
			});
			for(var i = 0; i < convert.oneday.length; i++) {
				oneday[i].ac_day.sort(function(a, b) {
					return b.ac_mm - a.ac_mm;
				})
			}
			//console.log(JSON.stringify(convert));
			return convert;
		}

	});

	mui.plusReady(function() {
		var self = plus.webview.currentWebview(),
			leftPos = Math.ceil((window.innerWidth - 60) / 2); // 设置凸起大图标为水平居中

		/**	
		 * drawNativeIcon 绘制带边框的半圆，
		 * 实现原理：
		 *   id为bg的tag 创建带边框的圆
		 *   id为bg2的tag 创建白色矩形遮住圆下半部分，只显示凸起带边框部分
		 * 	 id为iconBg的红色背景图
		 *   id为icon的字体图标
		 *   注意创建先后顺序，创建越晚的层级越高
		 */
		var drawNativeIcon = util.drawNative('icon', {
			bottom: '5px',
			left: leftPos + 'px',
			width: '60px',
			height: '60px'
		}, [{
			tag: 'rect',
			id: 'bg',
			position: {
				top: '1px',
				left: '0px',
				width: '100%',
				height: '100%'
			},
			rectStyles: {
				color: '#fff',
				radius: '50%',
				borderColor: '#ccc',
				borderWidth: '1px'
			}
		}, {
			tag: 'rect',
			id: 'bg2',
			position: {
				bottom: '-0.5px',
				left: '0px',
				width: '100%',
				height: '45px'
			},
			rectStyles: {
				color: '#fff'
			}
		}, {
			tag: 'rect',
			id: 'iconBg',
			position: {
				top: '5px',
				left: '5px',
				width: '50px',
				height: '50px'
			},
			rectStyles: {
				color: '#FF3838',
				radius: '50%'
			}
		}, {
			tag: 'font',
			id: 'icon',
			text: '+', //此为字体图标Unicode码'\e600'转换为'\ue600'
			position: {
				top: '0px',
				left: '5px',
				width: '50px',
				height: '100%'
			},
			textStyles: {
				fontSrc: '_www/fonts/iconfont.ttf',
				align: 'center',
				color: '#fff',
				size: '30px'
			}
		}]);
		// append 到父webview中
		self.append(drawNativeIcon);

		//自定义监听图标点击事件
		drawNativeIcon.addEventListener('click', function(e) {
			mui.openWindow({
				url: 'html/Accounting.html',
				id: 'Accounting.html'
			});
		});
		// 中间凸起图标绘制及监听点击完毕

		// 创建子webview窗口 并初始化
		var aniShow = {};
		util.initSubpage(aniShow);

		var nview = plus.nativeObj.View.getViewById('tabBar'),
			activePage = plus.webview.currentWebview(),
			targetPage,
			subpages = util.options.subpages,
			pageW = window.innerWidth,
			currIndex = 0;

		/**
		 * 根据判断view控件点击位置判断切换的tab
		 */
		nview.addEventListener('click', function(e) {
			var clientX = e.clientX;
			if(clientX > 0 && clientX <= parseInt(pageW * 0.5)) {
				currIndex = 0;
			} else {
				currIndex = 1;
			}
			// 匹配对应tab窗口	
			if(currIndex > 0) {
				targetPage = plus.webview.getWebviewById(subpages[currIndex - 1]);
			} else {
				targetPage = plus.webview.currentWebview();
			}

			if(targetPage == activePage) {
				return;
			}

			if(currIndex !== 2) {
				//底部选项卡切换
				util.toggleNview(currIndex);
				// 子页面切换
				util.changeSubpage(targetPage, activePage, aniShow);
				//更新当前活跃的页面
				activePage = targetPage;
			}
		});
	});

})();
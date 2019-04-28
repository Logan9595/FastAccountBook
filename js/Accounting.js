(function() {
	mui.init();

	var sumstr = "";
	//消费种类字符串
	var zhongleistr = "";
	//总金额字符串
	var sum = 0;
	//年 月  日
	var date = new Date();
	var a_year = date.getFullYear();
	var a_month = date.getMonth() + 1;
	var a_date = date.getDate();


	function getDefaultdata() {
		//总金额字符串
		sumstr = "";
		//消费种类字符串
		zhongleistr = "";
		//总金额字符串
		sum = 0;
		//年 月  日
		date = new Date()
		a_year = date.getFullYear();
		a_month = date.getMonth() + 1;
		a_date = date.getDate();
	};
	//Vue对象
	var acc_data = new Vue({
		el: '.ac-center',
		data: {
			acc: 1,
			accitem_before: 0,
			accitem_crr: 1
		},
		methods: {
			chosee: function(i) {
				acc_data.accitem_crr = i;
				var itemid;
				var itembeforeid;
				if(acc_data.acc == 1) {
					itemid = "item" + i;
					itembeforeid = "item" + acc_data.accitem_before;
				} else {
					itemid = "items" + i;
					itembeforeid = "items" + acc_data.accitem_before;
				}
				if(acc_data.accitem_before != 0) {
					document.querySelector("#" + itembeforeid + " .colitem-img").classList.remove("acctiveimg");
					document.querySelector("#" + itembeforeid + " .colitem-img .mui-icon").classList.remove("acctiveicon");
				}
				document.querySelector("#" + itemid + " .colitem-img").classList.add("acctiveimg");
				document.querySelector("#" + itemid + " .colitem-img .mui-icon").classList.add("acctiveicon");

				acc_data.accitem_before = i;

				if(acc_data.acc == 1 && i == 1) {
					zhongleistr = "餐饮";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 1 && i == 2) {
					zhongleistr = "交通";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 1 && i == 3) {
					zhongleistr = "购物";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 1 && i == 4) {
					zhongleistr = "娱乐";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 1 && i == 5) {
					zhongleistr = "居住";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 1 && i == 6) {
					zhongleistr = "医疗";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 1 && i == 7) {
					zhongleistr = "教育";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 1 && i == 8) {
					zhongleistr = "其他";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 0 && i == 1) {
					zhongleistr = "工资";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 0 && i == 2) {
					zhongleistr = "奖金";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 0 && i == 3) {
					zhongleistr = "兼职";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 0 && i == 4) {
					zhongleistr = "红包";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 0 && i == 5) {
					zhongleistr = "投资";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 0 && i == 6) {
					zhongleistr = "理财";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 0 && i == 7) {
					zhongleistr = "收款";
					document.getElementById("zhonglei").innerText = zhongleistr;
				} else if(acc_data.acc == 0 && i == 8) {
					zhongleistr = "其他";
					document.getElementById("zhonglei").innerText = zhongleistr;
				}
			}
		}
	});

	//支出收入事件
	mui('#shouru')[0].addEventListener('tap', function() {
		acc_data.acc = 1;
		document.getElementById("zhichu").classList.remove("acctive");
		this.classList.add("acctive");
	});

	mui('#zhichu')[0].addEventListener('tap', function() {
		acc_data.acc = 0;
		document.getElementById("shouru").classList.remove("acctive");
		this.classList.add("acctive");
	});

	//日期监听
	mui("#riqi")[0].addEventListener('tap', function() {
		var dtPicker = new mui.DtPicker({
			type: 'date',
			beginDate: new Date(2010, 0, 01), //设置开始日期 
			endDate: new Date(2050, 11, 31), //设置结束日期 
		});
		dtPicker.show(function(selectItems) {
			a_year = parseInt(selectItems.y.text); //获取选择的年
			a_month = parseInt(selectItems.m.text); //获取选择的月
			a_date = parseInt(selectItems.d.text); //获取选择的月
		});
	});

	//取消监听
	mui("#quxiao")[0].addEventListener('tap', function() {
		mui.back();
	});

	//添加数字监听
	mui("#num1")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '1';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#num2")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '2';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#num3")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '3';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#num4")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '4';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#num5")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '5';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#num6")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '6';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#num7")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '7';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#num8")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '8';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#num9")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '9';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#num0")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '0';
			document.getElementById("zongjia").innerText = sumstr;
		}
	});
	mui("#numdot")[0].addEventListener('tap', function() {
		if(sumstr.length < 12) {
			sumstr += '.';
			document.getElementById("zongjia").innerText = sumstr;
		}

	});
	mui("#numsc")[0].addEventListener('tap', function() {
		var len = sumstr.length;
		if(len > 1) {
			sumstr = sumstr.substring(0, len - 1);
			document.getElementById("zongjia").innerText = sumstr;
		} else {
			sumstr = "";
			document.getElementById("zongjia").innerText = "0.00";
		}
	});

	//添加完成事件
	mui("#wancheng")[0].addEventListener('tap', function() {
		sum = parseFloat(sumstr);
		if(zhongleistr == "") {
			mui.toast("请选择种类");
		} else if(sumstr == "") {
			mui.toast("请输入金额");
		} else if(!panduan(sumstr)) {
			mui.toast("请输入正确的金额格式");
		} else {
		    var date2 = new Date();
			var key = a_year + "-" + a_month + "-" + a_date;
			var value = acc_data.acc + "-" + zhongleistr + "-" + sum+"-"+date2.getTime();
			if(plus.storage.getItem(key) == null) {
				plus.storage.setItem(key, value);
			} else {
				value = plus.storage.getItem(key) + '/' + value;
				plus.storage.setItem(key, value);
			}
			
			mui.toast("记账成功");
			getDefaultdata();
			var list = plus.webview.currentWebview().opener();　　　　 //触发父页面的自定义事件(refresh),从而进行刷新
			mui.fire(list, 'readdata');
			plus.webview.currentWebview().close();
		}

	});
	//判断数字是否正确
	function panduan(str) {
		var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
		return reg.test(str);
	}
})()
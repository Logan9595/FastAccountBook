(function() {
	mui.init();
	var myDate = new Date();
	var Year = myDate.getFullYear();
	var month = myDate.getMonth() + 1;
	
	draw(Year, month);
	
	mui("#yuelable")[0].addEventListener('tap',function(){
		document.querySelector("#nianlable").classList.remove("acctivelable");
		document.querySelector("#yuelable").classList.add("acctivelable");
		var dtPicker = new mui.DtPicker({
			type: 'month',
			beginDate: new Date(2010, 0, 01), //设置开始日期 
			endDate: new Date(2050, 11, 31), //设置结束日期 
		});
		dtPicker.show(function(selectItems) {
			a_year = parseInt(selectItems.y.text); //获取选择的年
			a_month = parseInt(selectItems.m.text); //获取选择的月
			draw(a_year, a_month);
		});
	});
	
	mui("#nianlable")[0].addEventListener('tap',function(){
		document.querySelector("#yuelable").classList.remove("acctivelable");
		document.querySelector("#nianlable").classList.add("acctivelable");
		var dtPicker = new mui.DtPicker({
			type: 'month',
			"customData": {
	        "m": [ 
	            { value: "-", text: "-" }
	        ]
	    } ,
			beginDate: new Date(2010, 0, 01), //设置开始日期 
			endDate: new Date(2050, 11, 31), //设置结束日期 
		});
		dtPicker.show(function(selectItems) {
			a_year = parseInt(selectItems.y.text); //获取选择的年
			a_month = parseInt(selectItems.m.text); //获取选择的月
			draw(a_year, 0);
		});
	});
	
	function draw(y, m) {
		mui.plusReady(function() {
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

				readkeyarr = readkey.split('-');
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
					ac_daytmp['ac_money'] = tmp[2];
					ac_day.push(ac_daytmp);
				}
				onedaytmp['ac_zhi'] = ac_zhi;
				onedaytmp['ac_day'] = ac_day;
				onedaytmp['ac_shou'] = ac_shou;
				oneday.push(onedaytmp);
			}

			//console.log(JSON.stringify(oneday));

			var montharr = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			var xdata = [];
			var yshou = [];
			var yzhi = [];

			if((y % 4 == 0 && y % 100 != 4) || y % 400 == 0) {
				montharr[2] = 29;
			}
			if(m == 0) {
				for(var i = 0; i < 12; i++) {
					xdata[i] = i + 1;
					yshou[i] = 0;
					yzhi[i] = 0;
				}
				for(var i = 0; i < oneday.length; i++) {
					if(oneday[i].ac_year == y) {
						yshou[oneday[i].ac_month - 1] += oneday[i].ac_shou;
						yzhi[oneday[i].ac_month - 1] += oneday[i].ac_zhi;
					}
				}

			} else {

				for(var i = 0; i < montharr[m]; i++) {
					xdata[i] = i + 1;
					yshou[i] = 0;
					yzhi[i] = 0;
				}
				for(var i = 0; i < oneday.length; i++) {
					if(oneday[i].ac_year == y && oneday[i].ac_month == m) {
						yshou[oneday[i].ac_date - 1] = oneday[i].ac_shou;
						yzhi[oneday[i].ac_date - 1] = oneday[i].ac_zhi;
					}
				}
			}

			var pieshou = [];
			var piezhi = [];
			var pieshouflag=0;
			var piezhiflag=0;

			for(var i = 0; i < 8; i++) {
				pieshou[i] = 0;
				piezhi[i] = 0;
			}

			if(m == 0) {
				for(var i = 0; i < oneday.length; i++) {
					if(oneday[i].ac_year == y) {
						for(var j = 0; j < oneday[i].ac_day.length; j++) {
							if(oneday[i].ac_day[j].ac_name == "餐饮") {
								piezhi[0] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "交通") {
								piezhi[1] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "购物") {
								piezhi[2] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "娱乐") {
								piezhi[3] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "居住") {
								piezhi[4] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "医疗") {
								piezhi[5] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "教育") {
								piezhi[6] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "其他" && oneday[i].ac_day[j].ac_shouzhi == 1) {
								piezhi[7] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "工资") {
								pieshou[0] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "奖金") {
								pieshou[1] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "兼职") {
								pieshou[2] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "红包") {
								pieshou[3] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "投资") {
								pieshou[4] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "理财") {
								pieshou[5] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "收款") {
								pieshou[6] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "其他" && oneday[i].ac_day[j].ac_shouzhi == 0) {
								pieshou[7] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							}
						}
					}
				}
			} else {
				for(var i = 0; i < oneday.length; i++) {
					if(oneday[i].ac_year == y && oneday[i].ac_month == m) {
						for(var j = 0; j < oneday[i].ac_day.length; j++) {
							if(oneday[i].ac_day[j].ac_name == "餐饮") {
								piezhi[0] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "交通") {
								piezhi[1] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "购物") {
								piezhi[2] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "娱乐") {
								piezhi[3] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "居住") {
								piezhi[4] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "医疗") {
								piezhi[5] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "教育") {
								piezhi[6] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "其他" && oneday[i].ac_day[j].ac_shouzhi == 1) {
								piezhi[7] += parseFloat(oneday[i].ac_day[j].ac_money);
								piezhiflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "工资") {
								pieshou[0] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "奖金") {
								pieshou[1] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "兼职") {
								pieshou[2] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "红包") {
								pieshou[3] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "投资") {
								pieshou[4] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "理财") {
								pieshou[5] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "收款") {
								pieshou[6] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							} else if(oneday[i].ac_day[j].ac_name == "其他" && oneday[i].ac_day[j].ac_shouzhi == 0) {
								pieshou[7] += parseFloat(oneday[i].ac_day[j].ac_money);
								pieshouflag=1;
							}
						}
					}
				}
			}
			
			var flag1=0;
			var flag2=0;
			for(var i=0;i<pieshou.length;i++){
				if(pieshou[i]!==0){
					flag1=1;
				}
			}
			if(flag1==0){
				pieshou.length=0;
				
			}
			
			for(var i=0;i<piezhi.length;i++){
				if(piezhi[i]!==0){
					flag2=1;
				}
			}
			if(flag2==0){
				piezhi.length=0;
			}
			
			var linec = echarts.init(document.getElementById('linechar'));
			// 指定图表的配置项和数据
			option = {
				backgroundColor: '#ffffff',

				// 默认色板
				color: ['#ff7f50', '#87cefa'],
				
				tooltip: {
					trigger: 'axis',
					backgroundColor: 'rgba(0,0,0,0.3)',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
						shadowStyle: { // 阴影指示器样式设置
							color: 'rgba(255,255,255,0)' // 阴影颜色
						}
					},
				},
				legend: {
					data: ['支出', '收入'],
					selected: {
						'收入': false
					},
					x: '5px',
					padding: 15
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					axisLine: { //坐标 轴线
						show: false
					},
					axisTick: { //坐标轴刻度相关设置
						show: false //是否显示坐标轴刻度。
					},
					data: xdata
				},
				yAxis: {
					//show:false, 
					type: 'value',
					axisTick: { //坐标轴刻度相关设置
						show: false //是否显示坐标轴刻度。
					},
					axisLine: { //坐标 轴线
						show: false
					},
					axisLabel: { //坐标轴刻度标签的相关设置
						show: false
					},
					splitLine: { //坐标轴在 grid 区域中的分隔线。
						show: false
					}
				},
				series: [{
						name: '支出',
						type: 'line',
						data: yzhi
					},
					{
						name: '收入',
						type: 'line',
						data: yshou
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			linec.setOption(option);
			
			var piec = echarts.init(document.getElementById('piechar1'));
			option = {
				color: ['#ffe957', '#f29f3f', '#f2753f', '#e87e51', '#de8c68'],
				tooltip: {
					trigger: 'item',
					confine: true,
					backgroundColor: 'rgba(0,0,0,0.3)',
					formatter: "{b}: {c} ({d}%)"
				},
				series: [{
					name: '收入',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '15',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: [{
							value: piezhi[0],
							name: '餐饮'

						},
						{
							value: piezhi[1],
							name: '交通'
						},
						{
							value: piezhi[2],
							name: '购物'
						},
						{
							value: piezhi[3],
							name: '娱乐'
						},
						{
							value: piezhi[4],
							name: '居住'
						},
						{
							value: piezhi[5],
							name: '医疗'
						},
						{
							value: piezhi[6],
							name: '教育'
						},
						{
							value: piezhi[7],
							name: '其他'
						}
					]
				}]
			};
			piec.setOption(option);
			
			var piec2 = echarts.init(document.getElementById('piechar2'));
			option = {
				color: ['#ffe957', '#f29f3f', '#f2753f', '#e87e51', '#de8c68'],
				tooltip: {
					trigger: 'item',
					confine: true,
					backgroundColor: 'rgba(0,0,0,0.3)',
					formatter: "{b}: {c} ({d}%)"
				},
				series: [{
					name: '收入',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '15',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data: [{
							value: pieshou[0],
							name: '工资'
						},
						{
							value: pieshou[1],
							name: '奖金'
						},
						{
							value: pieshou[2],
							name: '兼职'
						},
						{
							value: pieshou[3],
							name: '红包'
						},
						{
							value: pieshou[4],
							name: '投资'
						},
						{
							value: pieshou[5],
							name: '理财'
						},
						{
							value: pieshou[6],
							name: '收款'
						},
						{
							value: pieshou[7],
							name: '其他'
						}
					]
				}]
			};
			piec2.setOption(option);

		})
		
		if(m==0){
			str=y+'年';
		}else{
			str=y+'年'+m+'月';
		}
		document.getElementById("nianyue").innerText=str;
	}

})()
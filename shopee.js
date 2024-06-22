var totalOrders = 0;
var totalSpent = 0;
var pulling = true;
var offset = 0;

function getStatistics() {
	var orders = [];
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			orders = JSON.parse(this.responseText)['data'].details_list
			totalOrders += orders.length;
            if(orders.length >=10) {
                pulling = orders.length
            }else{
                pulling = false;
            }
			orders.map(order => {
				let tpa = order.info_card.final_total / 100000;
				totalSpent += tpa;
			});
			offset += 10;
			console.log('Đã lấy được: ' + totalOrders + ' đơn hàng');
			if(pulling) {
				console.log('loading...');
				getStatistics();
			}
			else {
				console.log("%cTổng đơn hàng thành công: "+"%c "+moneyFormat(totalOrders), "font-size: 20px;","font-size: 20px; color:red");
				console.log("%cTổng chi tiêu: "+"%c "+moneyFormat(totalSpent)+"đ","font-size: 20px;","font-size: 20px; color:red");
			}
		}
	};
	xhttp.open("GET", "https://shopee.vn/api/v4/order/get_order_list?limit=10&list_type=3&offset="+offset, true);
	xhttp.send();
}

getStatistics()

function moneyFormat(number, fixed=0) {
	if(isNaN(number)) return 0;
	number = number.toFixed(fixed);
	let delimeter = ',';
	number += '';
	let rgx = /(\d+)(\d{3})/;
	while (rgx.test(number)) {
		number = number.replace(rgx, '$1' + delimeter + '$2');
	}
	return number;
}
getStatistics()


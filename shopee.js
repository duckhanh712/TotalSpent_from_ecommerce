var totalOrders = 0;
var totalAmount = 0;
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
						pulling = true
				}else{
						pulling = false;
				}
			orders.map(order => {
				let tpa = order.info_card.final_total / 100000;
				console.log(moneyFormat(tpa));
				totalAmount += tpa;
			});
			offset += 10;
			if(pulling) {
				getStatistics();
			} else {
				console.log("%cTotal orders completed: "+"%c "+moneyFormat(totalOrders), "font-size: 20px;","font-size: 20px; color:red");
				console.log("%cTotal amount: "+"%c "+moneyFormat(totalAmount)+"đ","font-size: 20px;","font-size: 20px; color:red");
			}
		}
	};
	xhttp.open("GET", "https://shopee.vn/api/v4/order/get_order_list?limit=10&list_type=3&offset="+offset, true);
	xhttp.send();
}

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


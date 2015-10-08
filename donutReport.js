$(function () {

	var $simBtn = $('#simulate'),
		$purchaseBtn = $('#purchase-btn'),
		$navBtn= $('.nav-button'),
		$slider= $('#slider');

	function getDonutPrice() {
			var sliderValue = parseFloat($slider.val() / 100);
			donutPrice = sliderValue.toFixed(2);
			$('#price-msg').text('Donut Price: $' + donutPrice);
	}	

	getDonutPrice();

	//on donut app click, changes messages and unbind the event
	$purchaseBtn.on('click', function () {

		$('#purchase-msg').hide().text("Thanks!").fadeIn();
		$('#price').delay(400).hide().css('color','#FF66FF').text("You won't regret it!").fadeIn();
		$('img.big-donut:hover').css('opacity', '1.0');
		$('img.big-donut').addClass('johnny-style').css('cursor','default');

		$purchaseBtn.unbind();

	});

	$simBtn.on('mousedown', function() {
		$(this).css({
					'backgroundColor': 'white',
					'color': 'green'
				});
	});

	$simBtn.on('mouseup', function() {
		$(this).css({
					'backgroundColor': 'green',
					'color': 'white'
				});
	});

	$navBtn.on('click', function() {
		//get the first child
		var $infoCard = $(this).children().eq(0);

		//if the shop card is showing, hide it along with the others
		if( $infoCard.is(":visible") ) { 
			$('.shop-facts').hide();
		} else { 
			//else, hide all, then show the child of the clicked parent
			$('.shop-facts').hide();
			$infoCard.show();
		}
	});


	$slider.on('change', getDonutPrice);



	//run each branch's sales projection and load into html table
	$simBtn.on('click', function() {

		//make some nice DonutShops
		var branches = [

			new DonutShop('Downtown', 8, 43, 4.50, 10, 17, .05), //8 hours
			new DonutShop('Capitol Hill', 4, 37, 2.00, 0, 23, 0.20), //24 hours
			new DonutShop('South Lake Union', 9, 23, 6.33, 9, 18, .15), //10 hours
			new DonutShop('Wedgewood', 2, 28, 1.25, 9, 15, .50), //7 hours
			new DonutShop('Ballard', 8,	58,	3.75, 9, 18, .35) //10 hours

		];

		var simData = [];
		var result = [];
		var grandTotalCustomers = 0;
		var grandTotalDonutsSold = 0;
		var grandTotalSales = 0;
		var report = "";

		//call the runSalesProjection method on each DonutShop in branches
		for (var index = 0; index < branches.length; index++) {
			result = branches[index].runSalesProjection(donutPrice);
			simData[index] = result;
		}

		//add the grandtotals to simData
		simData.push([grandTotalCustomers, grandTotalDonutsSold, '$' + grandTotalSales.toFixed(2)]);
		console.log(simData);

		//write the results into the sim table
		updateRow('#customers-row',0);
		updateRow('#donuts-row',1);
		updateRow('#sales-row',2);

		$('#report').html(report);

		//functions

		//create a DonutShop class
		function DonutShop(name, minCustomers, maxCustomers, avgDonutPerHour, open, close, priceSensitivity) {

			this.name = name;
			this.minCustomers = minCustomers;
			this.maxCustomers = maxCustomers;
			this.avgDonutPerHour = avgDonutPerHour;
			this.open = open;
			this.close = close;
			this.priceSensitivity = priceSensitivity;

			//log a report of how many donuts are sold by hour and by day based on a random sample of customers
			this.runSalesProjection = function(price) {

				var modifier = 3 - price;
				var percentChange = 1 + (modifier * this.priceSensitivity);
				var adjustedDonutPerHour = this.avgDonutPerHour * percentChange;
				
				var msg, summary, rundown, hourlyCustomerSample, totalCustomers, 
					hourlyDonutSales, totalDailyDonuts, totalSales, totalDailyDonuts, timeString;
				var simData = [];

				totalDailyDonuts = 0;
				totalCustomers = 0;
				totalSales = 0;
				summary = "";
				msg = "";
				rundown = "";

				for (var hour = this.open; hour <= this.close; hour++) {

					timeString = getTimeString(hour);
					hourlyCustomerSample = randBetween(this.minCustomers, this.maxCustomers);
					hourlyDonutSales = Math.round(adjustedDonutPerHour * hourlyCustomerSample);
					rundown += timeString + ': ';
					rundown += 'Customers - ' + hourlyCustomerSample + ", ";
					rundown += 'Donuts Sold - ' + hourlyDonutSales;
					rundown += '<br/>';
					totalCustomers += hourlyCustomerSample;
					totalDailyDonuts += hourlyDonutSales;

				};

				totalSales = totalDailyDonuts * price;

				grandTotalCustomers += totalCustomers;
				grandTotalDonutsSold += totalDailyDonuts;
				grandTotalSales += totalSales;

				summary += '*******************************************<br/>';
				summary += this.name + "'s Daily Sales Projection:<br/><br/>";
				summary += 'Total sales: $' + totalDailyDonuts * price + '<br/>';
				summary += 'Total donuts sold: ' + totalDailyDonuts + '<br/>';
				summary += 'Total customers: ' + totalCustomers.toFixed(2) + '<br/><br/>';
				
				msg = summary + rundown + '*******************************************\n\n';

				report += msg;

				return [totalCustomers, totalDailyDonuts, '$' + totalSales.toFixed(2)];

			};

		};

		//cycle through each cell in a row and input data
		function updateRow(selector, rowIndex) {
			$(selector).children().each(function(cellIndex) {
		  		if(cellIndex === 0) {return};
		 		this.innerHTML = simData[cellIndex - 1][rowIndex];
			 });
		}

		function getDonutPrice() {
			var sliderValue = parseFloat($slider.val() / 100);
			donutPrice = sliderValue.toFixed(2);
			$('#price-msg').text('Donut Price: $' + price);
		}

		//convenience function for random numbers
		function randBetween(min, max) {
	    	return Math.floor(Math.random() * (max - min + 1) ) + min;
		}

		//convert hour integer to a string
		function getTimeString(hour) {
			
			if(hour === 0) {
				return '12:00 am';
			} else if (hour < 12) {
				return hour + ':00 am';
			} else if (hour === 12) {
				return '12:00 pm';
			} else {
				return (hour - 12) + ':00 pm';
			}
		}

	});

});

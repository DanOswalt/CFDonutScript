

/* Code: Simulate a donut shop
Due Thursday by 6:59pm  Points 10 Submitting a website url
Code:

In class, we wrote an Animal constructor function, that defined properties and methods, and then used it to create new objects. Now, it's your turn to write a program with your own constructor function.

A famous donut franchise, with locations all over town, needs your help calculating the number of donuts each location should bake every morning. The number of donuts depends on a few factors unique to each location.

The hours of operation.
A random sample of customers per hour.
The average number of donuts purchased per customer.
Your job is to write a program that defines a constructor function with the following.

Properties to represent the following data attributes (Links to an external site.) of each location.
A method to calculate and display the number of donuts each shop needs to bake per hour and per day.
The customers per hour should be randomly generated (Links to an external site.) from the range provided for every hour of the day.
The output should be sent to the console log.
Using the constructor function, create new objects to represent each location and simulate a days worth of baking.
 */

(function () {

	//make some nice DonutShops
	var branches = [

		new DonutShop('Downtown', 8, 43, 4.50, 10, 17), //8 hours
		new DonutShop('Capitol Hill', 4, 37, 2.00, 0, 23), //24 hours
		new DonutShop('South Lake Union', 9, 23, 6.33, 9, 18), //10 hours
		new DonutShop('Wedgewood', 2, 28, 1.25, 9, 15), //7 hours
		new DonutShop('Ballard', 8,	58,	3.75, 9, 18) //10 hours

	];

	//call the runSalesProjection method on each DonutShop in branches
	for (var i = 0; i < branches.length; i++) {
		branches[i].runSalesProjection();
	};

	//create a DonutShop class
	function DonutShop(name, minCustomers, maxCustomers, avgDonutPerHour, open, close) {

		this.name = name;
		this.minCustomers = minCustomers;
		this.maxCustomers = maxCustomers;
		this.avgDonutPerHour = avgDonutPerHour;
		this.open = open;
		this.close = close;

		//log a report of how many donuts are sold by hour and by day based on a random sample of customers
		this.runSalesProjection = function() {
			
			var msg, summary, rundown, hourlyCustomerSample, totalCustomers, hourlyDonutSales, totalDailyDonuts, timeString;

			totalDailyDonuts = 0;
			totalCustomers = 0;
			summary = "";
			msg = "";
			rundown = "";	

			for (var hour = this.open; hour <= this.close; hour++) {

				timeString = getTimeString(hour);
				hourlyCustomerSample = randBetween(this.minCustomers, this.maxCustomers);
				hourlyDonutSales = Math.round(this.avgDonutPerHour * hourlyCustomerSample);
				rundown += timeString + ': ';
				rundown += 'Customers - ' + hourlyCustomerSample + ", ";
				rundown += 'Donuts Sold - ' + hourlyDonutSales;
				rundown += '\n';
				totalDailyDonuts += hourlyDonutSales;
				totalCustomers += hourlyCustomerSample;

			};

			summary += '*******************************************\n';
			summary += this.name + "'s Daily Sales Projection:\n\n";
			summary += 'Total donuts sold: ' + totalDailyDonuts + '\n';
			summary += 'Total customers: ' + totalCustomers + '\n\n';
			
			msg = summary + rundown + '*******************************************\n\n';

			console.log(msg);

		};
	};

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

})

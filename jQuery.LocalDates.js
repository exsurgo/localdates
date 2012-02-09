
/*
*	jQuery plugin for converting UTC dates in HTML to friendly local dates
*    Add data-local-date="{UTC Date}" to any element or textbox, and it will
*    automatically display the value as inner text or as the textbox value
*    Dates must be in a 24-hour date format. eg. "1/1/2012 23:00"
*/
(function ($) {
	$.fn.extend({
		localDates: function () {

			//Iterate through each matched element
			return this.find("[data-local-date]").each(function () {
				//Get textbox value or element inner text
				var  el = $(this)
					isInput = el.is("input"),
					//Get UTC date/time representation
					//Format should be in "mm/dd/yyyy hh:mm" 24-hour time
					val = el.attr("data-local-date");
				if (val && val != "") {
					//Get UTC date object from string
					var  utc = new Date(),
						parts = val.split(/ |:|\//);
					utc.setUTCMonth(Number(parts[0]) - 1);
					utc.setUTCDate(Number(parts[1]));
					utc.setUTCFullYear(Number(parts[2]));
					utc.setUTCHours(Number(parts[3]));
					utc.setUTCMinutes(Number(parts[4]));
					//Convert to local date string
					var  month = (utc.getMonth()+1),
						day = utc.getDate(),
						year = utc.getFullYear(),
						meridian = "AM",
					//Show as 12 hour time
						hour = utc.getHours();
					if (hour > 12) {
						hour = hour - 12;
						meridian = "PM";
					}
					//Convert to minute string... "01" instead of 1
					var minute = utc.getMinutes();
					if (minute < 10) minute += "0";
					//Final string
					var local = month + "/" + day + "/" + year + " " + hour + ":" + minute + " " + meridian;
					//Set textbox value or element text
					if (isInput) el.val(local);
					else el.text(local);
					//Add display metadata to element
					el.data("date", month + "/" + day + "/" + year)
					  .data("time", hour + ":" + minute + " " + meridian)
					  .data("day", day)
					  .data("month", month)
					  .data("year", year)
					  .data("hour", hour)
					  .data("minute", minute)
					  .data("meridian", meridian);

				}
			});

		}
	});
})(jQuery);

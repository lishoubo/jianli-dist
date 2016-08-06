/**
 * Created by lishoubo on 16/5/14.
 */

$(function () {
    var your_dates = [new Date(2016, 7, 7), new Date(2016, 7, 8)]; // just some dates.

    $('.datepicker').datepicker({
        beforeShowDay: function (date) {
            // check if date is in your array of dates
            if ($.inArray(date, your_dates)) {
                // if it is return the following.
                return {
                    today: true
                };
            }
        },
        language: 'zh-CN',
        todayHighlight: true

    });
});

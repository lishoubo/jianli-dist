/**
 * Created by lishoubo on 16/5/14.
 */

$(function () {
    $('.carousel').carousel();

    /*quick join*/
    new Vue({
        el: '#quick_join',
        data: {
            applyNum: 0,
            applyForm: {
                district: '西湖区',
                area: '',
                address: '',
                userName: '',
                mobile: ''
            }
        },
        created: function () {
            this.fetch_join_number();
        },
        methods: {
            fetch_join_number: function () {
                this.applyNum = 11223;
            },
            quick_join: function () {
                if (!this.applyForm.userName) {
                    show_tip("麻烦填写您的姓名,方便我们联系到您");
                    return;
                }
                if (!this.applyForm.mobile) {
                    show_tip("麻烦填写您的联系方式,方便我们联系到您");
                    return;
                }
                console.log(this.applyForm);
                show_tip("恭喜您,预约成功,我们会马上联系您~");
            },
            choose_district: function (event) {
                this.applyForm.district = $(event.target).html();
            }

        }
    });
});

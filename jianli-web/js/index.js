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
                area: '',
                address: {
                    district: '西湖区',
                    location: ''
                },
                userName: '',
                mobile: ''
            }
        },
        created: function () {
            this.fetch_join_number();
        },
        methods: {
            fetch_join_number: function () {
                var owner = this;
                this._get("/api/server/charge/count", "",
                    function (result) {
                        if (result.success) {
                            owner.applyNum = result.data;
                            return
                        }
                        console.log(result);
                        owner.applyNum = "许多";
                    }, function (error) {
                        console.log(error);
                        owner.applyNum = "许多";
                    }
                )
            },
            quick_join: function () {
                var owner = this;
                if (!this.applyForm.userName) {
                    show_tip("麻烦填写您的姓名,方便我们联系到您");
                    return;
                }
                if (!this.applyForm.mobile) {
                    show_tip("麻烦填写您的联系方式,方便我们联系到您");
                    return;
                }
                this._post("/api/server/charge", this.applyForm,
                    function (result) {
                        if (result.success) {
                            show_tip("恭喜您,预约成功,我们会马上联系您~");
                            owner.fetch_join_number();
                            owner.resetForm();
                            return
                        }
                        show_tip("服务出错,请联系我们的客服~");
                    },
                    function (error) {
                        console.log(error);
                        show_tip("服务出错,请联系我们的客服~");
                    });
            },
            choose_district: function (event) {
                this.applyForm.district = $(event.target).html();
            },
            resetForm: function () {
                this.applyForm.area = '';
                this.applyForm.address = '';
                this.applyForm.userName = '';
                this.applyForm.mobile = '';
            }

        }
    });

    /* 监理日志 */
    new Vue({
        el: '#jl-example',
        data: {
            applyNum: 0,
            items: []
        },
        created: function () {
            this.fetch_items();
        },
        methods: {
            fetch_items: function () {
                var owner = this;
                this._get("/api/server/journal", {page: 1, pageSize: 10},
                    function (result) {
                        console.log(result);
                        if (result.success) {
                            owner.items = result.data.items;
                            console.log(owner.items)
                            return
                        }
                    }, function (error) {
                        console.log(error);
                    }
                )
            }
        }
    })
});

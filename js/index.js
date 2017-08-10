// 实现一个功能，获取数据并且发送aJAX
var Util = {
    tpl: function (id) {
        return document.getElementById(id).innerHTML;
    },
    ajax: function (url, fn) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    fn(JSON.parse(xhr.responseText))
                }
            }
        }
        xhr.open('GET', url, true);
        xhr.send(null);
    }
};
var Home = Vue.extend({
    // 一、获取模板
    template: Util.tpl("tpl_home"),
    props:['params'],
    data: function () {
        return {
            // type:{}
            nav: [],
            carousel: [],
            register: [],
            fortoday: [],
            hotsales: [],
            todaysales: []
        }

    },
    created: function () {
        this.$parent.showSearch = true;
        this.$parent.showFooter = true;
        var me = this;
        console.log(this)
        Util.ajax("data/home.json", function (res) {
            if (res && res.errno === 0) {
                // me.type.carousel=res.data.carousel;
                // me.type.nav=res.data.nav;
                // me.type.register=res.data.register;
                // me.type.fortoday=res.data.fortoday;
                // me.type.hotsales=res.data.hotsales;
                me.nav = res.data.nav;
                me.carousel = res.data.carousel;
                me.register = res.data.register;
                me.fortoday = res.data.fortoday;
                me.hotsales = res.data.hotsales;
                me.todaysales = res.data.todaysales;
                console.log(me)
            }
        })
        console.log(111, me.nav)
    },
    methods : {
        filterByParams:filterBy
    }

})
// 分类组件拓展
var Sort = Vue.extend({
    template: Util.tpl("tpl_sort"),
    data: function () {
        return {
            sort: [],
        }
    },
    created: function () {
        var me = this;
        Util.ajax("data/sort.json", function (res) {

            if (res.errno === 0 && res) {
                me.sort = res.data.sort;

            }
            console.log(111111, me.sort)
        })

    }
})
// 购物车组件拓展
var Cart = Vue.extend({
    template: Util.tpl("tpl_cart"),
    data: function () {
        return {
            goodsList: [],
            totalPrice: 0
        }
    },
    created: function () {
        this.$parent.showSearch = false;
        this.$parent.showFooter = true;
        this.goodsList = app._goodsList;
        this.showList = this.goodsList && this.goodsList.length> 0 ? true : false;
        this.shownothing = this.goodsList && this.goodsList.length> 0 ? false : true;
        if(this.goodsList && this.goodsList.length> 0) {
            var that = this;
            this.goodsList.forEach(function(item,index) {
                console.log(item,index);
                that.totalPrice += item.price*item.num;
            });
        } else {
            this.totalPrice = 0;
        }
        // delete app._goodsList;
    }
})
// 账户页组件拓展
var Account = Vue.extend({
    template: Util.tpl("tpl_account"),
    created: function () {
        this.$parent.showSearch = false;
        this.$parent.showFooter = true;

    },
    methods: {
        goHome: function () {
            history.go(-1);
        }
    }
})
// 忘记密码组件拓展
var ForgetPassword = Vue.extend({
    template: Util.tpl('tpl_forgetPassword'),
    created: function () {
        this.$parent.showSearch = false;
        this.$parent.showFooter = false;
    },
    methods: {
        goBack: function () {
            history.go(-1);
        }
    }
})

// 新用户注册组件
var NewJoin = Vue.extend({
    template: Util.tpl("tpl_newJoin"),
    created: function () {
        this.$parent.showSearch = false;
        this.$parent.showFooter = false;
    },
    methods: {
        goPrev: function () {
            history.go(-1);
        }
    }
})
// 手机验证界面组件
var PhoneCheck = Vue.extend({
    template: Util.tpl("tpl_phoneCheck"),
    created: function () {
        this.$parent.showFooter = false;
    },
    methods: {
        goBack: function () {
            history.go(-1);
        }
    }
})

// 新妈专享页面的模板组件拓展
var Nav1 = Vue.extend({
    template: Util.tpl("tpl_nav1"),
    created: function () {
        this.$parent.showSearch = false;

    },
    methods: {
        goBack: function () {
            history.go(-1);
        }
    }
})

// 奶粉组件类的拓展
var Nav2 = Vue.extend({
    template: Util.tpl("tpl_nav2"),
    data: function () {
        return {
            milk: []
        }
    },
    created: function () {
        this.$parent.showSearch = false;
        this.$parent.showFooter = false;
        var me = this;
        Util.ajax('data/milk.json', function (res) {
            if (res.errno === 0 && res) {
                me.milk = res.data.milk;
                console.log(me.milk)
            }
        })
    },
    methods: {
        goback: function () {
            history.go(-1);
        }
    }
})

// 奶粉组件详情页第一页组件
var Milk1 = Vue.extend({
    template: Util.tpl("tpl_milk1"),
    created: function () {
        this.$parent.showSearch = false;
        this.$parent.showFooter = false;
    },
    data: function () {
        return {
            num: 1
        };
    },
    methods: {
        goback: function () {
            history.go(-1);
        },
        numberCutdown: function () {
            this.num-- <= 1 ? this.num = 1 : '';
        },
        numberAdd: function () {
            this.num++
        },
        goToCart: function () {
            var goods = {goodsId: '1001', price: 188, num: this.num, name: "Aptamil爱宝美1段婴儿配方奶粉800g（德国原装进口）"};
            console.log(goods);
            // 当购物车有值时，发射事件
            this.$parent.$emit('goods', goods);
            location.hash = "#cart";
        }
    }
})


// 将组件注册在父组件中
var home = Vue.component('home', Home);
var sort = Vue.component('sort', Sort);
var cart = Vue.component('cart', Cart);
var account = Vue.component('account', Account);
var forgetPassword = Vue.component('forgetPassword', ForgetPassword);
var newJoin = Vue.component('newJoin', NewJoin);
var phonecheck = Vue.component('phonecheck', PhoneCheck);
var nav1 = Vue.component('nav1', Nav1);
var nav2 = Vue.component('nav2', Nav2);
var milk1 = Vue.component('milk1', Milk1);

var app = new Vue({
    el: "#app",
    data: {
        types: [
            {title: "首页", type: "home", img: "m-icon1.png", id: "1"},
            {title: "分类", type: "sort", img: "m-icon2.png", id: "2"},
            {title: "购物车", type: "cart", img: "m-icon3.png", id: "3"},
            {title: "账户", type: "account", img: "m-icon4.png", id: "4"}
        ],
        view: "",
        showSearch: true,
        showFooter: true,
        params:""
    },
    methods: {
        // 实现的是搜索功能
        search:function(ev) {
            // 按下回车键，发送查询条件
            if(ev.keyCode === 13) {
                this.params = ev.target.value;
            }
        }
    }
})

/**
 * 用于监听购物车
 */
app.$on("goods", function (params) {
    app._goodsList = [];
    app._goodsList.push(params); // 存储到中间变量，方便购物车模块获取对象
});

function router() {
    var hash = location.hash;
    hash = hash.replace(/^#\/?/, '');
    hash = hash.split('/');
    var map = {
        home: true,
        sort: true,
        cart: true,
        account: true,
        forgetPassword: true,
        newJoin: true,
        phonecheck: true,
        nav1: true,
        nav2: true,
        milk1: true
    }
    if (map[hash[0]]) {
        app.view = hash[0]
    } else {
        app.view = home
    }
}
// 搞定路由实现页面跳转,显示哪个页面
window.addEventListener('hashchange', router)
// 页面加载没有触发hashchange事件，我们可以手动触发hashchange事件，或者监听load事件
window.addEventListener('load', router)

// 我的自定义过滤器，用于过滤数组
function filterBy(arr, search) {
    if(!search) return arr;
    var arry = [];
    arr.forEach(function(item,index) {
        // console.log(item,index);
        if(item && item.title && item.title.indexOf(search)>=0) {
            arry.push(item);
        }
    });
    console.log(arry);
    return arry;
}
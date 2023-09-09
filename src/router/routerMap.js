export default [
    {
        path : "/",
        name : "Layout",
        component : ()=>import("@/views/LayOut"),
        redirect : "/index",
        children : [
            {
                path : "/index",
                name : "Index",
                component : ()=>import("@/views/index/HomeIndex")
            },
            {
                path : "/data/custom",
                name : "data_custom",
                component : ()=>import("@/views/data/DataCustom"),
                meta : {
                    bread:{data:["数据分析","用户分析"],path:["/","/"]},
                }
            },
            {
                path : "/orders/shop",
                name : "shop",
                component : ()=>import("@/views/orders/ShopVue"),
                meta : {
                    bread : {data:["订单管理","商品订单"],path:["/","/"]},
                    keepAlive:true
                }
            },
            {
                path : "/blindbox/list",
                name : "blind_box_list",
                component : ()=>import("@/views/blindbox/BlindBoxList"),
                meta : {
                    bread : {data:["盲盒管理","盲盒列表"],path:["/","/"]}
                }
            },
            {
                path : "/depart/data",
                name : "depart_data",
                component : ()=>import("@/views/depart/DepartData"),
                meta : {
                    bread : {data:["派单管理","发车数据单"],path:["/","/"]}
                }
            },
            {
                path : "/user/list",
                name : "user_list",
                component : ()=>import("@/views/user/UserList"),
                meta : {
                    bread : {data:["订单管理","用户列表"],path:["/","/"]}
                }
            },
            {
                path : "/orders/details",
                name : "orders_detail",
                component : ()=>import("@/views/orders/OrderDetails"),
                meta : {
                    bread : {data:["订单管理","订单列表","订单详情"],path:["/","/"]}
                }
            }
        ]
    },
    {
        path : "/login",
        name : "Login",
        component : ()=>import("@/views/LoginVue")
    },
    {
        path : "/zy",
        name : "Zy",
        component : ()=>import("@/views/ZyWonderful")
    },
]
import Mock from "mockjs"
//Mock.mock("地址","请求方式","回调函数")
//回调函数有一个默认参数，参数是
//给mock加延迟
Mock.setup({
    timeout:500
})
//登录接口
Mock.mock("http://localhost:8080/login","post",(req)=>{
    const {username,password} = JSON.parse(req.body)
    if(username=="admin"&&password=="123456"){
        return {
            code : 200,//自定义的代码
            success : true,//确认返回是否成功
            message : "登陆成功",//返回的信息
            token : "d45sa64dsa54dsa51d2sa4da54SAS5DAd5ccsa54",
            nickname : "李云龙",
            role : "administration"
        }
    }else {
        return {
            code : 100,
            success : false,
            message : "登陆失败请检查用户名和密码是否输入正确"
        }
    }
})
//时间接口
Mock.mock("http://localhost:8080/setsail","get",()=>{
    return {
        code : 200,
        success : true,
        message : "获取成功",
        time : "2023-08-01 00:00:00"//这里只需要存一个时间
    }
})

//菜单接口
const menuList = [
    {
        name: "首页",
        icon: "el-icon-s-home",
        url: "/index",
    },
    {
        name : "数据分析",
        icon : "el-icon-pie-chart",
        url : "/data",
        children : [
            {
                name : "用户分析",
                icon : "el-icon-s-custom",
                url : "/data/custom"
            }
        ]
    },
    {
        name: "订单管理",
        icon: "el-icon-s-order",
        url: "/order",
        children: [
            {
                name: "商品订单",
                icon: "el-icon-user",
                url: "/orders/shop",
            },
            {
                name: "月老订单",
                icon : "el-icon-box",
                url : "/order/matmar"
            },
            {
                name: "俳优订单",
                icon : "el-icon-chat-line-round",
                url : "/order/worryfree"
            }
        ]
    },
    {
        name: "盲盒管理",
        icon: "el-icon-menu",
        url: "/blindbox",
        children: [
            {
                name: "盲盒列表",
                icon: "el-icon-notebook-2",
                url: "/blindbox/list",
            },
            {
                name: "盲盒分析",
                icon: "el-icon-truck",
                url: "/waybill/list",
            }
        ]
    },
    {
        name: "派发管理",
        icon: "el-icon-s-order",
        url: "/depart",
        children: [
            {
                name: "发车数据单",
                icon: "el-icon-tickets",
                url: "/depart/data",
            }
        ]
    },
    {
        name: "代理商管理",
        icon: "el-icon-user",
        url: "/carrier",
        children: [
            {
                name: "代理商列表",
                icon: "el-icon-chat-square",
                url: "/carrier/list",
            },
            {
                name: "加盟商列表",
                icon: "el-icon-bank-card",
                url: "/carrier/trucks",
            },
            {
                name: "合作商列表",
                icon: "el-icon-bank-card",
                url: "/carrier/list",
            },
        ]
    },
    {
        name: "用户管理",
        icon: "el-icon-chat-dot-square",
        url: "/user",
        children : [
            {
                name : "用户列表",
                icon : "el-icon-user",
                url : "/user/list"
            }
        ]
    },
    {
        name: "财务管理",
        icon: "el-icon-user",
        url: "/my",
        children: [
            {
                name: "客户对账单",
                icon: "el-icon-chat-square",
                url: "/customer/info",
            },
            {
                name: "承运商对账单",
                icon: "el-icon-bank-card",
                url: "/record",
            },
            {
                name: "承运司机列表",
                icon: "el-icon-bank-card",
                url: "/record",
            },
        ]
    },
    {
        name: "个人中心",
        icon: "el-icon-chat-dot-square",
        url: "/personal",
    },
]
Mock.mock("http://localhost:8080/menu","get",()=>{
    return{
        code : 200,
        success : true,
        message : "请求成功",
        data : menuList
    }
})
//全部用户在线分析接口
Mock.mock("http://localhost:8080/userchart","get",()=>{
    return{
        code : 200,
        success : true,
        message : "请求成功",
        data : {
            "23-01" : 30,
            "23-02" : 84,
            "23-03" : 56,
            "23-04" : 47,
            "23-05" : 84,
            "23-06" : 61,
            "23-07" : 90,
        
        }
    }
})

//分类用户在线分析接口
Mock.mock("http://localhost:8080/onlinechart","get",()=>{
    return{
        code : 200,
        success : true,
        message : "请求成功",
        data : {
            new : ["新用户在线", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1,55.66],
            old : ["老用户在线", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7,85.77],
            back : ["回归用户在线", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5,42.33],
        }
    }
})
//订单管理-商品订单/搜索订单
Mock.mock('http://localhost:8080/orders/commodity', 'post', (req) => {
     const { page, pageSize,status,searchSelect,searchContent,startTime,endTime } = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,status,searchSelect,searchContent,startTime,endTime)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 10000,//订单号
                'date': Mock.Random.date(),//下单时间
                'uid' :  Mock.Random.integer(10000,1000000),//用户ID
                'name|1': Mock.Random.cname(),//客户名称
                'commodity': ["日用品","纺织品","生鲜","建材","电器"],//商品名称
                'address' : Mock.Random.city(true),
                "tel|1":[18888888888,15577896554,15789654785,13698745269], //随机取一个电话
                'count': Mock.Random.integer(10, 200),//件数
                'unit' : ["个","包"],
                "money":Mock.Random.integer(5000,50000),//价格
                "status|1":[1,2,3,4,5,6,7],//状态
                "percent|1":[37,22,89,65,80,74,56], //随机返回一个数
                "from|1" : ["官方","合作方","代理商","客户"],
            }],
            "total": 47
        })
    }
})

//盲盒管理-盲盒列表/搜索盲盒
Mock.mock('http://localhost:8080/blindbox/list', 'post', (req) => {
     const { page, pageSize,status,searchSelect,searchContent,startTime,endTime  } = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,status,searchSelect,searchContent,startTime,endTime)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'id|+1': 10000,//盲盒编号
                'date': Mock.Random.date(),//下单时间
                'uid' :  Mock.Random.integer(10000,1000000),//用户ID
                'name|1': Mock.Random.cname(),//客户名称
                'sex|1': ["男","女"],//商品名称
                'personInfo|1' : ["海星黑龙江绥化人士，22年中进士","暮雪江西人士，21年中进士"],
                'content' : "我爱牛马",
                "boxSex|1" : [1,2],
                "tel|1":[18888888888,15577896554,15789654785,13698745269], //随机取一个电话
                "boxStatus|1":[1,2,3,4],//状态
                "classbox|1":[1,2], //随机返回一个数
                "from|1" : [1,2,3,4],
            }],
            "total": 47
        })
    }
})

//新建盲盒接口
Mock.mock("http://localhost:8080/addBlindBox","post",(res)=>{
    const {uid,name,sex,personInfo,content,tel,boxSex,status,classbox,from,boxStatus} = JSON.parse(res.body)
    console.log("新建盲盒参数",uid,name,sex,personInfo,content,tel,boxSex,status,classbox,from,boxStatus)
    return {
        code:200,
        success:true,
        message:"新建成功",
    }
})

//用户管理-用户列表
Mock.mock('http://localhost:8080/user/list', 'post', (req) => {
     const { page, pageSize,status,searchSelect,searchContent,startTime,endTime  } = JSON.parse(req.body);
     console.log("服务端接收到参数",page, pageSize,status,searchSelect,searchContent,startTime,endTime)
    return {
        code: 200,
        success: true,
        message: "成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [{
                'date': Mock.Random.date(),//下单时间
                'uid' :  Mock.Random.integer(10000,1000000),//用户ID
                'name|1': Mock.Random.cname(),//客户名称
                'sex|1': [1,2],//商品名称
                'personInfo|1' : ["海星黑龙江绥化人士，22年中进士","暮雪江西人士，21年中进士"],
                'achievement' : "牛马新秀",
                "pay" : Mock.Random.integer(0,1000000),
                "check" : Mock.Random.integer(0,1000000),
                "soul" : Mock.Random.integer(-8888888,1000000),
                "userClass|1" : [1,2,3],
                "vip|1":[1,2],//状态
                "vipTime|1" : ["无","1个月","一年"],
                "from|1" : [1,2,3,4],
            }],
            "total": 47
        })
    }
})

//处理订单接口
Mock.mock("http://localhost:8080/schedule","post",(res)=>{
    const {orderStatus,schedule} = JSON.parse(res.body)
    console.log("处理订单参数",orderStatus,schedule)
    return {
        code:200,
        success:true,
        message:"新建成功",
    }
})

//新建用户接口
Mock.mock("http://localhost:8080/addUser","post",(res)=>{
    const {uid,name,sex,personInfo,achievement,pay,check,soul,userClass,vip,vipTime,from} = JSON.parse(res.body)
    console.log("新建盲盒参数",uid,name,sex,personInfo,achievement,pay,check,soul,userClass,vip,vipTime,from)
    return {
        code:200,
        success:true,
        message:"新建成功",
    }
})

//根据token获取权限名字
Mock.mock("http://localhost:8080/getRole","get",()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        role:"administration"
    }
})
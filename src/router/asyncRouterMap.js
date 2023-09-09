export default [
    {
        path : "/attendance",
        name : "Attendance",
        meta : {
            auth : ["boss","administration"]
        }
    },
    {
        path : "/salary",
        name : "Salary",
        meta : {
            auth : ["boss","finance"]
        },
    },
    {
        path : "*",
        name : "NotFound",
        component : ()=>import("@/views/NotFound"),
        meta : {auth : ["boss","finance","user","administration"]}
    }
]
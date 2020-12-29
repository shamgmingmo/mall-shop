import {reqsecklist}  from "../../utils/http"
let state={
    list:[]
}
let mutations={
    changelist(state,arr){
        state.list=arr
    }
}
let getters={
    list(state){
        return state.list
    }
}
let actions={
    reqList(context){
        reqsecklist().then((res)=>{
            context.commit("changelist",res.data.list)
        })
    }
}
export default{
    state,
    mutations,
    getters,
    actions,
    namespaced:true,
}
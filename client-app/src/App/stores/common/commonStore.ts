import { RootStore } from "../rootStore";
import { observable, action, reaction } from "mobx";

export default class CommonStore{

rootStore:RootStore;
constructor(rootstore:RootStore){
this.rootStore=rootstore;
reaction(
    ()=>this.token,
        token=>{
    if(token){
        window.localStorage.setItem("jwt",token)

    }else{
        window.localStorage.removeItem('jwt')
    }

})
}

@observable token:string|null=window.localStorage.getItem("jwt");
@observable appLoaded=false;

@action setToken=(token:string|null)=>{
this.token=token;
}
@action setapploaded=()=>{

    this.appLoaded=true;
}

}
import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import { createContext } from "react";
import {configure} from "mobx"
import CommonStore from "./common/commonStore";
import { ModalStore } from "./modalstore";
configure({'enforceActions':'always'})
export class RootStore{

activityStore:ActivityStore;
userStore:UserStore;
commonStore:CommonStore;
modalstore:ModalStore;
constructor(){

    this.activityStore=new ActivityStore(this);
    this.userStore=new UserStore(this);
    this.commonStore=new CommonStore(this);
    this.modalstore=new ModalStore(this);
    
}


}
export const RouteStoreContext = createContext(new RootStore());
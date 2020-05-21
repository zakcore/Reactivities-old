import { observable, computed, action, runInAction } from "mobx";
import { Iuser, IuserFormValues } from "../models/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

class UserStore {
  rootStore: RootStore;
  constructor(rts: RootStore) {
    this.rootStore = rts;
  }

  @observable user: Iuser | null = null;
  @computed get isLoggedIn() {
    return !!this.user;
  }
  @action login = async (values: IuserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalstore.closeModal();
      history.push("/activities");

    } catch (error) {
      throw error;
    }
  };


  @action register = async (values: IuserFormValues) => {
    try {
      const user = await agent.User.register(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalstore.closeModal();
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };

  @action getuser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export default UserStore;

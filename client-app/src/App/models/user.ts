export interface Iuser{
username:string;
displayname:string;
token:string;
image?:string;

}
export interface IuserFormValues{

    email:string;
    password:string;
    displayname?:string;
    username?:string;
}
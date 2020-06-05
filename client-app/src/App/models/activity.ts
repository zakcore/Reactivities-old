export interface IActivity{

     id:string;
     title:string ;
     description:string ;
     category:string ;
     date:Date;
     city :string;
     venue:string ;
     ishost:boolean;
     isgoing:boolean;
     atendees:IAttendees[]
}
export interface IActivityFormValues extends Partial<IActivity>{

     time?:Date
}
export class ActivityFormValues implements IActivityFormValues{

     id?:string= "";
     title:string= "";
     description:string= "";
     category:string= "";
     date?:Date;
     time?:Date;
     city:string= "";
     venue:string= "";

     constructor(init?:IActivityFormValues){
               if(init && init.date){

                    init.time=init.date;
               }
               Object.assign(this,init);

     }
}






export interface IAttendees {

     userName:string;
     displayName:string;
     isHost:boolean;
     image:string

}
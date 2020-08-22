import { v4 as uuidv4 } from 'uuid';

export function getUserTempId(){
    
   let userTempId = localStorage.getItem("USERTEMPID_KEY")
   //  判断如果没有userTempId，就创建身份标识
   if(!userTempId){
    userTempId = uuidv4();
    localStorage.setItem('USERTEMPID_KEY',userTempId)
   }
   return userTempId
}
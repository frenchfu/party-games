//import 的項目 可以利用 as 改名
import {addAddV1 as doAddAdd, addAddV2 ,addOne ,helloWorld ,myIdCard, getMyIdCardFunction} from './utils.js';
import defaultExport from './defaultExport.js';


//匯出模組使用 export
export function doHelloWorld(){
    return helloWorld();
}


export const getMyIdCard = () => myIdCard;
//export const getMyIdCard = () => {return getMyIdCardFunction();};
//export const getMyIdCard = () => defaultExport.myIdCard;//預設匯出要使用 .


export const doShowResoult = ()=>{
    let result =  "輸出結果";
    //result = doAddAdd(3, 6); //1-2
    //result = addAddV2(5, 8);
    //result = addOne(8);
    //result =  JSON.stringify(tryMapEs6Case()); //1-4
    //result =  JSON.stringify(tryArrayEs6Case());//1-5
    
    //立即function
    /*
    result = (function(input){
        return input + " 經過立即function 加工";
      })(result); 
    */
    return result;
}


const targetMap = {
    one : "1",
    two : "2",
    three : "3",
    four : "4",
    five : "5",
    six : "6",
};
const targerArray = ["10","9","8","7","6","5","4","3","2","1"];


//示範 MAP 複製範例一
const tryMapEs6Case = () => {
    //case 完全複製
    let result = {...targetMap};//1-4-a
    //case 完全複製 並增加元素 b
    //result = {...targetMap, seven:"7",eight:"8"} 
    //case 賦值 c
    //let {one , two , three} =targetMap;
    //result = {three:three , two : two , one : one}
    //case LEFT CLONE 會把沒有賦值的剩餘資料組成一個新MAP d
    //let {four, five, six, ...others} = targetMap;
    //result = {six:four , five: five , four : six , others: others};
    return result;
}


const tryArrayEs6Case= () => {

    //case 完全複製 //1-5-a
    let result = [...targerArray];
    //case 完全複製 並增加元素 b
    //result = [...targerArray,"0","-1","-2","-3"];
    //case 賦值 c
    //let [one , two , three] =targerArray;
    //result = one;
    //result = [one , two , three];
    //result = [three , two , one];
    //case LEFT CLONE 會把沒有賦值的剩餘資料組成一個新 Array d
    //let [one , two , three , ...others] = targerArray;
    //result = others;
    return result;
}
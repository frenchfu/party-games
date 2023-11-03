//原始的function 宣告方法
export function getMyIdCardFunction() {
	let newIdCard = {...myIdCard ,name:"David.Fu from origin function define"};
	return newIdCard
}
//箭頭 FUNCTION 宣告範例 可以省略FUNCTION
export const addAddV1 = (a, b) => {
	let result = a + b;
	return result;
};
//箭頭如果要直接回傳可以不用捕括號 
export const addAddV2 = (a, b)=> a+b;
//箭頭如果參數只有一個 可以不用補括弧
export const addOne = num => num +1;


//HELLO-WORLD
export const helloWorld = ()=> {
	console.log("Hello-World TO CONSOLE");
	return "Hello-World FOR RETURN";
};

//變數也可以 EXPORT
export const myIdCard = {
	name : "David.Fu",
	age :18,
	job :"Programer"
}



const addAdd = (a, b)=> a+b;

const helloWorld = ()=> {
	console.log("Hello-World TO CONSOLE");
	return "Hello-World FOR RETURN";
};

const myIdCard = {
	name : "David.Fu FROM DEFAULT",
	age :19,
	job :"金秀賢"
}

//定義預設匯出
export default {
 addAdd,helloWorld,myIdCard
}
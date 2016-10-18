/**
 * Created by xiaoxiao on 16-10-18.
 */
//1.let所声明的变量只在所在的代码块中有效
"use strict";
// var arr = [];
// for(let i = 0;i<10;i++) {
//     arr[i] = function (){
//         console.log(i);
//     }
// }
// console.log(arr[6]());
//2.let沒有声明前置
//console.log(a);//a is not defined
//let a = 123;
//3.暂时性死区
// var temp = 123;
// if(true){
//     temp = "abc";
//     let temp;
// }
// if(true){
//     try {
//         tmp = "abc";
//         console.log(tmp);
//     }
//     catch (ex){
//         console.log(ex);
//     }
//     let tmp;
//     console.log(tmp);
//     tmp = 123;
//     console.log(tmp);
// }
//4.不允许在相同的作用域内重复声明一个变量
// function hello(){
//     let a = 123;
//     var a = 123;
// }
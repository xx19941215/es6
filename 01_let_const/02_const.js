/**
 * Created by xiaoxiao on 16-10-18.
 */
//1.const一旦声明变量，就必须立即初始化
 "use strict";
// const foo = 123;
//2.const的作用域与let命令相同：只在声明所在的块级作用域内有效。
// if(true) {
//     const XIAOXIAO = "Good";
// }
// console.log(XIAOXIAO);
//3.const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
//4.const声明的常量，也与let一样不可重复声明。
//5.对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变
// const a = [];
// a.push(1);
// console.log(a);
// a = [];//Assignment to constant variable.

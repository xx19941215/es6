/**
 * Created by xiaoxiao on 16-10-20.
 */
//1.Array Destructuring
"use strict";
//ES6允许按照一定的模式，从数组和对象中提取值，对变量进行解构赋值。
var [a, b, c] = [1, 2, 3];
let [foo, [[bar],baz]] = [1, [[2], 3]];
//foo 1

let [head, ...tail] = [1,2,3];
console.log(bar);

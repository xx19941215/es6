/**
 * Created by xiaoxiao on 16-10-18.
 */
//1.let所声明的变量只在所在的代码块中有效
"use strict";
var arr = [];
for(let i = 0;i<10;i++) {
    arr[i] = function (){
        console.log(i);
    }
}
console.log(arr[6]());
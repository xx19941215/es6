"use strict";

/**
 * Created by xiaoxiao on 16-10-18.
 */
//var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
//也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
console.log(global);
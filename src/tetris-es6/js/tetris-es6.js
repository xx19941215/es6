"use strict";
import {T, O, I, S, Z, L, J} from "./shape";
window.$ = HTMLElement.prototype.$ = (selector) => {
    return (this == undefined ? document : this).querySelectorAll(selector);
};

const RN = 20;//行数
const CN = 10;//列数
const CSIZE = 26;//格子的宽高都是26px
const OFFSET_X = 15;//左侧因为有边框，每个单元格加15px
const OFFSET_Y = 15; //上侧因为有边框，每个单元格加15px

const STATE_RUNNING = 1; //游戏正在运行
const STATE_GAMEOVER = 0; //游戏结束
const STATE_PAUSE = 2; //游戏暂停
//为游戏添加不停状态的图片
const IMG_GAMEOVER = "img/game-over.png";
const IMG_PAUSE = "img/pause.png";
//一行没消灭0 ，消灭1行10分。。。
const SCORE = [0, 10, 50, 80, 200];

class Tetris {
    constructor() {
        this.pg = $(".playground")[0]; //保存游戏主界面对象
        this.currShape = this.randomShape(); //专门保存正在移动的图像对象
        this.nextShape = this.randomShape(); //专门保存下一个图像对象
        this.interval = 500; //默认每一秒重绘一次（下落效果）
        this.timer = null;
        //保存所有停止的方块
        this.wall = [];
        //保存游戏状态
        this.state = 1; //游戏在运行
        this.score = 0; //当前总分
        this.lines = 0; //当前总行数
        //初始化游戏就调用一次
        this.paintShape();

        for (let i = 0; i < RN; this.wall[i++] = []);
        this.timer = setInterval(()=>this.paint(), this.interval);
        document.onkeydown = ()=> {
            let e = window.event || arguments[0];
            switch (e.keyCode) {
                case 37:
                    this.moveL();
                    break; //左
                case 39:
                    this.moveR();
                    break; //右
                case 40:
                    this.drop();
                    break; //下
                case 38:
                    this.rotateR();
                    break;
                case 90:
                    this.rotateL();
                    break;

                case 80:
                    this.pause();
                    break; //暂停
                case 81:
                    this.gameOver();
                    break; //结束游戏
                case 67:
                    this.myContinue();
                    break; //暂停后继续游戏
                case 83:
                    if (this.state == STATE_GAMEOVER) {
                        let tetris = new Tetris();
                    }
            }
        };
    }

    paint() {
        //每次所有格子再重绘
        this.pg.innerHTML = this.pg.innerHTML.replace(/<img(.*?)>/g, "");
        this.drop();
        this.paintShape();
        this.paintWall();
        this.paintNext();
        this.paintSore();
        this.paintState();
    }

    drop() {
        if (this.state == STATE_RUNNING) {
            //判断能否下落
            if (this.canDrop()) {
                this.currShape.drop();
            } else {
                //要是不能下落就将图形中的每个cell放入wall数组中
                this.landIntoWall();
                //消行
                var ln = this.deleteLines();
                //计分
                this.score += SCORE[ln];
                this.lines += ln;
                //如果游戏没有结束
                if (!this.isGameOver()) {
                    //将等待的下一个图形赋值给当前图像
                    this.currShape = this.nextShape;
                    //为next图像重新生成新图形
                    this.nextShape = this.randomShape();
                } else {
                    //游戏结束
                    clearInterval(this.timer);
                    this.timer = null;
                    this.state = STATE_GAMEOVER;
                    this.paintState();
                }
            }
        }
    }

    paintNext() {
        //遍历nextShape中cells数组中的每个cell对象
        for (var i = 0; i < 4; i++) {
            //先将当前cell的row+1，存在r中
            var r = (this.nextShape.cells[i].col + 11) * CSIZE + OFFSET_X;
            //先将当前cell的row+11，存在c中
            var c = (this.nextShape.cells[i].row + 1) * CSIZE + OFFSET_Y;
            //创建一个image对象
            var img = new Image();
            img.src = this.nextShape.cells[i].img;
            img.style.left = r + "px";
            img.style.top = c + "px";
            this.pg.appendChild(img);
        }
    }

    paintState() {
        var img = new Image();
        //要是当前游戏状态是GameOver
        switch (this.state) {
            case STATE_GAMEOVER:
                img.src = IMG_GAMEOVER;
                this.pg.appendChild(img);
                break;
            case STATE_PAUSE:
                img.src = this.IMG_PAUSE;
                this.pg.appendChild(img);
                break;
        }
    }

    paintSore() {
        $("span")[0].innerHTML = this.score;
        $("span")[1].innerHTML = this.lines;
    }

    canDrop() {
        //遍历currShape中的cells，只要发现任意一个cell的row==RN-1,就返回false
        var cells = this.currShape.cells;
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].row == RN - 1) {
                return false;
            }
            //在currShape中的cell，只要发现任意一个cell下面有wall中的cell,就返回false
            if (this.wall[cells[i].row + 1][cells[i].col]) {
                return false;
            }
        }

        return true;
    }

    landIntoWall() {
        //遍历当前图像中的每个cell
        //每遍历一个cell，就将cell放入wall中相同row col的位置
        var cells = this.currShape.cells;
        for (var i = 0; i < 4; i++) {
            this.wall[cells[i].row][cells[i].col] = cells[i];
        }
    }

    deleteLines() {
        //检查wall中每一行是否消除
        for (var n = 0, lines = 0; n < RN; n++) {
            //遍历每一行，定义变量lines存本次共删除的行数
            if (this.isFull(n)) {
                //当前行是满的就删除，lines++
                this.deleteL(n);
                lines++;
            }
        }
        return lines;
    }

    isFull(row) {
        //取出wall中第row行，存在line变量中，遍历每个cell。只要当前cell无效就返回false
        var line = this.wall[row];
        if (line.length == 0) {
            return false;
        }
        for (var i = 0; i < 10; i++) {
            if (!line[i]) {
                return false;
            }
        }

        //遍历结束，就返回true
        return true;
    }

    isGameOver() {
        //获取nextShape中所有的cell，存在cells.
        //遍历cells中每一个cell
        //取出wall和当前cell相同的row,col位置的格，只要碰到有效的
        var cells = this.nextShape.cells;
        for (var j = 0; j < 4; j++) {
            if (this.wall[cells[j].row][cells[j].col]) {
                return true;
            }
        }
        return false;
    }

    gameOver()
    {
        this.state = STATE_GAMEOVER;
        clearInterval(this.timer);
        this.timer = null;
        this.paintState();
    }
    paintWall() {
        //遍历二维数组wall中每个格子
        //如果当前数组有个格子，就添加到DOM中
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 10; j++) {
                if (this.wall[i][j]) {
                    var x = this.wall[i][j].col * CSIZE + OFFSET_X;
                    //计算当前cells的y坐标: row*CSIZE+OFFSET_Y
                    var y = this.wall[i][j].row * CSIZE + OFFSET_Y;
                    //创建一个image对象
                    var img = new Image();
                    img.src = this.wall[i][j].img;
                    img.style.left = x + "px";
                    img.style.top = y + "px";
                    this.pg.appendChild(img);
                }
            }

        }
    }

    randomShape() {
        switch (parseInt(Math.random() * 7)) {
            case 0:
                return new O();
            case 1:
                return new T();
            case 2:
                return new I();
            case 3:
                return new J();
            case 4:
                return new Z();
            case 5:
                return new L();
            case 6:
                return new S();
        }
    }

    paintShape() {
        //遍历currShape中cells数组中的每个cell对象
        for (var i = 0; i < 4; i++) {
            //计算当前cells的x坐标: col*CSIZE+OFFSET_X
            var x = this.currShape.cells[i].col * CSIZE + OFFSET_X;
            //计算当前cells的y坐标: row*CSIZE+OFFSET_Y
            var y = this.currShape.cells[i].row * CSIZE + OFFSET_Y;
            //创建一个image对象
            var img = new Image();
            img.src = this.currShape.cells[i].img;
            img.style.left = x + "px";
            img.style.top = y + "px";
            this.pg.appendChild(img);
        }

    }

    outOfBounds() {
        //只要当前shape任意一个单元格col<0或者>=10
        var cells = this.currShape.cells;
        for (var i = 0; i < 4; i++) {
            if (cells[i].col < 0 || cells[i].col >= 10) {
                return true;
            }
        }
    }

    hit() {
        var cells = this.currShape.cells;
        for (var i = 0; i < 4; i++) {
            if (this.wall[cells[i].row][cells[i].col]) {
                return true;
            }
        }
    }
    deleteL(row)
    {
        this.wall.splice(row, 1); //删除指定行
        this.wall.unshift([]); //开头压入一个新行
        //从row行开始，向上遍历每一行
        for (var i = row; i > 0; i--) {
            //从0开始遍历数组
            var arr = this.wall[i];
            for (var j = 0; j < arr.length; j++) {
                //要是当前格子有效
                if (arr[j]) {
                    //将当前格子的row++
                    this.wall[i][j].row++;
                }
            }
        }
    }
    moveR() {
        if (this.state == STATE_RUNNING) {
            //先移一下
            this.currShape.moveR();
            //看是否可以右移
            if (this.outOfBounds() || this.hit()) { //不通过
                this.currShape.moveL();
            }
        }
    }

    moveL() {
        if (this.state == STATE_RUNNING) {
            //先移一下
            this.currShape.moveL();
            //看是否可以左移
            if (this.outOfBounds() || this.hit()) { //不通过
                this.currShape.moveR();
            }
        }
    }

    rotateR()
    {
        if (this.state == STATE_RUNNING) {
            this.currShape.rotateR();
            if (this.outOfBounds() || this.hit()) {
                this.currShape.rotateL();
            }
        }
    }

    rotateL()
    {
        if (this.state == STATE_RUNNING) {
            this.currShape.rotateL();
            if (this.outOfBounds() || this.hit()) {
                this.currShape.rotateR();
            }
        }
    }

}

let tetris = new Tetris();
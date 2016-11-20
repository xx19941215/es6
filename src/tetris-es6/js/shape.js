class Cell {
	constructor(row, col, img) {
		this.row = row;
		this.col = col;
		this.img = img;
	}
	drop(){
		this.row++;
	}
	moveR(){
		this.col++;
	}
	moveL(){
		this.col--;
	}
}

class State{
	constructor(r0,c0,r1,c1,r2,c2,r3,c3){
		this.r0 = r0;
		this.c0 = c0;

		this.r1 = r1;
		this.c1 = c1;

		this.r2 = r2;
		this.c2 = c2;

		this.r3 = r3;
		this.c3 = c3;
	}
}
//所有图像的父类型Shape
class Shape {
	constructor(img,orgi){
		this.img = img;
		this.orgi = orgi;//参照格
		this.state = [];//保存每种图形不同状态的数组。
		this.statei=0;//默认所有的图像状态都是0
	}

	drop(){
		//遍历当前对象的cells中的每个cell对象
		//调用当前对象的drop方法
		for(var i=0;i<4;i++){
			this.cells[i].drop();
		}
	}

	moveL(){
		for(var i=0;i<4;i++){
			this.cells[i].moveL();
		}
	}

	moveR(){
		for(var i=0;i<4;i++){
			this.cells[i].moveR();
		}
	}

	rotateR(){
		if(this.constructor != O){
			this.statei++;
			//要是转到了最后一个就将状态置为0，下面是一个逻辑运算。会有逻辑短路
			this.statei >= this.state.length && (this.statei=0);
			//获得下一个状态对象
			var state = this.state[this.statei];
			var orgr = this.cells[this.orgi].row;
			var orgc = this.cells[this.orgi].col;
			//遍历图像中的每一个cell
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].row = orgr + state["r"+i];
				this.cells[i].col = orgc + state["c"+i];
			}

		}
	}

	rotateL(){
		if(this.constructor != O){
			this.statei--;
			this.statei < 0 && (this.statei = this.state.length-1);
			//获得下一个状态对象
			var state = this.states[this.statei];
			var orgr = this.calls[this.orgi].row;
			var orgc = this.cells[this.orgi].col;
			//遍历图像中的每一个cell
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].row = orgr + state["r"+i];
				this.cells[i].col = orgc + state["c"+i];
			}

		}
	}
}
class O extends Shape{
	constructor(img,orgi){
		super("img/O.png");
		this.cells = [new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,4,this.img),new Cell(1,5,this.img)];
	}
}

class T extends Shape{
	constructor(img,orgi){
		super("img/T.png",1);
		this.cells = [
			new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,4,this.img)
		];
		this.state[0] = new State(0,-1,0,0,0,1,1,0);
		this.state[1] = new State(0,-1,0,0,1,0,-1,0);
		this.state[2] = new State(0,1,0,0,0,-1,-1,0);
		this.state[3] = new State(1,0,0,0,-1,0,0,1);
	}
}
class I extends Shape{
	constructor(img,orgi){
		super("img/I.png",1);
		this.cells = [
			new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,4,this.img)
		];
		this.cells = [
			new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(0,6,this.img)
		];
		this.state[0] = new State(0,-1,0,0,0,1,0,2);
		this.state[1] = new State(-1,0,0,0,1,0,2,0);
	}
}
class S extends Shape{
	constructor(img,orgi){
		super("img/S.png",3);
		this.cells = [
			new Cell(0,4,this.img),new Cell(1,3,this.img),new Cell(1,4,this.img),new Cell(0,5,this.img)
		];
		this.state[0] = new State(-1,0,-1,1,0,-1,0,0);
		this.state[1] = new State(-1,0,0,1,1,1,0,0);
	}
}
class Z extends Shape{
	constructor(img,orgi){
		super("img/Z.png",2);
		this.cells = [
			new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(1,4,this.img),new Cell(1,5,this.img)
		];
		this.state[0] = new State(-1,-1,-1,0,0,0,0,1);
		this.state[1] = new State(-1,1,0,1,0,0,1,0);
	}
}
class L extends Shape{
	constructor(img,orgi){
		super("img/L.png",1);
		this.cells = [
			new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,3,this.img)
		];
		this.state[0] = new State(-1,0,0,0,1,0,1,1);
		this.state[1] = new State(0,-1,0,0,1,-1,0,1);
		this.state[3] = new State(1,0,0,0,-1,0,-1,-1);
		this.state[4] = new State(0,-1,0,0,0,1,-1,1);
	}
}

class J extends Shape{
	constructor(img,orgi){
		super("img/J.png",1);
		this.cells = [
			new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,5,this.img)
		];
		this.state[0] = new State(-1,0,0,0,1,0,1,-1);
		this.state[1] = new State(0,-1,0,0,0,1,-1,-1);
		this.state[3] = new State(-1,0,0,0,-1,0,-1,1);
		this.state[4] = new State(0,-1,0,0,0,1,1,1);
	}
}
function Cell(row,col,img){
	this.row = row;
	this.col = col;
	this.img = img;
	if(!Cell.prototype.drop){
		Cell.prototype.drop = function(){
			this.row++;
		}
	}
	//向右
	if(!Cell.prototype.moveR){
		Cell.prototype.moveR = function(){
			this.col++;
		}
	}
	//向左
	if(!Cell.prototype.moveL){
		Cell.prototype.moveL = function(){
			this.col--;
		}
	}
}

function State(r0,c0,r1,c1,r2,c2,r3,c3){
		//第0个cell相对于参照cell的下标偏移量
		this.r0 = r0;
		this.c0 = c0;

		this.r1 = r1;
		this.c1 = c1;

		this.r2 = r2;
		this.c2 = c2;

		this.r3 = r3;
		this.c3 = c3;

}

//所有图像的父类型Shape

function Shape(img,orgi){
	this.img = img;
	this.orgi = orgi;//参照格
	this.state = [];//保存每种图形不同状态的数组。
	this.statei=0;//默认所有的图像状态都是0
	if(!Shape.prototype.drop){
		Shape.prototype.drop = function(){
			//遍历当前对象的cells中的每个cell对象
			//调用当前对象的drop方法
			for(var i=0;i<4;i++){
				this.cells[i].drop();
			}
			
		}
	}
	if(!Shape.prototype.moveL){
		Shape.prototype.moveL = function(){
			//遍历当前对象的cells中的每个cell对象
			//调用当前对象的drop方法
			for(var i=0;i<4;i++){
				this.cells[i].moveL();
			}
			
		}
	}
	if(!Shape.prototype.moveR){
		Shape.prototype.moveR = function(){
			//遍历当前对象的cells中的每个cell对象
			//调用当前对象的drop方法
			for(var i=0;i<4;i++){
				this.cells[i].moveR();
			}
			
		}
	}
	if(!Shape.prototype.rotateR){
		Shape.prototype.rotateR=function(){
			//O的实例不需要旋转
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
	}
	if(!Shape.prototype.rotateL){
		Shape.prototype.rotateL=function(){
			//O的实例不需要旋转
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
}

function O(){
	//调用Shape构造函数
	Shape.call(this,"img/O.png");
	//实现继承Shape
	if(!Shape.prototype.isPrototypeOf(O.prototype)){
		Object.setPrototypeOf(O.prototype,Shape.prototype);
	}

	this.cells = [
		new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,4,this.img),new Cell(1,5,this.img)
	];

}
function T(){
	//调用Shape构造函数
	Shape.call(this,"img/T.png",1);
	//实现继承
	if(!Shape.prototype.isPrototypeOf(T.prototype)){
		Object.setPrototypeOf(T.prototype,Shape.prototype);
	}

	this.cells = [
		new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,4,this.img)
	];
	this.state[0] = new State(0,-1,0,0,0,1,1,0);
	this.state[1] = new State(0,-1,0,0,1,0,-1,0);
	this.state[2] = new State(0,1,0,0,0,-1,-1,0);
	this.state[3] = new State(1,0,0,0,-1,0,0,1);

}
function I(){
	//调用Shape构造函数
	Shape.call(this,"img/I.png",1);
	//实现继承
	if(!Shape.prototype.isPrototypeOf(I.prototype)){
		Object.setPrototypeOf(I.prototype,Shape.prototype);
	}

	this.cells = [
		new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(0,6,this.img)
	];
	this.state[0] = new State(0,-1,0,0,0,1,0,2);
	this.state[1] = new State(-1,0,0,0,1,0,2,0);

}
function S(){
	//调用Shape构造函数
	Shape.call(this,"img/S.png",3);
	//实现继承
	if(!Shape.prototype.isPrototypeOf(S.prototype)){
		Object.setPrototypeOf(S.prototype,Shape.prototype);
	}

	this.cells = [
		new Cell(0,4,this.img),new Cell(1,3,this.img),new Cell(1,4,this.img),new Cell(0,5,this.img)
	];
	this.state[0] = new State(-1,0,-1,1,0,-1,0,0);
	this.state[1] = new State(-1,0,0,1,1,1,0,0);

}
function Z(){
	//调用Shape构造函数
	Shape.call(this,"img/Z.png",2);
	//实现继承
	if(!Shape.prototype.isPrototypeOf(Z.prototype)){
		Object.setPrototypeOf(Z.prototype,Shape.prototype);
	}

	this.cells = [
		new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(1,4,this.img),new Cell(1,5,this.img)
	];
	this.state[0] = new State(-1,-1,-1,0,0,0,0,1);
	this.state[1] = new State(-1,1,0,1,0,0,1,0);

}
function L(){
	//调用Shape构造函数
	Shape.call(this,"img/L.png",1);
	//实现继承
	if(!Shape.prototype.isPrototypeOf(L.prototype)){
		Object.setPrototypeOf(L.prototype,Shape.prototype);
	}

	this.cells = [
		new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,3,this.img)
	];
	this.state[0] = new State(-1,0,0,0,1,0,1,1);
	this.state[1] = new State(0,-1,0,0,1,-1,0,1);
	this.state[3] = new State(1,0,0,0,-1,0,-1,-1);
	this.state[4] = new State(0,-1,0,0,0,1,-1,1);

}
function J(){
	//调用Shape构造函数
	Shape.call(this,"img/J.png",1);
	//实现继承
	if(!Shape.prototype.isPrototypeOf(J.prototype)){
		Object.setPrototypeOf(J.prototype,Shape.prototype);
	}

	this.cells = [
		new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),new Cell(1,5,this.img)
	];
	this.state[0] = new State(-1,0,0,0,1,0,1,-1);
	this.state[1] = new State(0,-1,0,0,0,1,-1,-1);
	this.state[3] = new State(-1,0,0,0,-1,0,-1,1);
	this.state[4] = new State(0,-1,0,0,0,1,1,1);

}
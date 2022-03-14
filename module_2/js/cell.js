class Cell{
	constructor(fieldElement){
		this.element = document.createElement('div');
		this.element.className = 'cell';
		if(Math.random() > 0.7){
			this.spawn();
		}
		fieldElement.appendChild(this.element); 
		//this.element.onclick = function(e){
		//	this.merge();
		//}.bind(this);
	}
	get value(){
		return this._value || 0;
	}
	set value(value ){
		this._value = value;
		this.element.innerHTML = value == 0? '' : value;
	}
	clear(){
		this.value = '';
	}
	merge(cell){
		if(this.value < 2048){
			this.value += cell.value;
			cell.clear();
		}
	}
	isSameTo(cell){
		return this.value == cell.value;
	}
	spawn(){
		this.value =  Math.random() > 0.8? 4 : 2;
	}
	get isEmpty(){
		return this.value == 0;
	}
}
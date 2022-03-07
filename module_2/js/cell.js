class Cell{
	constructor(fieldElement){
		this.element = document.createElement('div');
		this.element.className = 'cell';
		if(Math.random() > 0.8){
			this.value  = Math.random() > 0.5? 4 : 2;
		}
		fieldElement.appendChild(this.element); 
		this.element.onclick = function(e){
			this.merge();
		}.bind(this);
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
	merge(){
		this.value *= 2;
	}

}
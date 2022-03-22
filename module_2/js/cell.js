class Cell{
	constructor(fieldElement, game){
		this.game = game;
		this.fieldElement = fieldElement;
		this.element = document.createElement('div');
		this.element.className = 'cell';
		if(Math.random() > 0.7){
			this.spawn();
		}
		fieldElement.appendChild(this.element); 
	}
	get value(){
		return this._value || 0;
	}
	set value(value ){
		this._value = value;
		this.element.innerHTML = value == 0? '' : value;
		this.element.setAttribute('data-bg', value);
	}
	clear(){
		this.value = '';
	}
	merge(cell){
		if(this.value < 2048){
			if(this.value){
				this.game.addRating(this.value + cell.value);
			}
			new AnimateCell(cell, this);
			this.value += cell.value;
			cell.clear();
		}
		else{
			let modal = document.createElement('div');
			let closeBtn = document.createElement('div');
			let modalWindowText = document.createElement('span');

			modalWindowText.className = 'modal-window-text';
			closeBtn.className = 'close-btn';
			modal.className = 'modal-window';
			
			closeBtn.innerHTML = 'close';
			modalWindowText.innerHTML = 'You win!';

			modal.appendChild(closeBtn);
			modal.appendChild(modalWindowText);
			document.body.appendChild(modal);

			closeBtn.addEventListener('click', function(){
				new Game(document.body, 5);
			})
		}
	}
	isSameTo(cell){
		return this.value == cell.value;
	}
	spawn(){
		this.value =  Math.random() > 0.9? 4 : 2;
	}
	get isEmpty(){
		return this.value == 0;
	}
}


class AnimateCell{
	constructor(fromCell, toCell){
		this.element = document.createElement('div');
		this.element.className = "cell animate"; 
		this.element.setAttribute('data-bg', fromCell.element.getAttribute('data-bg'));

		this.element.style.top = toCell.element.offsetTop + 'px';
		this.element.style.left = toCell.element.offsetLeft + 'px';

		fromCell.fieldElement.appendChild(this.element);  

		setTimeout(function(){
			fromCell.fieldElement.removeChild(this.element);
		}.bind(this), 1000)
	}
}
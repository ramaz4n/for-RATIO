
class Game{
	constructor(parentElement,size=4){
		this.size = size;
		let gameFieldElement = document.createElement('div');
		gameFieldElement.className = 'game';
		parentElement.appendChild(gameFieldElement);

		let headerFieldWrapper = document.createElement('div');
		headerFieldWrapper.className = '';
		gameFieldElement.appendChild(headerFieldWrapper);

		this.headerElement = document.createElement('div');
		this.headerElement.className = 'header';
		headerFieldWrapper.appendChild(this.headerElement);

		this.headerTitle = document.createElement('p');
		this.headerTitle.className = 'header__title';
		this.headerElement.appendChild(this.headerTitle);

		this.rating = 0;
		

		let fieldElement = document.createElement('div');
		fieldElement.className = 'field';
		headerFieldWrapper.appendChild(fieldElement);

		this.field = [];

		for(let i=0; i < size; i++) {
			this.field[i] = [];
			for(let j=0; j < size; j++){
				this.field[i][j] = new Cell(fieldElement, this);
			}
		}
		window.addEventListener('keyup',function(e) { 
			switch(e.keyCode){
				case 38:
					this.moveUp();
					break;
				case 40:
					this.moveDown();
					break;
				case 37:
					this.moveLeft();
					break;
				case 39:
					this.moveRight();
					break;
			}
		}.bind(this));



		let wrapperForBtn = document.createElement('div');
		let rightBtn = document.createElement('div');
		let leftBtn = document.createElement('div');
		let topBtn = document.createElement('div');
		let downBtn = document.createElement('div');

		wrapperForBtn.className = 'wrapper-btn';
		rightBtn.className = 'control-btn right';
		leftBtn.className = 'control-btn left';
		topBtn.className = 'control-btn top';
		downBtn.className = 'control-btn down';

		rightBtn.innerHTML = '→';
		leftBtn.innerHTML = '←';
		topBtn.innerHTML = '↑';
		downBtn.innerHTML = '↓';

		wrapperForBtn.appendChild(rightBtn);
		wrapperForBtn.appendChild(leftBtn);
		wrapperForBtn.appendChild(topBtn);
		wrapperForBtn.appendChild(downBtn);
		gameFieldElement.appendChild(wrapperForBtn);

		rightBtn.addEventListener("click", function() {
			this.moveRight();
		}.bind(this))

		leftBtn.addEventListener("click", function() {
			this.moveLeft();
		}.bind(this))

		topBtn.addEventListener("click", function() {
			this.moveUp();
		}.bind(this))

		downBtn.addEventListener("click", function() {
			this.moveDown();
		}.bind(this))

	}

	set rating(value){
		this._rating = value;
		this.headerTitle.innerHTML = 'Score: ' + value;
	}
	get rating(){
		return this._rating;
	}

	addRating(value){
		this.rating += value;
	}

	spawnUnit(){
		let emptyCells = [];
		for(let i = 0; i < this.field.length; i++){
			for(let j = 0; j < this.field[i].length; j++){
				if(!this.field[i][j].value){
					emptyCells.push(this.field[i][j]);
				}
			}
		}
		if(emptyCells.length){
			emptyCells[getRandomInt(0, emptyCells.length - 1)].spawn();
		}else{
			alert('You lose!');
		}
	}



	isLastKey(key){
		return key == (this.size - 1);
	}

	isFirstKey(key){
		return key == 0;
	}



	moveLeft(){
		let hasMoved = false;
		for(let i = 0; i < this.size; i++){
			for(let j = 1; j < this.size; j++){
				let currentCell = this.field[i][j];
				if(currentCell.isEmpty){
					continue;
				}
				let nextCellKey = j - 1;
				while(nextCellKey >= 0){

					let nextCell = this.field[i][nextCellKey];

					if(!nextCell.isEmpty || this.isFirstKey(nextCellKey)){
						if((nextCell.isEmpty && this.isFirstKey(nextCellKey))
						|| nextCell.isSameTo(currentCell)){
							this.field[i][nextCellKey].merge(currentCell);
							hasMoved = true;
						} else if((!nextCell.isEmpty && nextCellKey + 1 != j)){
							this.field[i][nextCellKey + 1].merge(currentCell);
							hasMoved = true;
						}
						break;
					}
					nextCellKey--;
					nextCell = this.field[i][nextCellKey];
				}
			}
		}

		if(hasMoved){
			this.spawnUnit();
		}
	}



	moveRight(){
		let hasMoved = false;
		for(let i = 0; i < this.field.length; i++){
			for(let j = this.field[i].length - 2; j >= 0; j--){
				let currentCell = this.field[i][j];
				if(currentCell.isEmpty){
					continue;
				}
				let nextCellKey = j + 1;
				while(nextCellKey < this.size){

					let nextCell = this.field[i][nextCellKey];

					if(!nextCell.isEmpty || this.isLastKey(nextCellKey)){
						if((nextCell.isEmpty && this.isLastKey(nextCellKey))
						|| nextCell.isSameTo(currentCell)){
							this.field[i][nextCellKey].merge(currentCell);
							hasMoved = true;
						} else if((!nextCell.isEmpty && nextCellKey - 1 != j)){
							this.field[i][nextCellKey - 1].merge(currentCell);
							hasMoved = true;
						}
						break;
					}
					nextCellKey++;
					nextCell = this.field[i][nextCellKey];
				}
			}
		}

		if(hasMoved){
			this.spawnUnit();
		}
	}


	moveDown(){
		let hasMoved = false;
		for(let j = 0; j < this.size; j++){
			for(let i = this.size - 2; i >= 0; i--){
				let currentCell = this.field[i][j];
				if(currentCell.isEmpty){
					continue;
				}
				let nextCellKey = i + 1;
				while(nextCellKey < this.size){

					let nextCell = this.field[nextCellKey][j];

					if(!nextCell.isEmpty || this.isLastKey(nextCellKey)){
						if((nextCell.isEmpty && this.isLastKey(nextCellKey))
						|| nextCell.isSameTo(currentCell)){
							this.field[nextCellKey][j].merge(currentCell);
							hasMoved = true;
						} else if((!nextCell.isEmpty && nextCellKey - 1 != i)){
							this.field[nextCellKey - 1][j].merge(currentCell);
							hasMoved = true;
						}
						break;
					}
					nextCellKey++;
					nextCell = this.field[nextCellKey][j];
				}
			}
		}

		if(hasMoved){
			this.spawnUnit();
		}
	}
	



	moveUp(){
		let hasMoved = false;
		for(let j = 0; j < this.size; j++){
			for(let i = 1; i < this.size; i++){
				let currentCell = this.field[i][j];
				if(currentCell.isEmpty){
					continue;
				}
				let nextCellKey = i - 1;
				while(nextCellKey < this.size){

					let nextCell = this.field[nextCellKey][j];

					if(!nextCell.isEmpty || this.isFirstKey(nextCellKey)){
						if((nextCell.isEmpty && this.isFirstKey(nextCellKey))
						|| nextCell.isSameTo(currentCell)){
							this.field[nextCellKey][j].merge(currentCell);
							hasMoved = true;
						} else if((!nextCell.isEmpty && nextCellKey + 1 != i)){
							this.field[nextCellKey + 1][j].merge(currentCell);
							hasMoved = true;
						}
						break;
					}
					nextCellKey--;
					nextCell = this.field[nextCellKey][j];
				}
			}
		}

		if(hasMoved){
			this.spawnUnit();
		}
	}

	
}




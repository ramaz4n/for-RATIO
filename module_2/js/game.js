class Game{
	constructor(parentElement,size=4){
		let gameFieldElement = document.createElement('div');
		gameFieldElement.className = 'game';
		parentElement.appendChild(gameFieldElement);

		let headerElement = document.createElement('div');
		headerElement.className = 'header';
		gameFieldElement.appendChild(headerElement);

		let headerTitle = document.createElement('p');
		headerTitle.className = 'header__title';
		headerElement.appendChild(headerTitle);

		this.rating = 0;
		headerTitle.innerHTML = 'Score: ' + this.rating;

		let fieldElement = document.createElement('div');
		fieldElement.className = 'field';

		gameFieldElement.appendChild(fieldElement);
		for(let i=0; i < size; i++) {
			for(let j=0; j < size; j++){
				new Cell(fieldElement);
			}
		}
	}
}
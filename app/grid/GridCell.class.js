import { generateQueryConstructor } from '../utils/object.utils.js';

class GridCell {
	constructor() {
		generateQueryConstructor.call(this, ...arguments);
	}

	get position() {
		return `${this.row}-${this.col}`;
	}

	get gridcellElement() {
		return document.querySelector(`.gridcell[position="${this.position}"]`);
	}

	render() {
		this.#renderElement();
		this.#renderGridCell();
		this.#renderHtml();
		this.#renderOutInCells();
		this.#renderEvents();
	}
	#renderElement() {
		const {
			grid: { gridElement },
		} = this;

		const gridcellElement = document.createElement('div');

		gridcellElement.classList.add('gridcell');
		gridcellElement.setAttribute('position', this.position);

		gridElement.append(gridcellElement);
	}
	#renderGridCell() {}
	#renderHtml() {
		const {
			gridcellElement,
			grid: {
				settings: { cellSize, borderSize, borderColor },
			},
		} = this;

		Object.assign(gridcellElement.style, {
			height: `${cellSize}px`,
			width: `${cellSize}px`,

			border: `${borderSize}px solid ${borderColor}`,
		});
	}
	#renderOutInCells() {}
	#renderEvents() {}
}

export default GridCell;

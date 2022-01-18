import { generateQueryConstructor } from '../utils/object.utils.js';
import GridCell from './GridCell.class.js';

class Grid {
	constructor() {
		generateQueryConstructor.call(this, ...arguments);
	}

	get gridElement() {
		return document.querySelector(this.settings.gridSelector);
	}

	build() {
		this.#buildGridLayout();
		this.#buildGridCells();
		this.#buildGridSvg();
	}

	#buildGridLayout() {
		const { settings, gridElement } = this;
		const { cellSize, borderSize, borderColor } = settings;
		const { innerWidth, innerHeight } = window;

		const fullCellSize = cellSize + borderSize * 2;

		this.numCols = Math.floor(innerWidth / fullCellSize);
		this.numRows = Math.floor(innerHeight / fullCellSize);

		this.gridWidth = this.numCols * fullCellSize;
		this.gridHeight = this.numRows * fullCellSize;

		this.gridMarginX = (innerWidth - this.gridWidth - borderSize * 2) / 2;
		this.gridMarginY = (innerHeight - this.gridHeight - borderSize * 2) / 2;

		Object.assign(gridElement.style, {
			height: `${this.gridHeight}px`,
			width: `${this.gridWidth}px`,

			marginLeft: `${this.gridMarginX}px`,
			marginTop: `${this.gridMarginY}px`,

			border: `${borderSize}px solid ${borderColor}`,
		});
	}

	#buildGridCells() {
		const { numCols, numRows } = this;
		this.gridcells = {};

		for (let row = 0; row < numRows; row++) {
			for (let col = 0; col < numCols; col++) {
				const gridcell = new GridCell({ grid: this, row, col });
				gridcell.render();
				this.gridcells[gridcell.position] = gridcell;
			}
		}
	}

	#buildGridSvg() {}

	draw() {}
}

export default Grid;

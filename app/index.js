let GRID = [];
let main = document.querySelector("#main");
function Cell(x, y) {
	this.x = x;
	this.y = y;
	this.active = 0;
	this.DOMElement = document.createElement("div");
}
let rules = [
	// First three are rules.
	// final item is current cell
	//1 is active, 0 is inactive
	[1, 1, 1, 0],
	[1, 1, 0, 0],
	[1, 0, 1, 1],
	[1, 0, 0, 1],
	[0, 1, 1, 1],
	[0, 1, 0, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 1]
];
function populateGrid(grid) {
	for (var i = 0; i < 100; i++) {
		GRID[i] = new Array(100);

		for (var j = 0; j < GRID[i].length; j++) {
			GRID[i][j] = new Cell(j, i);
			let cell = GRID[i][j].DOMElement;
			main.appendChild(cell);
			cell.classList.add("cell");
		}
	}
}

function isActive(el) {
	if (el.classList.contains("active")) {
		return 1;
	} else {
		return 0;
	}
}

function toggleActive(n, el) {
	if (n == 1) {
		el.classList.add("active");
	} else {
		el.classList.remove("active");
	}
}

function processGrid() {
	for (var i = 1; i < 100; i++) {
		for (var j = 0; j < GRID[i].length; j++) {
			let prevSelf = GRID[i - 1][j];
			let prevLeft =
				GRID[i - 1][j - 1] || GRID[i - 1][GRID[i].length - 1];
			let prevRight = GRID[i - 1][j + 1] || GRID[i - 1][0];
			// debugger;
			checkRules(
				rules,
				prevLeft.DOMElement,
				prevSelf.DOMElement,
				prevRight.DOMElement,
				GRID[i][j].DOMElement
			);
		}
	}
}

function checkRules(rulesArray, pLeft, pSelf, pRight, current) {
	rules.forEach(function(rule) {
		if (
			rule[0] == isActive(pLeft) &&
			rule[1] == isActive(pSelf) &&
			rule[2] == isActive(pRight)
		) {
			toggleActive(rule[3], current);
		}
	});
}
populateGrid(GRID);
GRID[0][49].DOMElement.classList.add("active");

processGrid();
console.log(GRID);

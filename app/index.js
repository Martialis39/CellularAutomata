let GRID = [];
let main = document.querySelector("#main");
let ruleName = document.querySelector("#ruleNumber");
function Cell(x, y) {
	this.x = x;
	this.y = y;
	this.DOMElement = document.createElement("div");
}

function randomNumber(upper_limit) {
	return (num = Math.floor(Math.random() * upper_limit) + 0);
}

const automata = [
	// First three ints in rules arrays are rules.
	// Final item in each array is what current cell should be set to
	//1 is active, 0 is inactive

	{
		name: "Rule 57",
		rules: [
			[1, 1, 1, 0],
			[1, 1, 0, 0],
			[1, 0, 1, 1],
			[1, 0, 0, 1],
			[0, 1, 1, 1],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		]
	},
	{
		name: "Rule 225",
		rules: [
			[1, 1, 1, 1],
			[1, 1, 0, 1],
			[1, 0, 1, 1],
			[1, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		]
	},
	{
		name: "Rule 86",
		rules: [
			[1, 1, 1, 0],
			[1, 1, 0, 1],
			[1, 0, 1, 0],
			[1, 0, 0, 1],
			[0, 1, 1, 0],
			[0, 1, 0, 1],
			[0, 0, 1, 1],
			[0, 0, 0, 0]
		]
	},
	{
		name: "Rule 129",
		rules: [
			[1, 1, 1, 1],
			[1, 1, 0, 0],
			[1, 0, 1, 0],
			[1, 0, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		]
	},
	{
		name: "Rule 62",
		rules: [
			[1, 1, 1, 0],
			[1, 1, 0, 0],
			[1, 0, 1, 1],
			[1, 0, 0, 1],
			[0, 1, 1, 1],
			[0, 1, 0, 1],
			[0, 0, 1, 1],
			[0, 0, 0, 0]
		]
	},
	{
		name: "Rule 94",
		rules: [
			[1, 1, 1, 0],
			[1, 1, 0, 1],
			[1, 0, 1, 0],
			[1, 0, 0, 1],
			[0, 1, 1, 1],
			[0, 1, 0, 1],
			[0, 0, 1, 1],
			[0, 0, 0, 0]
		]
	}
];
let randNum = randomNumber(automata.length);
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
				automata[randNum].rules,
				prevLeft.DOMElement,
				prevSelf.DOMElement,
				prevRight.DOMElement,
				GRID[i][j].DOMElement
			);
		}
	}
}

function checkRules(rulesArray, pLeft, pSelf, pRight, current) {
	rulesArray.forEach(function(rule) {
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
let randomStart = randomNumber(GRID[0].length - 1);
GRID[0][randomStart].DOMElement.classList.add("active");

processGrid();
ruleName.textContent = automata[randNum].name;

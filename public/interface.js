// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('darkMode');

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
	document.body.classList.add('darkmode');
	localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
	document.body.classList.remove('darkmode');
	localStorage.setItem('darkMode', null);
}

if (darkMode === 'enabled') {
	enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
	darkMode = localStorage.getItem('darkMode');

	if (darkMode !== 'enabled') {
		enableDarkMode();
	} else {
		disableDarkMode();
	}
});

/// GENERATE RANDOM MEAL
const get_meal_btn = document.getElementById('get_meal');
const random_meal_container = document.getElementById('meal-random');
get_meal_btn.addEventListener('click', () => {
	meal_container.innerHTML = '';
	random_meal_container.innerHTML = ''
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
			generateRandomMeal(res.meals[0]);
		});
});

const generateRandomMeal = (meal) => {
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	}

	const newInnerHTML = `
		<div class="row-random">
			<h5>${meal.strMeal}</h5>
				<img src="${meal.strMealThumb}" alt="Meal Image" id="thumbnail">
				<div class='random-container'>
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h4>Recipe: </h4>
				<ul class='random-meal-ul'>
				${ingredients.map(ingredient => `<li class='random-meal-li'> - ${ingredient}</li>`).join('')}
				</ul>
				</div>
				<h4>Instruction: </h4>
				<p id='random-meal-inst'>${meal.strInstructions}</p>

				<h4>Video Recipe:</h4>

				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" id='video'>
				</iframe>

			
				${meal.strYoutube ? `
			
				` : ''}
				`;

	const bookmarkHTML = `
				<form action="/users/bookmarks/${meal.idMeal}" id="bookmarks" method="post">
					<button id="bookmark-random">Bookmark</button>
				</form>
				</div>
				<hr>`

	random_meal_container.innerHTML = newInnerHTML + bookmarkHTML;
}

// FILTER RECIPES BY MAIN INGREDIENT
const meal_container = document.getElementById('meal');
const searchForm = document.querySelector('.search_form');
let searchQuery = '';

searchForm.addEventListener('submit', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	searchQuery = event.target.querySelector('input').value;
	fetchAPI(searchQuery);

});

async function fetchAPI() {
	const baseURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`
	const response = await fetch(baseURL);
	const data = await response.json();
	const detailedData = data.meals;

	detailedData.map(async meal => {
		const mealId = meal.idMeal;
		const nextURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
		const secondaryResponse = await fetch(nextURL);
		const moreData = await secondaryResponse.json();
		const moreDetailedData = await moreData.meals;
		generateHTML(moreDetailedData);
	});
}

function ShowRecipe(event) {
	console.log(event.target.id)
	var Recipe = document.getElementById("showRecipe-" + event.target.id),
		displayValue = "";
	if (Recipe.style.display == "")
		displayValue = "none";

	Recipe.style.display = displayValue
}

function changeRecipeButton(event) {
	var elem = event.target
	if (elem.innerText == "Hide Recipe") elem.innerText = "Show Recipe";
	else elem.innerText = "Hide Recipe";
}


function generateHTML(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	}

	result.map(result => {
		newHTML +=
			`<div class="ingredient_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class='show-recipe-btn'>Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
				</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});


	meal_container.innerHTML += newHTML;

};

// FILTER RECIPES BY POPULAR CUISINE

const italian_btn = document.getElementById('italian')
const chinese_btn = document.getElementById('chinese')
const french_btn = document.getElementById('french')
const japanese_btn = document.getElementById('japanese')
const mexican_btn = document.getElementById('mexican')
const thai_btn = document.getElementById('thai')
const see_more_btn = document.getElementById('see_more')
const american_btn = document.getElementById('american')
const greek_btn = document.getElementById('greek')
const moroccan_btn = document.getElementById('moroccan')
const vietnamese_btn = document.getElementById('vietnamese')

// Italian Cuisine

italian_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForItalian();
})

async function fetchAPIForItalian() {
	const URLItalian = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian`;
	const responseItalian = await fetch(URLItalian);
	const dataForItalian = await responseItalian.json();
	detailedDataForItalian = dataForItalian.meals
	console.log(dataForItalian)

	detailedDataForItalian.map(async meal => {
		const italianMealId = meal.idMeal;
		const nextURLItalian = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${italianMealId}`;
		const responseForItalian = await fetch(nextURLItalian);
		const moredataForItalian = await responseForItalian.json();
		const moredetailedDataForItalian = await moredataForItalian.meals;
		generateHTMLforItalian(moredetailedDataForItalian);
	});
}

function generateHTMLforItalian(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class='show-recipe-btn'>Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
				</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};
// Chinese Cuisine

chinese_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForChinese();
})

async function fetchAPIForChinese() {
	const URLChinese = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese`;
	const responseChinese = await fetch(URLChinese);
	const dataForChinese = await responseChinese.json();
	detailedDataForChinese = dataForChinese.meals

	detailedDataForChinese.map(async meal => {
		const chineseMealId = meal.idMeal;
		const nextURLChinese = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${chineseMealId}`;
		const responseForChinese = await fetch(nextURLChinese);
		const moredataForChinese = await responseForChinese.json();
		const moredetailedDataForChinese = await moredataForChinese.meals;
		generateHTMLforChinese(moredetailedDataForChinese);
	});
}

function generateHTMLforChinese(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
				</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// French Cuisine

french_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForFrench();
})

async function fetchAPIForFrench() {
	const URLFrench = `https://www.themealdb.com/api/json/v1/1/filter.php?a=French`;
	const responseFrench = await fetch(URLFrench);
	const dataForFrench = await responseFrench.json();
	detailedDataForFrench = dataForFrench.meals

	detailedDataForFrench.map(async meal => {
		const frenchMealId = meal.idMeal;
		const nextURLFrench = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${frenchMealId}`;
		const responseForFrench = await fetch(nextURLFrench);
		const moredataForFrench = await responseForFrench.json();
		const moredetailedDataForFrench = await moredataForFrench.meals;
		generateHTMLforFrench(moredetailedDataForFrench);
	});
}

function generateHTMLforFrench(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
				</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};
// Japanese Cuisine

japanese_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForJapanese();
})

async function fetchAPIForJapanese() {
	const URLJapanese = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese`;
	const responseJapanese = await fetch(URLJapanese);
	const dataForJapanese = await responseJapanese.json();
	detailedDataForJapanese = dataForJapanese.meals

	detailedDataForJapanese.map(async meal => {
		const japaneseMealId = meal.idMeal;
		const nextURLJapanese = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${japaneseMealId}`;
		const responseForJapanese = await fetch(nextURLJapanese);
		const moredataForJapanese = await responseForJapanese.json();
		const moredetailedDataForJapanese = await moredataForJapanese.meals;
		generateHTMLforJapanese(moredetailedDataForJapanese);
	});
}

function generateHTMLforJapanese(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
			</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// Mexican Cuisine

mexican_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForMexican();
})

async function fetchAPIForMexican() {
	const URLMexican = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican`;
	const responseMexican = await fetch(URLMexican);
	const dataForMexican = await responseMexican.json();
	detailedDataForMexican = dataForMexican.meals

	detailedDataForMexican.map(async meal => {
		const mexicanMealId = meal.idMeal;
		const nextURLMexican = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mexicanMealId}`;
		const responseForMexican = await fetch(nextURLMexican);
		const moredataForMexican = await responseForMexican.json();
		const moredetailedDataForMexican = await moredataForMexican.meals;
		generateHTMLforMexican(moredetailedDataForMexican);
	});
}

function generateHTMLforMexican(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
			</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// Thai Cuisine

thai_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForThai();
})

async function fetchAPIForThai() {
	const URLThai = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Thai`;
	const responseThai = await fetch(URLThai);
	const dataForThai = await responseThai.json();
	detailedDataForThai = dataForThai.meals

	detailedDataForThai.map(async meal => {
		const thaiMealId = meal.idMeal;
		const nextURLThai = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${thaiMealId}`;
		const responseForThai = await fetch(nextURLThai);
		const moredataForThai = await responseForThai.json();
		const moredetailedDataForThai = await moredataForThai.meals;
		generateHTMLforThai(moredetailedDataForThai);
	});
}

function generateHTMLforThai(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
			</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

///SEE MORE: 
// American Cuisine

american_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForAmerican();
})

async function fetchAPIForAmerican() {
	const URLAmerican = `https://www.themealdb.com/api/json/v1/1/filter.php?a=American`;
	const responseAmerican = await fetch(URLAmerican);
	const dataForAmerican = await responseAmerican.json();
	detailedDataForAmerican = dataForAmerican.meals

	detailedDataForAmerican.map(async meal => {
		const americanMealId = meal.idMeal;
		const nextURLAmerican = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${americanMealId}`;
		const responseForAmerican = await fetch(nextURLAmerican);
		const moredataForAmerican = await responseForAmerican.json();
		const moredetailedDataForAmerican = await moredataForAmerican.meals;
		generateHTMLforAmerican(moredetailedDataForAmerican);
	});
}

function generateHTMLforAmerican(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
			</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};
// Greek Cuisine

greek_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForGreek();
})

async function fetchAPIForGreek() {
	const URLGreek = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Greek`;
	const responseGreek = await fetch(URLGreek);
	const dataForGreek = await responseGreek.json();
	detailedDataForGreek = dataForGreek.meals

	detailedDataForGreek.map(async meal => {
		const greekMealId = meal.idMeal;
		const nextURLGreek = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${greekMealId}`;
		const responseForGreek = await fetch(nextURLGreek);
		const moredataForGreek = await responseForGreek.json();
		const moredetailedDataForGreek = await moredataForGreek.meals;
		generateHTMLforGreek(moredetailedDataForGreek);
	});
}

function generateHTMLforGreek(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
			</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};
// Moroccan Cuisine

moroccan_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForMoroccan();
})

async function fetchAPIForMoroccan() {
	const URLMoroccan = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Moroccan`;
	const responseMoroccan = await fetch(URLMoroccan);
	const dataForMoroccan = await responseMoroccan.json();
	detailedDataForMoroccan = dataForMoroccan.meals

	detailedDataForMoroccan.map(async meal => {
		const moroccanMealId = meal.idMeal;
		const nextURLMoroccan = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${moroccanMealId}`;
		const responseForMoroccan = await fetch(nextURLMoroccan);
		const moredataForMoroccan = await responseForMoroccan.json();
		const moredetailedDataForMoroccan = await moredataForMoroccan.meals;
		generateHTMLforMoroccan(moredetailedDataForMoroccan);
	});
}

function generateHTMLforMoroccan(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
			</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// Vietnamese Cuisine

vietnamese_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForVietnamese();
})

async function fetchAPIForVietnamese() {
	const URLVietnamese = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Vietnamese`;
	const responseVietnamese = await fetch(URLVietnamese);
	const dataForVietnamese = await responseVietnamese.json();
	detailedDataForVietnamese = dataForVietnamese.meals

	detailedDataForVietnamese.map(async meal => {
		const vietnameseMealId = meal.idMeal;
		const nextURLVietnamese = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${vietnameseMealId}`;
		const responseForVietnamese = await fetch(nextURLVietnamese);
		const moredataForVietnamese = await responseForVietnamese.json();
		const moredetailedDataForVietnamese = await moredataForVietnamese.meals;
		generateHTMLforVietnamese(moredetailedDataForVietnamese);
	});
}

function generateHTMLforVietnamese(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="popular_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
			</form>
      <p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// Breakfast category

const breakfast_btn = document.getElementById('breakfast')
breakfast_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForBreakfast();
})

async function fetchAPIForBreakfast() {
	const URLBreaskfast = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast`;
	const responseBreakfast = await fetch(URLBreaskfast);
	const dataForBreakfast = await responseBreakfast.json();
	detailedDataForBreakfast = dataForBreakfast.meals
	detailedDataForBreakfast.map(async meal => {
		const breakfastMealId = meal.idMeal;
		const nextURLBreakfast = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${breakfastMealId}`;
		const responseForBreakfast = await fetch(nextURLBreakfast);
		const moredataForBreakfast = await responseForBreakfast.json();
		const moredetailedDataForBreakfast = await moredataForBreakfast.meals;
		generateHTMLforBreakfast(moredetailedDataForBreakfast);
	});
}

function generateHTMLforBreakfast(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="category_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
			</form>
      <p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// Dessert category

const dessert_btn = document.getElementById('dessert')
dessert_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForDessert();
})

async function fetchAPIForDessert() {
	const URLDessert = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`;
	const responseDessert = await fetch(URLDessert);
	const dataForDessert = await responseDessert.json();
	detailedDataForDessert = dataForDessert.meals
	detailedDataForDessert.map(async meal => {
		const dessertMealId = meal.idMeal;
		const nextURLDessert = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dessertMealId}`;
		const responseForDessert = await fetch(nextURLDessert);
		const moredataForDessert = await responseForDessert.json();
		const moredetailedDataForDessert = await moredataForDessert.meals;
		generateHTMLforDessert(moredetailedDataForDessert);
	});
}

function generateHTMLforDessert(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="category_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
				</form>
				<p id='ingredients-main'>Ingredients:</p>
				<ul id='ol-main'>
				${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
				<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// Starter category

const starter_btn = document.getElementById('starter')
starter_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForStarter();
})

async function fetchAPIForStarter() {
	const URLStarter = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter`;
	const responseStarter = await fetch(URLStarter);
	const dataForStarter = await responseStarter.json();
	detailedDataForStarter = dataForStarter.meals
	detailedDataForStarter.map(async meal => {
		const starterMealId = meal.idMeal;
		const nextURLStarter = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${starterMealId}`;
		const responseForStarter = await fetch(nextURLStarter);
		const moredataForStarter = await responseForStarter.json();
		const moredetailedDataForStarter = await moredataForStarter.meals;
		generateHTMLforStarter(moredetailedDataForStarter);
	});
}

function generateHTMLforStarter(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="category_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
				</form>
      <p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// Side category

const side_btn = document.getElementById('side')
side_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForSide();
})

async function fetchAPIForSide() {
	const URLSide = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Side`;
	const responseSide = await fetch(URLSide);
	const dataForSide = await responseSide.json();
	detailedDataForSide = dataForSide.meals
	detailedDataForSide.map(async meal => {
		const sideMealId = meal.idMeal;
		const nextURLSide = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${sideMealId}`;
		const responseForSide = await fetch(nextURLSide);
		const moredataForSide = await responseForSide.json();
		const moredetailedDataForSide = await moredataForSide.meals;
		generateHTMLforSide(moredetailedDataForSide);
	});
}

function generateHTMLforSide(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="category_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
				</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// Vegan category

const vegan_btn = document.getElementById('vegan')
vegan_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForVegan();
})

async function fetchAPIForVegan() {
	const URLVegan = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan`;
	const responseVegan = await fetch(URLVegan);
	const dataForVegan = await responseVegan.json();
	detailedDataForVegan = dataForVegan.meals
	detailedDataForVegan.map(async meal => {
		const veganMealId = meal.idMeal;
		const nextURLVegan = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${veganMealId}`;
		const responseForVegan = await fetch(nextURLVegan);
		const moredataForVegan = await responseForVegan.json();
		const moredetailedDataForVegan = await moredataForVegan.meals;
		generateHTMLforVegan(moredetailedDataForVegan);
	});
}

function generateHTMLforVegan(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="category_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
				</form>
				<p id='ingredients-main'>Ingredients:</p>
				<ul id='ol-main'>
				${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
				<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

// Vegetarian category

const vegetarian_btn = document.getElementById('vegetarian')
vegetarian_btn.addEventListener('click', (event) => {
	random_meal_container.innerHTML = ''
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForVegetarian();
})

async function fetchAPIForVegetarian() {
	const URLVegetarian = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`;
	const responseVegetarian = await fetch(URLVegetarian);
	const dataForVegetarian = await responseVegetarian.json();
	detailedDataForVegetarian = dataForVegetarian.meals
	detailedDataForVegetarian.map(async meal => {
		const vegetarianMealId = meal.idMeal;
		const nextURLVegetarian = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${vegetarianMealId}`;
		const responseForVegetarian = await fetch(nextURLVegetarian);
		const moredataForVegetarian = await responseForVegetarian.json();
		const moredetailedDataForVegetarian = await moredataForVegetarian.meals;
		generateHTMLforVegetarian(moredetailedDataForVegetarian);
	});
}

function generateHTMLforVegetarian(result) {
	let newHTML = '';
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for (let i = 1; i <= 20; i++) {
		if (result[0][`strIngredient${i}`]) {
			ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	};

	result.map(result => {
		newHTML +=
			`<div class="category_container">
			<div class="result">
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" text="${result.strMeal}">
			<button onclick="ShowRecipe(event); changeRecipeButton(event);" id="${result.idMeal}" value="Show Recipe" class="srbutton">Show Recipe</button>
      <div id="showRecipe-${result.idMeal}" style="display:none">
			<form action="/users/bookmarks/${result.idMeal}" id="bookmarks" method="post">
				<button class="bookmark-button"><i class="fa-solid fa-bookmark"> Bookmark</i>
				</button>
				</form>
			<p id='ingredients-main'>Ingredients:</p>
			<ul id='ol-main'>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p id='p-meal-inst'>${result.strInstructions}</p>
      </div>
			</div>
			</div> `
	});
	meal_container.innerHTML += newHTML;
};

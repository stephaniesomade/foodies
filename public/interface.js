/// GENERATE RANDOM MEAL
const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');
get_meal_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
		generateRandomMeal(res.meals[0]);
	});
});

const generateRandomMeal = (meal) => {
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	}
	
	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h5>Ingredients:</h5>
				<ul>
				${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
				</div>
				<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
				</div>
				</div>
				${meal.strYoutube ? `
				<div class="row">
				<h5>Video Recipe</h5>
				<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
				</div>
				</div>` : ''}
				`;

	const bookmarkHTML = `
				<form action="/users/bookmarks/${meal.idMeal}" id="bookmarks" method="post">
					<button id="">Bookmark</button>
				</form>`

	meal_container.innerHTML = newInnerHTML + bookmarkHTML;
}

// FILTER RECIPES BY MAIN INGREDIENT

const searchForm = document.querySelector('.search_form');
let serchQuery = '';

searchForm.addEventListener('submit', (event) => {
	meal_container.innerHTML = '';
	event.preventDefault();
	searchQeury = event.target.querySelector('input').value;
	fetchAPI(searchQeury);

});

async function fetchAPI() {
 const baseURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQeury}`
 const response = await fetch(baseURL);
 const data = await response.json();
 const detailedData = data.meals; 

	detailedData.map(async meal => {
	const mealId = meal.idMeal;
	const nextURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
	const secondaryResponse = await fetch(nextURL);
	const moreData = await secondaryResponse.json();
	const moreDetailedData = await moreData.meals;
	//createMeal(moreDetailedData);
	generateHTML(moreDetailedData);
	});
}

function ShowRecipe() {
	var Recipe = document.getElementById("showRecipe"),
		displayValue = "";
	if (Recipe.style.display == "")
		displayValue = "none";

	Recipe.style.display = displayValue
}

function generateHTML(result) {
	let newHTML = '';
	const ingredients = [];
		// Get all ingredients from the object. Up to 20
		for(let i=1; i<=20; i++) {
			if(result[0][`strIngredient${i}`]) {
				ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
			} else {
				// Stop if no more ingredients
				break;
			}
		}

	result.map(result  => {
		newHTML +=
		`<div class="row">
			<div class="columns five">
			<br>
			<br>
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

			<button onclick="ShowRecipe()"> Show me the Recipe</button>

      <div id="showRecipe" style="display:none">

      ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
			${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
			${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
			<h5>Ingredients:</h5>
			<ul>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p>${result.strInstructions}</p>

      </div>
			
			</div>
			</div>`
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

 // Italian Cuisine

 italian_btn.addEventListener('click', (event) => {
	 meal_container.innerHTML = '';
	 event.preventDefault();
	 fetchAPIForItalian();
 })

 async function fetchAPIForItalian() {
	 const URLItalian = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian`;
	 const responseItalian = await fetch(URLItalian);
	 const dataForItalian = await responseItalian.json();
	 detailedDataForItalian = dataForItalian.meals

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
		for(let i=1; i<=20; i++) {
			if(result[0][`strIngredient${i}`]) {
				ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
			} else {
				// Stop if no more ingredients
				break;
			}
		};

	result.map(result  => {
		newHTML +=
		`<div class="row">
			<div class="columns five">
			<br>
			<br>
			<h3>${result.strMeal}</h3>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

			<button onclick="ShowRecipe()"> Show me the Recipe</button>

      <div id="showRecipe" style="display:none">

      ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
			${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
			${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
			<h5>Ingredients:</h5>
			<ul>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p>${result.strInstructions}</p>

      </div>
			
			</div>
			</div>`
		});
	 meal_container.innerHTML += newHTML;
};
// Chinese Cuisine

chinese_btn.addEventListener('click', (event) => {
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};

// French Cuisine

french_btn.addEventListener('click', (event) => {
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};
// Japanese Cuisine

japanese_btn.addEventListener('click', (event) => {
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};

// Mexican Cuisine

mexican_btn.addEventListener('click', (event) => {
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};

// Thai Cuisine

thai_btn.addEventListener('click', (event) => {
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};

// Breakfast category

const breakfast_btn = document.getElementById('breakfast')
breakfast_btn.addEventListener('click', (event) => {
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};

// Dessert category

const dessert_btn = document.getElementById('dessert')
dessert_btn.addEventListener('click', (event) => {
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};

// Starter category

const starter_btn = document.getElementById('starter')
starter_btn.addEventListener('click', (event) => {
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};

// Side category

const side_btn = document.getElementById('side')
side_btn.addEventListener('click', (event) => {
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};

// Vegan category

const vegan_btn = document.getElementById('vegan')
vegan_btn.addEventListener('click', (event) => {
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForVegan();
})

async function fetchAPIForVegan() {
	const URLVegan= `https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan`;
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};

// Vegetarian category

const vegetarian_btn = document.getElementById('vegetarian')
vegetarian_btn.addEventListener('click', (event) => {
	meal_container.innerHTML = '';
	event.preventDefault();
	fetchAPIForVegetarian();
})

async function fetchAPIForVegetarian() {
	const URLVegetarian= `https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`;
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
	 for(let i=1; i<=20; i++) {
		 if(result[0][`strIngredient${i}`]) {
			 ingredients.push(`${result[0][`strIngredient${i}`]} - ${result[0][`strMeasure${i}`]}`)
		 } else {
			 // Stop if no more ingredients
			 break;
		 }
	 };

 result.map(result  => {
	 newHTML +=
	 `<div class="row">
		 <div class="columns five">
		 <br>
		 <br>
		 <h3>${result.strMeal}</h3>
		 <img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">

		 <button onclick="ShowRecipe()"> Show me the Recipe</button>

		 <div id="showRecipe" style="display:none">

		 ${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
		 ${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
		 ${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
		 <h5>Ingredients:</h5>
		 <ul>
		 ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
		 </ul>
		 <p>${result.strInstructions}</p>

		 </div>
		 
		 </div>
		 </div>`
	 });
	meal_container.innerHTML += newHTML;
};
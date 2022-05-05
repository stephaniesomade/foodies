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
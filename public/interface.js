//generate random meal
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

// filter by ingredient

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
			${result.strCategory ? `<p><strong>Category:</strong> ${result.strCategory}</p>` : ''}
			${result.strArea ? `<p><strong>Area:</strong> ${result.strArea}</p>` : ''}
			${result.strTags ? `<p><strong>Tags:</strong> ${result.strTags.split(',').join(', ')}</p>` : ''}
			<h3>${result.strMeal}</h3>
			<h5>Ingredients:</h5>
			<ul>
			${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
			</ul>
			<p>${result.strInstructions}</p>
			<img src="${result.strMealThumb}" id="meal_img" alt="Meal Image" width="200" height="200">
			</div>
			</div>`
		});
	
	meal_container.innerHTML += newHTML;

};

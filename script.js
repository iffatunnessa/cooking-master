const searchInput = document.getElementById("search-input");
const showDiv = document.getElementById("show");
const foodIngredients = document.getElementById("food-ingredients");
const errorMsg= document.getElementById("error-msg");
const clickSearch = () => {
    if(searchInput.value == ""){
        const emptyMsg = `<i class="fas fa-exclamation-triangle"></i> Enter any letter or word to search!`;
        errorMsg.innerHTML = emptyMsg;
        errorMsg.style.display ="block";
        showDiv.innerHTML="";
        foodIngredients.style.display = "none";
    }
    else{
        console.log(searchInput.value);
        fetchBySearch();
        showDiv.innerHTML="";
        foodIngredients.style.display = "none";
        errorMsg.style.display = "none";
        
    }
   
};
const fetchBySearch =  () => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInput.value)
    .then(response => response.json())
    .then(data => searchFood(data))
    .catch(error => console.log(error))
}

const searchFood =(data) =>{
    if(data.meals == undefined || data.meals == null){
        const msg = `<i class="fas fa-exclamation-triangle"></i> Nothing has been found!`;
        errorMsg.innerHTML = msg;
        errorMsg.style.display = "block";
    }
    else{
        data.meals.forEach(element => {
            const colDiv = document.createElement('div');
            colDiv.classList.add("col");
            const foodList = `
                <div id="${element.idMeal}" class="card h-100 w-70">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                    </div>
                </div>
                `;
            colDiv.innerHTML = foodList;
            showDiv.appendChild(colDiv);
            document.getElementById(element.idMeal).addEventListener("click", function(){
                foodIngredients.style.display = "block";
                const ingredientDiv = document.getElementById("ingredient-div");
                const ingredients = `
                    <div class="card top-0 start-100 translate-middle-x">
                        <img id="ingredient-img" src="${element.strMealThumb}" class="card-img-top" alt="">
                        <div class="card-body p-5">
                            <h4 class="card-title">${element.strMeal}</h4>
                            <h6 class="ingredient-header pt-3 pb-3">Ingredients</h6>
                            <ul class="ingredients">
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure1} ${element.strIngredient1}</li>
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure2} ${element.strIngredient2}</li>
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure3} ${element.strIngredient3}</li>
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure4} ${element.strIngredient4}</li>
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure5} ${element.strIngredient5}</li>
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure6} ${element.strIngredient6}</li>
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure7} ${element.strIngredient7}</li>
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure8} ${element.strIngredient8}</li>
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure9} ${element.strIngredient9}</li>
                                <li><input class="form-check-input" type="checkbox" value=""
                                        id="flexCheckDefault">&nbsp;${element.strMeasure10} ${element.strIngredient10}</li>
                            </ul>
                        </div>
                    </div>
                `;
                ingredientDiv.innerHTML = ingredients;
                foodIngredients.appendChild(ingredientDiv);
            });
        });
    }
    
}
/* Ingedient Popup div */
const ingredientBox = document.querySelector('.ingredient-box');

/* Ingredient popup box's close button event handler */
ingredientBox.querySelector('.close').addEventListener('click', (e)=>{
    ingredientBox.classList.remove('active');
    ingredientBox.querySelector('.info').innerHTML='';
    document.body.classList.remove('no-scroll');
})

/* Alert Popup div */
const alertDiv = document.querySelector('.alert');

/* Alert popup box's close button event handler */
alertDiv.querySelector('.close').addEventListener('click', ()=>{
    alertDiv.classList.remove('active');
    alertDiv.querySelector('.msg').innerHTML='';
    document.body.classList.remove('no-scroll');
})



/* food seaching input field */
const inputField = document.getElementById('fname');

/* food seaching submit button */
const submitBtn = document.querySelector('.search input[type=\'submit\']');

/* Submit button onclick event hander*/
submitBtn.addEventListener('click', ()=>{
    /*Verifying valid input in textbox*/
    if(inputField.value.trim().length===0){
        alertDiv.querySelector('.msg').innerText = "Please enter any name to search"
        alertDiv.classList.add('active')
        document.body.classList.add('no-scroll');
    }
    else{
        /*Clearing revious searched items from grid*/
        document.getElementById('meals-container').innerHTML='';


        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+inputField.value)
        .then(res=> res.json())
        .then(data=>{
            /*Verify if there is any result*/
            if(data.meals === null){
                alertDiv.querySelector('.msg').innerText = "No Result Found"
                alertDiv.classList.add('active')
            }
            else{
                /*Process if there is available results*/
                arranageSerachReaults(data.meals);
            }
        })
    }
})


/*Function to load resluts in grid*/
const arranageSerachReaults = meals=>{
    let mealsContainer = document.getElementById('meals-container');

    meals.forEach(item=>{
        mealsContainer.insertAdjacentHTML('beforeend',`
            <div class="item" onclick="showIngredient(${item.idMeal})">
                <img src="${item.strMealThumb}" alt="meal img">
                <p class="title">${item.strMeal}</p>
            </div>
        `)
    })
}

/*Function to load ingredients for each result on popup*/
const showIngredient = id=>{
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
        .then(res=>res.json())
        .then(data=>{
            let mealInfo = data.meals[0];

            let ingredientInfo = ingredientBox.querySelector('.info');

            /*Generating html for ingredient popup*/
            let html = `<img src="${mealInfo.strMealThumb}" alt="">
                        <p class="title">${mealInfo.strMeal}</p>
                        <p class="sub-title">Ingredients</p>
                        <ul>
                        `;
            for (let key of Object.keys(mealInfo)) {
                if(key.includes('strIngredient') && (mealInfo[key] !== null && mealInfo[key] !=="")){
                    html+= `<li><img src="./images/ingredients.png" alt=""><span>${mealInfo[key]}</span></li>`;
                }
            }
            html += "</ul>"
            /*Adding generated html in ingredient popup*/
            ingredientInfo.insertAdjacentHTML('beforeend', html);
            ingredientBox.classList.add('active');
            document.body.classList.add('no-scroll');
        })
}
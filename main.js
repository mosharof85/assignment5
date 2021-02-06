const ingredientBox = document.querySelector('.ingredient-box');
const alertDiv = document.querySelector('.alert');
const inputField = document.getElementById('fname');
const submitBtn = document.querySelector('.search input[type=\'submit\']');
submitBtn.addEventListener('click', ()=>{
    if(inputField.value.trim().length===0){
        alertDiv.querySelector('.msg').innerText = "Please enter any name to search"
        alertDiv.classList.add('active')
    }
    else{
        document.getElementById('meals-container').innerHTML='';

        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+inputField.value)
        .then(res=> res.json())
        .then(data=>{
            if(data.meals === null){
                alertDiv.querySelector('.msg').innerText = "No Result Found"
                alertDiv.classList.add('active')
            }
            else{
                arranageSerachReaults(data.meals);
            }
        })
    }
})

alertDiv.querySelector('.close').addEventListener('click', ()=>{
    alertDiv.classList.remove('active');
    alertDiv.querySelector('.msg').innerHTML='';
})

ingredientBox.querySelector('.close').addEventListener('click', (e)=>{
    ingredientBox.classList.remove('active');
    ingredientBox.querySelector('.info').innerHTML='';
})

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

const showIngredient = id=>{
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
        .then(res=>res.json())
        .then(data=>{
            // console.log(data.meals[0]);
            let mealInfo = data.meals[0];

            let ingredientInfo = ingredientBox.querySelector('.info');

            let html = `<img src="${mealInfo.strMealThumb}" alt="">
                        <p class="title">${mealInfo.strMeal}</p>
                        <p claa="sub-title">Ingredients</p>
                        `;
            let ul = '<ul>'
            for (let key of Object.keys(mealInfo)) {
                if(key.includes('strIngredient') && mealInfo[key].trim().length>0){
                    ul+= "<li>"+mealInfo[key]+"</li>";
                }
            }
            ul += "</ul>"

            html = html + ul;

            ingredientInfo.insertAdjacentHTML('beforeend', html);
            ingredientBox.classList.add('active');
        })
}
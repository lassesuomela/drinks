import React, {useState, useEffect} from 'react'
import Recipe from './Recipe';
import axios from "axios";

export default function Search() {

  const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/";
  const RANDOM_URL = BASE_URL + "random.php";
  const SEARCH_BY_NAME_URL = BASE_URL + "search.php?s=";

  const [searchTerm, setSearchTerm] = useState("");

  const [thumbUrl, setThumbUrl] = useState("");
  const [drinkName, setDrinkName] = useState("");
  const [glass, setGlass] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [tags, setTags] = useState([""]);

  useEffect(() => {

    let ingredientsArray = [];
    let measurementsArray = [];
    
    for (let i = 1; i <= 15; i++) {
      ingredientsArray.push("strIngredient" + i);
      measurementsArray.push("strMeasure" + i);
    }

    axios.get(RANDOM_URL)
    .then(response => {
      if(response.status === 200){

        const data = response.data.drinks[0];

        console.log(data);
        setDrinkName(data.strDrink);
        setThumbUrl(data.strDrinkThumb + "/preview");
        setGlass(data.strGlass);
        setInstructions(data.strInstructions);

        if(data.strTags){
          setTags(data.strTags.split(","));
          console.log(tags);
        }

        for (let i = 0; i < ingredientsArray.length; i++) {
          if(data[ingredientsArray[i]] && data[measurementsArray[i]]){

            const newIngredient = data[ingredientsArray[i]] + " " + data[measurementsArray[i]];
            setIngredients(ingredients => [...ingredients, newIngredient]);
          }
        }
      }else{
        alert("Error: " + response)
      }

    })
    .catch(err => {
      console.log(err);
    })

  }, [])

  const Search = (e) => {
    e.preventDefault();

    axios.get(SEARCH_BY_NAME_URL + searchTerm)
    .then(response => {
      if(response.status === 200){
        const data = response.data.drinks[0];

        console.log(data)
        setDrinkName(data.strDrink);
        setThumbUrl(data.strDrinkThumb);
        setGlass(data.strGlass);
        setInstructions(data.strInstructions);

        if(data.strTags){
          setTags(data.strTags.split(","));
          console.log(tags);
        }

      }else{
        alert("Error: " + response)
      }

    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <form className="row g-2" onSubmit={Search}>
        <label className="form-label" for="searchInput">Search for a drink</label>
        <div className="col-5">
          <input className="form-control" type="text" id="searchInput" placeholder="Type your drinks name" autocomplete="off" onChange={e => setSearchTerm(e.target.value)}/>
        </div>
        <div className="col-1">
          <button className="btn btn-primary" type="submit">Search</button>
        </div>

      </form>

      <Recipe thumbnail={thumbUrl} drinkName={drinkName} glass={glass} ingredients={ingredients} instructions={instructions} tags={tags} />
    </div>
  )
}

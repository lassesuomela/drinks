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

  let ingredientsArray = [];
  let measurementsArray = [];

  for (let i = 1; i <= 15; i++) {
    ingredientsArray.push("strIngredient" + i);
    measurementsArray.push("strMeasure" + i);
  }

  const Request = url => {

    console.log("request called");
    axios.get(url)
    .then(response => {

      if(response.status === 200 && response.data.drinks){

        const data = response.data.drinks[0];

        console.log(data);
        setDrinkName(data.strDrink);
        setThumbUrl(data.strDrinkThumb + "/preview");
        setGlass(data.strGlass);
        setInstructions(data.strInstructions);

        if(data.strTags){
          setTags(data.strTags.split(","));
        }else{
          setTags(["No tags"]);
        }

        setIngredients([]);

        for (let i = 0; i < ingredientsArray.length; i++) {

          if(data[ingredientsArray[i]] && data[measurementsArray[i]]){
            const newIngredient = data[ingredientsArray[i]] + " " + data[measurementsArray[i]];
            setIngredients(ingredients => [...ingredients, newIngredient]);
          }
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {

    Request(RANDOM_URL);

  }, [])

  const Search = (e) => {
    e.preventDefault();

    if(!searchTerm){
      return;
    }

    Request(SEARCH_BY_NAME_URL + searchTerm);
  }

  return (
    <div className="search">
      <form className="row g-2" onSubmit={Search}>
        <label className="form-label mb-0" for="searchInput">Search by using drinks name</label>
        <div className="col-5">
          <input className="form-control" type="text" id="searchInput" placeholder="i.e. gin tonic" autocomplete="off" onChange={e => setSearchTerm(e.target.value)}/>
        </div>
        <div className="col-1">
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </form>

      <Recipe thumbnail={thumbUrl} drinkName={drinkName} glass={glass} ingredients={ingredients} instructions={instructions} tags={tags} />
    </div>
  )
}

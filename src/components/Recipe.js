import React from 'react'

export default function Recipe(props) {

  return (
    <div className="recipe">
      <h3>{props.drinkName}</h3>

      <img src={props.thumbnail} alt="Drink thumbnail" />
        
      <div>
        <h4>Glass</h4>
        <p>{props.glass}</p>
      </div>

      <div className="ingeridients">
        <h4>Ingredients</h4>
        <ul>
          {props.ingredients.map(ingredient => (
            <li>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Instructions</h4>
        <p>{props.instructions}</p>
      </div>

    </div>
  )
}

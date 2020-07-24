import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from  '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  constructor(props){
    super(props)
    this.state = {
      ingredients:{
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    }
  }

  updatePurchaseState = (updateIngredients) => {
    const ingredients = {
      ...updateIngredients
    }
    const  sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) =>{
      return sum + el
    },0)

    this.setState({
      purchasable: sum > 0
    })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCounted = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    }

    updateIngredients[type] = updatedCounted
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition

    this.setState({totalPrice: newPrice, ingredients: updateIngredients})
    this.updatePurchaseState(updateIngredients)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if(oldCount <= 0){
      return;
    }
    const updatedCounted = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    }

    updateIngredients[type] = updatedCounted
    const priceDeduction = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    this.setState({totalPrice: newPrice, ingredients: updateIngredients})
    this.updatePurchaseState(updateIngredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing:true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false})
  }

  purchaseContinueHandler = () => {
    alert('you continued')
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    }

    for (let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded = {this.addIngredientHandler}
          ingredienRemoved = {this.removeIngredientHandler}
          disabled = {disableInfo}
          price = {this.state.totalPrice  }
          purchasable = { this.state.purchasable }
          ordered = {this.purchaseHandler}
        />
      </Aux>
    )
  }
}

export default BurgerBuilder

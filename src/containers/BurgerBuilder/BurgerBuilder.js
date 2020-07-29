import React, {Component} from 'react'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from  '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders.js'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
      ingredients:null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading:false,
      error:false
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
    this.setState({purchasing:true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing:false});
  }

  purchaseContinueHandler = () => {
    const order = {
      ingredients: this.state.ingredienRemoved,
      price: this.state.totalPrice,
      customer: {
        name: ' Osiel Lima',
        address:{
          street:'dummy street',
          zipCode: '1234',
          country: 'Serbia'
        },
        email:'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    this.setState({loading:true})
    axios.post('/orders.json', order).then(response => {
      this.setState({loading:false, purchasing:false})
      console.log(response)
    }).catch(error =>{
      this.setState({loading:false, purchasing:false})
      console.log(error)
    })
  }

  componentDidMount() {
    axios.get('/ingredients.json').then(response =>{
      this.setState({ingredients:response.data})
    }).catch(error =>{
      this.setState({error:true})
    })
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    }

    for (let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>
    if(this.state.ingredients){
      burger =  <Aux>
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

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
      />

      if(this.state.loading){
        orderSummary = <Spinner />
      }
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)

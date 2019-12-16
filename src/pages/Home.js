import React, { Component } from 'react';
import { changeItemIndex, editItems } from '../actions/TemplateActions'
import './../App.css';
import Card from './../Card';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import 'emoji-mart/css/emoji-mart.css'
import Text from '../components/Text';
import Typing from '../components/Typing';
import AddElementRow from '../components/AddElementRow';
import { FaPlus } from 'react-icons/fa';
import { connect } from "react-redux";
import Gallery from '../components/Gallery';
const update = require('immutability-helper');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  deleteItem = id => {
    this.setState(prevState => {
      return {
        items: prevState.items.filter(item => item.id !== id)
      }
    })
  }

  moveCard = (dragIndex, hoverIndex) => {
    const cards = [...this.props.data]
    const dragCard = cards[dragIndex]
    let newItems = update({ cards }, {
      cards: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      },
    })
    this.props.changeItemIndex(newItems.cards)

  }


  render() {
    return (
      <div className="App">
        <div className="container-fluid pt-2" >
          <div className="card-container">
            {this.props.data.map((card, i) => {
              if (card) {
                return (
                  <Card
                    key={card.id}
                    index={i}
                    id={card.id}
                    text={card.text}
                    moveCard={this.moveCard}
                    style={{ backgroundColor: '#e8e8e8' }}
                  >
                    {card.type == 'text' && <Text
                      key={i}
                      id={card.id}
                      text={card.text}
                      index={i}
                    />}

                    {card.type == 'gallery' && card.items[0] && <Gallery
                      key={i}
                      id={card.id}
                      items={card.items}
                      index={i}
                    />}

                    {card.type == 'typing' && <Typing
                      key={i}
                      id={card.id}
                      value={card.value}
                      index={i}
                    />}

                  </Card>
                )
              }
            })}
          </div>
          <AddElementRow />

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data.items,
});


export default DragDropContext(HTML5Backend)(connect(mapStateToProps, { changeItemIndex, editItems })(Home));

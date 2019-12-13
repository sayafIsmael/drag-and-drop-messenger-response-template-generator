import React, { Component } from 'react';
import './../App.css';
import Card from './../Card';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import 'emoji-mart/css/emoji-mart.css'
import UploadImage from '../components/UploadImage';
import Text from '../components/Text';
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
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }


  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="card-container">
            {this.props.data.map((card, i) => (
              <Card
                key={card.id}
                index={card.id}
                id={card.id}
                text={card.text}
                moveCard={this.moveCard}
              >
                {card.type == 'text' && <Text
                  id={card.id}
                  text={card.text}
                  index={i}
                />}

                {card.type == 'gallery' && <Gallery
                  id={card.id}
                  items={card.items}
                  index={i}
                />}

              </Card>
            ))}
          </div>
          <div>
            {/* <Gallery items={[{id: 1}, {id: 2}]} /> */}
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


export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(Home));

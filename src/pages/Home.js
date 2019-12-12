import React, { Component } from 'react';
import './../App.css';
import Card from './../Card';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import 'emoji-mart/css/emoji-mart.css'
import { FaAdn, FaRegImages } from 'react-icons/fa';
import { TiMessageTyping } from 'react-icons/ti';
import UploadImage from '../components/UploadImage';

const update = require('immutability-helper');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      cards: [
        {
          id: 1,
          text: 'Write a cool JS library',
        },
        {
          id: 2,
          text: 'Make it generic enough',
        },
        {
          id: 3,
          text: 'Write README',
        },
        {
          id: 4,
          text: 'Create some examples',
        },
        {
          id: 5,
          text:
            'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
          id: 6,
          text: '???',
        },
        {
          id: 7,
          text: 'PROFIT',
        },
      ],
      showEmojiPicker: false,
      hovered: false
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

  //Input handle change
  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

  //add emoji
  addEmoji = (e) => {
    //console.log(e.native)
    let emoji = e.native;
    this.setState({
      text: this.state.text + emoji
    })
  }

  //handle emoji submit
  handleSubmit = (e) => {
    e.preventDefault()
    // postMessage(this.state)   //send to backend
    this.setState({ text: '' })  //reset the field to empty
  }

  toogleHover = () => {
    this.setState({ hovered: !this.state.hovered })
  }

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <div className="card-container">
            {this.state.cards.map((card, i) => (
              <Card
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
                moveCard={this.moveCard}
              >

              </Card>
            ))}
          </div>

          <div>


            <UploadImage/>
          </div>

          <div>
            <div className="row m-0 mt-3">
              <h4 className="align-self-start">Add Element</h4>
            </div>
            <div className="row m-2">
              <div className="element-box card">
                <FaAdn style={{ color: '#44C1E9' }} />
                <span className="element-box-text">Text</span>
              </div>
              <div className="element-box card">
                <div className="gallery-icon">
                  <FaRegImages className="element-box-icon" />
                </div>
                <span className="element-box-text">Gallery</span>
              </div>
              <div className="element-box card">
                <div className="typing-icon">
                  <TiMessageTyping className="element-box-icon" />
                </div>
                <span className="element-box-text">Typing</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Home);

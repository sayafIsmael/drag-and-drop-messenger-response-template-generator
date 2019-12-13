import Card from './../Card';
import React, { Component } from 'react';
import './../App.css';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import 'emoji-mart/css/emoji-mart.css'
import UploadImage from './UploadImage';
import { FaPlus } from 'react-icons/fa';
import { connect } from "react-redux";
import { createGalleryItem } from '../actions/TemplateActions'

const update = require('immutability-helper');

class Gallery extends Component {
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

    makeGalleryItem = () => {
        let item = {
            id: this.props.id,
            items: [...this.props.items, {
                id: this.props.items[this.props.items.length - 1].id + 1,
                image: null,
                heading: null,
                subtitle: null,
                url: null
            }],
            type: 'gallery'
        }
        this.props.createGalleryItem(item, this.props.index)
    }

    render() {
        return (
            <div className="row ml-0  mb-2 card-container">
                {this.props.items.map((card, i) =>
                    (
                        <Card
                            key={card.id}
                            index={card.id}
                            id={card.id}
                            moveCard={this.moveCard}
                        >
                            <UploadImage
                                index={card.id}
                                id={card.id}
                                image={card.image}
                                heading={card.heading}
                                subtitle={card.subtitle}
                                url={card.url}
                            />
                        </Card>
                    ))}
                <div className="CardAddBtn card col-md-3"
                    onClick={() => this.makeGalleryItem()}
                >
                    <FaPlus style={{ color: 'gray' }}></FaPlus>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data.items,
});


export default connect(mapStateToProps, { createGalleryItem })(Gallery);

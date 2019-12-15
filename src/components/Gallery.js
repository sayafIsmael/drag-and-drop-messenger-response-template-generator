import Card from './../Card';
import React, { Component } from 'react';
import './../App.css';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import 'emoji-mart/css/emoji-mart.css'
import UploadImage from './UploadImage';
import { FaPlus } from 'react-icons/fa';
import { connect } from "react-redux";
import { createGalleryItem, changeItemIndex } from '../actions/TemplateActions'
const uniqid = require('uniqid');

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
        const cards = [...this.props.items]
        const dragCard = cards[dragIndex]
        let data = [...this.props.data]
        console.log("dragIndex hoverIndex : ", dragIndex, hoverIndex)
        console.log("old state: ", data)
        let items = update({ cards }, {
            cards: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
            },
        })
        data[this.props.index] = {
            id: this.props.id,
            items: items.cards,
            type: 'gallery'
        };
        console.log("new state: ", data)
        this.props.changeItemIndex(data)
    }

    makeGalleryItem = () => {
        let item = {
            id: this.props.id,
            items: [...this.props.items, {
                id: uniqid(),
                image: null,
                heading: '',
                subtitle: '',
                url: ''
            }],
            type: 'gallery'
        }
        this.props.createGalleryItem(item, this.props.index)
    }

    render() {
        return (
            <div className="ml-0 mb-2 gallery-container flex card-container" style={{ zIndex: 200, backgroundColor: '#e8e8e8' }}>
                {this.props.items.map((card, i) => {
                    if (card) {
                        return (
                            <div className={"flex-item"}>
                                <Card
                                    key={card.id}
                                    index={i}
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
                                        itemIndex={i}
                                        galleryIndex={this.props.index}

                                    />
                                </Card>
                            </div>
                        )
                    }
                })}
                {this.props.items[0] &&
                    <div className={"inline-item col-md-3"}>
                        <div className="CardAddBtn card "
                            onClick={() => this.makeGalleryItem()}
                            style={{height: '98%'}}
                        >
                            <FaPlus style={{ color: 'gray', fontSize: 25 }}></FaPlus>
                        </div>
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data.items,
});


export default connect(mapStateToProps, { createGalleryItem, changeItemIndex })(Gallery);

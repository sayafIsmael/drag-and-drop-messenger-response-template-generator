
import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './../App.css';
import { FiTrash } from 'react-icons/fi';
import { storeText, editItems } from '../actions/TemplateActions'
import { connect } from "react-redux";

class Typig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            cardFocused: false
        }
    }

    handleChange = (value) => {
        this.setState({ value: value })
        console.log(value * 0.2)
        let item = {
            id: this.props.id,
            value: value,
            type: 'typing'
        }
        this.props.storeText(item, this.props.index)
    }

    //Detect card hover
    onHoverCard = (e) => {
        e.preventDefault()
        this.setState({ cardFocused: true })
    }
    //Detect card hover out
    onMouseOutCard = (e) => {
        e.preventDefault()
        this.setState({ cardFocused: false })
    }

    //Delete Item
    deleteItem = () => {
        let items = [...this.props.data]
        items.splice(this.props.index, 1);
        this.props.editItems(items)
    }

    render() {
        return (
            <div className="col-md-6 bg-white" style={{ padding: 40 }}
                onMouseOver={(e) => this.onHoverCard(e)}
                onMouseOut={(e) => this.onMouseOutCard(e)}>
                <div
                    onClick={() => this.deleteItem()}
                    className={"delete-icon " + (this.state.cardFocused ? "d-flex" : "d-none")}>
                    <FiTrash style={{ fontSize: 65 }} />
                </div>
                <div className="row m-0 d-flex">
                    <img className="mr-2" style={{height: 40, width: 40}} src="images/tenor.gif"/>
                    <p class="mt-auto mb-auto" style={{ fontWeight: 'bold' }}>{`Show "typing…" for at least`}</p>
                </div>
                <Slider
                    trackStyle={{ backgroundColor: '#45C195' }}
                    value={this.state.value}
                    onChange={(e) => this.handleChange(e)}
                />
                <div className="row d-flex justify-content-between m-0" >
                    <p>0.1 sec</p>
                    <p style={{ color: '#45C195' }}>{parseFloat(this.state.value * 0.2).toFixed(2)} sec</p>
                    <p>20 sec</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data.items,
});

export default connect(mapStateToProps, {storeText, editItems })(Typig);
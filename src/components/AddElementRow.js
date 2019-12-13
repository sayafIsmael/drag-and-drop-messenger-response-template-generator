import React, { Component } from 'react';
import './../App.css';
import 'emoji-mart/css/emoji-mart.css'
import { FaAdn, FaRegImages } from 'react-icons/fa';
import { TiMessageTyping } from 'react-icons/ti';
import { storeText } from '../actions/TemplateActions'
import { connect } from "react-redux";

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log("add elements ", this.props.data)
    }

    storeText = () => {
        let id = this.props.data.length > 0 ? parseInt(this.props.data[this.props.data.length - 1].id + 1) : 1
        let text = {
            id: id,
            text: null,
            type: 'text'
        }
        this.props.storeText(text)
    }

    storeGallery = () => {
        let id = this.props.data.length > 0 ? parseInt(this.props.data[this.props.data.length - 1].id + 1) : 1
        let gallery = {
            id: id,
            items: [{
                id: 1,
                image: null,
                heading: null,
                subtitle: null,
                url: null
            }],
            type: 'gallery'
        }
        this.props.storeText(gallery)
    }

    render() {
        return (
            <div>
                <div className="row m-0 mt-3">
                    <h4 className="align-self-start">Add Element</h4>
                </div>
                <div className="row m-2">
                    <div className="element-box card"
                        onClick={() => this.storeText()}>
                        <FaAdn style={{ color: '#44C1E9' }} />
                        <span className="element-box-text"
                        >Text</span>
                    </div>
                    <div className="element-box card"
                        onClick={() => this.storeGallery()}
                    >
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
        );
    }
}

const mapStateToProps = state => ({
    data: state.data.items,
});


export default connect(mapStateToProps, { storeText })(Text);
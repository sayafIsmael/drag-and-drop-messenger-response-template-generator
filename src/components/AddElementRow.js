import React, { Component } from 'react';
import './../App.css';
import 'emoji-mart/css/emoji-mart.css'
import { FaAdn, FaRegImages } from 'react-icons/fa';
import { TiMessageTyping } from 'react-icons/ti';
import { storeItem } from '../actions/TemplateActions'
import { connect } from "react-redux";
import ShortUniqueId from 'short-unique-id';
const uid = new ShortUniqueId();

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log("add elements ", this.props.data)
    }

    storeItem = () => {
        let id = this.props.data.length > 0 && this.props.data[this.props.data.length - 1] != null ? parseInt(this.props.data[this.props.data.length - 1].id + 1) : 1
        let text = {
            id: id,
            text: '',
            type: 'text'
        }
        this.props.storeItem(text)
    }

    storeGallery = () => {
        let id = this.props.data.length > 0 && this.props.data[this.props.data.length - 1] != null ? parseInt(this.props.data[this.props.data.length - 1].id + 1) : 1
        let gallery = {
            id: id,
            items: [{
                id: uid.randomUUID(13),
                image: null,
                heading: '',
                subtitle: '',
                url: ''
            }],
            type: 'gallery'
        }
        this.props.storeItem(gallery)
    }

    storeTypingItem = () =>{
        let id = this.props.data.length > 0 && this.props.data[this.props.data.length - 1] != null ? parseInt(this.props.data[this.props.data.length - 1].id + 1) : 1
        let typing = {
            id: id,
            value: 20,
            type: 'typing'
        }
        this.props.storeItem(typing)
    }

    render() {
        return (
            <div>
                <div className="row m-0 ml-2 mt-3">
                    <h4 className="align-self-start">Add Element</h4>
                </div>
                <div className="row m-2">
                    <div className="element-box card"
                        onClick={() => this.storeItem()}>
                        <FaAdn style={{ color: '#44C1E9', fontSize: 20 }} />
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
                    <div className="element-box card"
                    onClick={() => this.storeTypingItem()}
                    >
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


export default connect(mapStateToProps, { storeItem })(Text);
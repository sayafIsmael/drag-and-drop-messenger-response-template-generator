import React, { Component } from 'react';
import './../App.css';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { FaRegSmile, } from 'react-icons/fa';
import OutsideClickHandler from 'react-outside-click-handler';
import { FiTrash } from 'react-icons/fi';
import { storeText, editItems } from '../actions/TemplateActions'
import { connect } from "react-redux";


class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      showEmojiPicker: false,
      hovered: false,
      focusedInput: false,
      clickedInputOnce: false,
      cardFocused: false
    }
  }




  //Input handle change
  handleChange = (e) => {
    this.setState({ text: e.target.value })
    let item = {
      id: this.props.id,
      text: e.target.value,
      type: 'text'
    }
    this.props.storeText(item, this.props.index)
  }

  //add emoji
  addEmoji = (e) => {
    //console.log(e.native)
    let emoji = e.native;
    this.setState({
      text: this.state.text + emoji
    })
  }

  //Detect focus on headline
  onFocusTextInput = (e) => {
    e.preventDefault()
    this.setState({ focusedInput: true, clickedInputOnce: true })
  }

  //Handle textarea outsideclik
  handleInputOutsideClick = () => {
    this.setState({
      focusedInput: false,
    })
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
      <div
        className="card col-md-3 mb-4 p-2 pb-4 position-relative"
        onMouseOver={(e) => this.onHoverCard(e)}
        onMouseOut={(e) => this.onMouseOutCard(e)}
      >
        <div 
        onClick={() => this.deleteItem()}
        className={"delete-icon " + (this.state.cardFocused ? "d-flex" : "d-none")}>
          <FiTrash style={{ fontSize: 65 }} />
        </div>
        <OutsideClickHandler
          onOutsideClick={() => this.handleInputOutsideClick()}
        >
          <textarea maxlength="640" className={" text-input test-input ng-valid ng-valid-maxlength ng-touched ng-dirty ng-valid-parse ng-empty error "
            + (!(this.state.text.length > 0) && !this.state.focusedInput && this.state.clickedInputOnce ? "warning-txtInput" : null)}
            spellcheck="false"
            placeholder="Enter Text"
            type="text"
            onChange={this.handleChange}
            value={this.state.text}
            onFocus={this.onFocusTextInput}
          />
          <div className={"row input-helper " + (this.state.focusedInput ? "d-flex-inline" : "d-none")}>
            <p className="text-success text-limit">{parseInt(640 - this.state.text.length)}</p>
            <FaRegSmile className="emoji-icon"
              onClick={() => this.setState({ showEmojiPicker: !this.state.showEmojiPicker })}
            />
          </div>

          <span className={"emoji-picker " + (this.state.focusedInput ? "d-flex-inline" : "d-none")}
            style={{ display: this.state.showEmojiPicker === true ? 'block' : 'none' }}
          >
            <Picker onSelect={this.addEmoji} />
          </span>
        </OutsideClickHandler>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data.items,
});

export default connect(mapStateToProps, { storeText, editItems })(Text);
import React, { Component } from 'react';
import './../App.css';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { FaRegSmile, } from 'react-icons/fa';


class Text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      showEmojiPicker: false,
      hovered: false
    }
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



  render() {
    return (
      <div className="card col-md-4 mb-3 p-2 pb-4 position-relative">
        <textarea maxlength="640" className=" text-input test-input ng-valid ng-valid-maxlength ng-touched ng-dirty ng-valid-parse ng-empty error"
          spellcheck="false"
          placeholder="Enter Text"
          type="text"
          onChange={this.handleChange}
          value={this.state.text}
        />
        <div className="row input-helper">
          <p className="text-success text-limit">640</p>
          <FaRegSmile className="emoji-icon"
            onClick={() => this.setState({ showEmojiPicker: !this.state.showEmojiPicker })}
          />
        </div>

        <span className={"emoji-picker "}
          style={{ display: this.state.showEmojiPicker === true ? 'block' : 'none' }}
        >
          <Picker onSelect={this.addEmoji} />
        </span>
      </div>
    );
  }
}

export default Text;

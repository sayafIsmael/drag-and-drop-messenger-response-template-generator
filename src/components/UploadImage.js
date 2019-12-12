import React, { Component } from 'react';
import './../App.css';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { FaRegSmile, FaCropAlt } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';



class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlinetxt: '',
            subtitleTxt: '',
            urlTxt: '',
            showHeadlineEmojiPicker: false,
            showSubtitlEmojiePicker: false,
            hovered: false,
            focusedHeadlineInput: false,
            focusedSubtitleInput: false,
            file: null,
            hoveredCamera: false,
            hoveredImage: false
        }
    }

    //Input handle headline change
    handleHeadlineChange = (e) => {
        e.preventDefault()
        this.setState({ headlinetxt: e.target.value })
    }
    //Input handle subtitle change
    handleSubtitleChange = (e) => {
        e.preventDefault()
        this.setState({ subtitleTxt: e.target.value })
    }
    //Input handle url change
    handleUrlChange = (e) => {
        e.preventDefault()
        this.setState({ urlTxt: e.target.value })
    }

    //add emoji to headline
    addEmojiToHeadline = (e) => {
        //console.log(e.native)
        let emoji = e.native;
        this.setState({
            headlinetxt: this.state.headlinetxt + emoji
        })
    }
    //add emoji to subtitle
    addEmojiToSubtitle = (e) => {
        //console.log(e.native)
        let emoji = e.native;
        this.setState({
            subtitleTxt: this.state.subtitleTxt + emoji
        })
    }
    //Detect hovered on upload image
    toogleHover = (e) => {
        e.preventDefault()
        this.setState({ hovered: !this.state.hovered })
    }
    toogleHoverImage = (e) => {
        e.preventDefault()
        this.setState({ hoveredImage: !this.state.hoveredImage })
    }
    //Hovered on image overlay component
    toogleCameraHover = (e) => {
        e.preventDefault()
        this.setState({ hoveredCamera: !this.state.hoveredCamera })
    }
    //Detect focus on headline
    onFocusHeadline = (e) => {
        e.preventDefault()
        this.setState({ focusedHeadlineInput: true, focusedSubtitleInput: false })
    }
    //Detect focus on subtitle
    onFocusSubtitle = () => {
        this.setState({ focusedSubtitleInput: true, focusedHeadlineInput: false })
    }

    //Handle textarea outsideclik
    handleInputOutsideClick = () => {
        this.setState({
            focusedHeadlineInput: false,
            focusedSubtitleInput: false,
            showHeadlineEmojiPicker: false,
            showSubtitlEmojiePicker: false
        })
    }

    onChange = (e) => {
        e.preventDefault()
        this.setState({ file: URL.createObjectURL(e.target.files[0]) })
        console.log(URL.createObjectURL(e.target.files[0]));

    }

    render() {
        return (
            <div className="card col-md-4 position-relative">
                <div className={"image-overlay position-absolute " + (this.state.file && this.state.hoveredImage ? "d-flex " : "d-none")}>
                    <div className="row ">
                        <div className="overlayItem "
                            onMouseEnter={this.toogleCameraHover}
                            onMouseLeave={this.toogleCameraHover}
                            style={{ cursor: 'pointer' }}
                        >
                            <FiCamera
                                style={{ color: this.state.hoveredCamera ? 'white' : "gray" }}
                                className={"upload-text-overlay "} />
                            <p className={"upload-text-overlay "}
                                style={{ color: this.state.hoveredCamera ? 'white' : "gray", fontSize: 12}}
                            >Replace</p>
                        </div>
                        <div className="overlayItem "
                            onMouseEnter={this.toogleCameraHover}
                            onMouseLeave={this.toogleCameraHover}
                            style={{ cursor: 'pointer' }}
                        >
                            <FaCropAlt
                                style={{ color: this.state.hoveredCamera ? 'white' : "gray" }}
                                className={"upload-text-overlay "} />
                            <p className={"upload-text-overlay "}
                                style={{ color: this.state.hoveredCamera ? 'white' : "gray", fontSize: 12}}
                            >Crop</p>
                        </div>
                        <div className="overlayItem "
                            onMouseEnter={this.toogleCameraHover}
                            onMouseLeave={this.toogleCameraHover}
                            style={{ cursor: 'pointer' }}
                        >
                            <MdClose
                                style={{ color: this.state.hoveredCamera ? 'white' : "gray" }}
                                className={"upload-text-overlay mr-0"} />
                            <p className={"upload-text-overlay "}
                                style={{ color: this.state.hoveredCamera ? 'white' : "gray", fontSize: 12}}
                            >Remove</p>
                        </div>
                    </div>
                </div>
                <div
                    onMouseEnter={this.toogleHoverImage}
                    onMouseLeave={this.toogleHoverImage}
                    className={"image-preview border " + (this.state.file ? "display-flex" : "d-none")}
                    style={{ backgroundImage: `url('${this.state.file}')` }}></div>
                <label className={(this.state.file ? "d-none " : "upload-image border d-flex")} htmlFor="image"
                    onMouseEnter={this.toogleHover}
                    onMouseLeave={this.toogleHover}
                    ref={input => this.inputImage = input}
                >
                    <div className={(this.state.file ? "d-none " : "display-flex ")}>
                        <FiCamera className={this.state.hovered ? "upload-text-black" : "upload-text"} />
                        <br />
                        <span className={this.state.hovered ? "upload-text-black" : "upload-text"}>Upload Image</span>
                    </div>
                </label>
                <input type="file" className="form-control d-none" id="image" onChange={this.onChange} multiple accept="image/*" />
                <OutsideClickHandler
                    onOutsideClick={() => this.handleInputOutsideClick()}
                >
                    <div className="position-relative">
                        <textarea maxLength="80" className=" text-input test-input ng-valid ng-valid-maxlength ng-touched ng-dirty ng-valid-parse ng-empty error"
                            spellCheck="false"
                            placeholder="Heading (required)"
                            type="text"
                            onChange={this.handleHeadlineChange}
                            value={this.state.headlinetxt}
                            onFocus={this.onFocusHeadline}
                            onBlur={this.onBlurHeadline}
                        />
                        <div className={"row input-helper-2  " + (this.state.focusedHeadlineInput ? "d-flex-inline" : "d-none")}>
                            <p className="text-success text-limit">80</p>
                            <FaRegSmile className="emoji-icon"
                                onClick={() => this.setState({ showHeadlineEmojiPicker: !this.state.showHeadlineEmojiPicker })}
                            />
                        </div>
                        <span className={"emoji-picker"}
                            style={{
                                display: this.state.showHeadlineEmojiPicker === true ? 'block' : 'none',
                                top: 89,
                                left: 10,
                            }}
                        >
                            <Picker onSelect={this.addEmojiToHeadline} />
                        </span>
                    </div>

                    <div className="position-relative">
                        <textarea maxLength="80" className=" text-input test-input ng-valid ng-valid-maxlength ng-touched ng-dirty ng-valid-parse ng-empty error"
                            spellCheck="false"
                            placeholder="Subtitle or description"
                            type="text"
                            onChange={this.handleSubtitleChange}
                            value={this.state.subtitleTxt}
                            onFocus={this.onFocusSubtitle}
                        />
                        <div className={"row input-helper-2" + (this.state.focusedSubtitleInput ? " d-flex-inline" : " d-none")}>
                            <p className={"text-success text-limit"}>80</p>
                            <FaRegSmile className="emoji-icon"
                                onClick={() => this.setState({ showSubtitlEmojiePicker: !this.state.showSubtitlEmojiePicker })}
                            />
                        </div>
                        <span className={"emoji-picker"}
                            style={{
                                display: this.state.showSubtitlEmojiePicker === true ? 'block' : 'none',
                                top: 89,
                                left: 10,
                            }}
                        >
                            <Picker onSelect={this.addEmojiToSubtitle} />
                        </span>
                    </div>
                </OutsideClickHandler>
                <input
                    type="text"
                    className="upload-url mb-2"
                    placeholder="Url"
                    value={this.state.urlTxt}
                    onChange={this.handleUrlChange}
                />
            </div>
        );
    }
}

export default UploadImage;

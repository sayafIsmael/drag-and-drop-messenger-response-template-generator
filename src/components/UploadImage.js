import React, { Component } from 'react';
import './../App.css';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { FaRegSmile, FaCropAlt } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400
    }
};

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
            hoveredImage: false,
            crop: {
                x: 20,
                y: 50,
                width: 200,
                height: 140,
            },
            modalIsOpen: false
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

    onChangeImage = (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            this.setState({ file: URL.createObjectURL(e.target.files[0]), })
            this.setState({ modalIsOpen: true })
        }
    }

    //Start crop function
    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropChange = crop => {
        this.setState({ crop })
        console.log(crop)
    }

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    saveCrop = () => {
        this.setState({ file: this.state.croppedImageUrl })
        this.closeModal()
    }

    //End Crop function


    render() {
        const { crop, croppedImageUrl, file } = this.state;
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <div className="row ml-2 mr-2 d-flex crop-modal-header">
                        <p>Edit Image</p>
                        <div onClick={() => this.closeModal()}>
                            <MdClose
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 25,
                                    color: 'gray'
                                }} />
                        </div>
                    </div>
                    <div className="crop-container" style={{ backgroundImage: `url('images/transparent.png')` }}>
                        <div className="crop-preview">
                            {this.state.file && (
                                <ReactCrop src={this.state.file}
                                    crop={this.state.crop}
                                    onImageLoaded={this.onImageLoaded}
                                    onChange={this.onCropChange}
                                    onComplete={this.onCropComplete}
                                />
                            )}
                        </div>
                    </div>
                    {/* {croppedImageUrl && (
                        <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                    )} */}
                    <div class="row mt-2 mr-2 d-flex justify-content-end">
                        <button type="button" class="btn btn-light mr-2"
                            onClick={() => this.closeModal()}>
                            Cancel
                            </button>
                        <button type="button" class="btn btn-danger" onClick={() => this.saveCrop()}>Done</button>
                    </div>

                </Modal>

                <div className="card col-md-4 position-relative">

                    <div className={"image-overlay position-absolute " + (this.state.file && this.state.hoveredImage ? "d-flex " : "d-none")}>
                        <div className="row ">
                            <div className="overlayItem " onClick={() => this.inputImage.click()}>
                                <FiCamera
                                    style={{ color: 'white' }}
                                    className={"upload-text-overlay "} />
                                <p className={"upload-text-overlay "}
                                    style={{ color: 'white', fontSize: 12 }}
                                >Replace</p>
                            </div>
                            <div className="overlayItem "
                                onClick={() => this.openModal()}>
                                <FaCropAlt
                                    style={{ color: 'white' }}
                                    className={"upload-text-overlay "}
                                />
                                <p className={"upload-text-overlay "}
                                    style={{ color: 'white', fontSize: 12 }}
                                >Crop</p>
                            </div>
                            <div className="overlayItem "
                                onClick={() => { this.setState({ file: null }); this.inputImage.value = null; }}
                            >
                                <MdClose
                                    style={{ color: 'white' }}
                                    className={"upload-text-overlay mr-0"} />
                                <p className={"upload-text-overlay "}
                                    style={{ color: 'white', fontSize: 12 }}
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
                    >
                        <div className={(this.state.file ? "d-none " : "display-flex ")}>
                            <FiCamera className={this.state.hovered ? "upload-text-black" : "upload-text"} />
                            <br />
                            <span className={this.state.hovered ? "upload-text-black" : "upload-text"}>Upload Image</span>
                        </div>
                    </label>
                    <input
                        ref={input => this.inputImage = input}
                        type="file" className="form-control d-none" id="image" onChange={this.onChangeImage} multiple accept="image/*" />
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

            </React.Fragment>
        );
    }
}

export default UploadImage;

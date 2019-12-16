import React, { Component } from 'react';
import './../App.css';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { FaRegSmile, FaCropAlt } from 'react-icons/fa';
import { FiCamera, FiTrash } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import OutsideClickHandler from 'react-outside-click-handler';
import ReactCrop, { makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Modal from 'react-modal';
import { connect } from "react-redux";
import { editItems } from '../actions/TemplateActions'
import ReactTooltip from 'react-tooltip'

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
            headlinetxt: this.props.heading,
            subtitleTxt: this.props.subtitle,
            urlTxt: this.props.url,
            showHeadlineEmojiPicker: false,
            showSubtitlEmojiePicker: false,
            hovered: false,
            focusedHeadlineInput: false,
            focusedSubtitleInput: false,
            file: this.props.image,
            hoveredCamera: false,
            hoveredImage: false,
            crop: {
                x: 20,
                y: 50,
                width: 200,
                height: 140,
            },
            modalIsOpen: false,
            clickedHeadlineInput: false,
            cardFocused: false,
            focusedUrlInput: false
        }
    }

    /**
 * Convert an image 
 * to a base64 url
 * @param  {String}   url         
 * @param  {Function} callback    
 * @param  {String}   [outputFormat=image/png]           
 */
    convertImgToBase64URL = (url, callback, outputFormat) => {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d'), dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            if (callback) {
                callback(dataURL);
            }
            canvas = null;

        };
        img.src = url;
    }


    //Input handle headline change
    handleHeadlineChange = (e) => {
        e.preventDefault()
        let items = [...this.props.data]
        let gallery = items[this.props.galleryIndex]
        let galleryItems = gallery.items;
        galleryItems[this.props.itemIndex].heading = e.target.value
        items[this.props.galleryIndex].items = galleryItems;
        console.log("add headline ", items)

        this.props.editItems(items)
        this.setState({ headlinetxt: e.target.value })
    }
    //Input handle subtitle change
    handleSubtitleChange = (e) => {
        e.preventDefault()
        let items = [...this.props.data]
        let gallery = items[this.props.galleryIndex]
        let galleryItems = gallery.items;
        galleryItems[this.props.itemIndex].subtitle = e.target.value
        items[this.props.galleryIndex].items = galleryItems;
        console.log("add headline ", items)

        this.props.editItems(items)
        this.setState({ subtitleTxt: e.target.value })
    }
    //Input handle url change
    handleUrlChange = (e) => {
        e.preventDefault()
        let items = [...this.props.data]
        let gallery = items[this.props.galleryIndex]
        let galleryItems = gallery.items;
        galleryItems[this.props.itemIndex].url = e.target.value
        items[this.props.galleryIndex].items = galleryItems;
        this.props.editItems(items)
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
        let items = [...this.props.data]
        let gallery = items[this.props.galleryIndex]
        let galleryItems = gallery.items;
        galleryItems[this.props.itemIndex].subtitle = this.state.subtitleTxt + emoji
        items[this.props.galleryIndex].items = galleryItems;
        this.props.editItems(items)

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
        this.setState({ focusedUrlInput: false, focusedHeadlineInput: true, focusedSubtitleInput: false, clickedHeadlineInput: true })
    }
    //Detect focus on subtitle
    onFocusSubtitle = () => {
        this.setState({ focusedSubtitleInput: true, focusedHeadlineInput: false, focusedUrlInput: false })
    }
    //Detect focus on url
    onFocusUrl = () => {
        this.setState({ focusedSubtitleInput: false, focusedHeadlineInput: false, focusedUrlInput: true })
    }

    //Handle textarea outsideclik
    handleInputOutsideClick = () => {
        this.setState({
            focusedHeadlineInput: false,
            focusedSubtitleInput: false,
            focusedUrlInput: false,
            showHeadlineEmojiPicker: false,
            showSubtitlEmojiePicker: false
        })
    }

    onChangeImage = (e) => {
        e.preventDefault()
        if (e.target.files[0]) {
            this.convertImgToBase64URL(URL.createObjectURL(e.target.files[0]), (base64Img) => {
                this.setState({ file: base64Img, })
                this.setState({ modalIsOpen: true })
            });
        }
        this.inputImage.value = null;

    }

    //Start crop function
    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }

    closeModal = (canceledit = false) => {
        this.setState({ modalIsOpen: false });
        let items = [...this.props.data]
        let gallery = items[this.props.galleryIndex]
        let galleryItems = gallery.items;
        galleryItems[this.props.itemIndex].image = this.state.file
        if (this.state.croppedImageUrl && !canceledit) {
            galleryItems[this.props.itemIndex].image = this.state.croppedImageUrl
        }

        items[this.props.galleryIndex].items = galleryItems;
        this.props.editItems(items)
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

    makeClientCrop = async (crop) => {
        if (this.imageRef && crop.width && crop.height) {
            let croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.convertImgToBase64URL((croppedImageUrl), (base64Img) => {
                this.setState({ croppedImageUrl: base64Img });
            })

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
        this.setState({ file: this.state.croppedImageUrl, })
        console.log(this.state.croppedImageUrl)
        this.closeModal()

    }
    //End Crop function

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

    //Replace Image
    replaceImage = () => {
        let items = [...this.props.data]
        let gallery = items[this.props.galleryIndex]
        let galleryItems = gallery.items;
        galleryItems[this.props.itemIndex].image = null
        items[this.props.galleryIndex].items = galleryItems;
        this.props.editItems(items)
        this.setState({ file: null }); this.inputImage.value = null;

    }

    //Delete Item
    deleteItem = () => {
        let items = [...this.props.data]
        let gallery = items[this.props.galleryIndex]
        let galleryItems = gallery.items;
        if (galleryItems.length > 1) {
            galleryItems.splice(this.props.itemIndex, 1);
            items[this.props.galleryIndex].items = galleryItems;
            this.props.editItems(items)
        }else{
            items.splice(this.props.galleryIndex, 1);
            this.props.editItems(items)
        }
    }

    render() {
        const { crop, croppedImageUrl, file } = this.state;
        return (
            <React.Fragment>
                <ReactTooltip place="top"/>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={() => this.closeModal(true)}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <div className="row ml-2 mr-2 d-flex crop-modal-header">
                        <p>Edit Image</p>
                        <div onClick={() => this.closeModal(true)}>
                            <MdClose
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 25,
                                    color: 'gray'
                                }} />
                        </div>
                    </div>
                    <div className="crop-container" style={{ backgroundImage: this.state.file }}>
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
                            onClick={() => this.closeModal(true)}>
                            Cancel
                            </button>
                        <button type="button" class="btn btn-danger" onClick={() => this.saveCrop()}>Done</button>
                    </div>

                </Modal>

                <div
                    className="card p-2 position-relative overflow-hidden"
                    style={{ width: 253 }}
                    onMouseOver={(e) => this.onHoverCard(e)}
                    onMouseOut={(e) => this.onMouseOutCard(e)}
                    data-tip="Drag left to change order"
                >
                    <div
                        onClick={this.deleteItem}
                        className={"delete-icon " + (this.state.cardFocused ? "d-flex" : "d-none")}>
                        <FiTrash style={{ fontSize: 65 }} />
                    </div>
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
                                onClick={() => this.replaceImage()}
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
                        className={"image-preview border mb-2 " + (this.state.file ? "display-flex" : "d-none")}
                        style={{ backgroundImage: `url('${this.state.file}')` }}></div>
                    <label className={(this.state.file ? "d-none " : "upload-image border d-flex")} htmlFor={"image" + this.props.index}
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
                        type="file" className="form-control d-none" id={"image" + this.props.index} onChange={this.onChangeImage} multiple accept="image/*" />
                    <OutsideClickHandler
                        onOutsideClick={() => this.handleInputOutsideClick()}
                    >
                        <div className="position-relative">
                            <textarea maxLength="80"
                                className={"text-input test-input ng-valid ng-valid-maxlength ng-touched ng-dirty ng-valid-parse ng-empty error "
                                    + (!(this.state.headlinetxt.length > 0) && !this.state.focusedHeadlineInput && this.state.clickedHeadlineInput ? "warning-txtInput" : null)}
                                style={{ height: 58 }}
                                spellCheck="false"
                                placeholder="Heading (required)"
                                type="text"
                                onChange={this.handleHeadlineChange}
                                value={this.state.headlinetxt}
                                onFocus={this.onFocusHeadline}
                                onBlur={this.onBlurHeadline}
                            />
                            <div className={"row input-helper-2  " + (this.state.focusedHeadlineInput ? "d-flex-inline" : "d-none")}>
                                <p className="text-success text-limit">{parseInt(80 - this.state.headlinetxt.length)}</p>
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
                            <textarea maxLength="80" className={" text-input test-input ng-valid ng-valid-maxlength ng-touched ng-dirty ng-valid-parse ng-empty error " +
                                (this.state.focusedSubtitleInput ? null : "border-0")
                            }
                                spellCheck="false"
                                placeholder="Subtitle or description"
                                type="text"
                                onChange={this.handleSubtitleChange}
                                value={this.state.subtitleTxt}
                                onFocus={this.onFocusSubtitle}
                            />
                            <div className={"row input-helper-2" + (this.state.focusedSubtitleInput ? " d-flex-inline" : " d-none")}>
                                <p className={"text-success text-limit"}>{parseInt(80 - this.state.subtitleTxt.length)}</p>
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

                        <input
                            type="text"
                            className={"upload-url mb-2 " + (this.state.focusedUrlInput ? null : "border-0")}
                            placeholder="Url"
                            value={this.state.urlTxt}
                            onChange={this.handleUrlChange}
                            onFocus={this.onFocusUrl}
                        />
                    </OutsideClickHandler>
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    data: state.data.items,
});

export default connect(mapStateToProps, { editItems })(UploadImage);

import React, { Fragment, Component } from 'react'
// import { connect } from 'react-redux'
import Auth from '../../navs/auth/Auth'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'
import * as loading from "../../components/loading.json"
import Navigation from '../../navs/navigation/navigation'

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Axios from 'axios'

class Photo extends Component {
    state = {
        src: null,
        crop: {
            unit: '%',
            width: 30,
            aspect: 16 / 16,
        },
        menuIsActive:'',
        isReady:undefined,
        croppedImage: null,
        error :''
    };

    componentDidMount = () => {
        this.setState({ menuIsActive: 6})
        this.setState({isReady : true})
    }

    handleSubmit = async e => {
        e.preventDefault()
        // let history = useHistory();
        const formData = new FormData()
        console.log(this.state.croppedImage)

        formData.append('photo', this.state.croppedImage)

        await Axios.post('/api/upload-photo', formData)
            .then(res => {
                !res.data.error ?
                this.setState({error : 'success'}) :
                this.setState({error : 'error'})
                // history.push('user/profile') : null
            })
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () =>
            this.setState({ src: reader.result })
        );
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    getCroppedImg = (image, crop, fileName) => {
        const canvas    = document.createElement('canvas');
        const scaleX    = image.naturalWidth / image.width;
        const scaleY    = image.naturalHeight / image.height;
        canvas.width    = crop.width;
        canvas.height   = crop.height;
        const ctx       = canvas.getContext('2d');

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

        // return new Promise((resolve, reject) => {
        // canvas.toBlob(blob => {
        //     if (!blob) {
        //     //reject(new Error('Canvas is empty'));
        //     console.error('Canvas is empty');
        //     return;
        //     }
        //     blob.name = fileName;
        //     window.URL.revokeObjectURL(this.fileUrl);
        //     this.fileUrl = window.URL.createObjectURL(blob);
        //     resolve(this.fileUrl);
        // }, 'image/jpeg');
        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'cropped.jpg')
            }
        });
    }

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

    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, {type:mime});
        this.setState({croppedImage: croppedImage })
    }

    renderCropper = () => {
        const { crop, croppedImageUrl, src } = this.state;
        return(
            <Fragment>
                <div className="form-group mb-4 row">
                    <div className="col-auto">
                        <label class="btn btn-darker btn-file">
                            <i class="far fa-plus-square"></i> Select Picture
                            <input type="file" accept="image/*" onChange={this.onSelectFile} style={{display: 'none'}}/>
                        </label>
                    </div>
                    <div className="col">
                        {this.renderForm()}
                    </div>
                </div>

                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                    />
                )}
                {croppedImageUrl && (
                    <img alt="Crop" style={{ maxWidth: '50%' }} src={croppedImageUrl} />
                )}
            </Fragment>
        )
    }

    renderForm = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <button type="submit" className="btn btn-success" disabled={this.state.src ? false : true} >SAVE</button>
            </form>
        )
    }

    render() {
        return(
            <Fragment>
                <Auth active={this.state.menuIsActive}/>
                <div className="main-content">
                    <Navbar/>
                    <div className="header pt-md-7 pt-lg-7" ></div>
                    <div className="container-fluid py-4">
                    {
                        !this.state.isReady
                        ?
                            <FadeIn>
                                <h3 className="text-center text-dark text-uppercase ls-2 pt-md-7">Menyiapkan Data</h3>
                                <div className="d-flex justify-content-center align-items-center">
                                    <Lottie options={defaultOptions} height={120} width={120} />
                                </div>
                            </FadeIn>
                        :
                            <Fragment>
                                <Navigation />
                                <div className="card">
                                    <div className="card-body">
                                        {this.state.error}
                                    </div>
                                    <div className="crop-container card-body">
                                        {this.renderCropper()}
                                    </div>
                                </div>
                            </Fragment>
                    }
                    </div>
                </div>
            </Fragment>
        )
    }
}

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
};

export default Photo;


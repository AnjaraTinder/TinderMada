import { Component } from '@angular/core';

import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { FIREBASE_CONFIG } from '../../config/firebase.config';
import { storage, initializeApp } from 'firebase'
import { Camera, CameraOptions, EncodingType } from '@ionic-native/camera';
 
declare var cordova: any;

@Component({
    selector: 'page-image',
    templateUrl: 'image.html'
})
export class ImagePage{

    image;

    constructor(private camera: Camera){
        initializeApp(FIREBASE_CONFIG);
    }
    
    async takePhoto(){
        const options: CameraOptions = {
            quality: 50,
            targetHeight: 600,
            targetWidth: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
            //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY   
        }
        const result = await this.camera.getPicture(options);
        const image = `data:image/jpeg;base64,${result}`;
        this.image = image
    }

    async getImageGallery(){
        const options: CameraOptions = {
            quality: 50,
            targetHeight: 600,
            targetWidth: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            //mediaType: this.camera.MediaType.PICTURE
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY   
        }
        const result = await this.camera.getPicture(options);
        const image = `data:image/jpeg;base64,${result}`;
        this.image = image
    }

    uploadImage(){
        try{
            const pictures = storage().ref('pictures/myPhoto2');
            pictures.putString(this.image, 'data_url')
            //pictures.getDownloadURL().then(reponse => this.image = reponse);
        }
        catch(e){
            console.error(e);
        }
    }
    

}
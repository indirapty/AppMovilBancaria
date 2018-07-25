import { Component, ViewChild,ElementRef } from '@angular/core';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng
} from '@ionic-native/google-maps';
import { Platform, NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
@ViewChild('map') mapElement: ElementRef;
  private map: GoogleMap;
  private location: LatLng;
  private features: any [];
  private origen: LatLng;
  private destino: LatLng;
  
  constructor(
              private platform: Platform,
              private googleMaps: GoogleMaps,
              private alertCtrl: AlertController) {
    this.location = new LatLng(9.0132, -79.512097); //Latitud y Longitud por default

 }

 ionViewDidLoad() {
  this.platform.ready().then(() => {
    let element = this.mapElement.nativeElement;
    let options = {
       target: this.location,
        zoom: 15
      };
    this.map = this.googleMaps.create(element, options);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    this.getPosition();

     setTimeout(() => {this.addMarker()}, 2000);

    });
  });
}

//Método que obtiene la posición Actual
  getPosition (){
  this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng,
        zoom: 15
      });
      
      this.map.addMarker({
            title: 'Mi ubicación',
            icon: 'red',
            animation: 'DROP',
            position: response.latLng
          });

      this.origen = new LatLng (response.latLng.lat, response.latLng.lng);
    })
    .catch(error =>{
      alert(error);
    });
  }

//Método que traza un Polyline en el mapa desde la ubicación actual al evento de marcado
 startNavigating(data){
      let points = [
          {
            lat: this.origen.lat,
            lng: this.origen.lng
          },
          {
            lat: data.lat,
            lng: data.lng
          }
      ];

      this.map.addPolyline({
          points: points,
          'color' : '#AA00FF',
          'width': 10,
          'geodesic': true
      });
 
    }

//Método para agregar los marcadores de ATM, Puntos de Pago y Sucursales al mapa
addMarker() {
  // Array de elementos
    this.features = [
          {
            position: this.location = new LatLng(8.975882 , -79.522755),
            type: 'atm',
            title: 'ATM'
          }
          , {
            position: this.location = new LatLng(8.977111, -79.526811),
            type: 'atm',
            title: 'ATM'
          }
          , {
            position: this.location = new LatLng(8.976068, -79.52673),
            type: 'atm',
            title: 'ATM'
          }, {
            position: this.location = new LatLng(8.977373, -79.52171),
            type: 'atm',
            title: 'ATM'
          }, {
            position: this.location = new LatLng(8.978442, -79.52725),
            type: 'atm',
            title: 'ATM'
          },
          {
            position: this.location = new LatLng(8.964691, 79.535007),
            type: 'ptov',
            title: 'Punto de Pago'
          }, {
            position: this.location = new LatLng(8.962444, -79.53505),
            type: 'ptov',
            title: 'Punto de Pago'
          }, {
            position: this.location = new LatLng(8.974568, -79.53445),
            type: 'ptov',
            title: 'Punto de Pago'
          }, {
            position: this.location = new LatLng(8.973063, -79.536338),
            type: 'ptov',
            title: 'Punto de Pago'
          }, 
          {
            position: this.location = new LatLng(8.975903, -79.522734),
            type: 'suc',
            title: 'Sucursal'
          }, {
            position: this.location = new LatLng(8.978362 , -79.529386),
            type: 'suc',
            title: 'Sucursal'
          },  {
            position: this.location = new LatLng(8.975649, -79.53151),
            type: 'suc',
            title: 'Sucursal'
          }, {
            position: this.location = new LatLng(8.979002, -79.525501),
            type: 'suc',
            title: 'Sucursal'
          }, {
            position: this.location = new LatLng(8.977429, -79.525287),
            type: 'suc',
            title: 'Sucursal'
          }, {
            position: this.location = new LatLng(8.976645, -79.526854),
            type: 'suc',
            title: 'Sucursal'
          }, {
            position: this.location = new LatLng(8.975861,  -79.531596),
            type: 'suc',
            title: 'Sucursal'
          }
        ];

//Url de icons base
  var iconBase = 'https://www.shareicon.net/data/';
      var icons = {
        atm: {
          icon: iconBase + '32x32/2016/01/06/698940_business_512x512.png'
        },
        ptov: {
          icon: iconBase + '32x32/2015/09/23/645285_people_512x512.png'
        },
        suc: {
          icon: iconBase + '32x32/2016/06/24/785561_business_512x512.png'
        }
  };

  this.features.forEach(feature=>{
            this.map.addMarker({
            title: feature.title,
            icon: icons[feature.type].icon,
            animation: 'DROP',
            position: feature.position
          })
          .then(marker => {
                  marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                    
                    let alertVar = this.alertCtrl.create({
                            title: 'Ir',
                            message: 'Desea trazar el mapa a ' + marker.getTitle(),
                            buttons: [
                              {
                                text: 'Cancel',
                                role: 'cancel',
                                handler: () => {
                                 this.map.clear();
                                 this.addMarker();
                                }
                              },
                              {
                                text: 'Ir',
                                handler: () => {                              
                             this.startNavigating(marker.getPosition());                                    
                                }
                              }
                            ]
                          });
                          alertVar.present();
                                   
                  });
            })
           .catch(error =>{
             alert(error);
            }); 

       });

}




}

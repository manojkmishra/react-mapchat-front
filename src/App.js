import React, {Component} from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardText,CardTitle //,FormGroup,Label,Input,Form ,Button
} from 'reactstrap';
import L from 'leaflet';
var myIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});


class App extends Component 
{ state = { location: { lat: 51.505, lng: -0.09 },pin:'',stat:'',
            haveUsersLocation: false, zoom: 2,
            userMessage:{name:'',message:''}
          }
   formSubmitted = (event) => 
    { event.preventDefault();
      console.log('pressed- state',this.state)
    }
    valueChanged = (event) => 
    { const { name, value } = event.target;
      this.setState((prevState) => ({
              userMessage: { ...prevState.userMessage, [name]: value }
          }))
    }
  componentDidMount()
        { 
          
          navigator.geolocation.getCurrentPosition((position)=> 
                        { console.log('location access provided pos=',position.coords)  
                        fetch(`https://secure.geonames.org/findNearbyPostalCodesJSON?username=demo&lat=${position.coords.latitude}&lng=${position.coords.longitude}`)
                        //fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GEO_KEY}`)
                        .then(res=>res.json())
                            .then(loc=>{
                                console.log('geonames api location-',loc)
                                this.setState({location:{lat:position.coords.latitude,
                                  lng:position.coords.longitude},
                                  haveUsersLocation: true, zoom: 13,
                                  //google api
                                  //pin:loc.results[0].address_components[6].short_name,
                                  //stat:loc.results[0].address_components[4].short_name,
                                  //geonames api
                                  //pin:loc.results[0].address_components[6].short_name,
                                  //stat:loc.results[0].address_components[4].short_name,
                                  stat:loc.postalCodes[0].placeName.concat(', ',loc.postalCodes[0].adminCode1),
                                  pin:loc.postalCodes[0].postalCode,
                                            })
                            })  
                            console.log('componentDidMount-state',this.state)
                        },
                      ()=>{console.log('Browser location access not provided')
                            fetch('https://ipapi.co/json')
                            .then(res=>res.json())
                            .then(location=>{console.log('ipapi-location=',location)
                                              this.setState({location:{
                                                                lat:location.latitude,
                                                                lng:location.longitude
                                                              },
                                                              haveUsersLocation: true, zoom: 13,
                                                              pin:location.postal,
                                                              stat:location.region_code
                                                          })
                                            })
                          }
                  );
        }
  render()
      {  const position = [this.state.location.lat, this.state.location.lng]        
        //const position = [this.state.lat, this.state.lng]
        console.log('render-position',position)
        return (
            <div className="map" >
                <Map className="map" center={position} zoom={this.state.zoom} >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {this.state.haveUsersLocation ? 
                      <Marker position={position} icon={myIcon}>
                        <Popup> {this.state.pin}, {this.state.stat} </Popup>
                      </Marker>
                  :''}
                </Map>
              {
                <Card body className="message-form">
                  <CardTitle>Welcome</CardTitle>
                  <CardText>STATE : {this.state.stat}</CardText>
                  <CardText>ZIPCODE : {this.state.pin}</CardText>
{ /*
                  <Form onSubmit={this.formSubmitted}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input onChange={this.valueChanged} type="text" name="name" id="name" placeholder="Enter Name..." />
                    </FormGroup>
                    <FormGroup>
                      <Label for="message">Message</Label>
                      <Input onChange={this.valueChanged} type="textarea" name="message" id="message" placeholder="Enter Message..." />
                    </FormGroup>
                    <Button type="submit" color="info" disabled={!this.state.haveUsersLocation}>Send</Button>
                  </Form>
*/}
                </Card>
              }
            </div> 
      );
    }
}
export default App;

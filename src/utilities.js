export const destination = (address, city, state, zip) => {
  const googleMapsDestination =  'https://www.google.com/maps/dir/?api=1&destination=texadelphia,' + address + ',' + city + ',' + state + ' ' + zip
  const googleMapsDestinationGalveston = 'https://www.google.com/maps/dir/?api=1&destination=' + address + ',' + city + ',' + state + ' ' + zip

  if (city === 'Galveston') {
    return googleMapsDestinationGalveston
  } else {
    return googleMapsDestination
  }

}

// distance Matrix
// function to transform to radians
const Radians = degree => {
  return degree * Math.PI /180
}

// distance between two coordinates
class LatLng {
  constructor(lat, lng) {
    this.lat = Number(lat)
    this.lng = Number(lng)
  }

  distanceTo(point) {
    if (!(point instanceof LatLng)) throw new TypeError ('not a LatLon object')

    const radius = 6371e3
    const PHI1 = Radians(this.lat)
    const LAMBDA1 = Radians(this.lng)
    const PHI2 = Radians(point.lat)
    const LAMBDA2 = Radians(point.lng)
    const DeltaPhi = PHI2 - PHI1
    const DeltaLambda = LAMBDA2 - LAMBDA1
    const a = Math.sin(DeltaPhi/2) * Math.sin(DeltaPhi/2) + Math.cos(PHI1) * Math.cos(PHI2) * Math.sin(DeltaLambda/2) * Math.sin(DeltaLambda/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    // return distance in meters
    return radius * c
  }

}

// origin {lat: 333, lng: 333} destination [{lat: 111, lng: 222}, {lat: 333, lng: 444}...]
export const distanceMatrix = (origin, destinationMatrix) => {
  const o = new LatLng(origin.lat, origin.lng);

  // return distance array
  return destinationMatrix.map(destination => {
    const d = new LatLng(destination.lat, destination.lng)
    return o.distanceTo(d)
  })

}

// end distance matrix
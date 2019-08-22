
export interface GeocodingResponse {
    results: GeocodingResult[],
    status: GeocodingResponseStatus,
}

interface GeocodingResult {
    address_components: GeocodingAddressComponent[],
    formatted_address: string,
    geometry: GeocodingGeometry,
    place_id: string,
    types: GeocodingAddressType[]
}

interface GeocodingGeometry {
    location: GeocodingGeometryLocation,
    location_type: GeocodingLocationType,
    viewport: {
        northeast: GeocodingGeometryLocation,
        southwest: GeocodingGeometryLocation
    }
}

interface GeocodingGeometryLocation {
    lat: number,
    lng: number,
}

export enum GeocodingLocationType {
    rooftop = 'ROOFTOP',
    rangeInterpolated = 'RANGE_INTERPOLATED',
    geometricCenter = 'GEOMETRIC_CENTER',
    approximate = 'APPROXIMATE',
}

interface GeocodingAddressComponent {
    long_name: string,
    short_name: string,
    types: GeocodingAddressType[],
}

/**
 * Non-exhaustive and subject to changes by Google Cloud Platform.
 * https://developers.google.com/maps/documentation/geocoding/intro#Types
 */
export enum GeocodingAddressType {
    streetAddress = 'street_address',
    route = 'route',
    intersection = 'intersection',
    political = 'political',
    country = 'country',
    administrativeAreaLevel1 = 'administrative_area_level_1',
    administrativeAreaLevel2 = 'administrative_area_level_2',
    administrativeAreaLevel3 = 'administrative_area_level_3',
    administrativeAreaLevel4 = 'administrative_area_level_4',
    administrativeAreaLevel5 = 'administrative_area_level_5',
    colloquialArea = 'colloquial_area',
    locality = 'locality',
    sublocality = 'sublocality',
    neighborhood = 'neighborhood',
    premise = 'premise',
    subpremise = 'subpremise',
    postalCode = 'postal_code',
    naturalFeature = 'natural_feature',
    airport = 'airport',
    park = 'park',
    pointOfInterest = 'point_of_interest',
    floor = 'floor',
    establishment = 'establishment',
    parking = 'parking',
    postBox = 'post_box',
    postalTown = 'postal_town',
}

export enum GeocodingResponseStatus {
    Ok = 'OK',
    ZeroResults = 'ZERO_RESULTS',
    OverDailyLimit = 'OVER_DAILY_LIMIT',
    OverQueryLimit = 'OVER_QUERY_LIMIT',
    RequestDenied = 'REQUEST_DENIED',
    InvalidRequest = 'INVALID_REQUEST',
    UnknownError = 'UNKNOWN_ERROR',
}
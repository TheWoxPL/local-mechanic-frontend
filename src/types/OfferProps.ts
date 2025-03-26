export interface OfferProps {
  uuid: string;
  isFavorite: boolean;
  img: string; // The type should remain as `string` since it likely represents a URL or path to the image.
  name: string;
  company: string;
  location: string;
  price: string;
  serviceUnit: string;
  rating: number;
  countOpinions: number;
  distance: string;
  estimatedTime: string;
  availability: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  blur: string;
  title: string;
  alt: string;
}

export interface PhotoLightboxLabels {
  viewer: string;
  close: string;
  previous: string;
  next: string;
  counter: string;
  thumbnails: string;
  shortcuts: string;
}

export interface PhotoCarouselLabels {
  label: string;
  previous: string;
  next: string;
  pause: string;
  play: string;
  goToSlide: string;
  slideCounter: string;
}

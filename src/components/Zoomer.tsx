import { Level } from '../loaders';
import { MagnifiedImage, StyledZoomer } from '../styles/LevelPage.styled';
import type { SelectorPos, ZoomPos } from './LevelPage';

type ZoomerProps = {
  imageURL: Level['image_url'];
  urlParameter: Level['url_parameter'];
  coordinates: SelectorPos;
  zoom: ZoomPos;
  showZoomer: boolean;
};

export default function Zoomer({
  imageURL,
  urlParameter,
  coordinates,
  zoom,
  showZoomer,
}: ZoomerProps) {
  return (
    <StyledZoomer
      className={showZoomer ? 'show' : 'hide'}
      coordinates={coordinates}
    >
      <MagnifiedImage
        src={imageURL}
        alt={`Magnifying Glass for Where's Wally Image - Level ${urlParameter}`}
        zoom={zoom}
      />
    </StyledZoomer>
  );
}

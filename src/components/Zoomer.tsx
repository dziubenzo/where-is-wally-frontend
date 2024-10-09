import { Level } from '../loaders';
import { MagnifiedImage, StyledZoomer } from '../styles/LevelPage.styled';
import type { SelectorPos, ZoomPos } from './LevelPage';

type ZoomerProps = {
  imageURL: Level['image_url'];
  urlParameter: Level['url_parameter'];
  coordinates: SelectorPos;
  zoom: ZoomPos;
};

export default function Zoomer({
  imageURL,
  urlParameter,
  coordinates,
  zoom,
}: ZoomerProps) {
  return (
    <StyledZoomer coordinates={coordinates}>
      <MagnifiedImage
        src={imageURL}
        alt={`Magnifying Glass for Where's Wally Image - Level ${urlParameter}`}
        zoom={zoom}
      />
    </StyledZoomer>
  );
}

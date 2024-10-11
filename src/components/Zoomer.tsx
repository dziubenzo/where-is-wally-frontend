import { Level } from '../loaders';
import { MagnifiedImage, StyledZoomer } from '../styles/LevelPage.styled';
import type { SelectorPos, ZoomerPos } from './LevelPage';

type ZoomerProps = {
  imageURL: Level['image_url'];
  urlParameter: Level['url_parameter'];
  coordinates: SelectorPos;
  zoomer: ZoomerPos;
  showZoomer: boolean;
};

export default function Zoomer({
  imageURL,
  urlParameter,
  coordinates,
  zoomer,
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
        zoomer={zoomer}
      />
    </StyledZoomer>
  );
}

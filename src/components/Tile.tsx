import React from 'react';
import './Tile.css';

interface Props {
  tilePos: { x: number, y: number },
  imgPos: { x: number, y: number },
  imgSrc: string,
  tileSize: number,
  isEmpty: boolean,
  onClickTile: () => void,
}

export const Tile: React.FC<Props> = ({ tilePos, imgPos, imgSrc, tileSize, isEmpty, onClickTile }) => {
  return (
    <button
      onClick={() => onClickTile()}
      className={"tile " + (isEmpty ? "empty" : "")} style={{
        width: tileSize,
        height: tileSize,
        overflow: 'hidden',
        position: 'absolute',
        top: tilePos.y * tileSize,
        left: tilePos.x * tileSize,
      }
      }>
      <img src={imgSrc} alt="img" style={{
        position: 'absolute',
        left: -imgPos.x * tileSize,
        top: -imgPos.y * tileSize,
      }} />
    </button >
  )
}
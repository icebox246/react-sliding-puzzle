import React from 'react'
import { Tile } from './Tile'
import './Board.css'

interface Props {
  tileCount: number,
  tiles: { x: number, y: number }[],
  imgSrc: string,
  imgSize: number,
  onClickTile: (pos: { x: number, y: number }, ind: number) => void,
  won: boolean,
}

export const Board: React.FC<Props> = ({ tileCount, tiles, imgSrc, imgSize, onClickTile, won }) => {
  return (
    <div className='board' style={{
      width: imgSize,
      height: imgSize,
    }}>
      {tiles.map((pos, ind) => (
        <Tile
          key={ind}
          tileSize={imgSize / tileCount}
          tilePos={pos}
          imgPos={{ x: ind % tileCount, y: Math.floor(ind / tileCount) }}
          imgSrc={imgSrc}
          isEmpty={(ind === tiles.length - 1) && !won}
          onClickTile={() => onClickTile(pos, ind)}
        />
      ))}
    </div>
  )
}

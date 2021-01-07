import React, { useCallback, useState } from 'react';
import { Board } from './Board'
import './Game.css'

const TILE_COUNT = 3;
// const IMAGE_SOURCE = "https://placekitten.com/600/600"
const IMAGE_SIZE = 600;
const SHUFFLE_MOVES = 100;

const generateTiles = () => {
  const tiles = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    for (let j = 0; j < TILE_COUNT; j++) {
      tiles.push({ x: j, y: i });
    }
  }
  return tiles;
}



const Game: React.FC = () => {
  const [tiles, setTiles] = useState(generateTiles());
  const [won, setWon] = useState(true);
  const [imageSource, setImageSource] = useState("https://picsum.photos/id/1062/600/600");
  const [imgAuthor, setImgAuthor] = useState('Matthew Wiebe');

  const generateImage = useCallback(() => {
    fetch("https://picsum.photos/" + IMAGE_SIZE)
      .then(res => {
        setImageSource(res.url);
        const authorCheckUrl = "https://picsum.photos/" + res.url.split('/').slice(3, 5).join('/') + '/info';
        console.log(authorCheckUrl)
        fetch(authorCheckUrl).then(res => res.json()).then(res => {
          setImgAuthor(res.author)
          console.log(res)
        });
      });
  }, [setImageSource, setImgAuthor]);

  const handleClickTile = useCallback((target: { x: number, y: number }, ind: number) => {
    if (won) return;
    const { x, y } = tiles[tiles.length - 1];

    if (Math.abs(target.x - x) + Math.abs(target.y - y) === 1) {
      const newTiles = tiles.slice();
      newTiles[ind] = { x, y };
      newTiles[tiles.length - 1] = target;
      if (newTiles[tiles.length - 1].x === TILE_COUNT - 1 && newTiles[tiles.length - 1].y === TILE_COUNT - 1) {
        // check for win
        let flag: boolean = false;
        newTiles.forEach((v, i) => {
          flag = flag || (v.x !== i % TILE_COUNT) || (v.y !== Math.floor(i / TILE_COUNT));
        });

        if (!flag) {
          setWon(true);
        }
      }
      setTiles(newTiles);
    }

  }, [tiles, setTiles, won, setWon]);

  const handleRestart = useCallback(() => {
    setWon(false);
    const newTiles = generateTiles();
    let lastMove = -1;

    for (let i = 0; i < SHUFFLE_MOVES; i++) {
      const possibleMoves = [];
      const { x, y } = newTiles[tiles.length - 1];
      if (x > 0 && lastMove !== 0) possibleMoves.push({ x: x - 1, y });
      if (y > 0 && lastMove !== 1) possibleMoves.push({ x, y: y - 1 });
      if (x < TILE_COUNT - 1 && lastMove !== 2) possibleMoves.push({ x: x + 1, y });
      if (y < TILE_COUNT - 1 && lastMove !== 3) possibleMoves.push({ x, y: y + 1 });

      lastMove = Math.floor(Math.random() * possibleMoves.length);
      const target = possibleMoves[lastMove];
      const ind = newTiles.findIndex(value => (value.x === target.x && value.y === target.y))
      if (ind < 0) {
        continue;
      }

      newTiles[ind] = { x, y };
      newTiles[tiles.length - 1] = target;
    }
    setTiles(newTiles);
  }, [tiles, setTiles, setWon])

  const handleSolve = useCallback(() => {
    setWon(true);
    setTiles(generateTiles());
  }, [setTiles, setWon]);

  return (
    <div className="game">
      <h1 className={won ? "victory" : ""}>
        Amazing<br />
        sliding <br />
        puzzle
      </h1>
      <Board won={won} onClickTile={(target, ind) => handleClickTile(target, ind)} imgSize={IMAGE_SIZE} tiles={tiles} tileCount={TILE_COUNT} imgSrc={imageSource} />
      <div className="buttons">
        <button title={won ? "Play" : "Reshuffle"} onClick={() => handleRestart()} className="butt restart">{won ? "⯈" : "⭮"}</button>
        <button title="Solve" onClick={() => handleSolve()} className="butt solve">≊</button>
        <button title="New Image" onClick={() => generateImage()} className="butt new">⸬</button>
        <p>Image by: {imgAuthor}</p>
      </div>
    </div>
  );
}

export default Game;
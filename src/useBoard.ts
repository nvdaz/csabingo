import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startOfWeek } from 'date-fns';
import { selectTiles, selectWeek, setTiles } from './features/boardSlice';
import { createBoard } from './quotes';

export default function useBoard() {
  const dispatch = useDispatch();
  const tiles = useSelector(selectTiles);
  const week = useSelector(selectWeek);

  const resetBoard = useCallback(() => {
    dispatch(setTiles(createBoard()));
  }, []);

  const checkWeek = useCallback(() => {
    const currentWeek = startOfWeek(Date.now()).getTime();
    if (week < currentWeek) {
      resetBoard();
    }
  }, [week]);

  useEffect(() => {
    if (tiles === null) {
      resetBoard();
    }

    checkWeek();
    const interval = setInterval(() => checkWeek, 10000);

    return () => clearInterval(interval);
  }, [tiles]);

  return tiles || [];
}

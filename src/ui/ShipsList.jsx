function ShipsList({ ships }) {
  return (
    <ul>
      {ships.map((ship) => {
        return (
          <li
            key={ship.shipId}
            className={ship.hits === ship.numOfTiles ? "cross-text-style" : ""}
          >
            {ship.shipName} ( {ship.numOfTiles} )
          </li>
        );
      })}
    </ul>
  );
}

export default ShipsList;

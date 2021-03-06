import React from "react";
import OwnershipStars from "../../../shared/OwnershipStars";
import { getCardImage } from "../../../shared/util";
import { TableViewRow } from "../tables/TableViewRow";
import { CollectionTableRowProps } from "./types";
import useHoverCard from "../../hooks/useHoverCard";
import { AppState } from "../../../shared-redux/stores/rendererStore";
import { useSelector } from "react-redux";

export function CardTableViewRow({
  row,
  contextMenuCallback,
  openCardCallback,
  ...otherProps
}: CollectionTableRowProps): JSX.Element {
  const card = row.original;
  const onClick = React.useCallback(() => {
    openCardCallback(card);
  }, [card, openCardCallback]);
  const containerEl = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const containerDiv = containerEl.current;
    if (containerDiv) {
      contextMenuCallback(containerDiv, card);
    }
  }, [card, containerEl, contextMenuCallback]);

  const [hoverIn, hoverOut] = useHoverCard(card.id, card.wanted);

  return (
    <span ref={containerEl}>
      <TableViewRow
        row={row}
        title={`open ${card.name} in Scryfall (browser)`}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        onClick={onClick}
        {...otherProps}
      />
    </span>
  );
}

export function CardTileRow({
  row,
  contextMenuCallback,
  openCardCallback
}: CollectionTableRowProps): JSX.Element {
  const card = row.original;
  const onClick = React.useCallback(() => {
    openCardCallback(card);
  }, [card, openCardCallback]);
  const containerEl = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const containerDiv = containerEl.current;
    if (containerDiv) {
      contextMenuCallback(containerDiv, card);
    }
  }, [card, contextMenuCallback]);

  const [hoverIn, hoverOut] = useHoverCard(card.id, card.wanted);

  const cardSize =
    100 + useSelector((state: AppState) => state.settings.cards_size) * 15;
  const cardsQuality = useSelector(
    (state: AppState) => state.settings.cards_quality
  );

  return (
    <div
      ref={containerEl}
      title={`open ${card.name} in Scryfall (browser)`}
      onClick={onClick}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "100%" }}>
        <OwnershipStars card={card} wanted={card.wanted} />
      </div>
      <div
        className={"inventory_card"}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        style={{ width: cardSize + "px" }}
      >
        <img
          className={"inventory_card_img"}
          style={{ width: cardSize + "px" }}
          src={getCardImage(card, cardsQuality)}
        />
      </div>
    </div>
  );
}

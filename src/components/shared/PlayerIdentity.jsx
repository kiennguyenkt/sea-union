export function PlayerIdentity({ player, faction, nodeCount }) {
  return (
    <>
      <span
        className="avatar"
        style={{ color: faction.color, background: `${faction.color}18` }}
      >
        {player.name[0]}
      </span>
      <div className="player-name">
        {player.name}
        <small style={{ color: faction.color }}>
          {faction.name}
          {nodeCount !== undefined && ` · ${nodeCount} đảo`}
        </small>
      </div>
    </>
  );
}

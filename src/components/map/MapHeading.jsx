export function MapHeading({ islandCount, baseCount }) {
  return (
    <div className="map-heading">
      <div>
        <div className="eyebrow">CHIẾN TRƯỜNG / TỔNG QUAN</div>
        <h1>
          Đại hải trình<span>01</span>
        </h1>
      </div>
      <div className="map-count">
        <b>{islandCount}</b> cứ điểm <span>·</span> <b>{baseCount}</b> căn cứ
      </div>
    </div>
  );
}

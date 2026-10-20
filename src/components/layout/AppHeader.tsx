import { Anchor } from "lucide-react";

export function AppHeader() {
  return (
    <header>
      <div className="brand">
        <div className="brand-icon">
          <Anchor size={25} />
        </div>
        <div>
          SEA UNION<small>TACTICAL ATLAS</small>
        </div>
      </div>
      <div className="header-divider" />
      <span className="header-title">Bản đồ chiến thuật</span>
      <div className="header-right">
        <span className="demo-badge">
          <i /> DEMO / DỮ LIỆU MẪU
        </span>
        <span className="version">PHASE 01</span>
      </div>
    </header>
  );
}

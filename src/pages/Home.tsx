import MarketMap from "../components/map/MarketMap";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>마잉 상권분석 홈</h1>
      <p>지도를 클릭하면 반경 300m 상권이 표시됩니다.</p>

      <MarketMap />
    </div>
  );
}

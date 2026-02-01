// 📁 src/components/MarketMap.tsx
// 네이버 지도 - 1회 생성 + 클릭 시 반경 300m 표시

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

export default function MarketMap() {
  // 🔹 지도 DOM
  const mapDivRef = useRef<HTMLDivElement | null>(null);

  // 🔹 네이버 지도 인스턴스 (단 1회)
  const mapInstanceRef = useRef<any>(null);

  // 🔹 클릭 마커
  const markerRef = useRef<any>(null);

  // 🔹 반경 원
  const circleRef = useRef<any>(null);

  useEffect(() => {
    // ✅ DOM 없으면 중단
    if (!mapDivRef.current) return;

    // ✅ 이미 지도 생성됐으면 재생성 금지 (StrictMode 방어)
    if (mapInstanceRef.current) return;

    // ✅ 네이버 지도 SDK 로드 확인
    if (!window.naver || !window.naver.maps) {
      console.error("❌ 네이버 지도 SDK 아직 로드되지 않음");
      return;
    }

    const { naver } = window;

    // 📍 초기 중심 (서울시청)
    const center = new naver.maps.LatLng(37.5665, 126.9780);

    // 🗺 지도 생성 (단 1회)
    const map = new naver.maps.Map(mapDivRef.current, {
      center,
      zoom: 16,
    });

    mapInstanceRef.current = map;

    // 🖱 지도 클릭 이벤트
    naver.maps.Event.addListener(map, "click", (e: any) => {
      const latlng = e.coord;

      console.log("선택 좌표:", latlng.lat(), latlng.lng());

      // 🔴 기존 마커 제거
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // 📍 새 마커 생성
      markerRef.current = new naver.maps.Marker({
        position: latlng,
        map,
      });

      // 🔵 기존 반경 원 제거
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }

      // ⭕ 반경 300m 원 생성
      circleRef.current = new naver.maps.Circle({
        map,
        center: latlng,
        radius: 300,
        strokeColor: "#6366f1", // indigo-500
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: "#6366f1",
        fillOpacity: 0.15,
      });
    });
  }, []);

  return (
    <div
      ref={mapDivRef}
      style={{
        width: "100%",
        height: "420px",
        borderRadius: "12px",
        background: "#f3f4f6", // 로딩 전 회색 배경
      }}
    />
  );
}

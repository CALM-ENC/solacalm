export const SITE_URL = "https://solacalm.co.kr";

export const PAGE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "솔라캄 | 지붕 태양광 임대·발전소 분양",
    description: "솔라캄에서 공장·축사·창고 지붕의 태양광 설치 가능성과 예상 수익을 확인하세요. 지붕 임대, 태양광 발전소 분양, 시공·유지관리와 무료 상담을 안내합니다.",
  },
  "/power": {
    title: "태양광 발전소 분양·발전수익 | 솔라캄",
    description: "내 지붕에 태양광 발전소를 설치하고 발전수익을 확인하세요. 솔라캄의 발전소 분양, 자금 조달, 인허가·시공·유지관리 절차를 안내합니다.",
  },
  "/rental": {
    title: "공장·축사 지붕 태양광 임대 | 솔라캄",
    description: "공장·축사·창고 지붕을 활용한 태양광 임대수익을 알아보세요. 솔라캄의 지붕 임대 조건, 설치·유지관리와 예상 임대료를 무료로 상담받을 수 있습니다.",
  },
  "/roof": {
    title: "태양광 설치 가능한 지붕 소개하기 | 솔라캄",
    description: "태양광 설치를 검토할 공장·축사·창고 지붕을 솔라캄에 소개해 주세요. 적합한 지붕의 조건과 현장 검토, 설치 진행 절차를 안내합니다.",
  },
  "/contractor": {
    title: "태양광 시공사 파트너 모집 | 솔라캄",
    description: "솔라캄과 함께할 태양광 시공사 파트너를 모집합니다. 협력업체 자격 요건과 업무 범위를 확인하고 시공사 파트너로 신청하세요.",
  },
  "/partner": {
    title: "태양광 영업 파트너 모집 | 솔라캄",
    description: "솔라캄의 태양광 영업 파트너로 참여하세요. 지붕주 연결과 계약 상담 등 파트너의 역할, 협력 절차와 신청 방법을 안내합니다.",
  },
};

export function getPageSeo(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = Object.prototype.hasOwnProperty.call(PAGE_SEO, path) ? PAGE_SEO[path] : undefined;
  return {
    ...(page ?? { title: "페이지를 찾을 수 없습니다 | 솔라캄", description: "요청하신 페이지를 찾을 수 없습니다. 솔라캄 홈페이지에서 필요한 정보를 확인해 주세요." }),
    canonical: `${SITE_URL}${path === "/" ? "/" : path}`,
    robots: page ? "index, follow" : "noindex, follow",
  };
}

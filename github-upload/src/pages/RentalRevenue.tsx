import svgPaths from "@/imports/웹사이트제작요청-6/svg-asolaxogx3";
import heroImg from "@/imports/웹사이트제작요청-6/813c4718d222aaec7eddb2a47f476b0cf9c9f561.png";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Container, SectionTitle } from "@/components/primitives";
import LeadForm from "@/components/LeadForm";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <div
      className={`relative shrink-0 size-[29px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="29.0001"
        preserveAspectRatio="none"
        viewBox="0 0 29.0001 29.0001"
        width="29.0001"
      >
        <path
          d={svgPaths.p3582b900}
          stroke="#7A827D"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.41668"
        />
      </svg>
    </div>
  );
}

function SolacalmLogoYellow() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-[137px]">
      <div className="absolute inset-[0_81.87%_0.01%_0]">
        <svg className="absolute block inset-0 size-full" fill="none" height="23.9982" preserveAspectRatio="none" viewBox="0 0 24.8322 23.9982" width="24.8322">
          <path d={svgPaths.p2b76cf40} fill="#E9F64B" />
          <path d={svgPaths.p2b744780} fill="#E9F64B" />
        </svg>
      </div>
      <div className="absolute inset-[11.46%_0_11.62%_21.82%]">
        <svg className="absolute block inset-0 size-full" fill="none" height="18.4617" preserveAspectRatio="none" viewBox="0 0 107.102 18.4617" width="107.102">
          <path d={svgPaths.p15f07480} fill="#E9F64B" />
          <path d={svgPaths.p170527b0} fill="#E9F64B" />
          <path d={svgPaths.p11072d00} fill="#E9F64B" />
          <path d={svgPaths.p10f85300} fill="#E9F64B" />
          <path d={svgPaths.p10954600} fill="#E9F64B" />
          <path d={svgPaths.p1918a700} fill="#E9F64B" />
          <path d={svgPaths.p14538500} fill="#E9F64B" />
          <path d={svgPaths.p36c38480} fill="#E9F64B" />
        </svg>
      </div>
    </div>
  );
}

const reasonCards = [
  {
    n: "01 HIGHER YIELD",
    title: "kW당 연 4만원 업계 최고 수준 임대료",
    desc: "100kW 지붕 기준 20년 최대 8,000만원. 업계 평균 3만원 대비\n33% 높은 임대료를 지급합니다.",
  },
  {
    n: "02 인허가",
    title: "AI 인허가 자동화",
    desc: "지자체별 서류를 AI가 자동 생성 며칠 걸리던 작업이 몇 시간 내에",
  },
  {
    n: "03 자금 조달",
    title: "자체 투자 플랫폼",
    desc: "외부 대출 없이 자체 재원으로\n계약 즉시 시공 착수",
  },
  {
    n: "04 관리",
    title: "인버터 원격 관제",
    desc: "24시간 원격 관제로 발전 이상 유무 상시 감시\n이상 발생 시 지역 담당팀 즉시 출동",
  },
  {
    n: "05 보험",
    title: "한화손해보험 배상책임",
    desc: "총 20억 한도 배상책임 보험\n방수 · 구조 무상 진단",
  },
];

const rentalRows = [
  { yr: "1년차",  rent: "400만원", cum: "400만원",   note: "임대 개시" },
  { yr: "5년차",  rent: "400만원", cum: "2,000만원", note: "-" },
  { yr: "10년차", rent: "400만원", cum: "4,000만원", note: "-" },
  { yr: "15년차", rent: "400만원", cum: "6,000만원", note: "-" },
];

const financeRows = [
  { label: "연간 임대료",          value: "400만",           unit: "100kW × 4만원 기준" },
  { label: "월 환산",              value: "약 33만원",       unit: "연 400만 ÷ 12" },
  { label: "전기안전관리자 선임",  value: "무상 대행",       unit: "무상" },
  { label: "O&M 유지관리 (20년)", value: "무상",            unit: "솔라캄이 관리 대행" },
];

export default function RentalRevenue() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "지붕이 오래됐거나 방수가 걱정이에요",
      a: "지붕 상태를 무상으로 점검해 드립니다. 문제 발견 시 부분 방수 보수도 솔라캄이 진행하며, 기존 방수층을 훼손하지 않는 공법으로 시공합니다.",
    },
    {
      q: "20년 후 태양광 설비는 어떻게 되나요?",
      a: "계약 만료 시 3가지 옵션 중 선택할 수 있습니다. 1. 무상 이전 (설비 소유권 이전 + 발전 수익 100% 임대주 귀속)  2. 재계약  3. 원상복구",
    },
    {
      q: "건물을 매각하면 계약은 어떻게 되나요?",
      a: "임대차 계약은 새 소유주에게 자동 승계됩니다. 임대료도 신규 소유주에게 지급되며, 계약 조건은 그대로 유지됩니다.",
    },
  ];

  return (
    <div className="w-full">

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#f5f9e4] to-white w-full overflow-hidden flex flex-col items-center">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center md:justify-between gap-8 md:gap-0 min-h-[auto] md:h-[804px] max-w-[1152px] py-12 md:pb-[30px] md:pt-0 px-5 md:px-8 w-full">
          <div className="pr-hero-text flex flex-[1_0_0] flex-col gap-10 items-start max-w-[672px] min-w-px">
            <div className="flex flex-col gap-4 items-start font-['Pretendard:Bold',sans-serif] not-italic">
              <p className="leading-[1.5] text-[#7e8a96] text-[15px] md:text-[25px]">임대수익 받기</p>
              <h1 className="text-[#1f2129] text-[32px] sm:text-[44px] md:text-[60px] leading-[1.3] flex flex-col gap-1">
                <span>투자금 0원으로</span>
                <span>20년 확정 임대료</span>
              </h1>
            </div>
            <a
              href="#lead"
              className="bg-[#1f2129] flex items-center justify-center px-6 py-4 md:px-[36px] md:py-[20px] rounded-[7px] no-underline transition-all duration-200 hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[17px] md:text-[22px] text-center text-white">
                견적 요청하기
              </span>
            </a>
          </div>
          <div className="hidden md:block pr-hero-img bg-white overflow-hidden relative rounded-[30px] shrink-0 size-[480px] transition-transform duration-700 hover:scale-[1.015]">
            <div className="absolute h-[728px] left-0 top-[-124px] w-[485px]">
              <img
                alt="태양광 패널이 설치된 지붕"
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={heroImg}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. 5 REASONS ──────────────────────────────────────────────── */}
      <div className="bg-white w-full flex flex-col items-center overflow-hidden">
        <div className="flex flex-col gap-8 items-start max-w-[1152px] pb-12 md:pb-[120px] pt-12 md:pt-[160px] px-5 md:px-8 w-full">
          <Reveal>
            <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[22px] md:text-[38px]">
              솔라캄이 다른 5가지 이유
            </p>
          </Reveal>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 not-italic w-full">
            {reasonCards.map((card, i) => (
              <Reveal key={card.n} delay={i * 90} className="self-stretch">
                <div className="bg-[#eff2f5] flex flex-col items-start justify-between p-5 sm:p-6 rounded-[12px] h-full transition-all duration-300 hover:bg-[#e6eaf0] hover:-translate-y-1 hover:shadow-md cursor-default">
                  <p className="font-['Pretendard_Variable:SemiBold',sans-serif] leading-[1.36] text-[#5d6700] text-[14px] sm:text-[16px]">
                    {card.n}
                  </p>
                  <div className="flex flex-col gap-1 items-start mt-4">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] leading-[1.36] text-[18px] sm:text-[22px] md:text-[24px] text-black break-keep">
                      {card.title}
                    </p>
                    <p className="font-['Pretendard_Variable:Medium',sans-serif] leading-[1.6] text-[14px] sm:text-[15px] text-[rgba(0,0,0,0.6)] whitespace-pre-line break-keep">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. DARK SECTION ────────────────────────────────────────────── */}
      <div className="bg-[#1f2129] w-full flex flex-col items-center">
        <div className="flex flex-col gap-14 md:gap-[100px] items-center max-w-[1152px] px-5 md:px-8 py-12 md:py-[160px] w-full">

          <Reveal>
            <div className="flex flex-col items-center justify-center max-w-[768px]">
              <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic text-[20px] sm:text-[26px] md:text-[38px] text-center text-white break-keep">
                지붕만 빌려주세요, 나머지는 솔라캄이 합니다
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 md:gap-[60px] items-center max-w-[1088px] w-full">
            {/* badge + big number */}
            <Reveal delay={80}>
              <div className="flex flex-col gap-6 items-center">
                <div className="flex flex-col gap-2 items-center">
                  <div className="bg-white flex items-start px-5 py-2 rounded-[7px]">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] leading-[1.6] not-italic text-[#1f2129] text-[16px] sm:text-[20px]">
                      20년 총 임대료
                    </p>
                  </div>
                  <p className="font-['Pretendard_Variable:Medium',sans-serif] leading-[1.6] not-italic text-[13px] sm:text-[15px] text-[rgba(255,255,255,0.6)] text-center">
                    100kW × 4만원 × 20년
                  </p>
                </div>
                <div className="flex flex-col gap-3 items-center not-italic">
                  <div
                    className="bg-clip-text font-['Pretendard_Variable:SemiBold',sans-serif] leading-none text-[46px] sm:text-[72px] md:text-[99px] text-[transparent]"
                    style={{ backgroundImage: "linear-gradient(127.05deg, rgb(255, 255, 255) 7.5546%, rgb(233, 246, 75) 96.19%)" }}
                  >
                    약 8,000만원
                  </div>
                  <p className="font-['Pretendard_Variable:SemiBold',sans-serif] leading-[1.36] text-[15px] sm:text-[20px] md:text-[24px] text-white">
                    임대주 부담 0원
                  </p>
                </div>
              </div>
            </Reveal>

            {/* financing cards */}
            <div className="flex flex-col gap-4 items-start w-full">
              {/* light card */}
              <Reveal className="w-full" delay={160}>
                <div className="bg-[#f2f3f5] flex flex-col gap-6 items-start p-5 sm:p-[30px] rounded-[16px] w-full">
                  <p className="font-['Pretendard_Variable:SemiBold',sans-serif] leading-[1.36] text-[#1f2129] text-[14px] sm:text-[16px]">핵심조건</p>
                  <div className="flex flex-col gap-2 items-start">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] leading-[1.3] text-[24px] sm:text-[30px] md:text-[34px] text-black break-keep">kW당 연 40,000원</p>
                    <p className="font-['Pretendard_Variable:SemiBold',sans-serif] leading-[1.6] text-[14px] sm:text-[18px] text-[#1f2129]">20년 확정 · 고정 지급</p>
                  </div>
                  <div className="h-[1px] w-full bg-[#E3E7EE]" />
                  <ul className="flex flex-col gap-1 font-['Pretendard_Variable:SemiBold',sans-serif] list-disc text-[13px] sm:text-[16px] md:text-[18px] text-black w-full pl-[18px]">
                    <li><span className="leading-[1.7]">임대주 부담 0원 (설치·관리·철거 무상)</span></li>
                    <li><span className="leading-[1.7]">전기안전관리자 선임 대행 (무상)</span></li>
                    <li><span className="leading-[1.7]">20년 무상 유지관리 · O&M 포함</span></li>
                    <li><span className="leading-[1.7]">한화손해보험 배상책임 · 계약 만료 시 무상 이전</span></li>
                  </ul>
                </div>
              </Reveal>

              {/* dark grid card */}
              <Reveal className="w-full" delay={220}>
                <div className="bg-[#3a3c46] rounded-[16px] px-5 sm:px-[30px] py-5 sm:py-[29px] w-full">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 sm:gap-x-8 gap-y-2 font-['Pretendard_Variable:SemiBold',sans-serif] text-[12px] sm:text-[15px] md:text-[16px]">
                    {financeRows.map((row, i) => (
                      <div key={i} className="contents">
                        <p className="text-white leading-[1.7] min-w-0 break-keep">{row.label}</p>
                        <p className="text-[#e9f64b] leading-[1.7] text-right">{row.value}</p>
                        <p className="text-[rgba(255,255,255,0.55)] leading-[1.7] text-right">{row.unit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal>
              <p className="font-['Pretendard_Variable:Medium',sans-serif] leading-[1.6] not-italic text-[12px] sm:text-[15px] text-[rgba(255,255,255,0.6)] text-center break-keep">
                * 지붕 면적· 방향· 일조량에 따라 실제 임대료는 달라질 수 있습니다.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── 4. INCOME TABLE ───────────────────────────────────────────── */}
      <div className="w-full flex flex-col items-center" style={{ background: "linear-gradient(180deg, #f2f3f5 49.956%, #f7fdd8 125.51%)" }}>
        <div className="flex flex-col gap-8 items-start max-w-[1152px] px-5 md:px-8 py-12 md:py-[160px] w-full">

          <Reveal>
            <div className="flex flex-col gap-2 items-start max-w-[768px] w-full">
              <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[22px] md:text-[38px]">
                임대 수익이 20년간 이렇게 쌓입니다
              </p>
              <p className="font-['Pretendard:Regular',sans-serif] leading-[1.5] not-italic text-[#1f2129] text-[12px] sm:text-[14px] md:text-[18px] break-keep">
                100kW 지붕 기준 · 20년간 연 400만원 정액
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="w-full">
            <div className="overflow-x-auto w-full rounded-[16px] border border-[#e2e6e3]">
              <table className="min-w-[400px] w-full border-collapse">
                <thead>
                  <tr className="bg-[#1f2129] text-white">
                    <th className="px-3 sm:px-5 py-4 text-left font-['Pretendard:SemiBold',sans-serif] text-[12px] sm:text-[15px] font-normal">년차</th>
                    <th className="px-3 sm:px-5 py-4 text-left font-['Pretendard:Bold',sans-serif] text-[12px] sm:text-[15px] font-normal">연간 임대료</th>
                    <th className="px-3 sm:px-5 py-4 text-left font-['Pretendard:Bold',sans-serif] text-[12px] sm:text-[15px] font-normal">누적 수익</th>
                    <th className="px-3 sm:px-5 py-4 text-left font-['Pretendard:Bold',sans-serif] text-[12px] sm:text-[15px] font-normal">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {rentalRows.map((row, i) => (
                    <tr key={row.yr} className={i % 2 === 0 ? "bg-white" : "bg-[#fafbfa]"}>
                      <td className="px-3 sm:px-5 py-[13px] font-['Pretendard:SemiBold',sans-serif] text-[12px] sm:text-[15px] text-[#101211]">{row.yr}</td>
                      <td className="px-3 sm:px-5 py-[13px] font-['Pretendard:Medium',sans-serif] text-[12px] sm:text-[15px] text-[#40453f]">{row.rent}</td>
                      <td className="px-3 sm:px-5 py-[13px] font-['Pretendard:Medium',sans-serif] text-[12px] sm:text-[15px] text-[#40453f]">{row.cum}</td>
                      <td className="px-3 sm:px-5 py-[13px] font-['Pretendard:Medium',sans-serif] text-[12px] sm:text-[15px] text-[#40453f]">{row.note}</td>
                    </tr>
                  ))}
                  {/* 20년차 highlight */}
                  <tr style={{ background: "linear-gradient(90deg, #f9f9f9 0%, #e9f64b 45.673%, #f9f9f9 100%)" }}>
                    <td className="px-3 sm:px-5 py-[13px] font-['Pretendard:SemiBold',sans-serif] text-[12px] sm:text-[15px] text-[#1f2129]">20년차</td>
                    <td className="px-3 sm:px-5 py-[13px] font-['Pretendard:SemiBold',sans-serif] text-[12px] sm:text-[15px] text-[#1f2129]">400만원</td>
                    <td className="px-3 sm:px-5 py-[13px] font-['Pretendard:SemiBold',sans-serif] text-[12px] sm:text-[15px] text-[#1f2129]">8,000만원</td>
                    <td className="px-3 sm:px-5 py-[13px] font-['Pretendard:SemiBold',sans-serif] text-[12px] sm:text-[15px] text-[#1f2129]">계약 만료 · 옵션 선택</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={160} className="w-full">
            <div className="flex flex-col gap-3 items-start max-w-[1088px] w-full">
              <div className="bg-[#1f2129] flex flex-col gap-5 items-start p-5 sm:p-[30px] rounded-[16px] w-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                  <div className="bg-[#3a3c46] flex items-start px-4 py-2 rounded-[7px]">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] leading-[1.6] not-italic text-[15px] sm:text-[20px] text-white">20년 총 임대료 누적</p>
                  </div>
                  <div
                    className="bg-clip-text font-['Pretendard_Variable:SemiBold',sans-serif] leading-none not-italic text-[34px] sm:text-[50px] text-[transparent]"
                    style={{ backgroundImage: "linear-gradient(127.15deg, rgb(255, 255, 255) 7.5546%, rgb(233, 246, 75) 96.19%)" }}
                  >
                    약 8,000만원
                  </div>
                </div>
                <div className="h-[1px] w-full bg-[rgba(227,231,238,0.3)]" />
                <p className="font-['Pretendard_Variable:SemiBold',sans-serif] leading-[1.6] not-italic text-[14px] sm:text-[18px] md:text-[22px] text-center text-white w-full break-keep">
                  임대주 부담 0원 · 발전 수익 변동과 무관하게 계약대로 지급
                </p>
              </div>
              <p className="font-['Pretendard:Regular',sans-serif] leading-[1.5] not-italic text-[#7a827d] text-[11px] sm:text-[13px] break-keep">
                *임대료 상승률은 계약 조건에 따라 조정 가능하며, 고정 계약도 선택 가능합니다.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 5. BUSINESS STRUCTURE ──────────────────────────────────────── */}
      <div className="bg-[#f5f9e4] w-full flex flex-col items-center">
        <div className="flex flex-col gap-8 md:gap-[40px] items-start max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px] w-full">

          <Reveal>
            <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[22px] md:text-[38px]">
              믿을 수 있는 사업 구조와 파트너
            </p>
          </Reveal>

          <Reveal delay={100} className="w-full">
            <div className="bg-white max-w-[1088px] rounded-[16px] w-full overflow-hidden">

              {/* ── 모바일 세로 레이아웃 (md 미만) ── */}
              <div className="flex md:hidden flex-col items-center gap-6 px-5 py-8">
                {/* 한국전력 */}
                <div className="bg-[#f2f3f5] flex flex-col gap-1 items-center justify-center rounded-full size-[160px] text-[#1f2129] text-center">
                  <p className="font-['Pretendard:Bold',sans-serif] text-[16px] leading-[1.4]">한국전력</p>
                  <p className="font-['Pretendard:Regular',sans-serif] text-[12px] leading-[1.4]">전기 · REC 매입</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#f0f8bd] px-3 py-1 rounded-full">
                    <p className="font-['Pretendard:SemiBold',sans-serif] text-[#7f910d] text-[11px]">↑ 전기 판매</p>
                  </div>
                  <div className="bg-[#f0f8bd] px-3 py-1 rounded-full">
                    <p className="font-['Pretendard:SemiBold',sans-serif] text-[#7f910d] text-[11px]">↓ 판매대금 지급</p>
                  </div>
                </div>
                {/* 지붕주 */}
                <div className="bg-[#f2f3f5] flex flex-col gap-2 items-center px-5 py-4 rounded-[14px] w-full max-w-[220px]">
                  <p className="font-['Pretendard:SemiBold',sans-serif] text-[12px] text-[#1f2129]">사업 주체</p>
                  <p className="font-['Pretendard:Bold',sans-serif] text-[20px] leading-[1.4] text-[#1f2129] text-center">축사·공장 지붕주</p>
                  <div className="bg-[#1f2129] flex items-center justify-center px-3 py-2 rounded-[8px] w-full">
                    <p className="font-['Pretendard:SemiBold',sans-serif] text-[12px] text-white">임대료 수취</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-[#f0f8bd] px-3 py-1 rounded-full">
                    <p className="font-['Pretendard:SemiBold',sans-serif] text-[#7f910d] text-[11px]">↑ 시공·운영관리 제공</p>
                  </div>
                  <div className="bg-[#f0f8bd] px-3 py-1 rounded-full">
                    <p className="font-['Pretendard:SemiBold',sans-serif] text-[#7f910d] text-[11px]">↓ 임대료 지급</p>
                  </div>
                </div>
                {/* 솔라캄 */}
                <div className="bg-[#101211] flex flex-col items-center justify-center pt-4 pb-3 rounded-full size-[160px]">
                  <SolacalmLogoYellow />
                  <p className="font-['Pretendard:Regular',sans-serif] text-[#f2f3f5] text-[12px] mt-1">관리 주체</p>
                </div>
              </div>

              {/* ── 데스크탑 가로 레이아웃 (md 이상) ── */}
              <div className="hidden md:flex items-center justify-center px-8 py-[40px]">
                <div className="flex gap-[28px] items-center justify-center">
                  {/* 한국전력 */}
                  <div className="bg-[#f2f3f5] flex flex-col gap-2 h-[160px] items-center justify-center not-italic p-6 rounded-full text-[#1f2129] text-center w-[160px] transition-transform duration-300 hover:scale-105">
                    <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] text-[18px]">한국전력</p>
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[1.5] text-[13px]">전기 · REC 매입</p>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <div className="bg-[#f0f8bd] flex items-center justify-center px-3 py-2 rounded-full">
                      <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic text-[#7f910d] text-[13px]">← 전기 판매</p>
                    </div>
                    <div className="bg-[#f0f8bd] flex items-center justify-center px-3 py-2 rounded-full">
                      <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic text-[#7f910d] text-[13px]">판매대금 지급 →</p>
                    </div>
                  </div>
                  {/* 지붕주 */}
                  <div className="bg-[#f2f3f5] flex flex-col gap-3 items-center px-5 py-5 rounded-[18px] transition-transform duration-300 hover:scale-105">
                    <div className="flex flex-col gap-2 items-center not-italic text-[#1f2129] text-center">
                      <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] text-[14px]">사업 주체</p>
                      <div className="font-['Pretendard:Bold',sans-serif] text-[20px] leading-[1.4] text-center">
                        <p>축사·공장</p>
                        <p>지붕주</p>
                      </div>
                    </div>
                    <div className="bg-[#1f2129] flex items-center justify-center px-4 py-2 rounded-[8px] w-full">
                      <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic text-[13px] text-white">임대료 수취</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <div className="bg-[#f0f8bd] flex items-center justify-center px-3 py-2 rounded-full">
                      <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic text-[#7f910d] text-[13px]">← 시공·운영관리 제공</p>
                    </div>
                    <div className="bg-[#f0f8bd] flex items-center justify-center px-3 py-2 rounded-full w-full">
                      <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.5] not-italic text-[#7f910d] text-[13px]">임대료 지급 →</p>
                    </div>
                  </div>
                  {/* 솔라캄 */}
                  <div className="bg-[#101211] flex flex-col items-center justify-center pt-4 rounded-full size-[160px] transition-transform duration-300 hover:scale-105">
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <SolacalmLogoYellow />
                      <p className="font-['Pretendard:Regular',sans-serif] leading-[1.5] not-italic text-[#f2f3f5] text-[13px] text-center">관리 주체</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Reveal>

          {/* partner cards */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-[40px] items-start max-w-[1088px] w-full">
            {[
              {
                name: "캄이앤씨",
                role: "시공사",
                lines: ["설계 · 시공 · 관리 일괄 수행 · 시공 품질 직접 책임", "전기공사업 면허 보유 · 하도급 없는 자체 시공"],
              },
              {
                name: "Solacalm 자체 관리 솔루션",
                role: "종합 관리",
                lines: ["24시간 발전 모니터링 · 리포트 제공", "전기안전관리자 선임 등 유지관리 · 태양광 보험지원"],
              },
              {
                name: "한화손해보험",
                role: "보험파트너",
                lines: ["배상책임 총 20억 · 방수·구조 관련 사고 보장", "시공 안전 확보"],
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 100} className="flex-1 min-w-0 w-full">
                <div className="flex flex-col gap-3 items-start pt-4 h-full">
                  <div className="flex flex-col font-['Pretendard:Bold',sans-serif] gap-1 items-start not-italic w-full">
                    <p className="leading-[1.4] text-[#101211] text-[17px] sm:text-[20px] break-keep">{p.name}</p>
                    <p className="leading-[1.4] text-[#70790f] text-[13px] sm:text-[16px]">{p.role}</p>
                  </div>
                  <div className="bg-[#e0e1d8] h-[1px] w-full" />
                  <div className="font-['Pretendard:Regular',sans-serif] not-italic text-[#40453f] text-[13px] sm:text-[15px]">
                    {p.lines.map((line, j) => (
                      <p key={j} className="leading-[1.7] break-keep">{line}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. FAQ ──────────────────────────────────────────────────────── */}
      <div className="bg-white w-full flex flex-col items-center">
        <div className="flex flex-col gap-6 md:gap-[30px] items-center max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px] w-full">

          <Reveal className="w-full">
            <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[22px] md:text-[38px]">
              자주 묻는 질문
            </p>
          </Reveal>

          <div className="flex flex-col gap-3 items-center max-w-[1106px] w-full">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 80} className="w-full">
                <div className="w-full rounded-[16px] overflow-hidden">
                  <button
                    className="bg-[#f2f3f5] flex gap-4 min-h-[70px] items-center px-5 sm:px-[30px] py-4 sm:py-[20px] w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#e8ecf0]"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    type="button"
                  >
                    <p className="font-['Pretendard:Medium',sans-serif] leading-[1.4] not-italic text-[#a9bf1e] text-[18px] shrink-0">Q.</p>
                    <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[14px] sm:text-[18px] flex-1 min-w-0 break-keep">{faq.q}</p>
                    <ChevronIcon open={openFaq === i} />
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === i ? "320px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <div className="bg-[#f8f9fa] px-5 sm:px-[30px] py-4 sm:py-[20px] border-t border-[#e8ecf0]">
                      <p className="font-['Pretendard:Regular',sans-serif] leading-[1.7] text-[#40453f] text-[13px] sm:text-[16px] break-keep">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lead form ────────────────────────────────────── */}
      <section id="lead" className="scroll-mt-20 bg-[#f3f5f9]">
        <Container className="grid items-start gap-12 py-20 sm:py-28 md:grid-cols-2 md:py-[120px]">
          <div className="flex flex-col gap-3">
            <SectionTitle>
              지붕 주소와 대략적인 면적만
              <br />알려주시면 가능해요
            </SectionTitle>
            <p className="text-[16px] leading-[1.5] text-ink sm:text-[20px]">
              예상 설치 용량과 수익을 무료로 산출해 드립니다.
            </p>
          </div>
          <LeadForm
            submitLabel="무료 견적 신청"
            fields={[
              { name: "name", label: "성함", required: true, placeholder: "홍길동" },
              { name: "phone", label: "연락처", required: true, placeholder: "010-0000-0000" },
              { name: "addr", label: "지붕 주소 (시·군·구)", required: true, placeholder: "전남 나주시" },
            ]}
          />
        </Container>
      </section>
    </div>
  );
}

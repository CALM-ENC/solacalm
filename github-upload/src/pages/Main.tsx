import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, SectionTitle } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";
import heroBg from "@/imports/메인-4/0529795647ba933d8f31b4d74a8d57aa974b28ae.png";
import section2Bg from "@/imports/메인-4/4598eb144a0b93d6f200e982b9da1c9898f5b4ea.png";
import imgDirect from "@/imports/메인-4/d8074349b471239d8e03feec2adc39036f67d015.png";
import imgWaterproof from "@/imports/메인-4/75f2b61cb3f7a9809a99218be8645fe822c9a5a5.png";
import imgLiability from "@/imports/메인-4/4c8a5721d49b268aac5da38851e58f2e30f5ffd2.png";
import imgHonest from "@/imports/메인-4/dfe4c75de36a84b3c96bac7231958e9457161a6c.png";

const TEL = "tel:01093339542";

const HERO_SLIDES = [
  { sub: "200평 지붕이면", main: "연 3,147만원", note: "*200평 지붕 발전 기준" },
  { sub: "투자금 0원으로", main: "20년간 8,000만원", note: "*200평 지붕 임대 기준" },
];

/* ── formatting helpers ───────────────────────────────────────── */
function fmtMan(man: number) {
  // man = amount in 만원. Show 억 for large values.
  if (man >= 10000) {
    const eok = man / 10000;
    return `${eok.toFixed(2).replace(/\.?0+$/, "")}억원`;
  }
  return `${Math.round(man).toLocaleString("ko-KR")}만원`;
}

const REGIONS = [
  { name: "서울·경기", factor: 1.0 },
  { name: "강원", factor: 0.98 },
  { name: "충청", factor: 1.03 },
  { name: "전라", factor: 1.06 },
  { name: "경상", factor: 1.05 },
  { name: "제주", factor: 1.02 },
];

/* ── comparison / area table data ─────────────────────────────── */
const COMPARE: [string, string, string][] = [
  ["발전소 소유", "지붕주", "솔라캄"],
  ["초기 투자금", "1,300만원부터", "0원"],
  ["지붕주 수입", "발전 수익 전액", "임대료 정액"],
  ["기간", "30년", "20년"],
  ["200평 기준 누적", "약 7.62억원", "8,000만원"],
  ["관리비 부담", "지붕주", "없음"],
  ["시세 변동 영향", "받음", "안 받음"],
  ["대출", "필요 (최대 90%)", "불필요"],
];

const AREA_ROWS: [string, string, string, string][] = [
  ["100평", "50kW", "1,573만원", "200만원"],
  ["200평", "100kW", "3,147만원", "400만원"],
  ["300평", "150kW", "4,720만원", "600만원"],
  ["500평", "250kW", "7,867만원", "1,000만원"],
  ["1,000평", "500kW", "1억 5,734만원", "2,000만원"],
];

const REASONS = [
  {
    n: "01",
    title: "하도급 없는 직접 시공",
    desc: "전기공사업 면허를 보유한 캄이앤씨가 직접 시공합니다. 하청 단계가 없어 책임 소재가 나뉘지 않습니다.",
    img: imgDirect,
  },
  {
    n: "02",
    title: "방수층을 건드리지 않습니다",
    desc: "무근콘크리트 일부만 타공하는 공법으로 기존 방수층은 그대로 둡니다. 착공 전후 두 번 방수 진단 보고서를 드립니다.",
    img: imgWaterproof,
  },
  {
    n: "03",
    title: "배상책임 20억",
    desc: "한화손해보험 배상책임 보험에 가입되어 있습니다. 대인 · 대물 1사고당 3억원, 총 한도 20억원.",
    img: imgLiability,
  },
  {
    n: "04",
    title: "숫자를 부풀리지 않습니다",
    desc: "발전시간 3.7시간, 단가 233원. 업계에서 쓰는 값 안쪽으로 잡았습니다. 계약 후에 달라지는 숫자는 적지 않습니다.",
    img: imgHonest,
  },
];

const STEPS = [
  { n: "01", label: "상담 · 신청", tag: "1주", desc: "지붕 주소와 면적만 알려주시면 예상 수익을 산출해 드립니다." },
  { n: "02", label: "현장 실사", tag: "1-2주", desc: "구조 안전성 검토와 방수 하자 진단, 설치 용량을 확정합니다." },
  { n: "03", label: "계약 · 인허가", tag: "6-12개월", desc: "발전사업 허가·개발행위 등 서류를 솔라캄이 대행합니다." },
  { n: "04", label: "시공", tag: "8-12주", desc: "구조물·모듈 설치, 전기공사와 계통 연계를 진행합니다." },
  { n: "05", label: "상업 운전", tag: "즉시", desc: "안전검사 통과 후 24시간 원격 관제와 월 리포트가 시작됩니다." },
];

/* ── ROI calculator ───────────────────────────────────────────── */
function Calculator() {
  const [area, setArea] = useState(200);
  const [region, setRegion] = useState(REGIONS[0].name);
  const [loan, setLoan] = useState(true);

  const result = useMemo(() => {
    const a = Math.max(0, area);
    const factor = REGIONS.find((r) => r.name === region)?.factor ?? 1;
    const capacityKw = a * 0.5;
    const year1 = a * 15.735 * factor; // 만원
    // 30-year cumulative with 0.5% annual degradation
    let cum = 0;
    const curve: number[] = [];
    for (let y = 0; y < 30; y++) {
      cum += year1 * Math.pow(0.995, y);
      curve.push(cum);
    }
    let net30 = cum;
    if (loan) net30 *= 0.94; // interest drag when financed
    return { capacityKw, year1, net30, curve };
  }, [area, region, loan]);

  // Build the cumulative curve path (viewBox 0 0 520 150)
  const path = useMemo(() => {
    const c = result.curve;
    const max = c[c.length - 1] || 1;
    const W = 520;
    const H = 150;
    const pts = c.map((v, i) => {
      const x = 6 + (i / (c.length - 1)) * (W - 12);
      const y = 6 + (1 - v / max) * (H - 12);
      return [x, y] as const;
    });
    const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${H - 6} L6 ${H - 6} Z`;
    return { line, area };
  }, [result.curve]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.18fr)]">
      {/* inputs */}
      <div className="flex flex-col gap-6 rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-[16px] font-semibold text-[#e4fa5c]">내 정보 입력하기</p>

        <label className="flex flex-col gap-2.5">
          <span className="text-[16px] font-semibold text-white/70">지붕 면적</span>
          <span className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full rounded-[7px] bg-[#101211] px-4 py-3 text-[16px] font-semibold text-white outline-none ring-[#e4fa5c]/60 transition focus:ring-2"
            />
            <span className="shrink-0 text-[16px] font-medium text-white/60">평</span>
          </span>
        </label>

        <label className="flex flex-col gap-2.5">
          <span className="text-[16px] font-semibold text-white/70">지역</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full appearance-none rounded-[7px] bg-[#101211] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%227%22 fill=%22none%22><path d=%22M1 1l5 5 5-5%22 stroke=%22white%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-[right_1rem_center] bg-no-repeat px-4 py-3 text-[15px] font-semibold text-white outline-none ring-[#e4fa5c]/60 transition focus:ring-2"
          >
            {REGIONS.map((r) => (
              <option key={r.name} value={r.name} className="bg-[#101211]">
                {r.name}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-2.5">
          <span className="text-[16px] font-semibold text-white/70">자금 조달</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: false, label: "자기자본 100%" },
              { key: true, label: "대출 활용" },
            ].map((opt) => (
              <button
                key={String(opt.key)}
                type="button"
                onClick={() => setLoan(opt.key)}
                className={`rounded-[7px] p-3 text-[13.5px] font-semibold transition ${
                  loan === opt.key
                    ? "bg-[#e4fa5c] text-[#101211]"
                    : "bg-[#101211] text-white/70 hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <a
          href="#lead"
          className="mt-auto rounded-[7px] bg-[#e4fa5c] py-4 text-center text-[18px] font-bold text-[#101211] transition hover:brightness-95"
        >
          상담 신청하기
        </a>
      </div>

      {/* results */}
      <div className="flex flex-col gap-5 rounded-2xl border border-white/15 bg-white/[0.04] p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-4 border-b border-white/15 pb-5 sm:grid-cols-3">
          <Stat label="예상 설치 용량" value={`${Math.round(result.capacityKw).toLocaleString("ko-KR")}kW`} />
          <Stat label="1년차 연 수익" value={fmtMan(result.year1)} accent />
          <Stat label="30년 누적 순수익" value={fmtMan(result.net30)} accent />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold text-white/50">30년 누적 순수익 곡선</p>
          <svg viewBox="0 0 520 150" className="h-auto w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mainCurve" x1="0" x2="0" y1="0" y2="1">
                <stop stopColor="#E4FA5C" stopOpacity="0.35" />
                <stop offset="1" stopColor="#E4FA5C" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={path.area} fill="url(#mainCurve)" />
            <path d={path.line} fill="none" stroke="#E4FA5C" strokeWidth="2.5" strokeLinejoin="round" />
          </svg>
          <div className="flex justify-between text-[13px] text-white/40">
            <span>1년차</span>
            <span>15년차</span>
            <span>30년차</span>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-1 text-[13px] leading-[1.5] text-white/45">
          <p>※ 위 수치는 지도 기준 추정치입니다. 실제 설치 가능 용량은 현장 실측 후 확정됩니다.</p>
          <p>※ 총 사업비는 용량에 비례하며 부가세 · 한전 계통 연계 비용은 별도입니다.</p>
          <p>※ 대출 원리금은 위 순수익에서 별도로 상환됩니다.</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[14px] font-semibold text-white/50">{label}</p>
      <p className={`text-[22px] font-bold ${accent ? "text-[#e4fa5c]" : "text-white"}`}>{value}</p>
    </div>
  );
}

/* ── revenue-model cards ──────────────────────────────────────── */
function ModelCard({
  title,
  subtitle,
  rows,
  cta,
  ctaDark,
  delay,
}: {
  title: string;
  subtitle: string;
  rows: [string, string][];
  cta: string;
  ctaDark?: boolean;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="flex flex-1 flex-col gap-7 rounded-2xl bg-surface p-8 sm:p-10"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-[24px] font-bold tracking-[-0.6px] text-ink sm:text-[26px]">{title}</h3>
        <p className="text-[15px] font-medium text-ink">{subtitle}</p>
      </div>
      <div className="h-px w-full bg-[#ccd0d8]" />
      <dl className="flex flex-col gap-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4">
            <dt className="text-[14px] font-medium text-ink">{k}</dt>
            <dd className="text-right text-[18px] font-semibold text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <a
        href="#lead"
        className={`mt-auto rounded-[7px] py-3.5 text-center text-[15px] font-bold transition hover:brightness-105 ${
          ctaDark ? "bg-ink text-white" : "bg-lime text-ink-strong"
        }`}
      >
        {cta}
      </a>
    </Reveal>
  );
}

export default function Main() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroVisible(false);
      setTimeout(() => {
        setHeroIdx((i) => (i + 1) % HERO_SLIDES.length);
        setHeroVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const heroSlide = HERO_SLIDES[heroIdx];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={heroBg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent" />
        <Container className="relative pt-40 pb-28 sm:pt-48 sm:pb-36 md:pt-56 md:pb-44">
          <div className="flex max-w-[672px] flex-col gap-10">
            <div
              className="flex flex-col gap-2.5"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              <h1 className="flex flex-col gap-2.5">
              <span className="block text-[26px] font-bold text-white sm:text-[32px] md:text-[34px]">{heroSlide.sub}</span>
              <span className="block text-[54px] font-bold leading-[1.05] text-[#e4fa5c] sm:text-[70px] md:text-[84px]">
                {heroSlide.main}
              </span>
              </h1>
              <p className="text-[14px] text-white/70">{heroSlide.note}</p>
            </div>
            <a
              href="#lead"
              className="w-fit rounded-[7px] bg-[#e4fa5c] px-9 py-5 text-[20px] font-bold text-ink-strong transition hover:brightness-95 sm:text-[22px]"
            >
              임대 신청하기
            </a>
          </div>
        </Container>
      </section>

      {/* ── Two models ── */}
      <section className="bg-white">
        <Container className="py-20 sm:py-28 md:py-[120px]">
          <Reveal>
            <SectionTitle className="mb-10 text-center">두 가지 방법으로<br className="sm:hidden" /> 수익을 만들어요</SectionTitle>
          </Reveal>
          <div className="flex flex-col gap-5 lg:flex-row">
            <ModelCard
              title="임대수익 받기"
              subtitle="지붕만 빌려주면 돼요"
              rows={[
                ["200평 기준", "연 400만원"],
                ["30년 누적", "약 8,000만원"],
                ["자기자본", "0원"],
              ]}
              cta="임대 신청하기"
              ctaDark
            />
            <ModelCard
              title="발전수익 받기"
              subtitle="내가 발전소 주인이 돼요"
              delay={90}
              rows={[
                ["200평 기준", "연 3,147만원"],
                ["30년 누적", "약 7.62억원"],
                ["자기자본", "1,300만원부터 · 대출 최대 90%"],
              ]}
              cta="무료 견적 받기"
              ctaDark
            />
          </div>
          <p className="mt-6 text-[14px] text-[#7a827d]">
            ※ 200평 = 100kW 기준 · 발전시간 3.7h/일 · SMP+REC 233원/kWh · 발전율 저하 연 0.5% 적용
          </p>
        </Container>
      </section>

      {/* ── Comparison table ── */}
      <section className="bg-surface">
        <Container className="py-20 sm:py-28 md:py-[120px]">
          <Reveal>
            <SectionTitle className="mb-8">어느 쪽이 나에게 맞을까?</SectionTitle>
          </Reveal>
          <Reveal delay={80} className="overflow-hidden rounded-2xl border border-[#e2e6e3]">
            <div className="grid grid-cols-3 bg-ink px-3 py-3 text-[13px] font-bold sm:px-6 sm:py-3.5 sm:text-[18px]">
              <span />
              <span className="text-[#e4fa5c]">
                발전수익<span className="hidden sm:inline"> <span className="font-medium text-[#848589]">100kW</span></span>
              </span>
              <span className="text-white">
                임대수익<span className="hidden sm:inline"> <span className="font-normal text-[#848589]">100kW</span></span>
              </span>
            </div>
            {COMPARE.map(([label, a, b], i) => (
              <div
                key={label}
                className={`grid grid-cols-3 px-3 py-2.5 text-[12px] sm:px-6 sm:py-3.5 sm:text-[16px] ${
                  i % 2 ? "bg-[#f9f9f9]" : "bg-white"
                }`}
              >
                <span className="font-semibold text-ink-strong">{label}</span>
                <span className="font-medium text-[#40453f]">{a}</span>
                <span className="font-medium text-[#40453f]">{b}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* ── Recommendation band ── */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src={section2Bg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 blur-[6px]"
        />
        <Container className="relative flex flex-col items-center gap-8 py-24 text-center sm:py-32">
          <Reveal className="text-[22px] font-bold leading-[1.6] text-white sm:text-[30px] md:text-[32px]">
            여유 자금이 있고<br />
            수익을 크게 가져가고 싶다면 <span className="text-[#e4fa5c]">발전수익</span>
          </Reveal>
          <Reveal delay={100} className="text-[22px] font-bold leading-[1.6] text-white sm:text-[30px] md:text-[32px]">
            적은 돈으로<br />
            매년 확정된 금액을 받고 싶다면<br />
            <span className="text-[#e4fa5c]">임대수익</span>을 추천드려요
          </Reveal>
        </Container>
      </section>

      {/* ── Area table ── */}
      <section className="bg-surface">
        <Container className="py-20 sm:py-28 md:py-[120px]">
          <Reveal>
            <SectionTitle className="mb-8 tracking-[-0.95px]">내 지붕 수익은 얼마일까?</SectionTitle>
          </Reveal>
          <Reveal delay={80} className="overflow-hidden rounded-2xl border border-[#e2e6e3]">
            <div className="grid grid-cols-4 bg-ink px-3 py-3 text-[11px] font-bold text-white sm:px-6 sm:py-3.5 sm:text-[16px]">
              <span>면적</span>
              <span>용량</span>
              <span>발전수익<span className="hidden sm:inline"> 1년차</span></span>
              <span>임대료<span className="hidden sm:inline"> 연</span></span>
            </div>
            {AREA_ROWS.map(([area, cap, gen, rent], i) => (
              <div
                key={area}
                className={`grid grid-cols-4 px-3 py-2.5 text-[12px] sm:px-6 sm:py-3.5 sm:text-[16px] ${
                  area === "200평"
                    ? "bg-gradient-to-r from-[#f9f9f9] via-[#e9f64b] to-[#f9f9f9]"
                    : i % 2
                      ? "bg-[#f9f9f9]"
                      : "bg-white"
                }`}
              >
                <span className="font-semibold text-ink-strong">{area}</span>
                <span className="font-normal text-[#40453f]">{cap}</span>
                <span className="font-semibold text-ink-strong">{gen}</span>
                <span className="font-normal text-[#40453f]">{rent}</span>
              </div>
            ))}
          </Reveal>
          <p className="mt-5 text-[14px] text-[#7a827d]">
            ※ 지도 기준 추정치입니다. 실제 설치 가능 용량은 건축도면 확인과 현장 실측 후 확정됩니다.
          </p>
        </Container>
      </section>

      {/* ── Calculator ── */}
      <section className="bg-ink">
        <Container className="flex flex-col items-center gap-14 py-20 sm:py-28 md:py-[120px]">
          <Reveal className="flex max-w-[768px] flex-col items-center gap-2.5 text-center">
            <h2 className="text-[30px] font-bold tracking-[-0.95px] text-white sm:text-[36px] md:text-[38px]">
              내 지붕으로 계산해보기
            </h2>
            <p className="text-[18px] leading-[1.5] text-[#f2f3f5]/60 sm:text-[20px]">
              상담 전, 대략적인 수익을 계산해보세요. 지붕 면적만 넣으면 30년 수익이 나옵니다.
            </p>
          </Reveal>
          <Reveal delay={80} className="w-full">
            <Calculator />
          </Reveal>
        </Container>
      </section>

      {/* ── Reasons ── */}
      <section className="bg-white">
        <Container className="py-20 sm:py-28 md:py-[120px]">
          <Reveal className="mb-8 flex flex-col gap-2">
            <p className="text-[18px] text-ink sm:text-[20px]">왜 솔라캄인가?</p>
            <SectionTitle>숫자보다 책임을 먼저 봅니다</SectionTitle>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <Reveal
                key={r.n}
                delay={i * 70}
                className="flex flex-col gap-5 rounded-2xl bg-surface p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
              >
                <div className="flex flex-col gap-2.5">
                  <span className="text-[20px] font-semibold text-[#87952d]">{r.n}</span>
                  <p className="text-[20px] font-bold text-black">{r.title}</p>
                </div>
                <p className="text-[15px] leading-[1.6] text-black/60 sm:text-[16px]">{r.desc}</p>
                <div className="mt-1 h-[200px] overflow-hidden rounded-[14px] bg-white">
                  <img src={r.img} alt="" className="h-full w-full object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Process ── */}
      <section className="bg-gradient-to-b from-[#f7f7f7] to-[#f5f9e4]">
        <Container className="flex flex-col gap-14 py-20 sm:py-28 md:py-[120px]">
          <Reveal className="flex flex-col gap-2.5">
            <SectionTitle>신청부터 발전 개시까지<br className="sm:hidden" /> 약 5개월</SectionTitle>
            <p className="text-[18px] text-ink sm:text-[20px]">대부분의 서류와 인허가는 솔라캄이 대행해요</p>
          </Reveal>
          <div className="flex flex-col gap-11">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 60} className="flex gap-3.5">
                <span className="shrink-0 text-[20px] font-semibold text-olive">{s.n}</span>
                <div className="flex max-w-[440px] flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <p className="text-[20px] font-bold text-black">{s.label}</p>
                    <span className="rounded-[6px] bg-black/[0.07] px-3 py-1 text-[14px] font-medium text-black/60">
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-[15px] leading-[1.6] text-black/60 sm:text-[16px]">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Lead form ── */}
      <section id="lead" className="scroll-mt-20 bg-[#f3f5f9]">
        <Container className="grid items-start gap-12 py-20 sm:py-28 md:grid-cols-2 md:py-[120px]">
          <div className="flex flex-col gap-3">
            <SectionTitle>
              지붕 주소와 대략적인 면적만
              <br />알려주시면 가능해요
            </SectionTitle>
            <p className="text-[18px] leading-[1.5] text-ink sm:text-[20px]">
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
    </>
  );
}

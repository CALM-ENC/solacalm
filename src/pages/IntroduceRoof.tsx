import svgPaths from "@/imports/웹사이트제작요청-7/svg-b9ge7hvy3m";
import heroImg from "@/imports/웹사이트제작요청-7/94ab49c8a78085f7c29477f9d28e3de29362da02.png";
import { useState, useRef } from "react";
import { sendEmail } from "@/lib/email";
import Reveal from "@/components/Reveal";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <div className={`relative shrink-0 size-[27px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
      <svg className="absolute block inset-0 size-full" fill="none" height="29.0001" preserveAspectRatio="none" viewBox="0 0 29.0001 29.0001" width="29.0001">
        <path d={svgPaths.p3582b900} stroke="#7A827D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.41668" />
      </svg>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="relative shrink-0 size-[22px] sm:size-[26px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="29" preserveAspectRatio="none" viewBox="0 0 29 29" width="29">
        <g clipPath="url(#check-clip)">
          <path d={svgPaths.p2ced92c0} stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          <path d={svgPaths.paa33a80} stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </g>
        <defs>
          <clipPath id="check-clip"><rect fill="white" height="29" width="29" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

const checklistItems = [
  "지붕 면적 200평(약 660㎡) 이상",
  "슬래브·스틸 구조 또는 이와 동등한 내구성",
  "인근 고압 전선 또는 변전소 접근 가능",
  "건물 사용 승인 후 1년 이상 경과",
  "남향 ±45° 이내 또는 평지붕",
  "지붕 임대 또는 발전 수익 수취에 동의",
];

const processSteps = [
  { num: "01", title: "상담 · 신청",   time: "48시간 이내", desc: "주소·면적·지붕 사진만 보내주시면 48시간 내 적합성 결과와 예상 수익을 안내해 드립니다." },
  { num: "02", title: "현장 실사",     time: "1-2주",      desc: "구조 안전성 검토와 방수 하자 진단, 설치 용량을 확정합니다." },
  { num: "03", title: "계약 · 인허가", time: "6-12개월",   desc: "발전사업 허가·개발행위 등 서류를 솔라캄이 대행합니다." },
  { num: "04", title: "시공",          time: "8-12주",     desc: "구조물·모듈 설치, 전기공사와 계통 연계를 진행합니다." },
  { num: "05", title: "수익 정산·입금", time: "매월",       desc: "KESCO 검사 통과 후 상업 운전 개시. 발전 수익이 매월 계좌로 입금됩니다." },
];

const faqs = [
  { q: "지붕에 구멍을 뚫나요?",           a: "기본적으로 무천공 공법을 사용합니다. 지붕 유형에 따라 클램프 고정 방식을 적용하여 방수층을 훼손하지 않습니다. 시공 전 방수·구조 무상 진단을 실시하며, 필요 시 방수 보강 후 진행합니다." },
  { q: "지붕이 무게를 버틸 수 있나요?",    a: "시공 전 구조 안전성 검토를 무상으로 실시합니다. 태양광 모듈은 ㎡당 약 12~15kg으로, 일반 건물 적재 하중 대비 여유가 있는 경우가 대부분입니다. 검토 후 보강 여부를 안내해 드립니다." },
  { q: "지붕주가 부담하는 비용이 있나요?",  a: "초기 비용 0원입니다. 설계·인허가·시공·보험·유지관리 비용 모두 솔라캄이 부담합니다. 임대 방식의 경우 계약 만료 시 철거도 무상 진행합니다." },
  { q: "기존 시설 운영에 영향을 주나요?",   a: "시공 기간(8-12주) 중 소음·진동이 발생할 수 있으나, 시설 가동을 멈출 필요는 없습니다. 작업 일정은 사전에 협의하여 운영 영향을 최소화합니다." },
  { q: "계약 기간이 끝나면 어떻게 되나요?", a: "계약 만료 후 설비 처리 방식(무상 이전·철거)은 지붕주가 선택하실 수 있습니다. 계속 운영을 원하시면 소유권을 무상 이전해 드리며, 철거를 원하시면 솔라캄이 비용을 부담합니다." },
];

const inputClass = "bg-[#f2f3f5] border-[#d6dae1] border-[0.527px] border-solid h-[48px] px-[14px] rounded-[7px] w-full font-['Pretendard:Regular',sans-serif] text-[15px] sm:text-[17px] text-[#101211] placeholder:text-[rgba(16,18,17,0.5)] outline-none focus:border-[#7f910d] transition-colors";
const labelClass = "font-['Pretendard:Medium',sans-serif] text-[15px] sm:text-[17px] leading-[1.5] text-black not-italic";

export default function IntroduceRoof() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [product, setProduct] = useState<string>("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed || !product || loading) return;
    setLoading(true);
    try {
      const data = new FormData(formRef.current!);
      await sendEmail({
        form_title: "지붕 소개하기",
        product,
        address: (data.get("address") as string) ?? "",
        area: (data.get("area") as string) ?? "",
        name: (data.get("name") as string) ?? "",
        phone: (data.get("phone") as string) ?? "",
      });
    } catch (err) {
      console.error("Email send failed:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  return (
    <div className="w-full">

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#eff2f5] to-white w-full overflow-hidden flex flex-col items-center">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center md:justify-between gap-8 md:gap-0 min-h-[auto] md:h-[804px] max-w-[1152px] py-12 md:pb-[30px] md:pt-0 px-5 md:px-8 w-full">
          <div className="pr-hero-text flex flex-col gap-10 items-start max-w-[672px]">
            <div className="flex flex-col gap-4 items-start not-italic text-[#1f2129]">
              <h1 className="font-['Pretendard:Bold',sans-serif] text-[32px] sm:text-[44px] md:text-[60px] leading-[1.3] flex flex-col gap-1">
                <span>비어있는 지붕이</span>
                <span>30년 발전소로</span>
                <span>바뀝니다</span>
              </h1>
              <div className="font-['Pretendard:Regular',sans-serif] text-[14px] sm:text-[16px] md:text-[20px] flex flex-col gap-1">
                <p className="leading-[1.6] break-keep">축사 · 공장 · 창고 지붕을 솔라캄에 소개해 주세요</p>
                <p className="leading-[1.6] break-keep">초기 비용 0원, 시공·관리 솔라캄 전담, 수익은 지붕주 귀속</p>
              </div>
            </div>
            <a
              href="#introduce-form"
              className="bg-[#1f2129] flex items-center justify-center px-6 py-4 md:px-[36px] md:py-[20px] rounded-[7px] no-underline transition-all duration-200 hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[17px] md:text-[22px] text-center text-white">
                지붕 소개하기
              </span>
            </a>
          </div>
          <div className="hidden md:block pr-hero-img bg-white overflow-hidden relative rounded-[30px] shrink-0 size-[480px] transition-transform duration-700 hover:scale-[1.015]">
            <div className="absolute h-[777px] left-[-16px] top-[-102px] w-[518px]">
              <img
                alt="태양광 패널이 설치된 공장 지붕"
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={heroImg}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. 어떤 지붕이 적합한가요? + 체크리스트 ─────────────────── */}
      <div className="bg-white w-full flex flex-col items-center">
        <div className="flex flex-col gap-12 md:gap-[120px] items-start max-w-[1152px] px-5 md:px-8 py-12 md:py-[160px] w-full">

          {/* 시설 유형 카드 */}
          <div className="flex flex-col gap-8 items-start max-w-[1088px] w-full">
            <Reveal>
              <div className="flex flex-col gap-2 items-start max-w-[768px]">
                <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[22px] md:text-[38px]">어떤 지붕이 적합한가요?</p>
                <p className="font-['Pretendard:Medium',sans-serif] leading-[1.5] not-italic text-[#1f2129] text-[13px] sm:text-[15px] md:text-[20px] break-keep">지붕 면적, 구조, 일사량 3가지를 종합 분석해 적합성을 판단합니다</p>
              </div>
            </Reveal>

            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {/* 공장·제조시설 */}
              <Reveal delay={0} className="self-stretch">
                <div className="bg-[#eff2f5] flex flex-col items-start justify-between p-5 sm:p-6 rounded-[12px] h-full transition-all duration-300 hover:bg-[#e6eaf0] hover:-translate-y-1 hover:shadow-md cursor-default">
                  <div className="flex items-center justify-center rounded-[6px] size-[44px]">
                    <svg fill="none" height="34" viewBox="0 0 34 34" width="34">
                      <path d="M17 22.6666H17.0129" stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.85417" />
                      <path d="M22.6665 22.6666H22.6794" stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.85417" />
                      <path d={svgPaths.p2df40b80} stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                      <path d="M11.3335 22.6666H11.3464" stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.85417" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1 items-start mt-4 not-italic">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] leading-[1.36] text-[18px] sm:text-[22px] md:text-[24px] text-black">공장·제조시설</p>
                    <ul className="flex flex-col font-['Pretendard_Variable:Medium',sans-serif] list-disc text-[13px] sm:text-[15px] text-[rgba(0,0,0,0.6)] pl-5">
                      <li><span className="leading-[1.6]">최소 300평 이상 권장</span></li>
                      <li><span className="leading-[1.6]">슬래브·스틸 지붕 모두 적용 가능</span></li>
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* 축사·농업시설 */}
              <Reveal delay={90} className="self-stretch">
                <div className="bg-[#eff2f5] flex flex-col items-start justify-between p-5 sm:p-6 rounded-[12px] h-full transition-all duration-300 hover:bg-[#e6eaf0] hover:-translate-y-1 hover:shadow-md cursor-default">
                  <div className="flex items-center justify-center rounded-[12px] size-[44px]">
                    <svg fill="none" height="35" viewBox="0 0 34 35" width="34">
                      <path d="M14.1666 17.5H19.8333" stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      <path d="M14.1666 11.6667H19.8333" stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      <path d={svgPaths.p19243280} stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      <path d={svgPaths.p1f9f8980} stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      <path d={svgPaths.p1622d000} stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1 items-start mt-4 not-italic">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] leading-[1.36] text-[18px] sm:text-[22px] md:text-[24px] text-black">축사·농업시설</p>
                    <ul className="flex flex-col font-['Pretendard_Variable:Medium',sans-serif] list-disc text-[13px] sm:text-[15px] text-[rgba(0,0,0,0.6)] pl-5">
                      <li><span className="leading-[1.6]">최소 200평 이상 권장</span></li>
                      <li><span className="leading-[1.6]">지붕 경사 5~30° 최적</span></li>
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* 창고·물류센터 */}
              <Reveal delay={180} className="self-stretch">
                <div className="bg-[#eff2f5] flex flex-col items-start justify-between p-5 sm:p-6 rounded-[12px] h-full transition-all duration-300 hover:bg-[#e6eaf0] hover:-translate-y-1 hover:shadow-md cursor-default">
                  <div className="flex items-center justify-center rounded-[12px] size-[44px]">
                    <svg fill="none" height="34" viewBox="0 0 34 34" width="34">
                      <path d={svgPaths.p359c3200} stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                      <path d={svgPaths.p2a1700} stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                      <path d="M8.5 18.4167H25.5" stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                      <path d="M8.5 24.0833H25.5" stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1 items-start mt-4 not-italic">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] leading-[1.36] text-[18px] sm:text-[22px] md:text-[24px] text-black">창고·물류센터</p>
                    <ul className="flex flex-col font-['Pretendard_Variable:Medium',sans-serif] list-disc text-[13px] sm:text-[15px] text-[rgba(0,0,0,0.6)] pl-5">
                      <li><span className="leading-[1.6]">최소 500평 이상 권장</span></li>
                      <li><span className="leading-[1.6]">대형 평지붕 고효율</span></li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* 체크리스트 */}
          <div className="flex flex-col gap-6 items-start max-w-[1088px] w-full">
            <Reveal>
              <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[22px] md:text-[38px]">지붕 조건 체크리스트</p>
            </Reveal>
            <div className="flex flex-col gap-4 items-start w-full">
              {checklistItems.map((item, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="flex gap-3 sm:gap-[18px] items-start">
                    <CheckIcon />
                    <p className="font-['Pretendard:Medium',sans-serif] leading-[1.5] not-italic text-[#1f2129] text-[14px] sm:text-[17px] md:text-[20px] break-keep">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. 진행 프로세스 ──────────────────────────────────────────── */}
      <div className="w-full flex flex-col items-center" style={{ background: "linear-gradient(180deg, #f7f7f7 19.627%, #f5f9e4 100%)" }}>
        <div className="flex flex-col gap-10 items-start max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px] w-full">
          <Reveal>
            <div className="flex flex-col gap-2 items-start max-w-[768px]">
              <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[22px] md:text-[38px]">지붕 소개부터 수익 입금까지</p>
              <p className="font-['Pretendard:Regular',sans-serif] leading-[1.5] not-italic text-[#1f2129] text-[13px] sm:text-[15px] md:text-[20px] break-keep">약 5개월, 서류·인허가는 솔라캄이 모두 대행합니다</p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8 sm:gap-[44px] items-start max-w-[1088px] w-full">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 80} className="w-full">
                <div className="flex gap-3 sm:gap-[13px] items-start w-full">
                  <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.4] not-italic text-[#7f910d] text-[16px] sm:text-[20px] shrink-0 w-[22px] sm:w-[26px]">{step.num}</p>
                  <div className="flex flex-col gap-2 items-start w-full min-w-0">
                    <div className="flex flex-wrap gap-2 items-center">
                      <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[15px] sm:text-[20px] text-black">{step.title}</p>
                      <div className="bg-[rgba(0,0,0,0.07)] flex items-center px-3 py-1 rounded-[6px]">
                        <p className="font-['Pretendard:Medium',sans-serif] leading-[1.5] not-italic text-[12px] sm:text-[15px] text-[rgba(0,0,0,0.6)]">{step.time}</p>
                      </div>
                    </div>
                    <p className="font-['Pretendard:Regular',sans-serif] leading-[1.6] not-italic text-[13px] sm:text-[15px] text-[rgba(0,0,0,0.6)] break-keep">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. 견적 신청 폼 ────────────────────────────────────────────── */}
      <div id="introduce-form" className="scroll-mt-20 bg-[#f5f9e4] w-full flex flex-col items-center">
        <div className="max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 w-full">

            {/* 왼쪽 — 헤딩 */}
            <Reveal className="self-start">
              <div className="flex flex-col gap-3 items-start max-w-[481px]">
                <div className="font-['Pretendard:Bold',sans-serif] leading-[1.3] not-italic text-[#101211] text-[22px] md:text-[38px] flex flex-col gap-1">
                  <p>빈 지붕 빌려주고</p>
                  <p>임대 수익 받아보세요</p>
                </div>
                <p className="font-['Pretendard:Regular',sans-serif] leading-[1.5] not-italic text-[#1f2129] text-[13px] sm:text-[15px] md:text-[18px] break-keep">예상 설치 용량과 수익을 무료로 산출해 드립니다.</p>
              </div>
            </Reveal>

            {/* 오른쪽 — 폼 카드 */}
            <Reveal delay={120}>
              <div className="bg-white flex flex-col items-center justify-center px-5 sm:px-[32px] py-8 sm:py-[40px] rounded-[16px] w-full">
                {submitted ? (
                  <div className="flex flex-col gap-4 items-center py-10 text-center">
                    <p className="font-['Pretendard:Bold',sans-serif] text-[22px] sm:text-[24px] text-[#101211]">신청이 완료되었습니다!</p>
                    <p className="font-['Pretendard:Regular',sans-serif] text-[15px] text-[rgba(0,0,0,0.6)]">48시간 내 담당자가 연락드립니다.</p>
                  </div>
                ) : (
                  <form ref={formRef} className="flex flex-col gap-5 items-start w-full" onSubmit={handleSubmit}>
                    <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[18px] sm:text-[22px] text-black">무료 견적 신청</p>

                    <div className="flex flex-col gap-[6px] items-start w-full">
                      <label className={labelClass}>소개자 명 <span className="text-[#f66]">*</span></label>
                      <input required name="name" type="text" placeholder="홍길동" className={inputClass} />
                    </div>

                    <div className="flex flex-col gap-[6px] items-start w-full">
                      <label className={labelClass}>소개자 연락처 <span className="text-[#f66]">*</span></label>
                      <input required name="phone" type="tel" placeholder="010-0000-0000" className={inputClass} />
                    </div>

                    <div className="flex flex-col gap-[6px] items-start w-full">
                      <label className={labelClass}>지붕 주소 (시·군·구) <span className="text-[#f66]">*</span></label>
                      <input required name="address" type="text" placeholder="전남 나주시" className={inputClass} />
                    </div>

                    <div className="flex flex-col gap-[6px] items-start w-full">
                      <label className={labelClass}>관심 상품 <span className="text-[#f66]">*</span></label>
                      <div className="grid grid-cols-3 gap-2 w-full">
                        {["발전수익", "임대수익", "아직 모르겠음"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setProduct(opt)}
                            className={`flex flex-col items-center justify-center px-2 py-3 rounded-[7px] border-[0.527px] border-solid font-['Pretendard:SemiBold',sans-serif] text-[13px] sm:text-[15px] leading-[1.4] transition-all duration-200 ${
                              product === opt
                                ? "bg-[#1f2129] border-[#1f2129] text-white"
                                : "bg-[#f2f3f5] border-[#d6dae1] text-[#1f2129] hover:border-[#7f910d]"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className="flex gap-[10px] items-start text-left w-full"
                    >
                      <div className="pt-[3px] shrink-0">
                        <div className={`size-[19px] rounded-[3px] border-[0.731px] border-solid flex items-center justify-center transition-colors ${agreed ? "bg-[#1f2129] border-[#1f2129]" : "bg-[#f2f3f5] border-[#d6dae1]"}`}>
                          {agreed && (
                            <svg fill="none" height="8" viewBox="0 0 11 8" width="11">
                              <path d="M1 4L4 7L10 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-[13px] sm:text-[15px] leading-[1.5] text-[#40453f]">
                        <span className="font-['Pretendard:Bold',sans-serif] text-[#101211]">개인정보 수집 · 이용 동의 (필수)</span>
                        {" — 상담 목적으로만 이용하며, 목적 달성 후 지체 없이 파기합니다."}
                      </span>
                    </button>

                    <button
                      type="submit"
                      disabled={!agreed || !product || loading}
                      className="bg-[#1f2129] flex items-center justify-center py-4 rounded-[7px] w-full font-['Pretendard:Bold',sans-serif] leading-[1.5] not-italic text-[17px] sm:text-[20px] text-white transition-all duration-200 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {loading ? "전송 중..." : "무료 견적 신청"}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── 5. FAQ ──────────────────────────────────────────────────────── */}
      <div className="bg-white w-full flex flex-col items-center">
        <div className="flex flex-col gap-6 md:gap-[30px] items-center max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px] w-full">
          <Reveal className="w-full">
            <p className="font-['Pretendard:Bold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[22px] md:text-[38px]">자주 묻는 질문</p>
          </Reveal>

          <div className="flex flex-col gap-3 items-center max-w-[1106px] w-full">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 60} className="w-full">
                <div className="w-full rounded-[16px] overflow-hidden">
                  <button
                    type="button"
                    className="bg-[#f2f3f5] flex gap-4 min-h-[70px] items-center px-5 sm:px-[30px] py-4 sm:py-[20px] w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#e8ecf0]"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <p className="font-['Pretendard:Medium',sans-serif] leading-[1.4] not-italic text-[#a9bf1e] text-[18px] shrink-0">Q.</p>
                    <p className="font-['Pretendard:SemiBold',sans-serif] leading-[1.4] not-italic text-[#101211] text-[14px] sm:text-[18px] flex-1 min-w-0 break-keep">{faq.q}</p>
                    <ChevronIcon open={openFaq === i} />
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === i ? "300px" : "0",
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
    </div>
  );
}

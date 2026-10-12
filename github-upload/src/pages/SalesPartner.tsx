import { useState, useRef } from "react";
import { sendEmail } from "@/lib/email";
import svgPaths from "@/imports/웹사이트제작요청-9/svg-bpvu9zpt03";
import heroImg from "@/imports/웹사이트제작요청-9/06be8edd5747915e11136f52b1484dd12df65ab9.png";
import Reveal from "@/components/Reveal";

const ROLES = [
  {
    num: "01",
    title: "지붕주 발굴 · 소개",
    desc: ["축사, 공장, 창고 지붕주에게", "솔라캄 상품을 소개합니다"],
  },
  {
    num: "02",
    title: "계약 체결",
    desc: ["본사 담당자가 현장 실사·견적·계약", "전 과정을 처리합니다"],
  },
];

const TARGETS = [
  { num: "01", title: "태양광 분양 영업 경력자", desc: "기존 태양광 · 임야 · 지붕 분양 영업 경험이 있으신 분" },
  { num: "02", title: "농업·축산 분야 종사자", desc: "축사·농업 창고 지붕주와 접점이 있는 분" },
  { num: "03", title: "부동산·보험 영업 네트워크 보유자", desc: "지붕을 소유한 사업주 고객층과 접점이 있는 분" },
  { num: "04", title: "에너지 관련 업종 종사자", desc: "전기·설비·건축 업종에서 건물주 네트워크가 있는 분" },
];

const BENEFITS = [
  {
    path: svgPaths.p552b630,
    title: "계약 성사 시 수수료 지급",
    desc: "소개한 지붕이 계약으로 이어지면 수수료를 지급합니다. 계약 규모에 따라 수수료가 산정됩니다.",
  },
  {
    path: svgPaths.p227bd400,
    title: "영업 자료 제공",
    desc: "직접 제작하지 않아도 전문적인 영업이 가능한 영업 자료를 제공합니다.",
  },
  {
    path: svgPaths.p14864f00,
    title: "지역 독점 협의 가능",
    desc: "협의에 따라 특정 지역의 독점 영업권을 부여합니다. 해당 지역 계약은 파트너를 통해서만 진행됩니다.",
  },
  {
    path: svgPaths.p11eda100,
    title: "영업 교육 및 Q&A 지원",
    desc: "정기 온라인 세션으로 태양광 상품 지식, 고객 응대 노하우, 시장 동향을 공유합니다.",
  },
];

const inputClass = "w-full bg-[#f2f3f5] border-[#d6dae1] border-[0.527px] border-solid rounded-[7px] px-[14px] py-[12px] font-['Pretendard:Regular',sans-serif] text-[15px] sm:text-[17px] leading-normal text-[#101211] placeholder:text-[rgba(16,18,17,0.5)] outline-none focus:border-[#7f910d] focus:bg-white transition-colors duration-200 resize-none";
const labelClass = "font-['Pretendard:Medium',sans-serif] text-[15px] sm:text-[17px] leading-[1.5] text-black not-italic";

function FormField({
  label,
  placeholder,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[6px] items-start w-full">
      <label className={labelClass}>
        {label}
        <span className="text-[#f66]"> *</span>
      </label>
      {textarea ? (
        <textarea
          className={`${inputClass} h-[140px]`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className={`${inputClass} h-[48px]`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default function SalesPartner() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [job, setJob] = useState("");
  const [network, setNetwork] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const canSubmit = !!(name && phone && region && job && network && agreed);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      await sendEmail({
        form_title: "영업 파트너 신청",
        name, phone, region, job, network,
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
      <div className="bg-white w-full flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-[1152px] px-5 md:px-8 flex flex-col-reverse md:flex-row items-start md:items-center md:justify-between py-12 md:py-0 md:min-h-[720px] gap-8 md:gap-0">
          <div className="pr-hero-text flex flex-col gap-10 items-start max-w-[672px]">
            <div className="flex flex-col gap-4">
              <p className="font-['Pretendard:Bold',sans-serif] text-[15px] md:text-[25px] leading-[1.5] text-[#7e8a96] not-italic">
                영업 파트너 모집
              </p>
              <h1 className="font-['Pretendard:Bold',sans-serif] text-[32px] sm:text-[44px] md:text-[60px] leading-[1.3] text-[#1f2129] not-italic flex flex-col gap-1">
                <span>아는 지붕 한 곳이</span>
                <span>수수료가 됩니다</span>
              </h1>
              <div className="font-['Pretendard:Regular',sans-serif] text-[14px] sm:text-[16px] md:text-[20px] leading-[1.6] text-[#1f2129] not-italic flex flex-col gap-0.5">
                <p className="break-keep">지붕주를 연결하여 계약을 성사시켜주세요</p>
                <p className="break-keep">이후 인허가·시공·관리는 솔라캄이 맡아요</p>
              </div>
            </div>
            <a
              href="#partner-form"
              className="bg-[#1f2129] flex items-center justify-center px-6 py-4 md:px-[36px] md:py-[20px] rounded-[7px] font-['Pretendard:Bold',sans-serif] text-[17px] md:text-[22px] leading-[1.4] text-white text-center no-underline transition-all duration-200 hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]"
            >
              영업 파트너 신청하기
            </a>
          </div>

          <div className="hidden md:block pr-hero-img bg-white rounded-[30px] size-[480px] overflow-hidden relative shrink-0 shadow-sm">
            <div className="absolute h-[480px] left-[-104px] top-0 w-[670px]">
              <img
                alt=""
                className="absolute h-full left-[-5.11%] max-w-none top-0 w-[105.06%] object-cover pointer-events-none"
                src={heroImg}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. 이런 일을 해요 ─────────────────────────────────────────── */}
      <div className="bg-[#f2f3f5] w-full flex flex-col items-center">
        <div className="w-full max-w-[1152px] px-5 md:px-8 py-12 md:py-[160px] flex flex-col gap-8 items-start">
          <Reveal>
            <p className="font-['Pretendard:Bold',sans-serif] text-[22px] md:text-[38px] leading-[1.4] text-[#101211] not-italic">
              이런 일을 해요
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {ROLES.map((item, i) => (
              <Reveal key={item.num} delay={i * 100}>
                <div className="bg-white flex flex-col items-start justify-between p-5 sm:p-6 rounded-[12px] min-h-[180px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full">
                  <p className="font-['Pretendard:SemiBold',sans-serif] text-[14px] sm:text-[16px] leading-[1.4] text-[#7f910d] not-italic">
                    {item.num}
                  </p>
                  <div className="flex flex-col gap-1 mt-4">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] text-[18px] sm:text-[22px] md:text-[24px] leading-[1.36] text-black break-keep">
                      {item.title}
                    </p>
                    <div className="font-['Pretendard_Variable:Medium',sans-serif] text-[13px] sm:text-[15px] leading-[1.6] text-[rgba(0,0,0,0.6)]">
                      {item.desc.map((line, j) => (
                        <p key={j} className="break-keep">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. 솔라캄 영업 파트너들에게 드리는 혜택 ─────────────────── */}
      <div className="bg-white w-full flex flex-col items-center">
        <div className="w-full max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px] flex flex-col gap-8 items-start">
          <Reveal>
            <p className="font-['Pretendard:Bold',sans-serif] text-[22px] md:text-[38px] leading-[1.4] text-[#101211] not-italic">
              이런 분을 찾아요
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {TARGETS.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="bg-[#f2f3f5] flex flex-col items-start justify-between p-5 sm:p-6 rounded-[12px] min-h-[160px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full">
                  <p className="font-['Pretendard:SemiBold',sans-serif] text-[14px] sm:text-[16px] leading-[1.4] text-[#7f910d] not-italic">
                    {item.num}
                  </p>
                  <div className="flex flex-col gap-1 mt-4">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] text-[18px] sm:text-[22px] md:text-[24px] leading-[1.36] text-black break-keep">
                      {item.title}
                    </p>
                    <p className="font-['Pretendard_Variable:Medium',sans-serif] text-[13px] sm:text-[15px] leading-[1.6] text-[rgba(0,0,0,0.6)] break-keep">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="font-['Pretendard:Medium',sans-serif] text-[13px] sm:text-[15px] md:text-[18px] leading-[1.6] text-[#7e8a96] not-italic break-keep">
              * 태양광 지식이 없어도 됩니다. 지붕주를 알거나, 만날 수 있는 분이면 충분합니다.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── 4. 파트너 혜택 카드 목록 ──────────────────────────────────── */}
      <div className="bg-gradient-to-b from-white from-[19.627%] to-[#f5f9e4] w-full flex flex-col items-center">
        <div className="w-full max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px] flex flex-col gap-8 items-start">
          <Reveal>
            <div className="font-['Pretendard:Bold',sans-serif] text-[22px] md:text-[38px] leading-[1.4] text-[#101211] not-italic flex flex-col gap-0.5">
              <p>솔라캄 영업 파트너들에게</p>
              <p>드리는 혜택</p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3 w-full">
            {BENEFITS.map((b, i) => (
              <Reveal key={i} delay={i * 80} className="w-full">
                <div className="bg-white border border-[#ebf0db] border-solid flex gap-4 sm:gap-[18px] items-start sm:items-center p-4 sm:p-5 md:p-[30px] rounded-[16px] w-full hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
                  <div className="bg-[rgba(127,145,13,0.1)] flex items-center justify-center rounded-[14px] sm:rounded-[17px] shrink-0 size-[48px] sm:size-[58px]">
                    <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
                      <path d={b.path} stroke="#7F910D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-[3px] items-start min-w-0">
                    <p className="font-['Pretendard_Variable:Bold',sans-serif] text-[16px] sm:text-[20px] md:text-[22px] leading-[1.36] text-black break-keep">
                      {b.title}
                    </p>
                    <p className="font-['Pretendard_Variable:Medium',sans-serif] text-[13px] sm:text-[15px] leading-[1.6] text-[rgba(0,0,0,0.6)] break-keep">
                      {b.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. 신청 폼 ──────────────────────────────────────────────── */}
      <div id="partner-form" className="scroll-mt-20 bg-[#f2f3f5] w-full flex flex-col items-center">
        <div className="w-full max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 w-full">

            {/* 왼쪽 — 헤딩 */}
            <Reveal>
              <div className="flex flex-col gap-3 items-start self-start pt-2">
                <p className="font-['Pretendard:Bold',sans-serif] text-[22px] md:text-[38px] leading-[1.4] text-[#101211] not-italic">
                  먼저 연락주세요
                </p>
                <div className="font-['Pretendard:Regular',sans-serif] text-[13px] sm:text-[15px] md:text-[18px] leading-[1.7] text-[#1f2129] not-italic flex flex-col gap-0.5">
                  <p className="break-keep">특별한 자격 요건이 없습니다</p>
                  <p className="break-keep">지붕 있는 사업주와 만날 수 있는 분이라면</p>
                  <p className="break-keep">누구나 신청 가능합니다</p>
                </div>
              </div>
            </Reveal>

            {/* 오른쪽 — 폼 카드 */}
            <Reveal delay={100}>
              <div className="bg-white rounded-[16px] px-5 sm:px-[32px] py-8 sm:py-[40px] flex flex-col items-center justify-center">
                {submitted ? (
                  <div className="flex flex-col gap-4 items-center py-14 text-center">
                    <p className="font-['Pretendard:Bold',sans-serif] text-[22px] sm:text-[28px] leading-[1.4] text-[#1f2129]">
                      신청이 접수되었습니다
                    </p>
                    <p className="font-['Pretendard:Regular',sans-serif] text-[15px] sm:text-[18px] leading-[1.6] text-[rgba(0,0,0,0.6)]">
                      영업일 1일 내로 담당자가 연락드리겠습니다.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 items-start w-full">
                    <FormField label="성함" placeholder="홍길동" value={name} onChange={setName} />
                    <FormField label="연락처" placeholder="010-0000-0000" value={phone} onChange={setPhone} />
                    <FormField label="활동 지역" placeholder="예 : 전남, 전북, 광주 일대" value={region} onChange={setRegion} />
                    <FormField label="현재 직업 / 업종" placeholder="예 : 부동산 중개업, 보험 설계사, 농업" value={job} onChange={setJob} />
                    <FormField
                      label="보유 네트워크 및 영업 경험"
                      placeholder="접근 가능한 지붕주 유형, 영업 경력, 기타 어필 사항을 간략히 적어주세요."
                      value={network}
                      onChange={setNetwork}
                      textarea
                    />

                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className="flex gap-[10px] items-start text-left w-full"
                    >
                      <div className="shrink-0 mt-[3px]">
                        <div className={`size-[19px] rounded-[3px] border-[0.731px] border-solid flex items-center justify-center transition-colors duration-150 ${agreed ? "bg-[#1f2129] border-[#1f2129]" : "bg-[#f2f3f5] border-[#d6dae1]"}`}>
                          {agreed && (
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                              <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-[13px] sm:text-[15px] leading-[1.5] text-[#40453f]">
                        <span className="font-['Pretendard:Bold',sans-serif] text-[#101211]">개인정보 수집 · 이용 동의 (필수)</span>
                        {" — 파트너 상담 목적으로만 이용하며, 목적 달성 후 지체 없이 파기합니다."}
                      </span>
                    </button>

                    <button
                      type="submit"
                      disabled={!canSubmit || loading}
                      className={`w-full flex items-center justify-center py-4 rounded-[7px] font-['Pretendard:Bold',sans-serif] text-[17px] sm:text-[20px] leading-[1.5] text-white transition-all duration-200 ${canSubmit ? "bg-[#1f2129] hover:brightness-110 cursor-pointer" : "bg-[#b0b6be] cursor-not-allowed"}`}
                    >
                      {loading ? "전송 중..." : "영업 파트너 신청하기"}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

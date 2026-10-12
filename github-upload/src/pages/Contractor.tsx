import { useState, useRef } from "react";
import { sendEmail } from "@/lib/email";
import heroImg from "@/imports/웹사이트제작요청-8/d68a404d5a3da514707cdc567790ff7560fca102.png";
import Reveal from "@/components/Reveal";

const REQUIREMENTS = [
  { num: "01", title: "전기공사업 면허 보유", desc: "정보통신공사업 면허도 환영합니다" },
  { num: "02", title: "지붕형 태양광 시공 경험 1년 이상", desc: "RC조·경량철골 지붕 경험 우대" },
  { num: "03", title: "팀 단위 시공 가능 (최소 3인)", desc: "장비 보유 업체 우선 배정" },
  { num: "04", title: "사업자등록증 보유 업체", desc: "개인사업자·법인사업자 모두 가능" },
];

const STEPS = [
  { num: "01", title: "상담 · 신청", desc: "양식 작성 → 영업일 1일 내 담당자 연락" },
  { num: "02", title: "역량 확인 미팅", desc: "장비·인원·시공 경험 파악 (비대면 가능)" },
  { num: "03", title: "협약 조건 협의", desc: "공사 단가·물량 규모·지역 범위 확정" },
  { num: "04", title: "협약서 서명", desc: "표준 하도급 계약서 또는 별도 협약서" },
  { num: "05", title: "현장 배정", desc: "업체 역량에 맞는 현장 우선 배정" },
];

const inputClass = "w-full bg-[#f2f3f5] border-[#d6dae1] border-[0.527px] border-solid rounded-[7px] px-[14px] py-[12px] font-['Pretendard:Regular',sans-serif] text-[15px] sm:text-[17px] leading-normal text-[#101211] placeholder:text-[rgba(16,18,17,0.5)] outline-none focus:border-[#7f910d] focus:bg-white transition-colors duration-200 resize-none";
const labelClass = "font-['Pretendard:Medium',sans-serif] text-[15px] sm:text-[17px] leading-[1.5] text-black not-italic";

function FormField({
  label,
  required = true,
  placeholder,
  value,
  onChange,
  textarea = false,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[6px] items-start w-full">
      <label className={labelClass}>
        {label}
        {required && <span className="text-[#f66]"> *</span>}
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

export default function Contractor() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [license, setLicense] = useState("");
  const [experience, setExperience] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const canSubmit = !!(name && phone && region && license && experience && agreed);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    try {
      await sendEmail({
        form_title: "시공사 신청",
        name, phone, region, license, experience,
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
      <div className="bg-gradient-to-b from-[#eff2f5] to-white w-full flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-[1152px] px-5 md:px-8 flex flex-col-reverse md:flex-row items-start md:items-center md:justify-between py-12 md:py-0 md:min-h-[720px] gap-8 md:gap-0">
          <div className="pr-hero-text flex flex-col gap-10 items-start max-w-[600px]">
            <div className="flex flex-col gap-4">
              <p className="font-['Pretendard:Bold',sans-serif] text-[15px] md:text-[25px] leading-[1.5] text-[#7e8a96] not-italic">
                시공사 파트너 모집
              </p>
              <h1 className="font-['Pretendard:Bold',sans-serif] text-[32px] sm:text-[44px] md:text-[60px] leading-[1.3] text-[#1f2129] not-italic flex flex-col gap-1">
                <span>영업은 저희가,</span>
                <span>시공에만</span>
                <span>집중하세요</span>
              </h1>
            </div>
            <a
              href="#contractor-form"
              className="bg-[#1f2129] flex items-center justify-center px-6 py-4 md:px-[36px] md:py-[20px] rounded-[7px] font-['Pretendard:Bold',sans-serif] text-[17px] md:text-[22px] leading-[1.4] text-white text-center no-underline transition-all duration-200 hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]"
            >
              시공사 신청하기
            </a>
          </div>

          <div className="hidden md:block pr-hero-img bg-white rounded-[30px] size-[480px] overflow-hidden relative shrink-0 shadow-sm">
            <div className="absolute h-[840px] left-[-61px] top-[-53px] w-[630px]">
              <img
                alt=""
                className="absolute inset-0 size-full object-cover pointer-events-none max-w-none"
                src={heroImg}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. 이런 업체를 찾아요 ─────────────────────────────────────── */}
      <div className="bg-white w-full flex flex-col items-center">
        <div className="w-full max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px] flex flex-col gap-8 items-start">
          <Reveal>
            <p className="font-['Pretendard:Bold',sans-serif] text-[22px] md:text-[38px] leading-[1.4] text-[#101211] not-italic">
              이런 업체를 찾아요
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {REQUIREMENTS.map((item, i) => (
              <Reveal key={item.num} delay={i * 80}>
                <div className="bg-[#eff2f5] flex flex-col items-start justify-between p-5 sm:p-6 rounded-[12px] min-h-[160px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full">
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
              * 면허 요건이 맞지 않아도 먼저 연락주세요. 현재 상황을 보고 방향을 함께 찾아드립니다.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── 3. 신청부터 첫 현장까지 ──────────────────────────────────── */}
      <div className="bg-gradient-to-b from-[#f7f7f7] from-[19.627%] to-[#f5f9e4] w-full flex flex-col items-center">
        <div className="w-full max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px] flex flex-col gap-8 items-start">
          <Reveal>
            <p className="font-['Pretendard:Bold',sans-serif] text-[22px] md:text-[38px] leading-[1.4] text-[#101211] not-italic">
              신청부터 첫 현장까지
            </p>
          </Reveal>

          <div className="flex flex-col gap-7 sm:gap-[44px] items-start w-full max-w-[1088px]">
            {STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 70}>
                <div className="flex gap-3 sm:gap-[13px] items-start w-full">
                  <p className="font-['Pretendard:SemiBold',sans-serif] text-[15px] sm:text-[20px] leading-[1.4] text-[#7f910d] not-italic shrink-0 w-[22px] sm:w-[26px]">
                    {step.num}
                  </p>
                  <div className="flex flex-col gap-1 items-start min-w-0">
                    <p className="font-['Pretendard:Bold',sans-serif] text-[15px] sm:text-[20px] leading-[1.4] text-black">
                      {step.title}
                    </p>
                    <p className="font-['Pretendard:Regular',sans-serif] text-[13px] sm:text-[15px] leading-[1.6] text-[rgba(0,0,0,0.6)] break-keep">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. 신청 폼 ──────────────────────────────────────────────── */}
      <div id="contractor-form" className="scroll-mt-20 bg-[#f2f3f5] w-full flex flex-col items-center">
        <div className="w-full max-w-[1152px] px-5 md:px-8 py-12 md:py-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 w-full">

            {/* 왼쪽 — 헤딩 */}
            <Reveal>
              <div className="flex flex-col gap-3 items-start self-start pt-2">
                <p className="font-['Pretendard:Bold',sans-serif] text-[22px] md:text-[38px] leading-[1.4] text-[#101211] not-italic">
                  먼저 연락주세요
                </p>
                <div className="font-['Pretendard:Regular',sans-serif] text-[13px] sm:text-[15px] md:text-[18px] leading-[1.7] text-[#1f2129] not-italic flex flex-col gap-1">
                  <p className="break-keep">간단한 정보만 남겨주시면 담당자가 1일 내로 연락드립니다</p>
                  <p className="break-keep">규모나 면허에 대한 부담 없이 문의하셔도 됩니다</p>
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
                    <FormField
                      label="업체명 / 대표자명"
                      placeholder="예 : 한빛전기공사 / 홍길동"
                      value={name}
                      onChange={setName}
                    />
                    <FormField
                      label="연락처"
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={setPhone}
                    />
                    <FormField
                      label="주요 시공 지역"
                      placeholder="예 : 전남, 전북, 광주 일대"
                      value={region}
                      onChange={setRegion}
                    />
                    <FormField
                      label="보유 면허"
                      placeholder="예 : 전기공사업, 정보통신공사업"
                      value={license}
                      onChange={setLicense}
                    />
                    <FormField
                      label="시공 경험 및 현재 역량"
                      placeholder="월 시공 가능 현장 수, 보유 장비, 주요 시공 실적 등을 간략히 적어주세요."
                      value={experience}
                      onChange={setExperience}
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
                      {loading ? "전송 중..." : "시공사 신청하기"}
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

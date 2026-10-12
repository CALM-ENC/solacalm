import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Main from "@/pages/Main";
import PowerRevenue from "@/pages/PowerRevenue";
import RentalRevenue from "@/pages/RentalRevenue";
import IntroduceRoof from "@/pages/IntroduceRoof";
import Contractor from "@/pages/Contractor";
import SalesPartner from "@/pages/SalesPartner";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function KakaoButton() {
  return (
    <a
      href="http://pf.kakao.com/_xjVhaX/chat"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#FEE500] px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.22)] active:scale-95"
      aria-label="카카오톡 상담하기"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 5.617 2 10.077c0 2.79 1.71 5.245 4.304 6.756l-1.097 4.01a.375.375 0 0 0 .563.41L10.74 18.8A11.75 11.75 0 0 0 12 18.154c5.523 0 10-3.617 10-8.077S17.523 2 12 2Z" fill="#391B1B"/>
      </svg>
      <span className="text-[14px] font-bold text-[#391B1B] whitespace-nowrap">카카오톡 상담</span>
    </a>
  );
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-warm">
      <Seo />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <KakaoButton />
    </div>
  );
}

export function AppRoutes() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/power" element={<PowerRevenue />} />
          <Route path="/rental" element={<RentalRevenue />} />
          <Route path="/roof" element={<IntroduceRoof />} />
          <Route path="/contractor" element={<Contractor />} />
          <Route path="/partner" element={<SalesPartner />} />
          <Route path="*" element={<div className="mx-auto max-w-[1152px] px-5 py-40"><h1 className="text-3xl font-bold">페이지를 찾을 수 없습니다</h1><p className="mt-4">주소를 확인하거나 <a href="/" className="underline">솔라캄 홈으로 이동하세요.</a></p></div>} />
        </Route>
      </Routes>
  );
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "./App";
export { PAGE_SEO, SITE_URL, getPageSeo } from "./lib/seo";

export function renderPage(pathname: string) {
  return renderToString(<StaticRouter location={pathname}><AppRoutes /></StaticRouter>);
}

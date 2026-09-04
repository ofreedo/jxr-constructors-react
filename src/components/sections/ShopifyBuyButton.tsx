import { useEffect, useRef } from "react";

// The Shopify Buy SDK isn't typed — it attaches itself to window at
// runtime via the script tag loaded below.
declare global {
  interface Window {
    ShopifyBuy?: any;
  }
}

const SCRIPT_URL = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";

/**
 * Live Shopify Buy Button embed — same store/product/styling as the
 * original static site, ported verbatim (not a mockup). Domain,
 * storefront token, and product ID are real production values, not
 * placeholders.
 */
export function ShopifyBuyButton() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    function initBuyButton() {
      if (cancelled || !window.ShopifyBuy || !containerRef.current) return;

      const client = window.ShopifyBuy.buildClient({
        domain: "teke8v-wp.myshopify.com",
        storefrontAccessToken: "8e89c2f23e3445aaf5b314b051d38d53",
      });

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        if (cancelled || !containerRef.current) return;
        ui.createComponent("product", {
          id: "9339964981463",
          node: containerRef.current,
          moneyFormat: "%24%7B%7Bamount%7D%7D",
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0",
                    "margin-bottom": "50px",
                  },
                  "text-align": "left",
                },
                button: {
                  "font-family": "Inter, sans-serif",
                  "font-size": "14px",
                  "font-weight": "600",
                  "letter-spacing": "0.03em",
                  "text-transform": "uppercase",
                  "padding-top": "14px",
                  "padding-bottom": "14px",
                  "border-radius": "2px",
                  "background-color": "#14161a",
                  ":hover": { "background-color": "#1c3fbf" },
                  ":focus": { "background-color": "#1c3fbf" },
                },
                quantityInput: {
                  "font-size": "16px",
                  "padding-top": "14px",
                  "padding-bottom": "14px",
                },
              },
              text: { button: "Add to Cart" },
              googleFonts: ["Inter"],
            },
            productSet: {
              styles: {
                products: {
                  "@media (min-width: 601px)": { "margin-left": "0" },
                },
              },
            },
            modalProduct: {
              contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "100%",
                    "margin-left": "0px",
                    "margin-bottom": "0px",
                  },
                },
                button: {
                  "font-family": "Inter, sans-serif",
                  "font-weight": "600",
                  "background-color": "#14161a",
                  "border-radius": "2px",
                  ":hover": { "background-color": "#1c3fbf" },
                  ":focus": { "background-color": "#1c3fbf" },
                },
              },
            },
            cart: {
              styles: {
                button: {
                  "font-family": "Inter, sans-serif",
                  "font-weight": "600",
                  "background-color": "#14161a",
                  "border-radius": "2px",
                  ":hover": { "background-color": "#1c3fbf" },
                  ":focus": { "background-color": "#1c3fbf" },
                },
              },
              text: { total: "Subtotal", button: "Checkout" },
            },
            toggle: {
              styles: {
                toggle: {
                  "background-color": "#14161a",
                  ":hover": { "background-color": "#1c3fbf" },
                  ":focus": { "background-color": "#1c3fbf" },
                },
              },
            },
          },
        });
      });
    }

    if (window.ShopifyBuy?.UI) {
      initBuyButton();
    } else if (!document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = SCRIPT_URL;
      script.onload = initBuyButton;
      document.head.appendChild(script);
    } else {
      // Script tag already present from a previous mount (e.g. React
      // Strict Mode's dev double-invoke) — wait for it to finish loading.
      document.querySelector(`script[src="${SCRIPT_URL}"]`)?.addEventListener("load", initBuyButton);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return <div id="caps-grid" className="min-h-[120px]" ref={containerRef} />;
}

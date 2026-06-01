"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchCategoryTree } from "@/lib/api";
import CategoriesMegaMenu from "./CategoriesMegaMenu";
import MobileCategoriesNav from "./MobileCategoriesNav";
import GlobalSearchBar from "./GlobalSearchBar";
import { buttonRadius } from "@/lib/ui-presets";

const SCROLL_OFFSET = 80;
const SCROLL_DELTA = 10;

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [productGroups, setProductGroups] = useState([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let active = true;

    fetchCategoryTree()
      .then((tree) => {
        if (active) setProductGroups(tree);
      })
      .catch(() => {
        if (active) setProductGroups([]);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (productGroups.length > 0) return;

    let active = true;

    fetchCategoryTree()
      .then((tree) => {
        if (active) setProductGroups(tree);
      })
      .catch(() => {
        if (active) setProductGroups([]);
      });

    return () => {
      active = false;
    };
  }, [pathname, productGroups.length]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    const resizeObserver =
      typeof ResizeObserver !== "undefined" && headerRef.current
        ? new ResizeObserver(updateHeaderHeight)
        : null;

    if (resizeObserver && headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (isMenuOpen) {
        setIsHeaderVisible(true);
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY <= SCROLL_OFFSET) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current + SCROLL_DELTA) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY.current - SCROLL_DELTA) {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div style={{ height: headerHeight }} aria-hidden="true" className="shrink-0" />
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 w-full flex flex-col font-sans select-none bg-white transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Top Banner */}
        <div className="bg-[#333333] w-full">
          <div className="max-w-7xl mx-auto text-white py-1 text-center text-[12px]">
            <Link href="/quote" className="hover:text-white/90">
              Have a Project? <span className="font-semibold underline">Request a Quote!</span>
            </Link>
          </div>
        </div>

        {/* Middle Bar */}
        <div className="bg-white w-full border-b border-gray-200 md:border-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5 md:py-2">
            
            {/* Brand Section */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 cursor-pointer">
                <img src="/images/brand/logo.png" alt="Hoffmeyer" className="h-[30px] md:h-[40px] object-contain" />
                <span className="hidden md:block text-[#333] italic font-semibold text-[12px] ml-8 tracking-tight">
                  We keep your products moving!
                </span>
              </Link>
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-4 md:hidden">
              <button className="text-[#004b87]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </button>
              <div className="w-12 h-12 bg-[#e2e2e2] rounded-full flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <button className="text-[#004b87]" onClick={() => setIsMenuOpen(true)}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
              </button>
            </div>

            {/* Desktop Links & Phone */}
            <div className="hidden md:flex items-center gap-10">
              <nav className="flex items-center gap-8 text-[13px] font-semibold text-[#333]">
                <Link href="/locations" className="hover:text-[#004b87] transition-colors">Locations</Link>
                <Link href="/resources" className="hover:text-[#004b87] transition-colors">Resources</Link>
                <Link href="/about" className="hover:text-[#004b87] transition-colors">About Us</Link>
                <span className="flex items-center gap-2">
                  <Link href="/login" className="hover:text-[#004b87] transition-colors">
                    Login
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link href="/register" className="hover:text-[#004b87] transition-colors">Register</Link>
                </span>
              </nav>
              <div className="text-[28px] font-extrabold text-[#16568D] tracking-tight whitespace-nowrap">
                (800) 350-2358
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search & Cart */}
        <div className="flex md:hidden items-center gap-4 px-4 pb-5 bg-white">
          <div className="min-w-0 flex-1">
            <GlobalSearchBar variant="mobile" />
          </div>
          <button className="text-[#004b87] relative">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
          </button>
        </div>

        {/* Desktop Blue Bar */}
        <div className="hidden md:block w-full bg-[#16568D] py-1.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
            <div className="flex items-center gap-8 text-white font-bold text-[16px]">
              <CategoriesMegaMenu productGroups={productGroups} />
            </div>
            
            <div className="flex-1 max-w-4xl mx-8">
              <GlobalSearchBar variant="desktop" />
            </div>

            <div className="flex items-center gap-8 text-white font-bold text-[16px]">
              <button className="hover:text-gray-200 transition-colors">Quick Order</button>
              <button className="relative hover:text-gray-200 transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col font-sans ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="cursor-pointer">
            <img src="/images/brand/logo.png" alt="Hoffmeyer" className="h-[30px] object-contain" />
          </Link>
          <button 
            className="text-gray-500 hover:text-gray-800 p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex flex-col py-4 overflow-y-auto">
          <nav className="flex flex-col px-6 gap-2 text-[18px] font-bold text-[#333]">
            
            <MobileCategoriesNav
              productGroups={productGroups}
              onNavigate={() => setIsMenuOpen(false)}
            />

            <a href="#" className="hover:text-[#004b87] transition-colors border-b border-gray-100 py-2">Brands</a>
            <Link href="/locations" className="hover:text-[#004b87] transition-colors border-b border-gray-100 py-2" onClick={() => setIsMenuOpen(false)}>Locations</Link>
            <Link href="/resources" className="hover:text-[#004b87] transition-colors border-b border-gray-100 py-2" onClick={() => setIsMenuOpen(false)}>Resources</Link>
            <Link href="/about" className="hover:text-[#004b87] transition-colors border-b border-gray-100 py-2" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link
              href="/login"
              className="hover:text-[#004b87] transition-colors border-b border-gray-100 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <a href="#" className="hover:text-[#004b87] transition-colors border-b border-gray-100 py-2">Quick Order</a>
          </nav>
        </div>

        <div className="mt-auto p-6 bg-[#f8f8f8] border-t border-gray-200">
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className={`w-full border border-[#16568D] bg-white text-[#16568D] font-bold py-3 transition-colors hover:bg-[#16568D] hover:text-white text-center ${buttonRadius}`}
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className={`w-full bg-[#16568D] text-white font-bold py-3 hover:bg-[#124570] transition-colors text-center ${buttonRadius}`}
            >
              Register
            </Link>
          </div>
          <div className="mt-6 text-center text-[18px] font-extrabold text-[#16568D] tracking-tight">
            (800) 350-2358
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
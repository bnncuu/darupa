"use client"

import { useRef, useState, useCallback, useEffect } from "react";

export function useAutoScroll(options: { smooth?: boolean; content?: React.ReactNode } = {}) {
  const { smooth = false, content } = options;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (!scrollRef.current) return;
    
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }, [smooth]);

  const checkIsAtBottom = useCallback(() => {
    if (!scrollRef.current) return false;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const distanceToBottom = Math.abs(scrollHeight - scrollTop - clientHeight);
    return distanceToBottom <= 20;
  }, []);

  const handleScroll = useCallback(() => {
    const atBottom = checkIsAtBottom();
    setIsAtBottom(atBottom);
    if (atBottom) {
      setAutoScrollEnabled(true);
    }
  }, [checkIsAtBottom]);

  const disableAutoScroll = useCallback(() => {
    if (!checkIsAtBottom()) {
      setAutoScrollEnabled(false);
    }
  }, [checkIsAtBottom]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener("scroll", handleScroll, { passive: true });
    return () => element.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (autoScrollEnabled) {
      scrollToBottom();
    }
  }, [content, autoScrollEnabled, scrollToBottom]);

  return {
    scrollRef,
    isAtBottom,
    autoScrollEnabled,
    scrollToBottom,
    disableAutoScroll,
  };
}
import React, { useEffect, RefObject } from "react";

type ExpectedRef = RefObject<HTMLElement | HTMLDivElement>;

const useClassesBasedOnScroll = (
  referenceElement: ExpectedRef,
  fixedElement: ExpectedRef,
  classes: string[]
) => {
  useEffect(() => {
    const scrollHandler = (e: Event) => {
      // console.log({ referenceElement });
      if (window?.scrollY > referenceElement.current?.offsetHeight) {
        fixedElement.current?.classList.add(...classes);
      } else {
        fixedElement.current?.classList.remove(...classes);
      }
    };
    window && window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  });
};


export default useClassesBasedOnScroll
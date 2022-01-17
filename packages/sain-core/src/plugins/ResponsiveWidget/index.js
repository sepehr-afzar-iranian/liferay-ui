import { useEffect } from "react";
import { useStore } from "@sainui/context";
import "./styles/Responsive.css";

function ResponsiveWidget() {
  const { app } = useStore();
  const portlet = document.getElementById(app.portletElementId);

  const addResponsiveClasses = () => {
    if (portlet) {
      // Add wrapper class
      const { width } = portlet.getBoundingClientRect();

      let size;
      if (width < 576) size = "xs";
      else if (width < 768) size = "sm";
      else if (width < 992) size = "md";
      else if (width < 1200) size = "lg";
      else size = "xl";

      ["xs", "sm", "md", "lg", "xl"].forEach((size) => {
        portlet.classList.remove(`portlet-size-${size}`);
      });
      portlet.classList.add(`portlet-size-${size}`);

      // Add columns class
      let query = "";
      ["xs", "sm", "md", "lg", "xl"].forEach((size) => {
        for (let num = 1; num <= 12; num++) {
          query += `.col-${size}-${num}:not(.col-${num}-in-${size}),`;
        }
      });
      portlet.querySelectorAll(query.slice(0, -1)).forEach((element) => {
        let classes = "";
        element.classList.forEach((eClass) => {
          if (/\bcol-\w+-\d+/.test(eClass)) {
            const arr = eClass.split("-"),
              newClass = ` col-${arr[2]}-in-${arr[1]}`;
            if (!element.classList.contains(newClass)) classes += newClass;
          }
        });
        element.className += classes;
      });
    }
  };

  // Run
  useEffect(addResponsiveClasses, []);
  if (portlet) {
    window.addEventListener("resize", addResponsiveClasses);
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        const { type, attributeName, target } = mutation;
        if (
          type === "childList" ||
          (type === "attributes" &&
            attributeName === "class" &&
            target !== portlet &&
            !/\bcol-\w+-\d+/.test(target.classList))
        )
          addResponsiveClasses();
      });
    });
    observer.observe(portlet, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }
  // Render
  return null;
}

export default ResponsiveWidget;

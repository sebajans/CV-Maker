export function printPage() {
  const main = document.querySelector("main");
  const body = document.querySelector("body");
  if (main && body) {
    main.style.width = "21cm";
    main.style.height = "29.7cm";
    main.style.margin = "0px !important";
    main.style.padding = "0";
    body.style.width = "21cm";
    body.style.height = "29.7cm";
    body.style.margin = "0px !important";
    body.style.padding = "0";
    window.print();
    main.style.removeProperty("width");
    main.style.removeProperty("height");
    main.style.removeProperty("margin");
    main.style.removeProperty("padding");
    body.style.removeProperty("width");
    body.style.removeProperty("height");
    body.style.removeProperty("margin");
    body.style.removeProperty("padding");
  }
}
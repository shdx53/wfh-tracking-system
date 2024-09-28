// Define tag base styles
const parentTagStyles = [
  "hidden",
  "absolute",
  "inset-x-4",
  "bottom-4",
  "lg:flex",
  "flex-col",
  "gap-2",
  "text-[10px]",
  "xl:text-sm",
  "text-black",
];
const tagStyles = ["xl:py-1", "px-2", "rounded-md", "border-l-8", "text-left"];

export function renderArrangementTags(arrangements, formattedDate) {
  return arrangements.map((arrangement) => {
    const startDate = arrangement.Start_Date;
    const startDateObj = new Date(startDate);
    const day = String(startDateObj.getDate()); // e.g., 16
    const numericMonth = String(startDateObj.getMonth() + 1); // e.g., 09
    const stringMonth = startDateObj.toLocaleString("default", {
      month: "short",
    });
    const year = String(startDateObj.getFullYear()); // e.g., 2024

    const shiftType = arrangement.Shift_Type;
    const requestStatus = arrangement.Request_Status;

    if (formattedDate.includes(stringMonth)) {
      const buttons = document.querySelectorAll(".rdp-button.relative");
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];

        if (
          button.textContent.substring(0, 2) === day ||
          button.textContent.substring(0, 1) === day
        ) {
          // Check if parentTag exists, else create a parentTag
          let parentTag = document.getElementById(
            `${day}-${numericMonth}-${year}`,
          );

          if (!parentTag) {
            parentTag = document.createElement("div");
            parentTag.setAttribute("id", `${day}-${numericMonth}-${year}`);
            parentTag.classList.add(...parentTagStyles);
          }

          // Create tag
          const tag = document.createElement("div");

          switch (shiftType) {
            case "AM":
              tag.classList.add(
                ...tagStyles,
                "bg-blue-100/40",
                "border-blue-700",
              );
              break;
            case "PM":
              tag.classList.add(
                ...tagStyles,
                "bg-indigo-100/40",
                "border-indigo-700",
              );
              break;
            case "Full Day":
              tag.classList.add(
                ...tagStyles,
                "bg-teal-100/40",
                "border-teal-700",
              );
              break;
          }

          tag.innerHTML = `<b>${shiftType === "Full Day" ? "All Day" : shiftType}:</b> WFH`;
          tag.style.backgroundColor = "#fafaff";

          requestStatus === "pending" && tag.classList.add("opacity-50");

          parentTag.appendChild(tag);

          // Append the parentTag to the button if it's not already appended
          !button.contains(parentTag) && button.appendChild(parentTag);

          break;
        }
      }
    }
  });
}

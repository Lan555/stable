const robotSlots = document.querySelectorAll(".robot-slot[data-video]");

robotSlots.forEach((slot) => {
  const video = slot.querySelector("video");
  const src = slot.dataset.video;

  if (!video || !src) {
    return;
  }

  video.addEventListener("loadedmetadata", () => {
    slot.classList.add("is-ready");
  });

  video.addEventListener("error", () => {
    slot.classList.remove("is-ready");
    video.removeAttribute("src");
  });

  video.src = src;
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    const text = target ? target.innerText.trim() : "";

    if (!text) {
      return;
    }

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(text);
    } catch (error) {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    const previous = button.textContent;
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.textContent = previous;
    }, 1400);
  });
});

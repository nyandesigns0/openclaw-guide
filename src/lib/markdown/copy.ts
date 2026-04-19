function copyFromSelection(target: HTMLElement | null): boolean {
  const selection = window.getSelection();

  if (!target || !selection) {
    return false;
  }

  const previousRanges = Array.from({ length: selection.rangeCount }, (_, index) =>
    selection.getRangeAt(index).cloneRange()
  );

  const range = document.createRange();
  range.selectNodeContents(target);

  selection.removeAllRanges();
  selection.addRange(range);

  try {
    return document.execCommand("copy");
  } finally {
    selection.removeAllRanges();
    previousRanges.forEach((previousRange) => selection.addRange(previousRange));
  }
}

function copyFromTextarea(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

export async function copyText(text: string, target: HTMLElement | null): Promise<boolean> {
  if (window.isSecureContext && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy copy strategies.
    }
  }

  if (copyFromSelection(target)) {
    return true;
  }

  if (copyFromTextarea(text)) {
    return true;
  }

  window.prompt("Copy code manually:", text);
  return false;
}

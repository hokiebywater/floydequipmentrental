import { supabase } from "./supabase.js";

const STORAGE_KEY = "floyd-equipment-mailing-list";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function alreadyJoined() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

function markJoined() {
  localStorage.setItem(STORAGE_KEY, "true");
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function setMessage(form, message, kind) {
  const messageEl = form.querySelector("[data-mailing-message]");
  if (!messageEl) {
    return;
  }

  messageEl.textContent = message;
  messageEl.classList.toggle("hidden", !message);
  messageEl.classList.toggle("is-error", kind === "error");
  messageEl.classList.toggle("is-success", kind === "success");
}

function showThanks(form) {
  const thanks = form.parentElement?.querySelector("[data-mailing-thanks]");
  form.classList.add("hidden");
  if (thanks) {
    thanks.classList.remove("hidden");
  }
}

function isDuplicateError(error) {
  return Boolean(
    error &&
      (error.code === "23505" ||
        /duplicate|unique/i.test(error.message || "")),
  );
}

async function submitSignup(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const emailInput = form.querySelector('input[type="email"]');
  const optIn = form.querySelector('input[name="optin"]');
  const submitButton = form.querySelector('button[type="submit"]');
  const email = normalizeEmail(emailInput?.value || "");

  setMessage(form, "", "error");

  if (!email || !EMAIL_PATTERN.test(email)) {
    setMessage(form, "Please enter a valid email address.", "error");
    emailInput?.focus();
    return;
  }

  if (optIn && !optIn.checked) {
    setMessage(
      form,
      "Please check the box if you want opening updates.",
      "error",
    );
    optIn.focus();
    return;
  }

  const originalLabel = submitButton?.textContent;
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Joining...";
  }

  try {
    const { error } = await supabase.from("mailing_list").insert({
      email,
      source: form.dataset.source || "website",
    });

    if (error && !isDuplicateError(error)) {
      throw error;
    }

    markJoined();
    showThanks(form);
  } catch (error) {
    console.error("Mailing list error:", error);
    setMessage(
      form,
      "We could not add you right now. Email floydequipmentrental@gmail.com and we'll put you on the list.",
      "error",
    );
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  }
}

document.querySelectorAll(".mailing-list-form").forEach((form) => {
  if (alreadyJoined()) {
    showThanks(form);
    return;
  }

  form.addEventListener("submit", submitSignup);
});

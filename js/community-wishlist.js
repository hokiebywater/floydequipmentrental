import { supabase } from './supabase.js';

const STORAGE_KEY = 'floyd-equipment-wishlist-voted';
const MAX_SELECTIONS = 3;
const viewName = 'community_wishlist_vote_totals';

const form = document.getElementById('wishlist-form');
const validationMessage = document.getElementById('wishlist-validation');
const otherField = document.getElementById('other-field');
const otherTextarea = document.getElementById('wishlist-other');
const resultsContainer = document.getElementById('wishlist-results');
const thankYouPanel = document.getElementById('wishlist-thank-you');
const formContainer = document.getElementById('wishlist-form-container');
const checkboxes = Array.from(document.querySelectorAll('input[name="wishlist-option"]'));

function getSelectedOptions() {
  return checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
}

function showOtherField(show) {
  otherField.classList.toggle('hidden', !show);
  if (!show) {
    otherTextarea.value = '';
  }
}

function setValidationMessage(message) {
  validationMessage.textContent = message;
  validationMessage.classList.toggle('hidden', !message);
}

function userHasVoted() {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

function markUserVoted() {
  localStorage.setItem(STORAGE_KEY, 'true');
}

async function fetchResults() {
  resultsContainer.innerHTML = '<p>Loading community wishlist results...</p>';

  try {
    const { data, error } = await supabase
      .from(viewName)
      .select('equipment_name, vote_count')
      .order('vote_count', { ascending: false });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      resultsContainer.innerHTML = '<p>Be the first to help shape our Community Wishlist.</p>';
      return;
    }

    renderResults(data);
  } catch (error) {
    console.error('Supabase error:', error);
    resultsContainer.innerHTML = '<p>Community Wishlist results are temporarily unavailable.</p>';
  }
}

function renderResults(rows) {
  const totalVotes = rows.reduce((sum, row) => sum + Number(row.vote_count), 0);

  if (totalVotes === 0) {
    resultsContainer.innerHTML = '<p>Be the first to help shape our Community Wishlist.</p>';
    return;
  }

  const resultHtml = rows
    .map((row) => {
      const percentage = Math.round((Number(row.vote_count) / totalVotes) * 100);
      return `
        <div class="vote-item">
          <div class="vote-item-header">
            <span class="vote-item-name">${row.equipment_name}</span>
            <span class="vote-item-percent">${percentage}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${percentage}%;"></div>
          </div>
        </div>
      `;
    })
    .join('');

  resultsContainer.innerHTML = `<div class="wishlist-summary">${resultHtml}</div>`;
}

function updateOtherVisibility() {
  const selected = getSelectedOptions();
  showOtherField(selected.includes('Other'));
}

function setFormVisibility() {
  const form = document.getElementById('wishlist-form');
  if (userHasVoted()) {
    form.classList.add('hidden');
    thankYouPanel.classList.remove('hidden');
  } else {
    form.classList.remove('hidden');
    thankYouPanel.classList.add('hidden');
  }
}

async function submitWishlist(event) {
  event.preventDefault();
  setValidationMessage('');

  const selectedOptions = getSelectedOptions();
  if (selectedOptions.length === 0) {
    setValidationMessage('Please choose at least one piece of equipment.');
    return;
  }

  if (selectedOptions.length > MAX_SELECTIONS) {
    setValidationMessage('Please choose no more than three pieces of equipment.');
    return;
  }

  const rows = selectedOptions.map((option) => {
    if (option === 'Other') {
      return {
        equipment_name: otherTextarea.value.trim() || 'Other',
      };
    }
    return { equipment_name: option };
  });

  try {
    const { error } = await supabase.from('equipment_votes').insert(rows);
    if (error) {
      throw error;
    }

    markUserVoted();
    setFormVisibility();
    await fetchResults();
  } catch (error) {
    console.error('Supabase insert error:', error);
    setValidationMessage('We could not submit your wishlist right now. Please try again later.');
  }
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const selectedOptions = getSelectedOptions();
    if (selectedOptions.length > MAX_SELECTIONS) {
      checkbox.checked = false;
      setValidationMessage('Please choose no more than three pieces of equipment.');
      return;
    }

    setValidationMessage('');
    updateOtherVisibility();
  });
});

form.addEventListener('submit', submitWishlist);

setFormVisibility();
fetchResults();

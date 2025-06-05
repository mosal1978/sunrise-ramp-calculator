let currentStep = 1;

const defaultTexts = {};
document.addEventListener('DOMContentLoaded', () => {
  const ids = Object.keys(translations.en).concat('next');
  ids.forEach(id => {
    if (id === 'next') {
      const el = document.querySelector('.next-label');
      if (el) defaultTexts[id] = el.textContent;
    } else {
      const el = document.getElementById(id);
      if (el) defaultTexts[id] = el.textContent;
    }
  });
});
function nextStep() {
  document.getElementById(`step${currentStep}`).classList.remove('active');
  currentStep++;
  const step = document.getElementById(`step${currentStep}`);
  if (step) {
    step.classList.add('active');
    updateProgress();
  }
}
function restart() {
  document.getElementById(`step${currentStep}`).classList.remove('active');
  currentStep = 1;
  document.getElementById('step1').classList.add('active');
  updateProgress();
}
function updateProgress() {
  const progress = ((currentStep - 1) / 18) * 100;
  const bar = document.getElementById('progress-bar');
  bar.style.width = progress + '%';
  bar.setAttribute('aria-valuenow', progress);
}
const translations = {
  en: {
    next: 'Next',
    restart: 'Restart',
    'step1-title': "Issue: R20 won't power on",
    'check1-1-label': 'Battery connected correctly?',
    'check1-2-label': 'Battery turned on?',
    'check1-3-label': 'Battery charged?',
    'check1-4-label': 'Battery fuses defective?',
    'solution1-title': "Solution: R20 won't power on",
    'solution1-1': 'Plug the device in correctly',
    'solution1-2': 'Switch it on',
    'solution1-3': 'Charge the battery',
    'solution1-4': 'Contact the dealer',
    'step3-title': "Issue: R20 doesn't move",
    'check3-1-label': 'R20 switched on?',
    'check3-2-label': 'Cable plugged in correctly?',
    'check3-3-label': 'Battery discharged?',
    'check3-4-label': 'Drive wheel on the ground?',
    'check3-5-label': 'Drive wheel has traction?',
    'solution2-title': "Solution: R20 doesn't move",
    'solution2-1': 'Switch on the device',
    'solution2-2': 'Plug the cable in correctly',
    'solution2-3': 'Charge the battery',
    'solution2-4': 'Unhook the drive wheel',
    'solution2-5': 'Contact the dealer if the issue persists',
    'step5-title': 'Issue: Battery cannot be charged',
    'check5-1-label': 'Charger plugged in properly?',
    'check5-2-label': 'Device plug inserted properly?',
    'solution3-title': 'Solution: Battery cannot be charged',
    'solution3-1': 'Plug the device in correctly',
    'solution3-2': 'Contact the dealer if the issue persists',
    'step7-title': 'Issue: Battery damaged',
    'check7-1-label': 'Wrong charger used?',
    'solution4-title': 'Solution: Battery damaged',
    'solution4-1': 'Use the original charger',
    'solution4-2': 'Notify the dealer if the battery was opened',
    'step9-title': "Issue: Motor doesn't work and makes noises",
    'check9-1-label': 'Motor check',
    'check9-2-label': 'Plug from motor to 9-pin cable',
    'solution5-title': "Solution: Motor doesn't work and makes noises",
    'solution5-1': 'Check the motor and plug',
    'solution5-2': 'Contact the dealer if the issue persists',
    'step11-title': 'Issue: Motor keeps running after releasing the drive button',
    'check11-1-label': 'Drive button',
    'solution6-title': 'Solution: Motor keeps running after releasing the drive button',
    'solution6-1': 'Replace the drive button',
    'solution6-2': 'Contact the dealer if the issue persists',
    'step13-title': 'Issue: R20 shuts off after 5 to 10 minutes',
    'check13-1-label': 'Test with the service kit',
    'solution7-title': 'Solution: R20 shuts off after 5 to 10 minutes',
    'solution7-1': 'Anyone with a service kit can troubleshoot via swap',
    'step15-title': 'Issue: Device check',
    'check15-1-label': 'Is the device switched on?',
    'check15-2-label': 'Any signs of housing or cable damage?',
    'check15-3-label': 'Are all connections secure?',
    'check15-4-label': 'Does the device work when switched on?',
    'step16-title': 'Error analysis',
    'check16-1-label': 'Any error messages or alarm tones?',
    'check16-2-label': 'Signs of overheating or overload?',
    'check16-3-label': 'Do all sensors work correctly?',
    'step17-title': 'Repair',
    'check17-1-label': 'Were all tests performed to confirm the repair?',
    'step18-title': 'Maintenance',
    'check18-1-label': 'Was the device cleaned and disinfected?',
    'check18-2-label': 'Were all maintenance tasks completed?',
    'check18-3-label': 'Are all components up to date?',
    'check18-4-label': 'Were all maintenance records filled out?',
    'final-check': 'Troubleshooting finished. Contact support if problems persist.'
  }
};

function changeLanguage() {
  const lang = document.getElementById('language-selector').value;
  if (lang === 'de') {
    for (const id in defaultTexts) {
      if (id === 'next') {
        document.querySelectorAll('.next-label').forEach(el => {
          el.textContent = defaultTexts[id];
        });
        continue;
      }
      const el = document.getElementById(id);
      if (el) el.textContent = defaultTexts[id];
    }
    return;
  }
  const map = translations[lang];
  if (!map) return;
  for (const id in map) {
    if (id === 'next') {
      document.querySelectorAll('.next-label').forEach(el => {
        el.textContent = map[id];
      });
      continue;
    }
    const el = document.getElementById(id);
    if (el) el.textContent = map[id];
  }
}

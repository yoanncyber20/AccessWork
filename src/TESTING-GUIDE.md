# 🧪 AccessWork - Complete Testing Guide

## 🎯 Quick Test Scenarios

### ✅ Scenario 1: Standard Employee Login
**Steps:**
1. Open the application
2. Click the "Employee" role card (blue)
3. Click "Employee" demo account button
4. Verify email: `employee@company.com` is filled
5. Verify password: `demo123` is filled
6. Click "Sign In"
7. **Expected Result:** 
   - Toast: "👤 Welcome! Access your tasks, messages, and schedule."
   - Redirects to Employee Dashboard
   - Last role saved as "employee"

---

### ✅ Scenario 2: Manager Login with Voice Assistant
**Steps:**
1. Open the application
2. Click "Voice Assistant" button (top-left)
3. Listen for: "Welcome to AccessWork..."
4. Click the "Manager" role card (purple)
5. Listen for: "Manager role selected. Use manager@company.com..."
6. Click microphone icon next to Email field
7. Speak: "manager at company dot com"
8. Click microphone icon next to Password field
9. Speak: "demo one two three"
10. Click "Sign In"
11. **Expected Result:**
    - Voice reads: "Welcome, Manager! You have full access to team management."
    - Toast: "👔 Welcome, Manager!..."
    - Redirects to Manager Dashboard

---

### ✅ Scenario 3: Accessibility Mode Full Test
**Steps:**
1. Open the application
2. Click "Accessibility Mode ♿" button
3. **Verify:**
   - Button shows "ACTIVE" badge
   - All text appears larger
   - Touch targets are 56px minimum
   - Info panel appears below with feature list
   - Audio "success" sound plays
   - Toast: "♿ Accessibility mode enabled..."
4. Try keyboard navigation:
   - Press `Tab` → Email field focused (ring glow appears)
   - Press `Tab` → Password field focused
   - Press `Tab` → Forgot password link
   - Press `Tab` → Sign In button
   - Press `Enter` → Should submit (with validation error if empty)
5. **Expected Result:**
   - All elements focusable via keyboard
   - Visual focus indicators (4px ring + glow)
   - Audio feedback on Tab navigation

---

### ✅ Scenario 4: High Contrast Mode
**Steps:**
1. Toggle "High Contrast" switch (top-right)
2. **Verify:**
   - Top bar appears with purple gradient
   - Badge "HIGH CONTRAST" appears at top center
   - All borders become 2-3px thick
   - Text contrast increases to 10:1+
   - Colors shift to darker/lighter variants
3. Switch to Dark Mode (FAB button)
4. **Verify:**
   - High contrast still active
   - Colors adapt to dark + high contrast
   - Badge remains visible
5. **Expected Result:**
   - WCAG AAA compliance maintained
   - All text readable
   - Borders clearly visible

---

### ✅ Scenario 5: Voice Dictation
**Steps:**
1. Click microphone icon next to Email
2. **Browser asks:** "Allow microphone access?" → Click "Allow"
3. Speak clearly: "test at example dot com"
4. **Verify:**
   - Microphone button pulses/animates
   - Text appears in email field: "test@example.com"
   - Audio success sound plays
   - Voice says: "Email entered"
5. Click microphone icon next to Password
6. Speak: "password one two three"
7. **Verify:**
   - Text appears: "password123"
   - Success feedback
8. **Expected Result:**
   - Speech recognition works
   - Text cleaned (spaces removed)
   - Audio/visual confirmation

---

## 🎨 Visual Testing Checklist

### Logo Animation
- [ ] Shield icon appears on load
- [ ] Glow/pulse animation starts after 500ms
- [ ] Scale increases to 110%
- [ ] Purple gradient ring visible

### Role Selection Cards
- [ ] Employee card: Blue theme, User icon
- [ ] Manager card: Purple theme, Briefcase icon
- [ ] Hover: Scale to 105%, border color change
- [ ] Selected: Elevated, colored border, pulse dot
- [ ] Descriptions visible and readable

### Input Fields
- [ ] Icons visible on left (Mail, Lock)
- [ ] Focus: Border turns primary color
- [ ] Focus: Ring glow appears (4px + 20px shadow)
- [ ] Focus: Scale to 102%
- [ ] Placeholder text visible
- [ ] Microphone button visible on right

### Buttons
- [ ] Sign In: Gradient background, shield icon
- [ ] Sign In Hover: Elevation increases, gradient shifts
- [ ] Sign In Click: Ripple animation appears
- [ ] Accessibility Mode: Changes color when active
- [ ] Demo Account Buttons: Icons scale on hover

---

## 🔊 Audio Testing

### Sound Effects
1. **Click Sound:**
   - Trigger: Any button click, role selection
   - Expected: Short click sound (~100ms)

2. **Toggle Sound:**
   - Trigger: Voice Assistant, High Contrast, Accessibility Mode
   - Expected: Toggle switch sound

3. **Success Sound:**
   - Trigger: Form submission, demo account load
   - Expected: Pleasant chime/bell sound

4. **Error Sound:**
   - Trigger: Validation error, voice recognition error
   - Expected: Warning beep

### Voice Assistant
1. **Enable Voice Assistant**
2. **Test Phrases:**
   - "Welcome to AccessWork. Please enter..."
   - "Email field. Please enter your email address."
   - "Password field. Please enter your password."
   - "Manager role selected..."
   - "Welcome, Manager! You have full access..."

3. **Verify Pitch:**
   - Manager voice: Deeper (0.9)
   - Employee voice: Higher (1.1)

---

## ⌨️ Keyboard Navigation Testing

### Tab Order
1. Start: Email field
2. Tab → Password field
3. Tab → Show/Hide password button
4. Tab → Forgot password link
5. Tab → Sign In button
6. Tab → Accessibility Mode button
7. Tab → Employee demo button
8. Tab → Manager demo button
9. Tab → Voice Assistant button
10. Tab → High Contrast switch

### Shortcuts
- `Enter` on Sign In → Submit form
- `Escape` → Close any open dialogs (future)
- `Space` on switch → Toggle

### Focus Indicators
- [ ] Visible 3-4px outline
- [ ] Primary color (#6750A4 or #D0BCFF)
- [ ] Offset: 2-4px
- [ ] Shadow glow: 6-8px

---

## 📱 Responsive Testing

### Desktop (1920x1080)
- [ ] Login card centered
- [ ] Max width: 28rem (448px)
- [ ] All elements properly spaced
- [ ] Background blur visible

### Tablet (1024x768)
- [ ] Card adapts to width
- [ ] Touch targets 48px+
- [ ] Grid layout maintained

### Mobile (375x667)
- [ ] Single column layout
- [ ] Touch targets 56px
- [ ] Demo account grid: 2 columns
- [ ] Font sizes readable

---

## 🌈 Color Blind Mode Testing

### Protanopia (Red-Blind)
1. Navigate to Accessibility Settings (after login)
2. Select "Protanopia" mode
3. **Verify:**
   - Reds replaced with blues/purples
   - Errors shown in gold/amber
   - Success shown in blue

### Deuteranopia (Green-Blind)
1. Select "Deuteranopia" mode
2. **Verify:**
   - Greens replaced with blues
   - Success indicators use blue
   - Warnings use yellow/orange

### Tritanopia (Blue-Blind)
1. Select "Tritanopia" mode
2. **Verify:**
   - Blues replaced with browns/grays
   - Primary color shifts to brown
   - Layout remains clear

### Monochrome
1. Select "Monochrome" mode
2. **Verify:**
   - All colors grayscale
   - Contrast maintained
   - Symbols added to status indicators

---

## 🔍 Accessibility Audit

### Screen Reader (NVDA/JAWS/VoiceOver)

**Email Field:**
```
"Email address, edit text, your dot email at company dot com"
```

**Password Field:**
```
"Password, protected edit text, your password"
```

**Sign In Button:**
```
"Sign in to AccessWork, button"
```

**Accessibility Mode:**
```
"Enable or disable accessibility mode, button, pressed: false"
```

**Role Cards:**
```
"Select employee role, button, pressed: true"
"Tasks, messages and schedule"
```

### ARIA Labels
- [ ] All buttons have `aria-label`
- [ ] Form fields have `aria-describedby` when needed
- [ ] Toggle buttons have `aria-pressed`
- [ ] Icons have `aria-hidden="true"`
- [ ] Live regions have `aria-live`

### Semantic HTML
- [ ] `<form>` element used
- [ ] `<label>` for all inputs
- [ ] `<button>` for interactions (not `<div>`)
- [ ] Heading hierarchy: h1 → h2 → h3
- [ ] `<main>` landmark used

---

## 🐛 Edge Cases & Error Handling

### Empty Form Submission
**Steps:**
1. Leave both fields empty
2. Click "Sign In"
3. **Expected:**
   - Error sound plays
   - Toast: "Please fill in all fields"
   - Voice: "Please fill in all fields"
   - Red border on empty fields
   - No page navigation

### Invalid Email Format
**Steps:**
1. Enter: "notanemail"
2. Enter password: "test123"
3. Click "Sign In"
4. **Expected:**
   - Browser validation appears
   - "Please include '@' in email address"

### Voice Recognition Permission Denied
**Steps:**
1. Click microphone button
2. Click "Block" on permission prompt
3. **Expected:**
   - Error toast appears
   - Microphone button returns to normal
   - Fallback to manual input

### Voice Recognition No Speech
**Steps:**
1. Click microphone
2. Allow permission but don't speak
3. **Expected:**
   - Timeout after 5-10 seconds
   - Error sound
   - Microphone button resets

---

## ⚡ Performance Testing

### Load Time
- [ ] Initial HTML: < 100ms
- [ ] JavaScript loaded: < 500ms
- [ ] Fonts loaded: < 1000ms
- [ ] Images loaded: < 2000ms
- [ ] Total interactive: < 2000ms

### Animation Performance
- [ ] 60fps on all animations
- [ ] No janky scrolling
- [ ] Smooth transitions
- [ ] GPU acceleration enabled

### Memory Usage
- [ ] No memory leaks
- [ ] Event listeners cleaned up
- [ ] Speech synthesis cancelled on unmount

---

## 🔐 Security Testing

### Input Sanitization
- [ ] XSS prevention on email field
- [ ] Password not logged to console
- [ ] No sensitive data in localStorage (only role)

### Password Visibility
- [ ] Hidden by default
- [ ] Show/hide toggle works
- [ ] Password masked with dots

---

## 📊 Test Results Template

```markdown
## Test Session: [Date]
**Tester:** [Name]
**Browser:** [Chrome 120 / Safari 17 / etc.]
**Device:** [Desktop / Mobile]
**Screen Size:** [1920x1080]

### Results
- ✅ Standard Login: PASS
- ✅ Voice Assistant: PASS
- ✅ Accessibility Mode: PASS
- ⚠️ Voice Dictation: PARTIAL (Firefox not supported)
- ✅ Keyboard Navigation: PASS
- ✅ High Contrast: PASS
- ✅ Responsive Design: PASS

### Issues Found
1. [Description]
   - Severity: High/Medium/Low
   - Steps to reproduce: ...
   - Expected: ...
   - Actual: ...

### Notes
[Additional observations]
```

---

## 🎓 User Acceptance Testing (UAT)

### Persona 1: Visually Impaired User (John)
**Needs:** Screen reader, high contrast, voice assistant

**Test:**
1. Enable voice assistant
2. Enable high contrast
3. Use Tab navigation exclusively
4. Login using voice dictation
5. **Success Criteria:**
   - Can complete login without mouse
   - Voice guidance clear and helpful
   - All text readable with high contrast

### Persona 2: Motor Impairment User (Sarah)
**Needs:** Large touch targets, voice input, minimal interactions

**Test:**
1. Enable accessibility mode
2. Use voice dictation for both fields
3. Use demo account button
4. **Success Criteria:**
   - All buttons 56px+
   - Voice dictation accurate
   - Single tap on demo account works

### Persona 3: Elderly User (Robert, 70)
**Needs:** Simple interface, large text, audio feedback

**Test:**
1. Select role visually (clear icons)
2. Use demo account button
3. Enable accessibility mode if needed
4. **Success Criteria:**
   - Icons and text large enough
   - Process simple (3-4 clicks max)
   - Audio confirms each action

---

## 🚀 Automated Testing (Future)

### Jest/Vitest Unit Tests
```typescript
describe('Login Component', () => {
  it('renders role selection cards', () => {});
  it('enables accessibility mode', () => {});
  it('plays audio on interactions', () => {});
  it('saves last role to localStorage', () => {});
});
```

### Playwright E2E Tests
```typescript
test('employee login flow', async ({ page }) => {
  await page.goto('/');
  await page.click('[aria-label="Select employee role"]');
  await page.click('[aria-label="Load employee demo account"]');
  await page.click('[aria-label="Sign in to AccessWork"]');
  await expect(page).toHaveURL('/dashboard');
});
```

---

## 📝 Test Coverage Goals

- [ ] Unit Tests: 80%+
- [ ] Integration Tests: 60%+
- [ ] E2E Tests: 40%+
- [ ] Accessibility Tests: 100%
- [ ] Visual Regression Tests: 100%

---

**Last Updated:** January 2025  
**Test Framework:** Manual + Playwright (future)  
**Accessibility Tools:** WAVE, axe DevTools, Lighthouse  
**Browser Testing:** BrowserStack, LambdaTest

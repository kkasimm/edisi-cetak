// Karakter gerak "mesin cetak": dorongan tegas, berhenti pelan.
// Tiap bagian memakai kombinasi berbeda agar ritmenya tidak seragam.
export const ease = {
  press:  [0.76, 0, 0.18, 1],
  settle: [0.16, 1, 0.3, 1],
  ink:    [0.45, 0.05, 0.2, 1],
  lift:   [0.33, 1, 0.68, 1],
}
export const dur = { quick: 0.28, base: 0.6, slow: 1.1, press: 1.6 }

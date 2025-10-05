export function setCurrentYear(){
  if(typeof document === 'undefined') return
  const el = document.getElementById('current-year')
  if(el) el.textContent = new Date().getFullYear()
}

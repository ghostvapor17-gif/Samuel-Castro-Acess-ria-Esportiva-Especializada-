/* =====================================================================
   HORÁRIOS — fonte única dos dados e utilitários de status
   Usado tanto pela página pública (site-samuel-castro.html) quanto
   pela página de administração (admin.html).

   IMPORTANTE: os dois arquivos precisam estar na MESMA pasta/domínio
   quando publicados, pois o status é salvo no localStorage do
   navegador (por origem/domínio, não por arquivo).
   ===================================================================== */
(function (global) {

  // Grade fixa da semana. "instrucao" é um horário de turma fixo
  // (não alternável); "slots" são os horários individuais que podem
  // ser marcados como Livre/Ocupado.
  const SCHEDULE = [
    { key: 'segunda', day: 'Segunda-feira', instrucao: '19h-21h',
      slots: ['15h-16h', '16h-17h', '17h-18h', '18h-19h'] },
    { key: 'terca', day: 'Terça-feira', instrucao: '17h-19h',
      slots: ['15h-16h', '16h-17h', '19h-20h', '20h-21h'] },
    { key: 'quarta', day: 'Quarta-feira', instrucao: '19h-21h',
      slots: ['15h-16h', '16h-17h', '17h-18h', '18h-19h'] },
    { key: 'quinta', day: 'Quinta-feira', instrucao: '17h-21h',
      slots: ['14h-15h', '15h-16h', '16h-17h'] },
    { key: 'sexta', day: 'Sexta-feira', instrucao: '17h-19h',
      slots: ['15h-16h', '16h-17h', '19h-20h', '20h-21h'] }
  ];

  const STORAGE_KEY = 'sc_horarios_status_v1';

  function slotId(dayKey, slot) {
    return dayKey + '__' + slot;
  }

  function loadAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveAll(map) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  }

  // Status padrão de qualquer horário não salvo ainda: livre.
  function getStatus(dayKey, slot) {
    const map = loadAll();
    return map[slotId(dayKey, slot)] === 'ocupado' ? 'ocupado' : 'livre';
  }

  function setStatus(dayKey, slot, status) {
    const map = loadAll();
    map[slotId(dayKey, slot)] = status;
    saveAll(map);
  }

  function toggleStatus(dayKey, slot) {
    const next = getStatus(dayKey, slot) === 'livre' ? 'ocupado' : 'livre';
    setStatus(dayKey, slot, next);
    return next;
  }

  global.HorariosData = { SCHEDULE, STORAGE_KEY, slotId, getStatus, setStatus, toggleStatus };

})(window);

import {
  JOURNAL_ENTRY_MAX_LENGTH,
  addEntry,
  deleteEntry,
  groupByDay,
  lessonEntry,
  parseJournal,
  searchEntries,
  serializeJournal,
  setLessonReflection,
  updateEntry,
  type JournalEntry,
} from '@/features/journal/journal';

const T1 = '2026-10-15T09:00:00.000Z';
const T2 = '2026-10-16T09:00:00.000Z';
const T3 = '2026-10-16T21:00:00.000Z';
let n = 0;
const newId = () => `id-${++n}`;

describe('journal entries', () => {
  it('adds entries newest first and caps their length', () => {
    let entries = addEntry([], { id: 'a', createdAt: T1, body: 'eerste' });
    entries = addEntry(entries, { id: 'b', createdAt: T2, body: 'x'.repeat(JOURNAL_ENTRY_MAX_LENGTH + 10) });
    expect(entries.map((e) => e.id)).toEqual(['b', 'a']);
    expect(entries[0].body).toHaveLength(JOURNAL_ENTRY_MAX_LENGTH);
  });

  it('edits and deletes one entry without touching the others', () => {
    let entries = addEntry(addEntry([], { id: 'a', createdAt: T1, body: 'een' }), { id: 'b', createdAt: T2, body: 'twee' });
    entries = updateEntry(entries, 'a', 'een, herzien', T3);
    expect(entries.find((e) => e.id === 'a')).toMatchObject({ body: 'een, herzien', createdAt: T1, updatedAt: T3 });
    expect(deleteEntry(entries, 'a').map((e) => e.id)).toEqual(['b']);
  });

  it('keeps one reflection per lesson and removes it when cleared', () => {
    let entries: JournalEntry[] = [];
    entries = setLessonReflection(entries, 'day-04', 'Ik ben de oudste zoon.', T1, newId);
    entries = setLessonReflection(entries, 'day-04', 'Misschien ook de jongste.', T2, newId);
    expect(entries).toHaveLength(1);
    expect(lessonEntry(entries, 'day-04')).toMatchObject({ body: 'Misschien ook de jongste.', createdAt: T1, updatedAt: T2 });
    expect(setLessonReflection(entries, 'day-04', '   ', T3, newId)).toEqual([]);
    expect(setLessonReflection([], 'day-05', '', T3, newId)).toEqual([]);
  });

  it('searches text and lesson titles, ignoring case and accents', () => {
    const entries = [
      ...addEntry([], { id: 'a', createdAt: T1, body: 'Dankbaar voor een rustige ochtend', lessonId: 'day-11' }),
      ...addEntry([], { id: 'b', createdAt: T2, body: 'Ruzie met mijn collega' }),
    ];
    const title = (id: string) => (id === 'day-11' ? 'Dankbaarheid' : undefined);
    expect(searchEntries(entries, 'RUZIE', title).map((e) => e.id)).toEqual(['b']);
    expect(searchEntries(entries, 'dankbaarheid', title).map((e) => e.id)).toEqual(['a']);
    expect(searchEntries(entries, '', title)).toHaveLength(2);
    expect(searchEntries(entries, 'niets hiervan', title)).toEqual([]);
  });

  it('groups by calendar day', () => {
    let entries = addEntry([], { id: 'a', createdAt: T1, body: '1' });
    entries = addEntry(entries, { id: 'b', createdAt: T2, body: '2' });
    entries = addEntry(entries, { id: 'c', createdAt: T3, body: '3' });
    const groups = groupByDay(entries);
    expect(groups.map((g) => g.entries.length)).toEqual(groups.length === 3 ? [1, 1, 1] : [2, 1]);
    expect(groups.flatMap((g) => g.entries.map((e) => e.id))).toEqual(['c', 'b', 'a']);
  });
});

describe('parseJournal', () => {
  it('round-trips and drops broken or duplicate entries', () => {
    const good = addEntry([], { id: 'a', createdAt: T1, body: 'goed' });
    const json = JSON.stringify({ version: 1, entries: [...good, good[0], { id: 'x', body: 3 }, null] });
    expect(parseJournal(json)).toEqual(good);
    expect(parseJournal(serializeJournal(good))).toEqual(good);
  });

  it('rejects an unknown format', () => {
    expect(() => parseJournal('{"version":9,"entries":[]}')).toThrow();
  });
});

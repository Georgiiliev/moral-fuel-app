import { estimateReadingMinutes } from './reading-time';
import {
  BIBLE_BOOKS,
  LANGUAGES,
  REVIEW_STATES,
  TOPICS,
  type BibleReference,
  type Journey,
  type Lesson,
  type LessonText,
} from '@/models/content';

const ID_PATTERN = /^[a-z0-9-]+$/; // also safe as a SecureStore key segment
const STEP_ORDER = ['learn', 'reflect', 'live'] as const;

const filled = (value: unknown) => typeof value === 'string' && value.trim().length > 0;

function checkReference(ref: BibleReference, where: string, errors: string[]) {
  if (!BIBLE_BOOKS.includes(ref.book)) errors.push(`${where}: unknown Bible book ${ref.book}`);
  if (!Number.isInteger(ref.chapter) || ref.chapter < 1) errors.push(`${where}: invalid chapter`);
  if (ref.verseStart !== undefined && (!Number.isInteger(ref.verseStart) || ref.verseStart < 1)) {
    errors.push(`${where}: invalid start verse`);
  }
  if (ref.verseEnd !== undefined && (ref.verseStart === undefined || ref.verseEnd < ref.verseStart)) {
    errors.push(`${where}: verse range runs backwards`);
  }
}

function checkText(text: LessonText, where: string, errors: string[]) {
  for (const field of ['title', 'summary', 'objective'] as const) {
    if (!filled(text[field])) errors.push(`${where}: missing ${field}`);
  }
  const kinds = text.steps.map((step) => step.kind);
  if (kinds.join() !== STEP_ORDER.join()) errors.push(`${where}: steps must be learn, reflect, live`);
  const [learn, reflect, live] = text.steps;
  if (learn?.kind === 'learn') {
    if (!filled(learn.bigIdea) || !filled(learn.passageSummary) || !filled(learn.context) || !filled(learn.example)) {
      errors.push(`${where}: learn step needs big idea, passage summary, context and example`);
    }
    if (learn.explanation.length === 0 || !learn.explanation.every(filled)) {
      errors.push(`${where}: learn step needs explanation paragraphs`);
    }
  }
  if (reflect?.kind === 'reflect' && !filled(reflect.prompt.question)) {
    errors.push(`${where}: reflect step needs a question`);
  }
  if (live?.kind === 'live' && (!filled(live.action.title) || !filled(live.action.description))) {
    errors.push(`${where}: live step needs an action`);
  }
}

function checkLesson(lesson: Lesson, errors: string[]) {
  const where = `lesson ${lesson.id}`;
  if (!ID_PATTERN.test(lesson.id)) errors.push(`${where}: id may only use a-z, 0-9 and -`);
  if (!REVIEW_STATES.includes(lesson.review.state)) errors.push(`${where}: unknown review state`);
  if (lesson.review.state === 'APPROVED' && (!filled(lesson.review.reviewedBy) || !filled(lesson.review.reviewedOn))) {
    errors.push(`${where}: APPROVED content needs a named reviewer and review date`);
  }
  if (!filled(lesson.review.authoredBy) || !filled(lesson.review.authoredOn)) errors.push(`${where}: missing author metadata`);
  if (lesson.source.bibleText !== 'summary-only') errors.push(`${where}: lessons must not quote a Bible translation`);
  const wellFormed = lesson.text.nl?.steps.map((step) => step.kind).join() === STEP_ORDER.join();
  if (wellFormed && lesson.readingMinutes !== estimateReadingMinutes(lesson.text.nl)) {
    errors.push(`${where}: reading time should be ${estimateReadingMinutes(lesson.text.nl)} minutes`);
  }
  if (lesson.topics.length === 0 || !lesson.topics.every((t) => TOPICS.includes(t))) errors.push(`${where}: invalid topics`);
  checkReference(lesson.passage, `${where} passage`, errors);
  checkReference(lesson.source.contextChecked, `${where} context`, errors);
  lesson.relatedPassages.forEach((ref, i) => checkReference(ref, `${where} related ${i + 1}`, errors));
  for (const language of LANGUAGES) {
    const text = lesson.text[language];
    if (text) checkText(text, `${where} [${language}]`, errors);
    else if (language === 'nl') errors.push(`${where}: missing Dutch text`);
  }
}

/** Returns every integrity problem in the content; an empty list means the content is sound. */
export function validateContent(journey: Journey, lessons: readonly Lesson[]): string[] {
  const errors: string[] = [];
  const lessonIds = new Set<string>();
  for (const lesson of lessons) {
    if (lessonIds.has(lesson.id)) errors.push(`duplicate lesson id ${lesson.id}`);
    lessonIds.add(lesson.id);
    checkLesson(lesson, errors);
  }

  const sectionIds = new Set<string>();
  let expectedStart = 1;
  [...journey.sections]
    .sort((a, b) => a.order - b.order)
    .forEach((section) => {
      if (sectionIds.has(section.id)) errors.push(`duplicate section id ${section.id}`);
      sectionIds.add(section.id);
      if (section.dayStart !== expectedStart) errors.push(`section ${section.id} should start at day ${expectedStart}`);
      if (section.dayEnd < section.dayStart) errors.push(`section ${section.id} ends before it starts`);
      if (!filled(section.text.nl.title)) errors.push(`section ${section.id}: missing title`);
      expectedStart = section.dayEnd + 1;
    });
  if (expectedStart !== journey.totalDays + 1) errors.push('sections do not cover every journey day');

  if (journey.days.length !== journey.totalDays) {
    errors.push(`journey has ${journey.days.length} days, expected ${journey.totalDays}`);
  }
  const referenced = new Set<string>();
  journey.days.forEach((day, index) => {
    const where = `journey day ${day.day}`;
    if (day.day !== index + 1) errors.push(`${where}: days must be ordered 1..${journey.totalDays}`);
    const section = journey.sections.find((s) => s.id === day.sectionId);
    if (!section) errors.push(`${where}: unknown section ${day.sectionId}`);
    else if (day.day < section.dayStart || day.day > section.dayEnd) errors.push(`${where}: outside its section`);

    if (day.availability === 'available') {
      const lesson = lessons.find((l) => l.id === day.lessonId);
      if (!lesson) errors.push(`${where}: lesson ${day.lessonId} does not exist`);
      else if (lesson.day !== day.day || lesson.sectionId !== day.sectionId) {
        errors.push(`${where}: lesson ${lesson.id} says day ${lesson.day} in ${lesson.sectionId}`);
      }
      if (referenced.has(day.lessonId)) errors.push(`${where}: lesson ${day.lessonId} is used twice`);
      referenced.add(day.lessonId);
    } else {
      if (day.editorialState !== 'PLANNED') errors.push(`${where}: planned days must be PLANNED`);
      if (!filled(day.text.nl.title) || !filled(day.text.nl.summary) || !filled(day.text.nl.objective)) {
        errors.push(`${where}: planned day needs title, summary and objective`);
      }
      if (!day.topics.every((t) => TOPICS.includes(t))) errors.push(`${where}: invalid topics`);
    }
  });
  for (const id of lessonIds) {
    if (!referenced.has(id)) errors.push(`lesson ${id} is not on the journey`);
  }
  return errors;
}

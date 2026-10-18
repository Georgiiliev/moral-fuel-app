import { JOURNEY, LESSONS, getDayViews, getLesson } from '@/content';
import { lessonProse } from '@/content/reading-time';
import { validateContent } from '@/content/validate';
import type { Journey, Lesson } from '@/models/content';

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

describe('shipped content', () => {
  it('passes every integrity check', () => {
    expect(validateContent(JOURNEY, LESSONS)).toEqual([]);
  });

  it('has 30 ordered days in four sections, every one with a written lesson', () => {
    const days = getDayViews('nl');
    expect(days.map((d) => d.day)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(JOURNEY.sections).toHaveLength(4);
    expect(LESSONS).toHaveLength(30);
    expect(days.every((d) => d.available && d.lessonId)).toBe(true);
  });

  describe.each(LESSONS.map((lesson) => [lesson.day, lesson] as const))('lesson %i', (day, lesson) => {
    const text = lesson.text.nl;
    const [learn, reflect, live] = text.steps;
    const prose = `${text.objective} ${lessonProse(text)}`;

    it('has an id that names its day', () => {
      expect(lesson.id.startsWith(`day-${String(day).padStart(2, '0')}-`)).toBe(true);
    });

    it('is complete: context, a real explanation, a question, an action', () => {
      expect(learn.context.length).toBeGreaterThan(120);
      expect(learn.explanation.length).toBeGreaterThanOrEqual(2);
      expect(reflect.prompt.question.trim().endsWith('?')).toBe(true);
      expect(live.action.description.length).toBeGreaterThan(60);
    });

    it('uses a calm tone: no exclamation marks', () => {
      expect(prose).not.toContain('!');
    });

    it('only points to known help lines', () => {
      const numbers = prose.match(/\b\d{3,4}(?:-\d{3,4})?\b/g) ?? [];
      const allowed = ['113', '0800-0113', '0800-2000', '112'];
      const phoneLike = numbers.filter((n) => n.startsWith('0') || ['112', '113'].includes(n));
      expect(phoneLike.filter((n) => !allowed.includes(n))).toEqual([]);
    });
  });

  it('gives every lesson its own title', () => {
    const titles = LESSONS.map((l) => l.text.nl.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('labels every lesson as an editorial draft, never as approved', () => {
    expect(LESSONS.every((lesson) => lesson.review.state === 'EDITORIAL_DRAFT')).toBe(true);
  });

  it('quotes no Bible translation: passage summaries contain no quotation marks', () => {
    for (const lesson of LESSONS) {
      const [learn] = lesson.text.nl.steps;
      expect(learn.passageSummary).not.toMatch(/["“”„«»]/);
    }
  });

  it('resolves available days to their lessons', () => {
    for (const day of getDayViews('nl').filter((d) => d.available)) {
      expect(getLesson(day.lessonId!)?.day).toBe(day.day);
    }
  });
});

describe('validateContent', () => {
  const broken = (change: (journey: Journey, lessons: Lesson[]) => void) => {
    const journey = clone(JOURNEY);
    const lessons = clone(LESSONS) as Lesson[];
    change(journey, lessons);
    return validateContent(journey, lessons);
  };

  it('rejects duplicate lesson ids', () => {
    const errors = broken((_, lessons) => lessons.push(clone(lessons[0])));
    expect(errors).toContain(`duplicate lesson id ${LESSONS[0].id}`);
  });

  it('rejects a journey day that points at a missing lesson', () => {
    const errors = broken((journey) => {
      const day = journey.days[0];
      if (day.availability === 'available') day.lessonId = 'day-99-missing';
    });
    expect(errors.some((e) => e.includes('day-99-missing does not exist'))).toBe(true);
  });

  it('rejects days out of order', () => {
    const errors = broken((journey) => {
      [journey.days[1], journey.days[2]] = [journey.days[2], journey.days[1]];
    });
    expect(errors.some((e) => e.includes('must be ordered'))).toBe(true);
  });

  it('rejects a lesson with an empty required field', () => {
    const errors = broken((_, lessons) => {
      lessons[2].text.nl.steps[0].bigIdea = ' ';
    });
    expect(errors.some((e) => e.includes('learn step needs'))).toBe(true);
  });

  it('rejects steps in the wrong order', () => {
    const errors = broken((_, lessons) => {
      const steps = lessons[0].text.nl.steps as unknown as unknown[];
      steps.reverse();
    });
    expect(errors.some((e) => e.includes('steps must be learn, reflect, live'))).toBe(true);
  });

  it('rejects APPROVED content without a named reviewer', () => {
    const errors = broken((_, lessons) => {
      lessons[0].review = { ...lessons[0].review, state: 'APPROVED' };
    });
    expect(errors.some((e) => e.includes('needs a named reviewer'))).toBe(true);
  });

  it('rejects an unknown review state', () => {
    const errors = broken((_, lessons) => {
      (lessons[0].review as { state: string }).state = 'PUBLISHED';
    });
    expect(errors.some((e) => e.includes('unknown review state'))).toBe(true);
  });

  it('rejects a lesson that is not on the journey', () => {
    const errors = broken((_, lessons) => {
      lessons.push({ ...clone(lessons[0]), id: 'day-00-orphan' });
    });
    expect(errors).toContain('lesson day-00-orphan is not on the journey');
  });

  it('rejects a backwards verse range', () => {
    const errors = broken((_, lessons) => {
      lessons[0].passage = { book: 'ACT', chapter: 17, verseStart: 31, verseEnd: 22 };
    });
    expect(errors.some((e) => e.includes('verse range runs backwards'))).toBe(true);
  });
});

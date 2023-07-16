import { atom } from 'jotai';

export const pagingSelectionAtom = atom('All');

export const currentTickAtom = atom(5);
export const scoreboardDataAtom = atom([]);
export const submissionLogAtom = atom([]);
export const exploitLogAtom = atom([]);

export const submissionLogLengthAtom = atom(
  (get) => get(submissionLogAtom).length
);
export const exploitLogLengthAtom = atom((get) => get(exploitLogAtom).length);

import { atom } from 'jotai';
import { ExtendedType } from './enums';
import { DataType, Exploit, ExploitType, ScoreboardType } from './types';
import { File } from './types';

export const pagingSelectionAtom = atom('All');

export const currentTickAtom = atom(() =>
  Math.floor(
    (new Date().getTime() - new Date('2023-07-22T12:00:00Z').getTime()) /
      (1000 * 60)
  )
);
export const scoreboardDataAtom = atom<ScoreboardType | null>(null);
export const submissionLogAtom = atom<DataType[] | null>(null);
export const exploitLogAtom = atom<DataType[] | null>(null);

export const exploitsAtom = atom<ExploitType[] | null>(null);

export const submissionLogLengthAtom = atom(
  (get) => get(submissionLogAtom)?.length
);
export const exploitLogLengthAtom = atom((get) => get(exploitLogAtom)?.length);

export const extendedSelectionAtom = atom<{
  type: ExtendedType | null;
  selection: string | null;
}>({ type: null, selection: null });
export const sensorFlagAtom = atom(false);

export const currentFiles = atom<File[]>([]);

export const currentExploit = atom<Exploit | null>(null);

export const currentlySelectedFile = atom<string | null>(null);

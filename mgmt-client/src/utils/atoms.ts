import { atom } from 'jotai';
import { ExtendedType } from './enums';
import { DataType, Exploit, ScoreboardType } from './types';
import { File } from './types';

export const pagingSelectionAtom = atom('All');

export const currentTickAtom = atom(5);
export const scoreboardDataAtom = atom<ScoreboardType>({
  currentTick: 1,
  teams: { '1': { name: '', services: {} } },
});
export const submissionLogAtom = atom<DataType[]>([]);
export const exploitLogAtom = atom<DataType[]>([]);

export const submissionLogLengthAtom = atom(
  (get) => get(submissionLogAtom).length
);
export const exploitLogLengthAtom = atom((get) => get(exploitLogAtom).length);

export const extendedSelectionAtom = atom<{
  type: ExtendedType | null;
  selection: string | null;
}>({ type: null, selection: null });
export const sensorFlagAtom = atom(false);

export const currentFiles = atom<File[]>([]);

export const currentExploit = atom<Exploit | null>(null);

export const currentlySelectedFile = atom<string | null>(null);

import { atom } from 'jotai';
import { ExtendedType } from './enums';
import {
  FlagType,
  ExecutionType,
  Exploit,
  ExploitType,
  ScoreboardType,
} from './types';
import { File } from './types';

export const pagingSelectionAtom = atom('All');

export const currentTickAtom = atom(5);
export const scoreboardDataAtom = atom<ScoreboardType | null>(null);
export const flagLogAtom = atom<FlagType[] | null>(null);
export const executionLogAtom = atom<ExecutionType[] | null>(null);

export const exploitsAtom = atom<ExploitType[] | null>(null);

export const flagLogLengthAtom = atom((get) => get(flagLogAtom)?.length);
export const executionLogLengthAtom = atom(
  (get) => get(executionLogAtom)?.length
);

export const extendedSelectionAtom = atom<{
  type: ExtendedType | null;
  selection: string | null;
}>({ type: null, selection: null });
export const sensorFlagAtom = atom(false);

export const currentFiles = atom<File[]>([]);

export const currentExploit = atom<Exploit | null>(null);

export const currentlySelectedFile = atom<string | null>(null);

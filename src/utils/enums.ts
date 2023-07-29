export enum HomePanelEnum {
  Simple = 'simple',
  Runner = 'runner',
  Submission = 'submission',
}
export enum DragDirection {
  Row = 'row',
  Column = 'col',
}
export enum ExtendedType {
  Team = 'team',
  Service = 'service',
}
export enum FlagCode {
  OK = 'OK', // Accepted: X flag points
  DUP = 'DUP', // Denied: flag already claimed
  OLD = 'OLD', // Denied: flag too old
  INV = 'INV', // Denied: invalid flag
  NOP = 'NOP', // Denied: flag from nop team
  OWN = 'OWN', // Denied: flag is your own
  ERR = 'ERR', // Error: <<ERROR>>
}

export type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}
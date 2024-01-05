/****************************************/
// # I. Distributive Conditionals
/****************************************/






//////////////////////////////////////////
// ## A. Distributive case:
//       conditionals _are_ distributive over union types
//       _if and only if_ the union type is
//       a non-nested generic type argument

type DistributiveConditional<T> =
  T extends string
  ? T[]
  : never
  
type DC = DistributiveConditional<string | number>
//   ^?

type Equivalencies_DC = [
  DistributiveConditional<string | number>,

  | DistributiveConditional<string>
  | DistributiveConditional<number>,

  | (string extends string ? string[] : never)
  | (number extends string ? number[] : never),

  string[] | never,

  string[],
]






//////////////////////////////////////////
// ## B. Non-Distributive case:
//       in all other cases, conditionals do _not_
//       distributive over union types

// 1. when the union type is not a generic type argument

type NonGenericUnionConditional =
//  ^?
  (string | number) extends string
  ? true
  : false

// 2. when the union type is a generic type argument, 
// but it's nested inside of a Tuple, Function, Object

type NonDistributiveTuple<T> =
  [T] extends [string | number | symbol] 
  ? T[]
  : never

type NDT = NonDistributiveTuple<string | number>
//   ^?

type Equivalencies_NDT = [
  NonDistributiveTuple<string | number>,

  [string | number] extends [string | number | symbol]
    ? (string | number)[]
    : never,

  (string | number) extends (string | number | symbol)
    ? (string | number)[] 
    : never,

  (string | number)[],
]






/****************************************/
// # II. Trickiness of `extends never`
/****************************************/

// 1. `never` extends everything (including `never`)
//    e.g. `never extends T` is true for all `T`

// 2. nothing extends `never` (except `never`)
//    e.g. `T extends never` is false for all `T`,
//          but `never extends never` is true

// 3. nothing is assignable to `never`
//    e.g. `let param: never; param = "a"`
//          will produce an error


/**
 * always returns `number`,
 * except when `never` is passed into `T`
 */
function assert1<T>(
  expectTrue: T extends never
              ? number
              : number
) {}

/**
 * Passing in `never` as the generic argument results in 
 * 1. the type of `expectTrue` resolving to `never`, and
 * 2. an error being triggered for all values of the
 *    function argument `expectTrue`, due to all types
 *    (other than `never`) lacking assignability to the
 *    `never` type.
 */
assert1<never>(0) // Error: Argument of type 'number' is not assignable to parameter of type 'never'.(2345)
//^?

/**
 * always returns `number`,
 * even if `never` is passed into `T`
 */
function assert2<T>(
  expectTrue: [T] extends [never]
              ? number
              : number
) {}
/**
 * Passing in `never` as the generic argument results in 
 * 1. the type of `expectTrue` resolving to `number`, and
 * 2. no errors for all `number` type value function arguments
 */
assert2<never>(0)
//^?






//////////////////////////////////////////
// ## Case A: Non-Generic Type
//            `never extends never`

type NeverExtendsNever =
//  ^?
  never extends never 
  ? true
  : false

type NEN =
//  ^?
  Extract<string | null, undefined> extends never 
  ? true 
  : false

type Equivalencies_NEN = [
  (Extract<string | null, undefined>) extends never
    ? true
    : false,

  (never) extends never
    ? true
    : false,

  true
]






//////////////////////////////////////////
// ## Case B: Distributive Generic Parameter
//            `T extends never`

/** The `true` branch is **unreachable** */
type NeverGeneric<T> = T extends never ? true : false   
type NG = NeverGeneric<never>
//   ^?

// For comparison:
//   a conditional that's distributed over a union
//   of one, single element:
type Equivalencies_DC2 = [
  DistributiveConditional<string>,

  DistributiveConditional</* nothing */ | string>,

  | DistributiveConditional<string>,

  | (string extends string ? string[] : never),

  | string[],

  string[],
]

type NeverGenericEquivalences = [
  NeverGeneric<never>,
  
  /**
   * `never` is the empty union of ZERO elements
   * 
   *    NeverGeneric<(|)>,
   */

  /** This distribution over the empty union never happens (there's nothing to distribute over).
   * 
   *    (| NeverGeneric<(|)>), 
   */

  /** This conditional is never evaluated, and the `true`/`false` branches are both unreachable.
   * 
   *    (| ((|) extends never ? true : false)),
   */

  /** NeverGeneric<never> resolves to an empty union.
   * 
   *    (|),
   */

  /** ...which is `never` by definition. */
  never,
]>





//////////////////////////////////////////
// ## Case C: Non-Distributive Generic Parameter
//            `[T] extends [never]`

type NeverGenericWrapped<T> =
  [T] extends [never]
  ? true
  : false

type NGW = NeverGenericWrapped<never>
//   ^?

type Equivalencies_NGW = [
  NeverGenericWrapped<never>,

  [never] extends [never] ? true : false,

  never extends never ? true : false,

  true,
]

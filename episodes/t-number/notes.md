1. The problem
    - D the problem
        - twoslash
    - D select/dropdown
    - D get rid of dropdown code
1. introduce toRGB
    - D the func
        - prevent typos on input
        - prevent typeos in the cases
        - exhaustiveness checking
            - add return type
    - D set up `Color` and set to string
1. The wrong solution (manually)
    - R copy/pasta
    - D two sources of truth
        - add Jigglypuff Bubblegum
1. The wrong solution (typeof colors)
    - R what it is
    - D why it's wrong (it's still string and still an array)
    - R adding `as const`
    - D why it's still wrong (it's still an array)
    - R we can do a union index T[0] | T[1] | T[2]
    - D still manual
    - R T[0 | 1 | 2]
1. The right solution (T[number])
    - D what if we do T[number]
    - R why it works
    - D
      - case spelling
      - item matching
      - exhaustive
    - D you need `as const` (remove it temporarily)



/**
 * Further talking points:
 * - why do we want to derive things?
 * - why do we not just use `string[]` for types?
 * - why even use types?
 *   -> so that when we change something in our code,
 *      something will let us know all the places
 *      where we've made assumptions that are not compatible
 *      with our new discoveries of the problem.
 *      even though it can be frustrating that typescript
 *      will light up everything in red and scream at you,
 *      i consider that a good thing. it forces you to clean up
 *      after yourself.
 *   -> writing code without typescript is pretty simple
 *      but most of the time we're editing and fixing code
 *      instead of writing and that's where well-defined types help the most.
 *   -> it's possible to overdo it with type complexity.
 *      developers, including yourself at a later time,
 *      need to be able to read, understand, and maintain
 *      the complexity you add to the project. it's a balancing act.
 *      (example: dimitri's "BEM" example)
 *   -> well-defined types often lead developers to schemas (e.g. zod).
 */

const allowedColors = ["red", "yellow", "brown"];

// how can we derive this from allowedColors?
type AllowedColor = "red" | "yellow" | "brown";

//                                            ↓ type predicate
const isAllowedColor = (input: string): input is AllowedColor => {
	return allowedColors.includes(input);
};

// ...

declare const userInput: string;

if (isAllowedColor(userInput)) {
	console.log(userInput);
	//          ^?
} else {
	console.log(userInput);
	//          ^?
}

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

type First<T extends unknown[]> = T[0] extends T[number] ? T[0] : never;

type First2<T extends unknown[]> = T[0];

type Bar = First2<2>;
//   ^?

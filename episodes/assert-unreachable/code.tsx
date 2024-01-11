const colors = [
    "Koopa Troopa Green",
    "Blastoise Blue",
    "Gerudo Sunset",
    "Jigglypuff Bubblegum",
] as const;

const toRGB = (color: typeof colors[number]) => {
  switch (color) {
    case "Koopa Troopa Green":
      return "#6abe30";

    case "Blastoise Blue":
      return "#2a66b0";

    case "Gerudo Sunset":
      return "#e97451";

    case "Jigglypuff Bubblegum":
      return "#ffdafa";
  }

  assertUnreachable(color);

  assertUnreachableWithMessage(color, "my error message");

  color satisfies never;

  let unreachable: never = color;

  // why would anyone anyone think this is better??
  // who knows.  but apparently some people do it..
  ((x: never): void => {})(color);
};

/** You can put TSDoc here!  That way people that don't know what this is can read your explanation of it! */
const assertUnreachable = (x: never) => {
  // or, maybe you can do `console.error` if you don't want it to crash your program?
  throw new Error("Didn't expect to get here");
}

/** You can put TSDoc here!  That way people that don't know what this is can read your explanation of it! */
const assertUnreachableWithMessage = (x: never, message: string) => {
  // btw, the nice thing about doing `console.error` here instead is you can safely pass along `x` to be logged as well
  throw new Error(message);
}

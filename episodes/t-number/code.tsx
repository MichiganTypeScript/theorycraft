const colors = ["Koopa Troopa Green", "Blastoise Blue", "Gerudo Sunset"] as const;
//    ^?

type T = typeof colors;
type Color = T[number];
//   ^?

const toRGB = (color: Color): string => {
  switch (color) {
    case "Koopa Troopa Green":
      return "#6abe30";

    case "Blastoise Blue":
      return "#2a66b0";

    case "Gerudo Sunset":
      return "#e97451";
  }
};

// this is ok
toRGB("Koopa Troopa Green");

// this should be an error
// because it's a typo
toRGB("Kopa Troopa Green");

// context:
const makeDropdown = () => {
  // user selects one of these
  return (
    <select>
      {colors.map(color => <option>{color}</option>)}
    </select>
  );
}
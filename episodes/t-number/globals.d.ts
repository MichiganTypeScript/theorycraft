// needed to make the editor shut up (since we don't actually have react here)
declare namespace JSX {
    type IntrinsicElements = {
        select: any;
        option: any;
    }
}
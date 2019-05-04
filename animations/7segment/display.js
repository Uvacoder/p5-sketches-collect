
/**
 * A display describes a seven segment display, which consists of seven segments.
 * A display has a number between 
 */
class Display {

    /** Constructed with a location (x, y) for the left top corner and a size d. */
    constructor(x, y, d, bb, hex) {

        /** Boldness and buffer size b */
        let b = d * bb;

        /** Constructing seven segments of length d with buffers and boldness of size b */
        let s1 = new Segment(x + b, y, d, 0, b);
        let s2 = new Segment(x, y + b, 0, d, b);
        let s3 = new Segment(x + d + 2 * b, y + b, 0, d, b);
        let s4 = new Segment(x + b, y + 2 * b + d, d, 0, b);
        let s5 = new Segment(x, y + 3 * b + d, 0, d, b);
        let s6 = new Segment(x + d + 2 * b, y + d + 3 * b, 0, d, b);
        let s7 = new Segment(x + b, y + d + 4 * b + d, d, 0, b);

        /** The segments in an array */
        this.segments = [s1, s2, s3, s4, s5, s6, s7];

        /** The current number, by default 0 */
        this.n = 0;

        /** By default, the configurations of the display are decimal configurations (0-9) */
        this.configs = decConfigs;

        /** If hex is set to true, change the configurations to hexadecimal configurations (0-F) */
        if (hex) {
            this.configs = hexConfigs;
        }
    }

    /** Renders the seven segment display by rendering each of its displays seperately */
    show() {
        for (let s of this.segments) {
            s.show();
        }
    }

    /** Changes the current config to the next config */
    next() {
        let config = this.configs[++this.n % this.configs.length];
        for (let j = 0; j < 7; j++) {
            this.segments[j].on = (config.charAt(j) == '1');
        }
        /** Returns true when loopover happens */
        return this.n % this.configs.length == 0;
    }
    /** Sets the config at index x to be the current config */
    set(x) {
        this.n = x;
        let config = this.configs[this.n];
        for (let j = 0; j < 7; j++) {
            this.segments[j].on = (config.charAt(j) == '1');
        }
    }
}

/** Premade decimal configurations for numbers 0-9 */
let decConfigs = [
    "1110111", // 0
    "0010010", // 1
    "1011101", // 2
    "1011011", // 3
    "0111010", // 4
    "1101011", // 5
    "1101111", // 6
    "1010010", // 7
    "1111111", // 8
    "1111011"  // 9
]

/** Premade hexadecimal configurations for numbers 0-F */
let hexConfigs = [
    "1110111", // 0
    "0010010", // 1
    "1011101", // 2
    "1011011", // 3
    "0111010", // 4
    "1101011", // 5
    "1101111", // 6
    "1010010", // 7
    "1111111", // 8
    "1111011", // 9
    "1111110", // A
    "0101111", // B
    "1100101", // C
    "0011111", // D
    "1101101", // E
    "1101100"  // F
]
import { keysDev } from "./keys.dev";
import { keysProd } from "./keys.prod";

export type TKeys = { mongoURI: string | undefined };

let keys: TKeys;
if (process.env.NODE_ENV === "production") {
  keys = keysProd;
} else {
  keys = keysDev;
}

export default keys;

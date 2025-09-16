/**
 * Store keeps a running maximum for every key and
 * lets you query that maximum at any checkpoint label.
 *
 *  • set(key, value [, checkpoint])
 *  • get(key, checkpoint)   → max || undefined
 *
 *  Complexity
 *    ├─ set : O(1)
 *    └─ get : O(1)
 */
const Store = function () {
    // key ➜ { prefix: number[], checkpoints: Map<string, number> }
    const buckets = new Map();
  
    /** ensure a bucket exists and return it */
    const bucketFor = (key) => {
      if (!buckets.has(key)) {
        buckets.set(key, { prefix: [], checkpoints: new Map() });
      }
      return buckets.get(key);
    };
  
    return {
      /** Insert a price and (optionally) label this position with `checkpoint` */
      set(key, value, checkpoint) {
        const bucket = bucketFor(key);
  
        // running max
        const prevMax = bucket.prefix.length
          ? bucket.prefix[bucket.prefix.length - 1]
          : -Infinity;
        bucket.prefix.push(Math.max(prevMax, value));
  
        // remember where this checkpoint lands
        if (checkpoint) {
          bucket.checkpoints.set(checkpoint, bucket.prefix.length - 1);
        }
      },
  
      /** Highest price seen **up to** the named checkpoint */
      get(key, checkpoint) {
        const bucket = buckets.get(key);
        if (!bucket) return undefined;
  
        const idx = bucket.checkpoints.get(checkpoint);
        if (idx === undefined) return undefined;
  
        return bucket.prefix[idx];
      },
    };
  };
  
  /* ---------------- demo (matches your test sequence) ---------------- */
  const store = new Store();
  store.set(1, 1);
  store.set(1, 4);
  store.set(1, 2);
  store.set(1, 3, 'a');   // checkpoint a
  store.set(1, 6);
  store.set(1, 7);
  store.set(1, 8, 'b');   // checkpoint b
  store.set(1, 11);
  store.set(1, 9);
  store.set(1, 10, 'c');  // checkpoint c
  
  console.log(store.get(1, 'c')); // 11
  console.log(store.get(1, 'a')); //  4
  console.log(store.get(1, 'b')); //  8
  
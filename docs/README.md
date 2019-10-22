# Tepago Front-end Product Data

Before we start on actual JSON, it is important to think about requirements, then discucss firebase keys.

Given we have:

- items which are first-class elements
- items may have options
- items may have pricing
- options only live in context of items
- options may have pricing which supercede pricing of the parent (which would otherwise be used as the "as low as" pricing when priced-options are present)
- packages which are fist-class elements
- packages have items
- packages with pricing may be optionally superceded by pricing of it's component items - thus acting as the "as low as" price 
- packages without pricing will deduce pricing from it's component items

- when items are changed, they invalidate the packages in which they belong (those packages must be updated to include newest versions of items - that's a pain-in-the-ass)
  - what do we do with a package that has items that have been updated?

- when options are changed, they will also potentially change the key - suck


## Firebase key
Firebase keys are very important, you can sort, filter and range keys for maximum performance.
We can allow the user to provide a base64-urlsafe key (or we can generate if they don't feel like it). We have reserved the ```-``` (dash) character as separator

### Package key
```
pkg_id-pkg_mod
```

### Item key
```
item_id-item_mod
```

### Option key
```
item_id-item_mod-option_id-option_mod
```

- when an option is added, changed or removed, it changes the parent item.
- user has option to select unique key, or one can be automatically assigned at creation (PUT vs POST)
- if the item is a sub-item or "option", then the key of parent is prepended with desired or generated key of the subitem separated by double-colon like: ```WIDGET01-a1Bv-BLUE-a1Bv```. 
- the "mod" parts are base64 encoding of number (milliseconds since unix epoch) - the number they represent will not be encoded considering the numbers are UTF-8 characters and should rather encoded to base36. Use these functions to encode decode:

```javascript

function encodeB36 ( num ) { return num.toString(36); }

function decodeB36 ( b32 ) { return parseInt(num,36); }

function genRandId () { return encodeB36(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)); }

function createPkgKey ( mod, id ) {
	if ( id ) {
		if ( atob(id) ) {
			if ( id.indexOf("-") > -1 ) {
				throw new Error("illegal character '-' was used in id");
			}
		}
	}
	else { id = genRandId(); }
	if ( parseInt(mod) ) {
		return `${id}-${encodeB36(parseInt(mod))}`;
	} else {
		throw new Error("mod must be integer milliseconds from Unix epoch");
	}
}

function createItmKey ( mod, key ) {
	return createPkgKey ( mod, key );
}

function createOptKey ( itemkey, mod, key ) {
	const optkey = createItmKey(mod,key);
	return `${itemkey}-${optkey}`;
}

console.log("testing...");

console.log(( createPkgKey(12345678,"goodtest") == "goodtest-7clzi" ));
try { createPkgKey(12345678,"illegal-character"); console.log(false); } catch (e) { console.log(true); } 
try { createPkgKey(12345678,"$not#base64!"); console.log(false); } catch (e) { console.log(true); }
try { createPkgKey("not an integer","raises error"); console.log(false); } catch (e) { console.log(true); }
console.log(/^([a-z]|[0-9])+(-)7clzi$/.test(createPkgKey(12345678)));

console.log(( createItmKey(12345678,"goodtest") == "goodtest-7clzi" ));
try { createItmKey(12345678,"illegal-character"); console.log(false); } catch (e) { console.log(true); } 
try { createItmKey(12345678,"$not#base64!"); console.log(false); } catch (e) { console.log(true); }
try { createItmKey("not an integer","raises error"); console.log(false); } catch (e) { console.log(true); }
console.log(/^([a-z]|[0-9])+(-)7clzi$/.test(createItmKey(12345678)));

console.log(( createOptKey("good_key-7clzi",12345678,"goodtest") == "good_key-7clzi-goodtest-7clzi" ));
try { createOptKey("good_key--7clzi",12345678,"illegal-character"); console.log(false); } catch (e) { console.log(true); } 
try { createOptKey("good_key--7clzi",12345678,"$not#base64!"); console.log(false); } catch (e) { console.log(true); }
try { createOptKey("good_key--7clzi","not an integer","raises error"); console.log(false); } catch (e) { console.log(true); }
console.log(/^good_key-7clzi-([a-z]|[0-9])+(-)7clzi$/.test(createOptKey("good_key-7clzi",12345678)));


```

## Package
```jsonc
/* package object*/
{
	"key":"",          /* key string */
	"current":0.0,     /* double precision seconds Unix Epoch - current version */
	"summ":"",         /* string max 256 chars */
	"desc":"",         /* string */
	"mod":0.0,         /* double precision seconds Unix Epoch */
	"modby":"",        /* jwt */
	"cre":0.0,         /* double precision seconds Unix Epoch */
	"creby":"",        /* jwt */
	"pricing":[],      /* array of pricing objects*/
	"items":[]         /* array of item objects */
}
```

## Item
```jsonc
/* item object*/
{
	"key":"",          /* key string */
	"current":0.0,     /* double precision seconds Unix Epoch - current version */
	"summ":"",         /* string max 256 chars */
	"desc":"",         /* string */
	"mod":0.0,         /* double precision seconds Unix Epoch */
	"modby":"",        /* jwt */
	"cre":0.0,         /* double precision seconds Unix Epoch */
	"creby":"",        /* jwt */
	"pricing":[],      /* array of pricing objects*/
	"options":[]       /* array of option objects */
}
```

## Option
```jsonc
/* option object*/
{
	"key":"",          /* key string */
	"summ":"",         /* string max 256 chars */
	"desc":"",         /* string */
	"mod":0.0,         /* double precision seconds Unix Epoch */
	"modby":"",        /* jwt */
	"cre":0.0,         /* double precision seconds Unix Epoch */
	"creby":"",        /* jwt */
	"pricing":[],      /* array of pricing objects*/
	"options":[]       /* array of option objects */
}
```

## Pricing
```jsonc
/* pricing object */
{
	"scheds":[],       /* array of schedule frequency formats (double precision) */
	"max":0.0,         /* double precision */
	"min":0.0,         /* double precision */
	"function":""      /* string function */
}
```

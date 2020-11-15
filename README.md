# keys-case-convert

An unobtrusive case conversion solution.

Install by using `npm i keys-case-convert`.

### Defaults

By default the converter will convert object keys to **camelCase** and will do a shallow convert.

The converter accepts two arguments:

1. `input: string || array || object` is the string or object to convert. By default, if provided a string the converter will return the converted string. If given an object the converter will read the object's keys and return a copy of the object with converted keys. It's worth pointing out here that the converter will not mutate data passed in, but rather return copied and converted data.
1. `settings: object` directs the converter to convert to the format of your choosing.

### Settings Object

Accepts two properties:

1. `settings.deep: boolean` directs the converter to recursively convert nested objects' keys.
1. `settings.case: string` directs the converter to change the case of keys or a string to the requested format, or "case". Cases include: **"camel"**, **"pascal"**, **"kebab"** and **"snake"**.

### Examples:

```
const MY_STRING = "my_string";
keysCaseConvert(MY_STRING); // returns myString
keysCaseConvert(MY_STRING, { case: "camel" }); // returns myString
```
The above example shows that, without providing a settings object, the converter defaults to **camel** case.
```
const MY_STRING = "my_string";
keysCaseConvert(MY_STRING); // returns myString
keysCaseConvert(MY_STRING, { case: "snake" }); // returns my_string
```
The above further shows that the converter defaults to **camel** case without explicitly overriding the case property. In the second line of code, since **snake** was provided as a case, the output becomes `my_string`.
```
const MY_OBJECT = {
  my_prop_1: {
    my_prop_2: "Foo Bar"
  }
}
keysCaseConvert(MY_OBJECT);
// returns
// {
//   myProp1: {
//     my_prop_2: "Foo Bar"
//   }
// }
```
The above shows the default behavior of the converter in action when provided an object input. By default, the converter will look for shallow properties and convert those. Below is an example using deep conversion with pascal case:
```
const MY_OBJECT = {
  my_prop_1: {
    my_prop_2: "Foo Bar"
  }
}
keysCaseConvert(MY_OBJECT, { case: "pascal", deep: true});
// returns
// {
//   MyProp1: {
//     MyProp2: "Foo Bar"
//   }
// }
```
Pretty simple, right? But very effective!

. . .

Have fun coding, y'all! And don't forget to follow me:

[npm](https://www.npmjs.com/~bolthouse)
[Github](https://github.com/BenBolthouse)
[LinkedIn](https://www.linkedin.com/in/ben-bolthouse/)



// Function Declaration
function add (x, y) {
    return x + y;
}

// Function Expression
var multiply = function (x, y) {
    return x * y
};

// Function Constructor - Avoid this like the plague
var increment = new Function('n', 'return n + 1');

function sayMyName(name) {
    return 'My name is ' + name;
}

sayMyName("Heisenberg");

var sayMyName = function _sayer(name) {
    return 'My name is ' + name;
};

sayMyName('Heisenberg');

var sayMyName = new Function('name', "return 'Say my name ' + name");

sayMyName('Heisenberg');

var favoriteCharacter = { // A random object
    name: 'Linus Van Pelt',
    gender: 'Male',
    inventory: ['Security Blanket']
};

// Getter
favoriteCharacter.name; // Using the dot notation
favoriteCharacter['gender']; // Using the brackent notation

// Setter
favoriteCharacter.sister = 'Lucy Van Pelt'; // Ditto here
favoriteCharacter['friend'] = 'Charlie Brown';

// Mention for =delete= who might be forgotten
delete favoriteCharacter.inventory;

var getter = function _doGet(emptyValue, key, object) {
    if (object && object.hasOwnProperty(key)) {
        return object[key];
    } else {
        return emptyValue;
    }
};

var setter = function (key, value, object) {
    if (object) {
        object[key] = value;
    }

    return value;
};

var hero = {
    name: 'Ogre Magi',
    type: 'Intelligence'
};


getter('Anonymous', 'name', hero); // ::'Ogre Magi'
getter(0, 'baseHp', hero);  // :: 0

setter('baseHp', 550, hero); // :: hero

1 + 2; // :: 3

2 * 3; // :: 6

var add = function _addition(x, y) {
    return x + y;
};

var multiply = function _multiplication(x, y) {
    return x * y;
};


add(1, 2); // :: 3
multiply(2, 3); // :: 6

// NOTE: JavaScript types really suck, so just roll with this
1 === 0; // :: false
'True' !== 'False'; // :: true

1 <= 2; // :: true
1 >= 2; // :: false

!'Nullify'; // :: false
!!''; // :: false

var equals = function _equals(x, y) { return x === y; },
    notEquals = function _notEquals(x, y) { return x !== y;};

var not = function _not(x) { return !x; };

var lessThan = function _lessThan(x, y) { return x < y; },
    moreThan = function _moreThan(x, y) { return x > y;};

var lessThanOrEquals = function _lessThan(x, y) { return x <= y; },
    moreThanOrEquals = function _moreThan(x, y) { return x >= y; };


equals(true, false);
not(1);

not(not(1));

lessThanOrEquals(1, 2);

var getFullName = function _getFullName(firstName, lastName) {
    return lastName + ', ' + firstName;
};

var firstName = 'Bruce',
    lastName = 'Wayne';

// The default invokation, no frills here
getFullName(firstName, lastName);

// Invoking a function using the =call= method
getFullName.call(null, firstName, lastName);

// Invoking a function with array of arguments
getFullName.apply(null, [firstName, lastName]);

var sum = function _addTriple(x, y, z) { return x + y + z; };

// NOTE: Do notice the first parameter is null and the rest are the real arguments
sum.call(null, 1, 2, 3); // :: 6
sum.call(null, 4, 3, 0); // :: 7


var double = function _double(n) { return n * 2; };

double.call(null, 1); // :: 2
double.call(null, 2); // :: 4

var sum = function _addTriple(x, y, z) { return x + y + z; };

// NOTE: Again the first parameter is null, we'll get to that
sum.apply(null, [1, 2, 3]); // :: 6
sum.apply(null, [4, 3, 0]); // :: 7


var double = function _double(n) { return n * 2; };

double.apply(null, [1]); // :: 2
double.apply(null, [2]); // :: 4

var Animal = {
    makeSound: function _makeSound() {
        var self = this; // Notice is *this* is not defined anywhere

        if (!this.type) { // If the animal has no type, throw an error
            throw "Animal must have a type";
        } else if (this.type === 'Cat') {
            return 'Meow';
        } else if (this.type === 'Duck') {
            return 'Quack';
        }
    }
};

// Animal.makeSound(); // :: error "Animal must have a type";

Animal.type = 'Duck';
Animal.makeSound(); // :: 'Quack'

Animal.makeSound.call({ type: 'Cat'}); // :: Meow

var myFunction = function (/* args */) { // Nice convention when using arguments variable
    var args = arguments; // Make it explicit rather than implicit

    return args; // Just return what was passed
};


myFunction(0, false, 'Derp'); // :: [0, false, 'Derp']
myFunction(true); // :: [true]

myFunction() // :: []

var myOtherFunction = function (/* args */) { // I like this convention
    var argObject = arguments;

    // Now we have to do this when we want it as a list
    var argList = [].slice.call(arguments);

    return argList;
};

// Compare with the output of myFunction
myFunction(0, false, 'Derp');
myOtherFunction(0, false, 'Derp');

// Put a comment in the parameter section to indicate it's usage
var theArgumentFunction = function (/* argumentsName */) {
    // First line is the variable name of =arguments=, as named above in the parameters
    var argumentsName = arguments;

    // var argumentsName = [].slice.call(arguments); // If you are going to do something with it.

    // Code goes here
};

var isNumber = function (rawValue) {
    if (typeof rawValue !== 'number') { // Thorw a type error like in Java
        throw (typeof rawValue) + "<" + rawValue + ">" +  " is not a number"
    }
};

var typeCheckAllArgs = function (typeChecker, f) {
    return function _argParser(/* args */) {
        var args = [].slice.call(arguments);

        args.forEach(typeChecker); // For loop through each argument and check the type

        return f.apply(this, args);
    };
};

var add = function (x, y) { return x + y; },
typeCheckedAdd = typeCheckAllArgs(isNumber, add);

add("5", "2"); // :: '52'
// typeCheckedAdd("5", "2"); // :: error "5 is not a integer"

typeCheckedAdd(5, 2); // :: 7

var sum = function _varArgSum(/* numbers */) {
    var numbers = [].slice.call(arguments);

    // I chose this implementation for it's brevity, for looping also works
    var add = function (x, y) { return x + y; };

    return numbers.reduce(add, 0);
};

sum(1, 2, 3); // :: 6
sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // :: 55

var firstClassFunction = function _() { return 'Something'; };

var functionVariable = firstClassFunction; // Variable functions

// A function that returns a function
var incrementer = function _startAt(start) {
    var counter = start || 0;

    return function _increment() { // Returns a function
        counter = counter + 1;

        return counter;
    };
};

var countFromThree = incrementer(3);

// Goes up for each invokation, you can make a infinite sequence with this
countFromThree(); // :: 4
countFromThree(); // :: 5
countFromThree(); // :: 6

var save = function (entity) {
    // Do some ajax call, local storate or what have you

    /* Some hypothetical newly saved object */
    return {
        id: 42,
        /* ... */
    };
};

var save = function (entity) {
    console.log('Save was called');

    // Do some ajax call, local storate or what have you

    /* Some hypothetical newly saved object */
    return {
        id: 42,
        /* ... */
    };
};

var logIt = function _decorator(message, loggedFunction)  {
    // Here we return a wrapped function
    return function _decoratedFunction(/* args */)  {
        var args = arguments;

        console.log(message || 'Function was called');

        return loggedFunction.apply(this, args);
    };
};

var save = function (entity) { // Function from above
    return {
    };
};

var loggedSave = logIt('Save was called', save);

loggedSave({
    name: 'Snoopy'
});

var onClick = function _buttonHandler(event) {
    // Do something with the event, use your imagination

    return 'Button was clicked';
};

var isThrottled = false,
    throttlePeriod = 500;

var onClick = function _buttonHandler(event) {
    if (!isThrottled) {
        isThrottled = true;

        setTimeout(function _releaseThrottling() {
            isThrottled = false;
        }, throttlePeriod);

        // Do something with the event, use your imagination

        return 'Button was clicked';
    } else {
        return; // Do nothing when it is throttled
    }
};

var throttle = function _throttler (delay, throttled) {
    var isThrottled = false,
        throttlePeriod = delay;

    return function _throttledFunction(/* args */) {
        var args = arguments;

        if (!isThrottled) {
            isThrottled = true;

            setTimeout(function _releaseThrottling() {
                isThrottled = false;
            }, throttlePeriod);

            return throttled.apply(this, args);
        } else {
            return; // Do nothing when it is throttled
        }
    };
};

// Original
onClick(); // :: 'Button was clicked'
onClick(); // :: 'Button was clicked'

// Let's increase the throttling period for effect
var throttledOnClick = throttle(2500, onClick);

// Throttled - Cue demo
throttledOnClick(); // :: 'Button was clicked'
throttledOnClick(); // :: undefined

var gotoHomePage  = function (/* args */) {
    return 'Went to the home page'; // Just imagine something here
};

var isAuthenticated = function (/* args */) {
    return true; // Well
};

var gotoHomePage = function (/* args */) {
    var args = arguments;

    var allowExecution = isAuthenticated.apply(this, args);

    if (allowExecution === true) {
        return 'Went to the home page';
    } else {
        return; // Again do nothing
    }
};

// Again, simple refactoring
var doIf = function _callIf(condition, executor) {
    return function _conditionalCall(/* args */) {
        var args = arguments;

        var allowExecution = condition.apply(this, args);

        if (allowExecution === true) {
            return executor.apply(this, args);
        } else {
            return;
        }
    };
};

var authenticatedGotoPage = doIf(isAuthenticated, gotoHomePage);

// Previous declaration
var authenticatedGotoPage = doIf(isAuthenticated, gotoHomePage);

// Might be asynchronous but bear with me
var cachedStatus = false; // Say there is a ping every second and saved in a variable

var isServerUp = function () {
    return cachedStatus === true;
};

// Awesome reuse
var authenticatedAndActiveGotoPage = doIf(isServerUp, authenticatedGotoPage);

// Let's see if we can copy this
var operation = function (n) {
    return 2 * n + 1;
};

operation(4); // :: 9

var increment = function (n) { return n + 1; },
    multiplyByTwo = function (n) { return n * 2; };

// Chaining the functions together
increment(multiplyByTwo(5)); // :: 9

// Just wrapping methods into functions
var toText = function (value) { return value.toString(); },
    toUpperCase = function (text) { return text.toUpperCase() },
    length = function (text) { return text.length; };

var theNumber = 42;

// Let's chain them
// toText -> toUpperCase -> length

// Paren over paren over paren, yuck
length(toUpperCase(toText(theNumber))); // :: 2

// Why not just?
theNumber
    .toString()
    .toUpperCase()
    .length;

// Pay attention to the name
var removeEmptyFields = function (entity) { return entity; },
    upperCaseTextFields = function (entity) { return entity; },
    serializeToJson = function (entity) { return JSON.stringify(entity); };

// Pretend form value
var formValues = {
    name: 'SUSHI',
    gender: 'MALE',
    cuteness: 0.80
};

// Chaining order
// removeEmptyFields -> upperCaseTextFields -> serializeToJson
serializeToJson(upperCaseTextFields(removeEmptyFields(formValues)));

// Rather what we need is not a chain but a behavior
var processFormValues = function (formEntity) {
    return serializeToJson(upperCaseTextFields(removeEmptyFields(formEntity)));
};

// This is what we are actually looking for
processFormValues(formValues);

// Again, imagine it is some big function or whatnot
var f = function (/* args */) { return "inner"; },
    g = function (/* args */) { return "outer"; };

// How do we clean this up?
g(f(1, 2, 3)); // Some value

// We can try this
var fAndg = function (/* args */) {
    var args = [].slice.call(arguments);

    var fValue = f.apply(this, args);

    var gValue = g.call(this, fValue);

    return gValue;
};

// Looks cleaner
fAndg(1, 2, 3); // Same value

var compose = function _composer(outer, inner) {
    return function _composedFunction (/* args */) {
        var args = [].slice.call(arguments);

        var innerValue = inner.apply(this, args);

        var outerValue = outer.call(this, innerValue);

        return outerValue;
    };
};

// Start with two
var increment = function (n) { return n + 1; },
    triple = function (n) { return n * 3; };

// Remember read from the end to the beginning
var incrementThenTriple = compose(triple, increment),
    incrementTwice = compose(increment, increment),
    multipleByNine = compose(triple, triple);

// Too easy? let's use lists
var first = function (xs) { return xs[0]; },
    rest = function (xs) { return xs.slice(1); },
    reverse = function (xs) { return xs.reverse(); };

var second = compose(first, rest),
    last = compose(first, reverse),
    dropTwo = compose(rest, rest),
    same = compose(reverse, reverse);

var pipe = function (inner, outer) { // Notice the reversed naming
    return compose(outer, inner);
};

var prependNamespace = function (symbolName) { return 'fn/' + symbolName; },
    appendParens = function (symbolName) { return prependNamespace + '()'; };


var mySymbol = 'mySymbol';

appendParens(prependNamespace(mySymbol)); // :: fn/mySymbol()

var processSymbolWithPipe = pipe(prependNamespace, appendParens), // Now left to right
    processSymbolWithCompose = compose(appendParens, prependNamespace); // Default right to left

// Same answers as above
processSymbolWithPipe(mySymbol);
processSymbolWithCompose(mySymbol);

var composes = function _multiComposer(/* fns */) {
    var fns = [].slice.call(arguments);

    if (fns.length === 0) {
        throw "No function to compose"
    } else if (fns.length === 1) {
        return fns[0]; // Same function
    } else {
        var reversedFns = fns.reverse(),
            otherFns = reversedFns.slice(1),
            firstFn = reversedFns[0];

        return otherFns.reduce(pipe, firstFn);
    }
};

var pipes = function _reversedCompose(/* fns */) {
    var fns = [].slice.call(arguments);

    var reversedFns = fns.reverse();

    return composes.apply(this, reversedFns);
};

var myWords = "The quick brown fox jumps over the head of the lazy dog.";

// Let's count the number of words
myWords
    .split(' ')
    .length;

// Then let's compare this with the functional style
var splitByWord = function (text) { return text.split(' '); },
    length = function (xs) { return xs.length; };

var countWords = composes(length, splitByWord);

// So how does this compare?
countWords(myWords);

var mapIf = function (predicate, mapper) {
    return function (value) { // This time it's is a single argument
        var ifValue = predicate.call(this, value);

        return ifValue === true ? mapper.call(this, value) : value;
    };
};

var tooLongName = function (username) { return username.length > 10; },
    toLowerCase = function (text) { return text.toLowerCase(); },
    escapeHtml = function (text) { return text; }, // The regexp might be too long, imagine
    truncateName = function (username) { return username.slice(0, 10); };

var myUsername = "CharlieBrowniest";

var displayName = composes( // A nice convention when composing functions
    escapeHtml,
    mapIf(tooLongName, truncateName),
    toLowerCase
);

displayName(myUsername); // :: charliebro

// Redefined for text
var concat = function (x, y) {return x + y; };

// Notice the redundancy here
var prefixMr = function (name) { return concat('Mr.', name); },
    prefixMrs = function (name) { return concat('Mrs.', name); };


prefixMr('Apevosfe');
prefixMrs('Senapvf')

var presetFirstArg = function _presetFirstArgs(f, firstArg) {
    return function _waitingForSecondArg(secondArg) {
        return f.call(this, firstArg, secondArg);
    };
};

var concat = function (x, y) { return x + y; };

var prefixMr = presetFirstArg(concat, 'Mr'),
    prefixMrs = presetFirstArg(concat, 'Mrs.');

// Looks like a pyramid
var presetTwoArgs = function _presetFirstArg(f, firstArg) {
    return function _waitingForSecondArg(secondArg) {
        return function _waitingForThirdArg(thirdArg) {
            return f.call(this, firstArg, secondArg, thirdArg);
        };
    };
};

var fullName = function (firstName, middleName, lastName) {
    return lastName + ', ' + firstName + ' ' + middleName;
};

// Preset the arguments
var johnWho = presetTwoArgs(fullName, 'John');

var johnMichaelWho = johnWho('Michael');

johnMichaelWho('Vincent'); // :: "John Michael Vincent"
johnMichaelWho('Allan'); // :: "John Michael Allan"

var curry = function (f) {
    var self = this,
        argumentLength = f.length;

    // Using a helper function
    var currier = function _recursiveCurrier(oldArgs) {
        return function _recursiveCurry(/* newArgs */) {
            var newArgs = [].slice.call(arguments),
                curArgs = oldArgs.concat(newArgs);

            if (curArgs.length < argumentLength) { // Check if there is enough parameters
                return currier(curArgs); // Keep returning a function until then
            } else {
                return f.apply(self, curArgs);; // Execute when there is enough
            }
        };
    };

    return currier([]);
};

var getId = curry(getter)(0, 'id'),
    getDescription = curry(getter)('', 'description'),
    setEmptyDescription = curry(setter)('description', 'N/A');

var ps4 = { id: 100, name: 'PlayStation Portable'},
    ds = {name: 'Nintendo DS', description: 'Infidel Handheld'};

getId(ps4); // :: 100
getId(ds); // :: 0

getDescription(ps4); // :: ''
getDescription(ds); // :: 'Infidel Handheld'

setEmptyDescription(ps4);
getDescription(ps4); // :: 'N/A'

var isZero = curry(equals)(0),
    isNull = curry(equals)(null);

isZero(10); // :: false
isZero(0); // :: true

isNull(10); // :: false

var isNotZero = composes(not, isZero);

isNotZero(10); // :: true
isNotZero(0); // :: false

var people = [
    {name: 'Alice', gender: 'Female', source: 'Dilbert', salary: 100, starred: true},
    {name: 'Dilbert', gender: 'Male', source: 'Dilbert', salary: 120 },

    {name: 'Bruce Wayne', gender: 'Male', source: 'DC', starred: true},
    {name: 'Selina Kyle', gender: 'Female', source: 'DC'},

    {name: 'Master Chief', gender: 'Male', source:'Video Game'},
    {name: 'Doom Guy', gender: 'Male', source: 'Video Game', starred: true},
    {name: 'Samus', gender: 'Female', source: 'Video Game'}
];

var getName = curry(getter)('', 'name'),
    getSalary =curry(getter)(0, 'salary');

people.map(getName); // :: ["Alice", "Dilbert", "Bruce Wayne", ...

people.map(getSalary) // :: [100, 120, 0, ... ]

// What if we want an total, no need to understand
people
    .map(getSalary)
    .reduce(add, 0); // 240

var isFemale = curry(equals)('Female'),
    isMale = curry(equals)('Male'),
    getGender = curry(getter)('', 'gender');

// Notice we composed
var isFemalePerson = compose(isFemale, getGender),
    isMalePerson = compose(isMale, getGender);

var males = people.filter(isMale),
    females = people.filter(isFemale);

// Other convention
var isStarred = compose(
    curry(equals)(true),
    curry(getter)(false, 'starred')
);

var favoritePeople = people.filter(isStarred);

var deepObject = {
    a: {
        b: {
            c: 1
        },
        d: 2
    },
    e: 3
};

var safeGet = curry(getter)(null);

var getC = composes(
    safeGet('c'),
    safeGet('b'),
    safeGet('a')
);

getC(deepObject); // :: 1
deepObject.a.b.c;

var getIncorrectC = composes(
    safeGet('c'),
    safeGet('bx')
    safeGet('b')
    safeGet('a')
);

getIncorrectC(deepObject); // :: null
// deepObject.a.b.bx.c // :: undefined type error

var currentDate = new Date(), // Obtained somewhere
    addLastModifiedDate = setter('lastModifiedDate', currentDate);

var csrfToken = '1234abcd', // Somewhere in the DOM maybe?
    addCsrfToken = setter('csrfToken', currentDate);

var removeEmptyFields = function (entity) {
    for (var key in entity) {
        if (entity.hasOwnProperty(key)) {
            if (!entity[key]) {
                delete entity[key];
            }
        }
    }

    return entity;
};

var serializeToJson = function (entity) { return JSON.stringify(entity); };

var processEntity = composes( // Now turn this into a method chain
    serializeToJson,
    addCsrfToken,
    removeEmptyFields,
    addLastModifiedDate
);

const arto = {
    name: 'Arto Hellas',
    age: 31,
    education: 'PhD',
    greet: function() {
        console.log('hello, my name is ' + this.name)
      },
    doAddition: function(a, b) {
    console.log(a + b)
    },  
}

arto.greet()  // "hello, my name is Arto Hellas" gets printed

arto.growOlder = function() {
    this.age += 1
}
  
console.log(arto.age)   // 35 is printed
arto.growOlder()
console.log(arto.age)   // 36 is printed

arto.doAddition(1, 4)        // 5 is printed

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)   // 25 is printed


// If we try to do the same with the method greet we run into an issue:
const referenceToGreet = arto.greet
referenceToGreet() // prints "hello, my name is undefined" (Because of "this")

setTimeout(arto.greet, 1000) // Also looses "this"

setTimeout(arto.greet.bind(arto), 2000) // bind binder "this"
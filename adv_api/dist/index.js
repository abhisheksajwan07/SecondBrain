"use strict";
function sum(user1, user2) {
    return user1.name + user2.age;
}
const age = sum({
    name: "abhi",
    age: 23,
}, { name: "kaku", age: 21 });
console.log(age);

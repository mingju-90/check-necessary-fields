class A{
    constructor() {}
    leave() {
        console.log('a')
    }
}

class B extends A {
    // leave() {
    //     super.leave()
    //     // console.log('b')
    // }
}

var a = new B()
a.leave()
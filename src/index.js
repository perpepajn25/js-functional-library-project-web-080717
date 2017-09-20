fi = (() => {
  return {
    each: function (object, iteratee) {
      if (object.constructor === Array) {
        let arr = object.slice()
        for (let i=0; i < object.length; i++) {
          iteratee(arr[i], i, object)
        }
      }
      if (object.constructor === Object) {
        let arr = Object.values(object)
        for (let i=0; i < Object.values(object).length; i++) {
          iteratee(arr[i], i, object)
        }
      }
      return object
    },
    map: function(object,iteratee) {
      var emptyArr = []
      if (object.constructor === Array) {
        for (let i=0; i < object.length; i++) {
          emptyArr.push(iteratee(object[i], i, object))
        }
      }
      if (object.constructor === Object) {
        for (let i=0; i < Object.values(object).length; i++) {
          emptyArr.push(iteratee(Object.values(object)[i], i, object))
        }
      }
      return emptyArr
    },
    reduce: function(object, iteratee, memo){
      if (object.constructor === Array) {
        let arr = object.slice()
        if (typeof memo === "number") {
          var aNum = memo
            for(let i=0; i<object.length; i++){
              aNum = iteratee(aNum, arr[i])
            }
          return aNum
        } else {
          var aNum = arr.shift()
          for(let i=0; i<arr.length; i++){
            aNum = iteratee(aNum, arr[i])
          }
          return aNum
        }
      } else if (object.constructor === Object) {
        let arr = Object.values(object)
        if (typeof memo === "number") {
          var aNum = memo
            for(let i=0; i<arr.length; i++){
              aNum = iteratee(aNum, arr[i])
            }
          return aNum
        } else {
          var aNum = arr.shift()
          for(let i=0; i<arr.length; i++){
            aNum = iteratee(aNum, arr[i])
          }
          return aNum
        }
      }
    },
    find: function(object, predicate) {
      if (object.constructor === Array) {
        for (var i = 0; i < object.length; i++) {
          if (predicate(object[i])) {
            return object[i]
          }
        }
      } else if (object.constructor === Object) {
        let arr = Object.values(object)
        for (let i=0; i < Object.values(object).length; i++) {
          if (predicate(arr[i])) {
            return arr[i]
          }
        }
      }
    },
    filter: function(object, predicate) {
        var newArray = []
        if (object.constructor === Array) {
          for (var i = 0; i < object.length; i++) {
            if (predicate(object[i])) {
              newArray.push(object[i])
            }
          }
        } else if (object.constructor === Object) {
          let arr = Object.values(object)
          for (let i=0; i < Object.values(object).length; i++) {
            if (predicate(arr[i])) {
              newArray.push(arr[i])
            }
          }
        }
      return newArray
    },
    sortBy: function(object, iteratee) {
      let arr = object.slice()
      loopingSort(object, iteratee)
      return object
    },
    size: function(object){
      var counter = 0
      if (object.constructor === Object) {
        var arr = Object.values(object)
        for (let i=0; arr[i] != arr[-1]; i++){
          counter+=1
        }
      } else {
        for (let i=0; object[i] != object[-1]; i++){
          counter+=1
        }
      }
      return counter
    },
    first: function(array, n){
      let arr = array.slice()
      if (n) {
        return arr.splice(0, n)
      } else {
        return arr.unshift()
      }
    },
    last: function(array, n){
      let arr = array.slice()
      if (n) {
        return arr.splice(arr.length-n)
      } else {
        return arr.pop()
      }
    },
    compact: function(array) {
      var newArray = []
      for (let i=0; i < array.length; i++){
        if (array[i]) {
          newArray.push(array[i])
        }
      }
      return newArray
    },
    flatten: function(array, shallow) {
      var newArray = []
      for (var i = 0; i < array.length; i++) {
        if (array[i].constructor === Array) {
          newArray.push(deepArray(array[i]))
        } else {
          newArray.push(array[i])
        }
      }
      return newArray
    },
  }
})()


function deepArray(array) {
  var newArray = []
    function digDeep(array) {
      debugger;
      for (let i=0; i < array.length; i++){
        if (array[i].constructor === Array) {
          digDeep(array[i])
        } else {
          newArray.push(array[i])
        }
      }
    }()
  return newArray
}



function loopingSort(arr, iteratee) {
  var done = false;
  for (let i=0; i < arr.length; i++) {
    if (arr[i].constructor != Object) {
      if (iteratee(arr[i]) > iteratee(arr[i+1])) {
        var secondElem = arr[i+1]
        arr[i+1] = arr[i]
        arr[i] = secondElem
        done = true
      }
    } else {
      if (arr[i+1]) {
        if (arr[i][iteratee] > arr[i+1][iteratee]) {
          var secondElem = arr[i+1][iteratee]
          arr[i+1][iteratee] = arr[i][iteratee]
          arr[i][iteratee] = secondElem
          done = true
        }
      }
    }
  }
  if (done) {
    loopingSort(arr, iteratee)
  }
  return arr
}

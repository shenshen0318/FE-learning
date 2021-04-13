// ES6 版
// 创建一个 Promise 类

class Promise {
    constructor(executor){
        // 参数校验
        if(typeof executor !== 'function'){
            throw new TypeError(`Promise resolver ${executor} is not a function`);
        }
        // 调用 初始化函数
        this.initValue();
        // 绑定 this
        this.initBind();

        // 把 resolve 和 reject 函数传给 executor 执行
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    // 初始化值
    initValue(){
        this.value = null;                 // 终值
        this.reason = null;                // 拒因
        this.state = Promise.PENDING;      // 状态
        this.onFulfilledCallbacks = [];    // 成功的回调
        this.onRejectedCallbacks = [];     // 失败的回调
    }

    // 绑定 this
    initBind(){
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }

    // resolve 函数
    resolve(value){
        if(this.state === Promise.PENDING){
            this.state = Promise.FULFILLED;
            this.value = value;
            this.onFulfilledCallbacks.forEach((fn)=>{ fn(this.value) })
        }
    }

    // reject 函数
    reject(reason){
        if(this.state === Promise.PENDING){
            this.state = Promise.REJECTED;
            this.reason = reason;
            this.onRejectedCallbacks.forEach((fn)=>{fn(this.reason)})
        }
    }

    // then 函数
    then(onFulfilled, onRejected){
        // 参数验证
        if(typeof onFulfilled !== 'function'){
            onFulfilled = function(value){
                return value;
            }
        }
        if(typeof onRejected !== 'function'){
            onRejected = function(reason){
                throw reason;
            }
        }

        // 实现链式调用，且改变了后面的 then 的值，必须通过新的实例
        let promise2 = new Promise((resolve, reject)=> {
            if(this.state === Promise.FULFILLED){
                // 用 setTimeOut 模拟异步
                setTimeout(()=>{
                    try {
                        const x = onFulfilled(this.value);
                        Promise.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if(this.state === Promise.REJECTED){
                // 用 setTimeOut 模拟异步
                setTimeout(()=>{
                    try {
                        const x = onRejected(this.reason);
                        Promise.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if(this.state === Promise.PENDING){
                this.onFulfilledCallbacks.push((value)=>{
                    setTimeout(()=>{
                        try {
                            const x = onFulfilled(value);
                            Promise.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
    
                this.onRejectedCallbacks.push((reason)=>{
                    setTimeout(()=>{
                        try {
                            const x = onRejected(reason);
                            Promise.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
            
        })

        return promise2;
    }
}

Promise.PENDING = 'pending';
Promise.FULFILLED = 'fulfilled';
Promise.REJECTED = 'rejected';

Promise.resolvePromise = function(promise2, x, resolve, reject){
    // 只能调用一次函数
    let called = false;

    // 1. x 与 promise2 相等
    if(promise2 === x){
        reject(new TypeError('Chaining cycle detected for promise'))
    }

    if(x instanceof Promise){
        // 2. 判断 x 是否为 Promise 的实例
        x.then((value)=>{
            // 返回相同的终值
            Promise.resolvePromise(promise2, value, resolve, reject)
        }, (reason)=>{
            // 返回相同的拒因
            reject(reason);
        })
    }else if(x != null && (typeof x === 'object' || typeof x === 'function')){
        // 3. 判断 x 是否为 对象 或者 函数
        try {
            // 判断 x 有没有 then 方法
            if(typeof x.then === 'function'){
                x.then((value)=>{
                    if (called) return;
                    called = true;
                    Promise.resolvePromise(promise2, value, resolve, reject)
                }, (reason)=>{
                    if (called) return;
                    called = true;
                    reject(reason)
                })
            }else{
                if (called) return;
                called = true;
                resolve(x);
            }
        } catch (error) {
            if (called) return;
            called = true;
            reject(error);
        }
    }else {
        // 4. 都不是 x 为普通值
        resolve(x);
    }
}

module.exports = Promise;

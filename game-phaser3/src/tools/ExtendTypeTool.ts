/*
 * @Author: zebin.ge
 * @Date: 2023-03-07 15:03:57
 * @LastEditors: zebin.ge
 * @LastEditTime: 2023-03-07 15:04:29
 * @FilePath: \mtogether\JavaScripts\utils\ConstructorUtil.ts
 * @Description: 
 */
/**
 * A type that represents a constructor function.
 */
export type Constructor<T = unknown> = new (...args: any[]) => T;


/**
 * 单例模板父类
 */
export class Singleton {
    /**
     * 获取单例
     * @param this 
     * @returns 
     */
    static getInstance<T extends {}>(this: new () => T): T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
        }
        return (<any>this).instance;
    }
}

/**判断字符是否为数字 */
export function isNumber(value: any): boolean {
    return !isNaN(Number(value)) && value != undefined && value != null && value !== ''
}
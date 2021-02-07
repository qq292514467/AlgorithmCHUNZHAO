# 第三周学习笔记（2.1-2.7）

### 分治、回溯

**分治**和**回溯**其实就是递归中的一个分类，可以理解为某种**特别情况下的递归写法**，最终依旧是寻找问题的重复性。分治实际上是在递归时，将一个大的问题**细分拆解**为几个子问题；而回溯则是尝试在递归时，将所有的潜在可能性都尝试一遍，若当前层不可行，**撤销**当前层先前进行的操作。回溯在使用时可以套用递归与分治的模板。

> 分治的代码模板：
>
> （与递归的区别只在于分治最后需要将子问题的结果组装成最终问题的返回结果）

```javascript
const divide_conquer = (problem, params) => {  
    // recursion terminator  终止条件
    if (problem == null) {    process_result    return  }   
    // process current problem  处理当前子问题
    subproblems = split_problem(problem, data)  
    // drill down  调用递归，进入各个子问题的下一层
    subresult1 = divide_conquer(subproblem[0], p1)  
    subresult2 = divide_conquer(subproblem[1], p1)  
    subresult3 = divide_conquer(subproblem[2], p1)  ...  
    // merge  组合子问题的结果
    result = process_result(subresult1, subresult2, subresult3)  
    // revert the current level status
}
```



### 深度优先搜索和广度优先搜索

深度优先搜索**（DFS）**和广度优先搜索**（BFS）**的本质实际是在不限制搜索顺序的状况下，避免对一个节点访问多次和错过访问某个节点的情况的两种不同的搜索方式。

深度优先遍历实际就等于从根节点开始，**沿着某个分支一直向下，直到该分支结束**才会向上，再从别的分支开始向下遍历；广度优先遍历则是从根节点开始，将**当前层的所有节点**全部遍历搜索完成后，才会转入下一层节点进行搜索。

>DFS代码模板
>
>模板可以分为递归与非递归两种写法，非递归写法其实手动创建模拟一个栈来维护。

```javascript
//JavaScript  递归写法
const visited = new Set()const 
dfs = node => {  
    if (visited.has(node))  return  
    visited.add(node)  
    dfs(node.left)  
    dfs(node.right)
}
```

> BFS代码模板
>
> 广度优先遍历，实际使用的是一个数组来模拟实现队列，从而实现广度优先的搜索。

```javascript
//JavaScript
const bfs = (root) => {  
    let result = [], queue = [root]  
    while (queue.length > 0) {    
        let level = [], n = queue.length    
        for (let i = 0; i < n; i++) {      
            let node = queue.pop()      
            level.push(node.val)       
            if (node.left) queue.unshift(node.left)     
            if (node.right) queue.unshift(node.right)    
        }    
        result.push(level)  
    }  
    return result
};
```



### 贪心算法

贪心算法**（Greedy）**是一种希望达到全局最优解，从而在每一步的**当前状态下采取最好或最优选择**的算法。

贪心算法、回溯与动态规划的区别在于：

* 贪心算法只做当下局部情况最优的判断，不会对当前结果进行回退；

* 而回溯能够进行回退，回到上一步；

* 但动态规划除了会选择最优判断，还会保存之前的运算结果，从而根据之前的结果对当前情况选择是否回退。

  

> 如果一个问题可以使用贪心法来解决，那么通常来说贪心法就是当前问题的最优解。相较于贪心法的代码本身，找到进行贪心算法的角度与如何证明贪心是最优解的过程，才是更重要的部分。
>
> 只是对于现实中的问题，贪心法一般不能求出真正要求的答案。



### 二分查找

二分查找，首先需要确认三个前提：

* 目标函数具有单调性（单调递增或递减）

* 存在上下边界（bounded）

* 能够通过索引访问（index accessible）

  

>二分查找代码模板：

```javascript
/* JavaScript */
// 假设数组是一个升序排列的数组
let left = 0, right = len(array) - 1
while (left <= right) {  
    //let mid = (left + right) >> 1  
    let mid = Math.floor(left + (right - left) / 2) // 这种写法可以避免溢出
    if (array[mid] === target) { 
        /*find the target*/ 
        return ;
    }  else if (array[mid] < target) left = mid + 1  
    else right = mid - 1
}
```

二分查找本身是一种近乎教科书式的算法，且较为容易理解，因此可以在解题时先写下代码模板，接着将需要的数据条件等依次填入、替换，这样可以一定程度上避免在使用二分查找时产生的错误。
# 第二周学习笔记（1.25-1.31）

## 树、二叉树、二叉搜索树	

相较于链表(Linked List)这样的一维数据结构，**树(Tree)**其实就像是每个节点拥有多个指针的二维数据结构，因此可以近似地将链表理解为特殊化的树（每个节点只有一个指针）。而生活与工程中使用最多的则是**二叉树**，即每个节点最多只有左、右两个子节点。

* **树**在javascript中的定义

```javascript
 function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
   	 this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
 }
```

#### 二叉树的遍历

树的递归分为三种，分别为**前序、中序、后序**遍历，也可以叫做左、中、右序遍历。

对应的遍历节点的顺序依次是：

> 前序遍历（pre-order）：根--左--右

> 中序遍历（in-order）：左--根--右

> 后序遍历（post-order）：左--右--根

#### 二叉树的递归

由于树本身的代码结构无法进行有效的循环，而通过递归调用实现遍历比较简单且整洁，

> 树在javascript中的三种遍历方式    

```javascript
/* 前序遍历	*/
const preorder = (root) => {
    if (!root) {
        return;
    }
    res.push(root.val);
    preorder(root.left);
    preorder(root.right);
}

/* 中序遍历	*/
const inorder = (root) => {
    if (!root) {
        return;
    }
    preorder(root.left);
    res.push(root.val);
    preorder(root.right);
}

/* 后序遍历	*/
const postorder = (root) => {
    if (!root) {
        return;
    }
    preorder(root.left);
    preorder(root.right);
    res.push(root.val);
}
```

#### 二叉搜索树（Binary Search Tree）

二叉搜索树，也叫二叉排序树、有序二叉树（Ordered Binary Tree）、排序二叉树（Sorted Binary Tree），指的是一颗空树或者一个数具有以下的性质：

* 左子树上**所有节点**的值均小于它的根节点的值；
* 右子树上**所有节点**的值均大于它的根节点的值；
* 所有的左、右子树也分别为二叉查找树  

**二叉搜索树**的**插入**与**查询**操作的时间复杂度都是**O(logN)**的，虽然相较于链表插入时O(1)的时间复杂度要慢一些，但是在查询时要远快于链表的O(n)级别的时间复杂度。



## 堆、二叉堆和图

**堆（heap）**是一种可以很快找到其中**最大值**或者**最小值**的数据结构。

根节点最大的堆叫做大根堆或大顶堆；根节点最小的堆叫做小根堆或小顶堆。

> **堆的实现有多种方式**，例如二叉堆、斐波那契堆等。二叉堆相较于斐波那契堆与严格的斐波那契堆等实现方式，是较为简单的一种实现方式，但相对的在时间、空间复杂度上要逊色。

#### 堆的常见操作（以大顶堆为例）

* find-max:		O(1)
* delete-max:    O(logN)
* insert(create):O(logN)/O(1)

#### 二叉堆的性质

二叉堆通过完全二叉树来实现（并不是二叉搜索树），完全二叉树除了最深层的子节点以外，其余根节点与子节点全部是满的。

一个二叉堆（以大顶堆为例）具有以下性质：

* 它是一颗完全树
* 树中的任意节点的值总是大于等于其子节点的值

> 由此可以推断出，大顶堆最上层的根节点的值，即为堆中的最大值。

#### 二叉堆的实现

1、二叉堆通常由数组（Array）来实现

2、若一个元素在数组中的索引为i，则：

​				（1）索引为i的节点的左节点的索引是（2 * i + 1）

​				（2）索引为i的节点的右节点的索引是（2 * i + 2）

​				（3）索引为i的节点的父节点的索引是  Math.floor(( i - 1)/ 2)

3、**Insert操作**

​				 （1）新元素先插入到数组的尾部

​				 （2）依次从底向上调整整个堆的结构（一直到根即可），这一步操作称为'**HeapifyUp**'

4、**delete-max操作**

​				 （1）将堆尾元素替换到顶部，即堆顶元素被替代删除掉

​				 （2）依次从根部向下调整整个堆的结构（一直到堆尾即可），这一步操作称为'**HeapifyDown**'

5、由于javascript中没有优先队列（Priority Queue），即没有封装好的堆的数据结构，因此附上手写实现的大顶堆。

> 相关题目：[最小的k个数](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/)

```javascript
class MaxHeap {
    constructor(arr = []) {
        this.container = [];
        if (Array.isArray(arr)) {
            arr.forEach(this.insert.bind(this));
        }
    }

    // 实现 Insert 操作
    insert(data) {
        const { container } = this;

        // 将0~k-1 元素依次插入container
        container.push(data);
        // 从数组最后插入，即下标为index，即 container.length-1
        let index = container.length - 1;
        // 迭代，将该节点与当前根节点比较，决定是否交换，使根节点始终是较大的，最后用数组实现一个大根堆
        while (index) {
            let parent = Math.floor((index - 1) / 2);
            if (container[index] <= container[parent]) {
                break;
            }
            swap(container, index, parent);
            index = parent;
        }
    }

    // 实现 Delete-Max 操作
    extract() {
        const { container } = this;
        if (!container.length) {
            return null;
        }

        // 交换数组头尾元素，并将交换后的尾部元素取出，即删除最大根节点
        swap(container, 0, container.length - 1);
        const res = container.pop();
        /* 如果length定义在 container.pop()之前 ，
        那么length会比取出元素后 container 的实际长度要大一位 */
        const length = container.length;
        let index = 0,//最上方的根节点（从数组最后调换而来，不是最大值）
            exchange = index * 2 + 1;//左节点

        // 迭代，在删除最大根节点后，重新调整整个堆的结构，heapifyDown
        while (exchange < length) {
            let right = index * 2 + 2;
            /* 如果有右节点，并且右节点的值大于左节点的值，exchange变为右节点，
            这样可以保证最后与index下标比较的exchange下标的节点，是index的左右子节点中较大的一个 */
            if (right < length && container[right] > container[exchange]) {
                exchange = right;
            }
            if (container[exchange] <= container[index]) {
                break;
            }
            // 如果exchange节点大于根节点（exchange节点是左右节点中较大的一个），交换两节点
            swap(container, exchange, index);
            index = exchange;
            exchange = index * 2 + 1;
        }
        return res;
    }

    // 实现 findMax 操作
    top() {
        // 返回最大根节点的值，若堆为空，返回null
        if (this.container.length) return this.container[0];
        return null;
    }
}
```

#### 图

**图（Graph）**相对于树、堆等结构，在面试中涉及的较少，可以简单理解为一个节点之间有“环”的树，具有点（Vertex）、边（Edge）两个属性。

>相关链接：[图论](https://en.wikipedia.org/wiki/Graph)





## 泛型递归、树的递归

> 递归（recursion）在javascript中代码模板

```javascript
// JavaScript
const recursion = (level, params) =>{   
    // 1、recursion terminator——递归终结条件   
    if(level > MAX_LEVEL){     process_result     return    }   
    // 2、process current level——当前层次处理逻辑   
    process(level, params)   
    //3、drill down——调用递归，进入下一层次   
    recursion(level+1, params)   
    //4、clean current level status if needed——清理当前层（例如全局变量的清理与复原等）   
}
```



**学习递归时的重点：抛弃人肉递归，陷入人肉递归容易钻进牛角尖**



> Tips:个人对于见到递归时的理解：不要大脑代入递归运算，而是**当作这一行调用递归的代码已经是返回的结果**。争取自顶向下，理解递归的目的是什么，从理解而不是计算的角度去阅读代码。





## 本周练习总结

#### 关于树的遍历问题

1、大多数二叉树或者N叉树的题目，都可以通过**递归**来求解，一定程度上这是由树的本身结构与定义决定的。二叉树的根节点有左、右节点，而子节点又分别有自己的左、右节点，之间充满了**重复性**。

2、在树的遍历问题中，通常还有一种创建一个数组，手动模拟出入栈的过程，使用迭代来维护模拟栈。尽管代码不尽相同，但是从抽象角度来看，递归解法本质就类似于从根节点层层向下深入的一种**迭代**。理解了这一点，就可以见见理解两种解法之间的相似之处。



#### 关于topK问题

1、尽管这周是第一次接触topK问题，但是在阅读了较多的题解之后，发现除了有时暴力破解以外，多数情况下的经典解法都分为两种：**大/小顶堆**和**快速排序变形（或者称为快速选择）**

2、由于原生javascript中其实并没有封装堆，所以在解题时可能需要**手写一个heap**，较为麻烦。因此在题解中有人建议，如果面试时遇到相关题目，可以和面试官assume（假设）存在这种结构，如果可以，就可以省下很多的精力。

3、topK问题中的涉及到了部分快速排序的问题（尽管实际解题更像快速排序的一种变形—快速选择(Quick Sort)），之前并没有系统的练习过（也可能老师讲过但是没有听）。

> 根据wiki上的定义与讲解，快速排序的重点在于**递归调用partition（划分）函数**，所有递归结束后，会返回一个排序完成的数组。但是快速排序在最糟糕的情况下时间复杂度会退化到n的幂次函数级别。
>
> > partition函数中，每次都会设置一个随机值（通常取数组第一个之类的元素）作为**基准（pivot）**，随后使用**双指针**，从两侧往中间收敛夹逼，将左侧大于基准值的元素与右侧小于基准值的元素交换。递归完成后会以基准值（pivot）为界限，左侧元素均小于pivot，右侧元素均大于pivot。



4、在[前k个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)中的题解，提到了一种通过**桶排序**的方式来写出题解，尽管题解很简洁易懂，但是还没有过多了解。



#### **N叉树的层序遍历**

1、[N叉树的层序遍历](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)这一题与其余的树的遍历的解题思路并不相同，层序遍历是一种基于广度优先搜索（BFS）思想实现的解题思路，而通常的前、中、后序遍历都是基于深度优先搜索(DFS)的思想来解题的。在使用其他数据结构来辅助解题时，前中后序遍历所常用的栈也并不适合，而是**队列（Queue）**的**先入先出（FIFO）**的特性更适合层序遍历。



#### 组合

1、似乎涉及到回溯的思想，暂时还不是十分理解，留待继续学习。



#### 个人问题

1、过题目速度不够快，一天可能只能过两到三道题目，而且会影响隔天复习时的效率，担心中期是否能跟上进度。

2、毕设、前端知识学习、过年准备等事情较多，导致计划经常被打断，比较苦恼。